import { Card } from '@prisma/client'
import { ActionState } from '@/lib/create-safe-actions'
import { CopyCard } from './schema'
import z from 'zod'

export type InputType = z.infer<typeof CopyCard>
export type ReturnType = ActionState<InputType, Card>
