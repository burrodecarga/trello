'use client'

import { createBoard } from '@/actions/create-board'
import { FormInput } from '@/components/form/form-input'
import { FormSubmit } from '@/components/form/form-submit'
import { useAction } from '@/hooks/use-action'

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
      <FormInput label='Board Title' id='title' errors={fieldErrors} />
      <div className='flex flex-col space-y-2'></div>
      <FormSubmit>save</FormSubmit>
    </form>
  )
}
