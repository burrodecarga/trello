'use client'

import { createBoard } from '@/actions/create-board'
import { useAction } from '@/hooks/use-action'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import React, { ElementRef, useRef } from 'react'
import { FormInput } from './form-input'
import { FormSubmit } from './form-submit'
import { PopoverClose } from '@radix-ui/react-popover'
import { Button } from '../ui/button'
import { X } from 'lucide-react'
import { toast } from 'sonner'
import { FormPiker } from './form-picker'
import { useRouter } from '@/node_modules/next/navigation'
import { useProdModal } from '@/hooks/use-pro-modal'

interface FormPopoverProps {
  children: React.ReactNode
  side?: 'left' | 'right' | 'top' | 'bottom'
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
}

export const FormPopover = ({
  children,
  side = 'bottom',
  align,
  sideOffset = 0,
}: FormPopoverProps) => {
  const proModal = useProdModal()
  const router = useRouter()
  const closeRef = useRef<ElementRef<'button'>>(null)
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      //console.log({ data })
      toast.success('Board Created!')
      closeRef.current?.click()
      router.push(`/board/${data.id}`)
    },
    onError: (error) => {
      toast.error(error)
      proModal.onOpen()
    },
  })

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string
    const image = formData.get('image') as string
    //console.log(image, title)
    execute({ title, image })
  }
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        side={side}
        align={align}
        sideOffset={sideOffset}
        className='w-80 pt-3'
      >
        <div className='text-sm text-center font-medium text-neutral-600 pb-4'>
          Create Board
        </div>
        <PopoverClose asChild>
          <Button
            className='absolute h-auto w-auto p-2 top-2 right-2 text-neutral-600'
            variant='ghost'
            ref={closeRef}
          >
            <X className='h-4 w-4' />
          </Button>
        </PopoverClose>
        <form action={onSubmit} className='space-y-4'>
          <div className='space-y-4'>
            <FormPiker id='image' errors={fieldErrors} />
            <FormInput
              id='title'
              label='Board Title'
              type='text'
              errors={fieldErrors}
            />
          </div>
          <FormSubmit className='w-full'>Create</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  )
}
