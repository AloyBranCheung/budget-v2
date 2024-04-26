'use server'
import getUser from "@/auth/get-user"
// prisma
import prisma from "@/libs/prisma"
// util
import formDataToObj from "@/utils/formdata-to-obj"
// types
import { GenericFormState } from "@/types/formstate"
// validation
import { CreateTagSchema } from "@/validators/tag"
// revalidate
import { revalidatePath } from "next/cache"
import joinZodErrmsg from "@/utils/join-zod-err-msg"

const addTag = async (_currState: GenericFormState, formData: FormData): Promise<GenericFormState> => {
    const data = formDataToObj(formData)

    const validatedSchema = CreateTagSchema.safeParse(data)
    if (!validatedSchema.success) {
        return { status: "error", message: "Error", error: joinZodErrmsg(validatedSchema.error) }
    }

    const user = await getUser()
    if (!user) {
        return { status: "error", message: "Error", error: "User not found" }
    }

    try {
        const newTag = await prisma.tag.create({ data: { ...validatedSchema.data, userId: user?.dbUser.id } })
        if (!newTag) {
            return { status: "error", message: "Error", error: "Error creating tag" }
        }
        revalidatePath('/app/add')
        return { status: "success", message: "Success", error: null }
    } catch (error) {
        if (error instanceof Error) {
            return { status: "error", message: "Error", error: error.message }
        } else {
            console.error(error)
            return { status: "error", message: "Oops, something went wrong", error: "Unknown error." }
        }
    }
}

export default addTag