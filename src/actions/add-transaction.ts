'use server'
import prisma from '@/libs/prisma'
import { TransactionType } from '@prisma/client';
import { redirect } from 'next/navigation';
import dayjs from 'dayjs';
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";
// auth 
import getUser from "@/auth/get-user";
// utils
import formDataToObj from "@/utils/formdata-to-obj";
import joinZodErrmsg from "@/utils/join-zod-err-msg";
// validation
import { CreateTransactionSchema } from "@/validators/transaction";
// types
import { GenericFormState } from "@/types/formstate";

dayjs.extend(utc);
dayjs.extend(tz);

const addTransaction = async (_currState: GenericFormState | undefined, formData: FormData): Promise<GenericFormState | undefined> => {
    const data = formDataToObj(formData);

    // create array from formdata if it is just one key/value pair 
    if ('tags' in data) {
        if (!Array.isArray(data.tags)) {
            data.tags = [data.tags]
        }
    } else {
        return { status: 'error', message: null, error: "Tags must be in data." }
    }

    // turn string (which is a date string) into iso format 
    if ('date' in data && 'timezone' in data) {
        data.date = dayjs.tz(data.date, data.timezone).toISOString()
    }

    const validatedData = CreateTransactionSchema.safeParse(data)

    if (!validatedData.success) {
        return { status: 'error', message: null, error: joinZodErrmsg(validatedData.error) }
    }

    const user = await getUser();
    if (!user) {
        return { status: "error", message: null, error: "User not found." }
    }

    const mostRecentPaycheck = await prisma.paycheck.findFirst({
        orderBy: {
            createdAt: "desc",
        },
        where: {
            userId: user.dbUser.id,
        },
    });
    if (!mostRecentPaycheck) {
        return { status: "error", message: null, error: "No paycheck found." }
    }

    try {
        await prisma.transaction.create({
            data: {
                amount: validatedData.data.amount,
                date: validatedData.data.date,
                name: validatedData.data.name,
                type: validatedData.data.type as TransactionType,
                notes: validatedData.data.notes,
                userId: user.dbUser.id,
                categoryId: validatedData.data.category,
                tags: {
                    connect: validatedData.data.tags.map(tag => ({ id: tag }))
                },
                paycheckId: mostRecentPaycheck.id
            }
        })
    } catch (error) {
        console.error(error)
        return { status: "error", message: null, error: "Unknown error." }
    }

    redirect("/app")
}

export default addTransaction