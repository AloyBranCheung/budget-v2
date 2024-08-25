'use server'

import prisma from "@/libs/prisma"
import getUser from "@/auth/get-user"
import dayjs from "dayjs";

export interface ChartData { name: string; expense: number | null; income: number | null }

const getIncomeVExpense = async (): Promise<ChartData[]> => {
    const user = await getUser();
    if (!user) { throw new Error("User not found.") }

    try {
        const transactionsThisYear = await prisma.transaction.findMany({
            where: {
                userId: user.dbUser.id,
                date: {
                    gte: new Date(new Date().getFullYear(), 0, 1),
                    lt: new Date(new Date().getFullYear() + 1, 0, 1),
                },
            },
            orderBy: {
                date: 'desc'
            }
        });

        const monthsHash: { [key: number]: { expense: number; income: number } } = {}
        for (let i = 0; i < 12; i++) {
            if (!(i in monthsHash)) {
                monthsHash[i] = { expense: 0, income: 0 }
            }
        }

        for (const transaction of transactionsThisYear) {
            const transactionMonth = transaction.date.getMonth()
            if (transactionMonth in monthsHash) {
                if (transaction.type === 'Expense') {
                    monthsHash[transactionMonth].expense -= transaction.amount
                } else {
                    monthsHash[transactionMonth].income += transaction.amount
                }
            }
        }

        const chartData: ChartData[] = []
        for (let i = 0; i < 12; i++) {
            if (i in monthsHash) {
                const data = monthsHash[i]
                chartData.push({
                    name: dayjs().month(i).format('MMM'),
                    income: data.income === 0 ? null : data.income,
                    expense: data.expense === 0 ? null : data.expense,
                })
            }
        }

        return chartData
    } catch (error) {
        console.error(error)
        throw new Error("Something went wrong.");
    }


}

export default getIncomeVExpense