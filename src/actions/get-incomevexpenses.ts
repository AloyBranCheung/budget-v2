"use server";

import prisma from "@/libs/prisma";
import getUser from "@/auth/get-user";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import tz from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(tz)

export interface ChartData {
  name: string;
  expense: number | null;
  income: number | null;
}

const getIncomeVExpense = async (date: string, timezone: string): Promise<ChartData[]> => {
  const user = await getUser();
  if (!user) {
    throw new Error("User not found.");
  }

  try {
    const thisYearFilter = {
      gte: dayjs(date).startOf('year').toISOString(),
      lt: dayjs(date).startOf('year').add(1, 'year').toISOString(),
    }

    const paychecksThisYear = await prisma.paycheck.findMany({
      where: {
        userId: user.dbUser.id,
        date: thisYearFilter,
      },
      orderBy: {
        date: "desc",
      },
    });

    const transactionsThisYear = await prisma.transaction.findMany({
      where: {
        userId: user.dbUser.id,
        date: thisYearFilter,
      },
      orderBy: {
        date: "desc",
      },
    });

    const monthsHash: { [key: number]: { expense: number; income: number } } =
      {};
    for (let i = 0; i < 12; i++) {
      if (!(i in monthsHash)) {
        monthsHash[i] = { expense: 0, income: 0 };
      }
    }

    for (const paycheck of paychecksThisYear) {
      const paycheckMonth = dayjs.tz(paycheck.date, timezone).month()
      if (paycheckMonth in monthsHash) {
        monthsHash[paycheckMonth].income += paycheck.amount;
      }
    }

    for (const transaction of transactionsThisYear) {
      const transactionMonth = dayjs.tz(transaction.date, timezone).month()
      if (transactionMonth in monthsHash) {
        if (transaction.type === "Expense") {
          monthsHash[transactionMonth].expense -= transaction.amount;
        } else {
          monthsHash[transactionMonth].income += transaction.amount;
        }
      }
    }

    const chartData: ChartData[] = [];
    for (let i = 0; i < 12; i++) {
      if (i in monthsHash) {
        const data = monthsHash[i];
        chartData.push({
          name: dayjs().month(i).format("MMM"),
          income: data.income === 0 ? null : data.income,
          expense: data.expense === 0 ? null : data.expense,
        });
      }
    }

    return chartData;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong.");
  }
};

export default getIncomeVExpense;
