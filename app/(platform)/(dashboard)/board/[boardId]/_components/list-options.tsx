import { copyList } from '@/actions/copy-list/index'
import { deleteList } from '@/actions/delete-list/index'
import { FormSubmit } from '@/components/form/form-submit'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { useAction } from '@/hooks/use-action'
import { List } from '@prisma/client'
import { MoreHorizontal, X } from 'lucide-react'
import { ElementRef, useRef } from 'react'
import { toast } from 'sonner'

interface ListOptionsProps {
  data: List
  onAddCard: () => void
}
const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
  const closeRef = useRef<ElementRef<'button'>>(null)
  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" deleted`)
      closeRef.current?.click()
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const { execute: executeCopy } = useAction(copyList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" copied`)
      closeRef.current?.click()
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const onCopy = (formData: FormData) => {
    const id = formData.get('id') as string
    const boardId = formData.get('boardId') as string
    executeCopy({ id, boardId })
    closeRef.current?.click()
  }

  const onDelete = (formData: FormData) => {
    const id = formData.get('id') as string
    const boardId = formData.get('boardId') as string
    executeDelete({ id, boardId })
    closeRef.current?.click()
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className='h-auto w-auto p-2' variant='ghost'>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='px-0 pb-3 pt-3' side='bottom' align='start'>
        <div className='text-sm text-medium text-center text-neutral-600 pb-4'>
          List Action
        </div>
        <PopoverClose asChild ref={closeRef}>
          <Button
            className='h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600'
            variant='outline'
          >
            <X className='h-4 w-4' />
          </Button>
        </PopoverClose>
        <Button
          onClick={onAddCard}
          className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
          variant='outline'
        >
          Add Card
        </Button>
        <form action={onCopy}>
          <input name='id' value={data.id} id='id' hidden />
          <input name='boardId' value={data.boardId} id='boardId' hidden />
          <FormSubmit
            className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
            variant='outline'
          >
            Copy List...
          </FormSubmit>
        </form>
        <Separator />
        <form action={onDelete}>
          <input name='id' value={data.id} id='id' hidden />
          <input name='boardId' value={data.boardId} id='boardId' hidden />
          <FormSubmit
            className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
            variant='outline'
          >
            Delete this List...
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  )
}

export default ListOptions
