import { List } from '@prisma/client'
import z, { TypeOf } from 'zod'
import { ActionState } from '@/lib/create-safe-actions'
import { UpdateList } from './schema'

export type InputType = z.infer<typeof UpdateList>
export type ReturnType = ActionState<InputType, List>
