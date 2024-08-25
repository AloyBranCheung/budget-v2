"use server";
import prisma from "@/libs/prisma";
import { TransactionType } from "@prisma/client";
import { GetUserType } from "@/types/user";

const getMostRecentPaycheck = async (user: GetUserType) => {
  if (!user) throw new Error("User not found.");

  const mostRecentPaycheck = await prisma.paycheck.findFirst({
    orderBy: {
      createdAt: "desc",
    },
    take: 1,
  });
  let transactions;

  if (mostRecentPaycheck) {
    transactions = await prisma.transaction.findMany({
      where: {
        userId: user.dbUser.id,
        paycheckId: mostRecentPaycheck.id,
      },
    });
  }

  const totalRemaining =
    mostRecentPaycheck &&
    transactions &&
    transactions.reduce((acc, curr) => {
      if (curr.type === TransactionType.Income) {
        return acc + curr.amount;
      } else {
        return acc - curr.amount;
      }
    }, mostRecentPaycheck.amount);

  return { mostRecentPaycheck, totalRemaining };
};
export default getMostRecentPaycheck;
