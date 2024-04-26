import { z } from "zod"

export const CreateTagSchema = z.object({
    name: z.string().min(1, { message: "Must contain at least 1 character" }),
    description: z.string().min(1, { message: "Must contain at least 1 character" })

})