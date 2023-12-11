'use client'
import { updateCard } from '@/actions/update-card/index'
import { FormSubmit } from '@/components/form/form-submit'
import { FormTextarea } from '@/components/form/form-textarea'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useAction } from '@/hooks/use-action'
import { CardWithList } from '@/types'
import { useQueryClient } from '@tanstack/react-query'
import { AlignLeft, X } from 'lucide-react'
import { useParams } from 'next/navigation'

import React, { ElementRef, useRef, useState } from 'react'
import { toast } from 'sonner'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'

interface DescriptionProps {
  data: CardWithList
}

export default function Description({ data }: DescriptionProps) {
  const queryClient = useQueryClient()
  const params = useParams()
  const [isEditing, setIsEditing] = useState(false)
  const formRef = useRef<ElementRef<'form'>>(null)
  const textareaRef = useRef<ElementRef<'textarea'>>(null)

  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
      textareaRef.current?.focus()
    })
  }

  const disableEditing = () => {
    setIsEditing(false)
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      disableEditing()
    }
  }

  useEventListener('keydown', onKeyDown)
  useOnClickOutside(formRef, disableEditing)

  const { execute, fieldErrors } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['card', data.id],
      })
      queryClient.invalidateQueries({
        queryKey: ['card-logs', data.id],
      })
      toast.success(`Card "${data.title}" updated`)
      disableEditing()
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const onSubmit = (formData: FormData) => {
    const description = formData.get('description') as string
    console.log(description)
    const boardId = params.boardId as string

    execute({
      id: data.id,
      description,
      boardId,
    })
  }

  return (
    <div className='flex items-start gap-x-3 w-full'>
      <AlignLeft className='w-5 h-5 mt-0.5 text-neutral-700' />
      <div className='w-full'>
        <p className='font-semibold mb-2 text-neutral-700'>Description</p>
        {isEditing ? (
          <form action={onSubmit} ref={formRef} className='space-y-2'>
            <FormTextarea
              id='description'
              className='w-full mt-2'
              placeholder='Add a more detailed description'
              defaultValue={data.description || undefined}
              errors={fieldErrors}
              ref={textareaRef}
            />
            <div className='flex items-center gap-x-2'>
              <FormSubmit>Save</FormSubmit>
              <Button
                type='button'
                onClick={disableEditing}
                size='sm'
                variant={'destructive'}
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div
            role='button'
            onClick={enableEditing}
            className='min-h-[78px] bg-neutral-200 text-sm font-medium py-3 px-3.5 rounded-md'
          >
            {data.description || 'Add more detailed description....'}
          </div>
        )}
      </div>
    </div>
  )
}

Description.Skeleton = function DescriptionSkeleton() {
  return (
    <div className='flex items-start w-full gap-x-3'>
      <Skeleton className='h-6 w-6 bg-neutral-200' />
      <div className='w-full'>
        <Skeleton className='w-24 h-6 mb-2 bg-neutral-200' />
        <Skeleton className='w-full h-[78px] mb-2 bg-neutral-200' />
      </div>
    </div>
  )
}
