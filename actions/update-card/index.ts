'use server'

import { createSafeAction } from '@/lib/create-safe-actions'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { values } from 'lodash'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { UpdateCard } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()
  if (!userId || !orgId) {
    return {
      error: 'Unathorized',
    }
  }
  const { id, boardId, ...values } = data
  let card

  try {
    card = await db.card.update({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
      data: { ...values },
    })
  } catch (error) {
    return {
      error: 'failed to update',
    }
  }
  revalidatePath(`/board/${boardId}`)
  return { data: card }
}

export const updateCard = createSafeAction(UpdateCard, handler)
