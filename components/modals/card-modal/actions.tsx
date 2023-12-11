'use client'

import { copyCard } from '@/actions/copy-card/index'
import { deleteCard } from '@/actions/delete-card/index'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useAction } from '@/hooks/use-action'
import { useCardModal } from '@/hooks/use-card-modal'
import { CardWithList } from '@/types'
import { Copy, Trash } from 'lucide-react'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'
import { CardModal } from './index'

interface ActionsProps {
  data: CardWithList
}
export default function Actions({ data }: ActionsProps) {
  const cardModal = useCardModal()
  const {
    execute: executeCopyCard,
    fieldErrors: errorCopy,
    isLoading: isLoadingCopy,
  } = useAction(copyCard, {
    onSuccess: (data) => {
      toast.success(`Card '${data?.title} copied'`)
      cardModal.onClose()
    },
    onError: (error) => {
      toast.error(error)
    },
  })
  const {
    execute: executeDeleteCard,
    fieldErrors: errorDelete,
    isLoading: isLoadingDelete,
  } = useAction(deleteCard, {
    onSuccess: (data) => {
      toast.success(`Card '${data?.title} deleted'`)
      cardModal.onClose()
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const params = useParams()

  const onCopy = () => {
    const boardId = params.boardId as string
    executeCopyCard({ id: data.id, boardId })
  }

  const onDelete = () => {
    const boardId = params.boardId as string
    executeDeleteCard({ id: data.id, boardId })
  }

  return (
    <div className='space-y-2 mt-2'>
      <p className='text-sm font-semibold'>Actions</p>
      <Button
        onClick={onCopy}
        disabled={isLoadingCopy}
        variant='gray'
        size='inline'
        className='w-full justify-start'
      >
        <Copy className='w-4 h-4 mr-2' />
        Copy
      </Button>
      <Button
        onClick={onDelete}
        disabled={isLoadingDelete}
        variant='gray'
        size='inline'
        className='w-full justify-start'
      >
        <Trash className='w-4 h-4 mr-2' />
        Delete
      </Button>
    </div>
  )
}

Actions.Skeleton = function ActionSkeleton() {
  return (
    <div className='space-y-2 my-2'>
      <Skeleton className='w-20 h-4 bg-neutral-200' />
      <Skeleton className='w-full h-8 bg-neutral-200' />
      <Skeleton className='w-full h-8 bg-neutral-200' />
    </div>
  )
}
