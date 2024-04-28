"use server";
import prisma from "@/libs/prisma";
import getUser from "@/auth/get-user";
import { TransactionType } from "@prisma/client";
import { ExpensesByCategory } from "@/types/piechart-data";

const expensesByCategory = async () => {
    const user = await getUser();
    if (!user) return null;

    const mostRecentPaycheck = await prisma.paycheck.findFirst({
        orderBy: {
            createdAt: "desc",
        },
        take: 1,
    });
    if (!mostRecentPaycheck) return null;

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
            transactions: {
                where: {
                    paycheckId: mostRecentPaycheck.id
                }
            },
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

    const pieChartData: ExpensesByCategory[] = [];

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
            name: "Transactions Total",
            value: transactionsTotal < 0 ? 0 : transactionsTotal
        })
        chartData.push({
            name: `${categoryWithTransactions.name} Total Remaining`,
            value: categoryTotalRemaining > categoryStartingTotal ? categoryStartingTotal : categoryTotalRemaining,
        })
        // if transaction total < 0 then it is amount saved, if it is > 0 then it is amount spent (expenditure)
        pieChartData.push({ chartData, label: categoryWithTransactions.name, spent: transactionsTotal, startingTotal: categoryStartingTotal })
    }

    return pieChartData
};
export default expensesByCategory;
