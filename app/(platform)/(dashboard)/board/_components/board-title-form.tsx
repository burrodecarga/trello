'use client'

import { updateBoard } from '@/actions/update-board/index'
import { FormInput } from '@/components/form/form-input'
import { Button } from '@/components/ui/button'
import { useAction } from '@/hooks/use-action'
import { Board } from '@prisma/client'
import { ElementRef, useRef, useState } from 'react'
import { toast, Toaster } from 'sonner'
import { setTimeout } from 'timers'

interface BoardTitleForm {
  data: Board
}
export const BoardTitleForm = ({ data }: BoardTitleForm) => {
  const { execute } = useAction(updateBoard, {
    onSuccess: (data) => {
      toast.success(`Board "${data.title}" updated!`)
      setTitle(data.title)
      disabledEditing()
    },
    onError: (error) => {
      toast.error(error)
    },
  })
  const formRef = useRef<ElementRef<'form'>>(null)
  const inputRef = useRef<ElementRef<'input'>>(null)
  const [isEditing, setIsEditing] = useState(false)

  const [title, setTitle] = useState(data.title)
  const enabledEditing = () => {
    //TODO:Focus Input
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.select()
    }, 20)
  }
  const disabledEditing = () => {
    setIsEditing(false)
  }

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string
    //console.log('BDC MACOY', title)
    execute({
      title,
      id: data.id,
    })
  }

  const onBlur = () => {
    formRef.current?.requestSubmit()
  }

  if (isEditing) {
    return (
      <form
        action={onSubmit}
        ref={formRef}
        className='flex items-center gap-x-2'
      >
        <FormInput
          ref={inputRef}
          id='title'
          onBlur={onBlur}
          defaultValue={title}
          className='text-lg font-bold px-[7px] py-1 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none h-7'
        />
      </form>
    )
  }
  return (
    <Button
      onClick={enabledEditing}
      variant='transparent'
      className='font-bold h-auto w-auto text-lg p-1 px-2'
    >
      {title}
    </Button>
  )
}
