"use client";

import React from "react";
import { useRouter } from "next/navigation";
// utils
import appendUrlParams from "@/utils/append-url-params";
import TransactionParams from "@/utils/TransactionParams";
// types
import { ExpensesByCategory } from "@/types/piechart-data";
// components
import PieChartCard from "@/components/PieChartCard";
import PieChartCardsContainer from "@/components/PieChartCardsContainer";
import SpentOrSaved from "@/components/SpentOrSaved";

interface CategoryExpenseProps {
  pieChartData: ExpensesByCategory[] | null;
  upRightArrowIconB64: string;
  paycheckDate: Date | undefined;
}

export default function CategoryExpense({
  pieChartData,
  upRightArrowIconB64,
  paycheckDate,
}: CategoryExpenseProps) {
  const router = useRouter();

  const handleClickCard = (categoryId: string) => {
    router.push(
      appendUrlParams({
        baseUrl: "/app/transactions",
        params: new TransactionParams({
          fromDate: paycheckDate,
          categoryId,
        }).getAll(),
      }),
    );
  };

  return (
    <div>
      <h4>Paycheck Budget</h4>
      <PieChartCardsContainer>
        {pieChartData &&
          pieChartData
            .sort((a) => {
              if (a.label === "Needs") {
                return -1;
              }
              if (a.label === "Wants") {
                return 0;
              }
              if (a.label === "Savings") {
                return 1;
              }
              return 0;
            })
            .map(
              ({ chartData, label, spent, startingTotal, categoryId }, i) => (
                <PieChartCard
                  key={`${Math.random()}-${i}`}
                  chartData={chartData}
                  label={label}
                  upRightArrowIconB64={upRightArrowIconB64}
                  onClickContainer={() => handleClickCard(categoryId)}
                >
                  <SpentOrSaved startingTotal={startingTotal} spent={spent} />
                </PieChartCard>
              ),
            )}
      </PieChartCardsContainer>
    </div>
  );
}
