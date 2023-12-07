'use server'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function deleteBoard(id: string) {
  await db.board.delete({
    where: {
      id,
    },
  })

  revalidatePath('/organization/org_2YE03LFNv7r5vDKbCAV2ru3Z81D')
  redirect('/organization/org_2YE03LFNv7r5vDKbCAV2ru3Z81D')
}
