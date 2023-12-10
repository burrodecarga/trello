'use client'

import { ListWithCards } from '@/types'
import { useEffect, useState } from 'react'
import { ListForm } from './list-form'
import { ListItem } from './list-item'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { list } from 'unsplash-js/dist/methods/photos/index'
import { Provider } from '@radix-ui/react-tooltip'
import { array } from 'zod'

interface ListContainerProps {
  data: ListWithCards[]
  boardId: string
}

export const ListContainer = ({ data, boardId }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data)

  function reorder<T>(list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  useEffect(() => {
    setOrderedData(data)
  }, [data])

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result
    if (!destination) {
      return
    }
    //La misma posición
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    //moviendo lista
    if (type === 'list') {
      const items = reorder(orderedData, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index }),
      )
      setOrderedData(items)
      //TODO trigger server action
    }

    //moviendo card
    if (type === 'card') {
      let newOrderedData = [...orderedData]
      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId,
      )
      const destList = newOrderedData.find(
        (list) => list.id === destination.droppableId,
      )
      if (!sourceList || !destList) {
        return
      }
      //verificando si existe card en source list

      if (!sourceList.cards) {
        sourceList.cards = []
      }

      //verificando si existe card en destino list
      if (!destList.cards) {
        destList.cards = []
      }

      //moviendo en la misma lista
      if (source.droppableId === destination.droppableId) {
        const reorderedCard = reorder(
          sourceList.cards,
          source.index,
          destination.index,
        )
        reorderedCard.map((card, index) => {
          card.order = index
        })
        sourceList.cards = reorderedCard
        setOrderedData(newOrderedData)

        //TODO trigger server action
        // moviendo card a otra lista
      } else {
        // remove card of the source list
        const [movedCard] = sourceList.cards.splice(source.index, 1)
        /// assign the new listId to move card
        movedCard.listId = destination.droppableId
        // Add the card to destination list
        destList.cards.splice(destination.index, 0, movedCard)
        sourceList.cards.forEach((card, index) => {
          card.order = index
        })

        // update the order to destination list
        destList.cards.forEach((card, index) => {
          card.order = index
        })

        setOrderedData(newOrderedData)

        //TODO: Trigger server actions
      }
    }
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='lists' type='list' direction='horizontal'>
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className='flex gap-x-3 h-full select-none'
          >
            {orderedData.map((list, index) => {
              return <ListItem key={list.id} index={index} data={list} />
            })}
            {provided.placeholder}
            <ListForm />
            <div className='flex-shrink-0 w-1' />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  )
}
