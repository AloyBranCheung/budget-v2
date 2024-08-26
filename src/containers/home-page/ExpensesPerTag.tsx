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
import H4WithH6Icon from "@/components/H4WithH6Icon";

interface ExpensesPerTagProps {
  upRightArrowIconB64: string;
  pieChartData: GetExpensesByTagsRes[];
  paycheckDate: Date;
  icons: { borderAllIconB64: string };
}

export default function ExpensesPerTag({
  upRightArrowIconB64,
  pieChartData,
  paycheckDate,
  icons: { borderAllIconB64 },
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
      <H4WithH6Icon
        h4Text="Paycheck Breakdown"
        h6Text="All Transactions"
        onClick={() => router.push("/app/transactions")}
        iconAltText="all-transactions-icon.png"
        icon={borderAllIconB64}
      />
      <PieChartCardsContainer>{pieCharts}</PieChartCardsContainer>
    </div>
  );
}
