import { List } from '@prisma/client'
import z, { TypeOf } from 'zod'
import { ActionState } from '@/lib/create-safe-actions'
import { UpdateListOrder } from './schema'

export type InputType = z.infer<typeof UpdateListOrder>
export type ReturnType = ActionState<InputType, List[]>
