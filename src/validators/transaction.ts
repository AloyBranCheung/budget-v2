import { z } from 'zod'
import { TransactionType } from '@prisma/client'

const transactionTypes: string[] = Object.values(TransactionType)
// @ts-expect-error - prisma enum is an object, can do object.values 
const TransactionTypeEnum = z.enum(transactionTypes)

export const CreateTransactionSchema = z.object({
    type: TransactionTypeEnum,
    name: z.string().min(1, "At least 1 character"),
    amount: z.coerce.number().min(0.01, "At least $0.01."),
    category: z.string().uuid(),
    tags: z.array(z.string().uuid()),
    date: z.string().datetime(),
    notes: z.string().nullable().optional(),
})

export const UpdateTransactionSchema = z.object({
    transactionId: z.string().uuid(),
    oldTagIdsArr: z.array(z.string().uuid()),
    type: TransactionTypeEnum,
    name: z.string().min(1, "At least 1 character"),
    amount: z.coerce.number().min(0.01, "At least $0.01."),
    categoryId: z.string().uuid(),
    date: z.string().datetime(),
    notes: z.string().nullable(),
    tags: z.array(z.string().uuid()),
})