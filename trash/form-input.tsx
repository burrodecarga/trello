import { Input } from '@/components/ui/input'
import { useFormStatus } from 'react-dom'

interface FormErrorProps {
  errors?: {
    title?: string[]
  }
}

function FormInput({ errors }: FormErrorProps) {
  const { pending } = useFormStatus()
  return (
    <div>
      <Input
        id='title'
        name='title'
        placeholder='Enter Board'
        // className='border-black border p-1 rounded'
        required
        disabled={pending}
      />
      {errors?.title ? (
        <div>
          {errors.title.map((error: string) => (
            <p key={error} className='text-rose-600 text-sm'>
              {error}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default FormInput
