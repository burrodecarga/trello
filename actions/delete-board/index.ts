'use server'

import { createSafeAction } from '@/lib/create-safe-actions'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { DeleteBoard } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()
  if (!userId || !orgId) {
    return {
      error: 'Unathorized',
    }
  }
  const { id } = data
  let board

  try {
    board = await db.board.delete({
      where: {
        id,
        orgId,
      },
    })
  } catch (error) {
    return {
      error: 'failed to delete',
    }
  }
  revalidatePath(`/organization/${orgId}`)
  redirect(`/organization/${orgId}`)
}

export const deleteBoard = createSafeAction(DeleteBoard, handler)