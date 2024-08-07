import React from "react";
import prisma from "@/libs/prisma";
import { TransactionType } from "@prisma/client";
// auth
import getUser from "@/auth/get-user";
// utils
import IconHelper from "@/utils/IconHelper";
// actions
import expensesByCategory from "@/actions/expenses-by-category";
// components
import Page500 from "../error";
import Page403 from "../Page403";
import OverviewCard from "@/containers/home-page/OverviewCard";
import WelcomeText from "@/containers/home-page/WelcomeText";
import CategoryExpense from "@/containers/add-expense-page/CategoryExpense";

export default async function Home() {
  const user = await getUser();
  if (!user) return <Page403 />;

  const closeIconB64 = await new IconHelper("close-icon.png").getIcon64();
  const profileIconB64 = await new IconHelper("profile-icon.png").getIcon64();
  const upRightArrowIconB64 = await new IconHelper(
    "up-right-arrow-icon.png"
  ).getIcon64();
  if (!profileIconB64 || !closeIconB64 || !upRightArrowIconB64)
    return <Page500 />;

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

  const pieChartData = await expensesByCategory();

  return (
    <div className="flex flex-col gap-4">
      <WelcomeText profileIconB64={profileIconB64} name={user.dbUser.name} />
      <OverviewCard
        totalRemaining={totalRemaining}
        closeIconB64={closeIconB64}
        paycheckDate={mostRecentPaycheck?.createdAt}
      />
      {mostRecentPaycheck && (
        <CategoryExpense
          pieChartData={pieChartData}
          upRightArrowIconB64={upRightArrowIconB64}
        />
      )}
    </div>
  );
}
