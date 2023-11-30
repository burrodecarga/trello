'use server'

import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

export type State = {
  errors?: {
    title?: string[]
  }
  message?: string | null
}

const CreateBoard = z.object({
  title: z.string().min(3, 'Minimum length o 3 letters is required'),
})
export async function create(prevState: State, formData: FormData) {
  const validateFields = CreateBoard.safeParse({ title: formData.get('title') })

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: 'Missing Field',
    }
  }

  const { title } = validateFields.data

  try {
    await db.board.create({
      data: {
        title,
      },
    })
  } catch (error) {
    return {
      message: 'Database Error',
    }
  }

  revalidatePath('/organization/org_2YE03LFNv7r5vDKbCAV2ru3Z81D')
  redirect('/organization/org_2YE03LFNv7r5vDKbCAV2ru3Z81D')
}
