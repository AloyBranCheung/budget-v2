'use server'
import getUser from "@/auth/get-user"
import prisma from "@/libs/prisma"
// types
import { GenericFormState } from "@/types/formstate"
// utils
import formDataToObj from "@/utils/formdata-to-obj"
import zodFormErrorObj from "@/utils/zod-validation-error"
// validators
import { CreatePaycheckSchema } from "@/validators/paycheck"
import { revalidatePath } from "next/cache"

const addPaycheck = async (currState: GenericFormState | undefined, formData: FormData): Promise<GenericFormState | undefined> => {
    const data = formDataToObj(formData)

    const validatedData = CreatePaycheckSchema.safeParse(data)

    if (!validatedData.success) {
        return zodFormErrorObj(validatedData)
    }

    const user = await getUser()
    if (!user) return { status: "error", message: null, error: "User not found" }

    try {
        await prisma.paycheck.create({
            data: {
                amount: validatedData.data.amount,
                userId: user.dbUser.id
            }
        })

    } catch (error) {
        return { status: "error", message: null, error: "error adding paycheck" }

    }

    revalidatePath('/app')
    revalidatePath('/app/add')

    return { status: "success", message: "Paycheck added successfully", error: null }
}

export default addPaycheck