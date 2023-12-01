'use client'

import { cn } from '@/lib/utils'
import { useFormStatus } from 'react-dom'
import { Button } from '../ui/button'

interface FormSubmitProps {
  children: React.ReactNode
  disabled?: boolean
  className?: string
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'ghost'
    | 'secondary'
    | 'link'
    | 'primary'
}

export const FormSubmit = ({
  children,
  disabled,
  className,
  variant,
}: FormSubmitProps) => {
  const { pending } = useFormStatus()

  return (
    <Button
      disabled={pending || disabled}
      size='sm'
      className={cn(className)}
      type='submit'
      variant={variant}
    >
      {children}
    </Button>
  )
}
