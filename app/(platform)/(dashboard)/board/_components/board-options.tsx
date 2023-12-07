'use client'
import { deleteBoard } from '@/actions/delete-board/index'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverTrigger,
  PopoverClose,
  PopoverContent,
} from '@/components/ui/popover'
import { useAction } from '@/hooks/use-action'
import { MoreHorizontal, X } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

interface BoardOptiosProps {
  id: string
}
export const BoardOptions = ({ id }: BoardOptiosProps) => {
  const { execute, isLoading } = useAction(deleteBoard, {
    onError: (error) => {
      toast.error(error)
    },
  })

  const onDelete = () => {
    execute({ id })
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className='h-auto w-auto p-2' variant='transparent'>
          <MoreHorizontal className='w-4 h-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='pb-3 px-0 pt-3' side='bottom' align='start'>
        <div className='text-sm font-medium text-center text-neutral-600  pb-4'>
          Board Actios
        </div>
        <PopoverClose asChild>
          <Button
            variant='ghost'
            className='absolute top-2 right-2 text-neutral-600 h-auto w-auto p-2'
          >
            <X className='x-4 w-4' />
          </Button>
        </PopoverClose>
        <Button
          onClick={onDelete}
          disabled={isLoading}
          variant='ghost'
          className='rounded-none w-full h-auto p-2 px-5 justify-start text-sm  font-normal'
        >
          Delete this Board
        </Button>
      </PopoverContent>
    </Popover>
  )
}
