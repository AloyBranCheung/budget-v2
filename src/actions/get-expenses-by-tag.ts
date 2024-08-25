"use server";

import getUser from "@/auth/get-user";
import prisma from "@/libs/prisma";
import { PieChartData } from "@/types/piechart-data";

export interface GetExpensesByTagsRes {
  chartData: PieChartData;
  label: string;
  amountSpent: number;
}

const getExpensesByTags = async (): Promise<GetExpensesByTagsRes[]> => {
  const user = await getUser();
  if (!user) {
    throw new Error("User not found");
  }

  const paycheck = await prisma.paycheck.findFirst({
    where: {
      userId: user.dbUser.id,
    },
    orderBy: {
      date: "desc",
    },
  });
  if (!paycheck) return [];

  const tags = await prisma.tag.findMany({
    where: {
      OR: [
        {
          userId: user.dbUser.id,
        },
        {
          userId: null,
        },
      ],
    },
  });

  const expenses = await prisma.transaction.findMany({
    where: {
      userId: user.dbUser.id,
      paycheckId: paycheck?.id,
      type: "Expense",
    },
    orderBy: {
      date: "desc",
    },
    include: {
      tags: true,
    },
  });

  const tagsHash: { [tagName: string]: number } = {};
  let totalSpent = 0;
  for (const tag of tags) {
    if (!(tag.name in tagsHash)) {
      tagsHash[tag.name] = 0;
    }
  }
  for (const expense of expenses) {
    for (const tag of expense.tags) {
      if (tag.name in tagsHash) {
        tagsHash[tag.name] += expense.amount;
        totalSpent += expense.amount;
      }
    }
  }

  const expensesByTagsChartData = Object.entries(tagsHash).map(
    ([name, amount]) => ({
      chartData: [
        {
          name,
          value: amount,
        },
        { name: "Total", value: totalSpent },
      ],
      label: name,
      amountSpent: amount,
    }),
  );

  return expensesByTagsChartData.sort((a, b) => {
    if (a.amountSpent > b.amountSpent) return -1;
    if (a.amountSpent < b.amountSpent) return 1;
    return 0;
  });
};

export default getExpensesByTags;
