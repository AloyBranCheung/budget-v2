import { z } from 'zod'


export const CreatePaycheckSchema = z.object({
    amount: z.coerce.number().positive(),
})