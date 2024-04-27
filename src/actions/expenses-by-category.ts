"use server";
import prisma from "@/libs/prisma";
import getUser from "@/auth/get-user";
import { TransactionType } from "@prisma/client";

const expensesByCategory = async () => {
    const user = await getUser();
    if (!user) return null;
    const userTransactionsByCategories = await prisma.category.findMany({
        where: {
            OR: [
                {
                    userId: null,
                },
                {
                    userId: user.dbUser.id,
                },
            ],
        },
        include: {
            transactions: true,
        }
    });
    if (!userTransactionsByCategories) return null;

    const userTransactions = await prisma.transaction.findMany({
        where: {
            userId: user.dbUser.id,
        },
    });
    if (!userTransactions) return null;

    const userCurrentPaycheck = await prisma.paycheck.findFirst({
        where: {
            userId: user.dbUser.id,
        },
        orderBy: {
            createdAt: "desc",
        },
        take: 1,
    });
    if (!userCurrentPaycheck) return null

    const pieChartData: { name: string; value: number }[][] = [];

    for (const categoryWithTransactions of userTransactionsByCategories) {
        const chartData: { name: string; value: number }[] = []
        let transactionsTotal = 0;
        for (const transaction of categoryWithTransactions.transactions) {
            if (transaction.type === TransactionType.Expense) {
                transactionsTotal += transaction.amount
            } else {
                transactionsTotal -= transaction.amount
            }
        }
        const categoryStartingTotal = (userCurrentPaycheck.amount * categoryWithTransactions.percentageSplit.toNumber())

        const categoryTotalRemaining = categoryStartingTotal - transactionsTotal

        chartData.push({
            name: `${categoryWithTransactions.name} Total Remaining`,
            value: categoryTotalRemaining > categoryStartingTotal ? categoryStartingTotal : categoryTotalRemaining,
        })
        chartData.push({
            name: "Transactions Total",
            value: transactionsTotal < 0 ? 0 : transactionsTotal
        })
        pieChartData.push(chartData)
    }

    return pieChartData
};
export default expensesByCategory;
