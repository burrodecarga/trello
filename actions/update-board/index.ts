'use server'

import { createSafeAction } from '@/lib/create-safe-actions'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { UpdateBoard } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()
  if (!userId || !orgId) {
    return {
      error: 'Unathorized',
    }
  }
  const { title, id } = data
  let board

  try {
    board = await db.board.update({
      where: {
        id,
        orgId,
      },
      data: { title },
    })
  } catch (error) {
    return {
      error: 'failed to update',
    }
  }
  revalidatePath(`/board/${orgId}`)
  redirect(`/organization/${orgId}`)
}

export const updateBoard = createSafeAction(UpdateBoard, handler)
