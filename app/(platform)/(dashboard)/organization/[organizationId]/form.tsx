'use client'

import { createBoard } from '@/actions/create-board'
import { useAction } from '@/hooks/use-action'
import { useFormState } from 'react-dom'
import FormButton from './form-button'
import FormInput from './form-input'
createBoard

export const Form = () => {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log(data, 'SUCCES')
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string
    execute({ title })
  }
  return (
    <form action={onSubmit}>
      <FormInput errors={fieldErrors} />
      <div className='flex flex-col space-y-2'></div>
      <FormButton />
    </form>
  )
}
