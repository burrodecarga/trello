'use server'

import { createSafeAction } from '@/lib/create-safe-actions'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { UpdateListOrder } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()
  if (!userId || !orgId) {
    return {
      error: 'Unathorized',
    }
  }
  const { items, boardId } = data
  let list

  try {
    const transaction = items.map((list) =>
      db.list.update({
        where: {
          id: list.id,
          board: {
            orgId,
          },
        },
        data: { order: list.order },
      }),
    )

    list = await db.$transaction(transaction)
  } catch (error) {
    return {
      error: 'failed to reorder',
    }
  }
  revalidatePath(`/board/${boardId}`)
  return { data: list }
}

export const updateListOrder = createSafeAction(UpdateListOrder, handler)
