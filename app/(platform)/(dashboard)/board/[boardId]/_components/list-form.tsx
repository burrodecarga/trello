'use client'

import { useState, useRef, ElementRef } from 'react'
import { Plus, X } from 'lucide-react'
import { ListWrapper } from './list-wrapper'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'
import { FormInput } from '@/components/form/form-input'
import { useParams, useRouter } from 'next/navigation'
import { PathParamsContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime'
import { FormSubmit } from '@/components/form/form-submit'
import { Button } from '@/components/ui/button'
import { useAction } from '@/hooks/use-action'
import { toast } from 'sonner'
import { createList } from '@/actions/create-list/index'


export const ListForm = () => {
  const router = useRouter()
  const params = useParams()
  const [isEditing, setIsEditing] = useState(false)
  const formRef = useRef<ElementRef<'form'>>(null)
  const inputRef = useRef<ElementRef<'input'>>(null)

  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
    })
  }

  const disabledEditing = () => {
    setIsEditing(false)
  }

  const { execute, fieldErrors } = useAction(createList, {
    onSuccess: (data) => {
      toast.success(`List '${data.title}' create`)
      disabledEditing()
      router.refresh()
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const onKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      disabledEditing()
    }
  }

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string
    const boardId = formData.get('boardId') as string
    execute({ title, boardId })
  }

  useEventListener('keydown', onKeydown)
  useOnClickOutside(formRef, disabledEditing)

  if (isEditing) {
    return (
      <form
        action={onSubmit}
        ref={formRef}
        className='w-full p-3 rounded-md bg-white space-y-4 shadow-md'
      >
        <FormInput
          errors={fieldErrors}
          ref={inputRef}
          id='title'
          className='h-7 text-sm px-2 py-1 border-transparent hover:border-input focus:border-input font-medium transition text-neutral-700'
          placeholder='Enter list title...'
        />
        <input hidden value={params.boardId} name='boardId' />
        <div className='flex items-center gap-x-1'>
          <FormSubmit>Add List</FormSubmit>
          <Button onClick={disabledEditing} size='sm' variant='destructive'>
            <X className='x-5 w-5' />
          </Button>
        </div>
      </form>
    )
  }

  return (
    <ListWrapper>
      <button
        className='w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm'
        onClick={enableEditing}
      >
        <Plus className='h-4 w-4 mr-2' />
        Add a List
      </button>
    </ListWrapper>
  )
}
