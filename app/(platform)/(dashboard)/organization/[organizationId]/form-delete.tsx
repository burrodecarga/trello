'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import { useFormStatus } from 'react-dom'

function FormDelete() {
  const { pending } = useFormStatus()
  return (
    <Button
      variant='destructive'
      type='submit'
      size='sm'
      className='ml-2'
      disabled={pending}
    >
      delete
    </Button>
  )
}

export default FormDelete
