'use server'

import prisma from "@/libs/prisma"

interface GetTransactionsFilteredParams {
    toDate: string
    fromDate: string
}

const getTransactionsFiltered = async ({ toDate, fromDate }: GetTransactionsFilteredParams) => {
    console.log({ toDate, fromDate })
    try {
        const transactions = await prisma.transaction.findMany({
            include: {
                tags: {
                    include: {
                        image: {
                            select: {
                                name: true,
                            }
                        }
                    }
                }
            },
            where: {
                date: {
                    gte: fromDate,
                    lte: toDate,
                }
            },
            orderBy: {
                date: 'desc'
            }
        });
        return transactions
    } catch (error) {
        return { message: "Error fetching transactions.", isError: true, data: null }
    }
}

export default getTransactionsFiltered