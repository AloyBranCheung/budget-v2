"use client";

import React from "react";
import { useRouter } from "next/navigation";
// utils
import appendUrlParams from "@/utils/append-url-params";
// types
import { ExpensesByCategory } from "@/types/piechart-data";
// components
import PieChartCard from "@/components/PieChartCard";
import PieChartCardsContainer from "@/components/PieChartCardsContainer";

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
        params: {
          fromDate: paycheckDate,
          categoryId,
        },
      }),
    );
  };

  return (
    <div>
      <h4>Expenses by Category</h4>
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
                  <p className="text-xs">
                    $
                    {spent < 0
                      ? (Math.abs(spent) + startingTotal).toFixed(2)
                      : Math.abs(spent).toFixed(2)}{" "}
                    / ${startingTotal.toFixed(2)}{" "}
                    <span className="font-medium">
                      {spent < 0 ? "saved" : "spent"}
                    </span>
                  </p>
                </PieChartCard>
              ),
            )}
      </PieChartCardsContainer>
    </div>
  );
}
