import React from "react";
// auth
import getUser from "@/auth/get-user";
// actions
import getMostRecentPaycheck from "@/actions/most-recent-paycheck";
// utils
import IconHelper from "@/utils/IconHelper";
// actions
import expensesByCategory from "@/actions/expenses-by-category";
import getExpensesByTags from "@/actions/get-expenses-by-tag";
// components
import Page500 from "../error";
import Page403 from "../Page403";
import OverviewCard from "@/containers/home-page/OverviewCard";
import WelcomeText from "@/containers/home-page/WelcomeText";
import CategoryExpense from "@/containers/add-expense-page/CategoryExpense";
import TodaysExpenses from "@/containers/home-page/TodaysExpenses";
import IncomeVsExpenses from "@/containers/home-page/IncomeVsExpenses";
import ExpensesPerTag from "@/containers/home-page/ExpensesPerTag";

export default async function Home() {
  const user = await getUser();
  if (!user) return <Page403 />;

  const closeIconB64 = await new IconHelper("close-icon.png").getIcon64();
  const profileIconB64 = await new IconHelper("profile-icon.png").getIcon64();
  const upRightArrowIconB64 = await new IconHelper(
    "up-right-arrow-icon.png",
  ).getIcon64();
  const borderAllIconB64 = await new IconHelper("border-all.png").getIcon64();

  if (
    !profileIconB64 ||
    !closeIconB64 ||
    !upRightArrowIconB64 ||
    !borderAllIconB64
  )
    return <Page500 />;

  const { mostRecentPaycheck, totalRemaining } =
    await getMostRecentPaycheck(user);

  const pieChartData = await expensesByCategory();


  const expensesByTagsArr = await getExpensesByTags();

  return (
    <div className="flex flex-col gap-4">
      <WelcomeText profileIconB64={profileIconB64} name={user.dbUser.name} />
      <OverviewCard
        totalRemaining={totalRemaining}
        closeIconB64={closeIconB64}
        paycheckDate={mostRecentPaycheck?.date}
      />
      {mostRecentPaycheck && (
        <>
          <CategoryExpense
            pieChartData={pieChartData}
            upRightArrowIconB64={upRightArrowIconB64}
            paycheckDate={mostRecentPaycheck.date}
          />
          <TodaysExpenses icons={{ borderAllIconB64 }} />
          <IncomeVsExpenses
            icons={{ borderAllIconB64 }}
          />
          <ExpensesPerTag
            pieChartData={expensesByTagsArr}
            upRightArrowIconB64={upRightArrowIconB64}
            paycheckDate={mostRecentPaycheck.date}
            icons={{ borderAllIconB64 }}
          />
        </>
      )}
    </div>
  );
}
