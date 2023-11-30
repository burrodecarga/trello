import { Button } from '@/components/ui/button'
import { useFormStatus } from 'react-dom'

function FormButton() {
  const { pending } = useFormStatus()
  return (
    <Button type='submit' size='sm' className='ml-2' disabled={pending}>
      submit
    </Button>
  )
}

export default FormButton
