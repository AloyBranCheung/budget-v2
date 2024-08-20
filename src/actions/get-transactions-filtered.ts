'use server'

import prisma from "@/libs/prisma"
import { Tag, TransactionType } from "@prisma/client"
import dayjs from "dayjs"

interface GetTransactionsFilteredParams {
    toDate: string
    fromDate: string
    transactionType: TransactionType
    tag: Tag['id']
}

const getTransactionsFiltered = async ({ toDate, fromDate, transactionType, tag }: GetTransactionsFilteredParams) => {
    try {
        const transactions = await prisma.transaction.findMany({
            include: {
                tags: {
                    include: {
                        image: true
                    }
                }
            },
            where: {
                date: {
                    gte: dayjs(fromDate).startOf('day').toISOString(),
                    lt: dayjs(toDate).startOf('day').add(1, 'day').toISOString(),
                },
                ...(transactionType && transactionType.length > 0 && { type: transactionType }),
                ...(tag && tag.length > 0 && {
                    tags: {
                        every: {
                            id: tag
                        }
                    }
                })
            },
            orderBy: {
                date: 'desc'
            }
        });

        // cannot send bytea over server action
        // https://stackoverflow.com/questions/77091418/warning-only-plain-objects-can-be-passed-to-client-components-from-server-compo
        return JSON.stringify(transactions)
    } catch (error) {
        // cannot send bytea over server action
        // https://stackoverflow.com/questions/77091418/warning-only-plain-objects-can-be-passed-to-client-components-from-server-compo
        return JSON.stringify({ message: "Error fetching transactions.", isError: true, data: null })
    }
}

export default getTransactionsFiltered