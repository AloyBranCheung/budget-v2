"use client";

import React from "react";
import { useRouter } from "next/navigation";
// utils
import TransactionParams from "@/utils/TransactionParams";
import appendUrlParams from "@/utils/append-url-params";
// types
import { GetExpensesByTagsRes } from "@/actions/get-expenses-by-tag";
// components
import PieChartCard from "@/components/PieChartCard";
import PieChartCardsContainer from "@/components/PieChartCardsContainer";

interface ExpensesPerTagProps {
  upRightArrowIconB64: string;
  pieChartData: GetExpensesByTagsRes[];
  paycheckDate: Date;
}

export default function ExpensesPerTag({
  upRightArrowIconB64,
  pieChartData,
  paycheckDate,
}: ExpensesPerTagProps) {
  const router = useRouter();

  const pieCharts = pieChartData.map(
    ({ chartData, label, amountSpent, tagId }) => (
      <PieChartCard
        key={`${Math.random()}-${label}`}
        chartData={chartData}
        label={label}
        upRightArrowIconB64={upRightArrowIconB64}
        onClickContainer={() =>
          router.push(
            appendUrlParams({
              baseUrl: "/app/transactions",
              params: new TransactionParams({
                fromDate: paycheckDate,
                tagId,
              }).getAll(),
            }),
          )
        }
      >
        <p>{`$${amountSpent.toFixed(2)} spent`}</p>
      </PieChartCard>
    ),
  );

  return (
    <div>
      <h4>Expense Per Tag</h4>
      <PieChartCardsContainer>{pieCharts}</PieChartCardsContainer>
    </div>
  );
}
