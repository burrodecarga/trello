import { Board } from '@prisma/client'
import z, { TypeOf } from 'zod'
import { ActionState } from '@/lib/create-safe-actions'
import { DeleteBoard } from './schema'

export type InputType = z.infer<typeof DeleteBoard>
export type ReturnType = ActionState<InputType, Board>
