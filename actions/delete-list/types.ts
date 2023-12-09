import { List } from '@prisma/client'
import z, { TypeOf } from 'zod'
import { ActionState } from '@/lib/create-safe-actions'
import { DeleteList } from './schema'

export type InputType = z.infer<typeof DeleteList>
export type ReturnType = ActionState<InputType, List>
