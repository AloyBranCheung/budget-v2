import React from "react";
import PieChartCard from "@/components/PieChartCard";
import { GetExpensesByTagsRes } from "@/actions/get-expenses-by-tag";
import PieChartCardsContainer from "@/components/PieChartCardsContainer";

interface ExpensesPerTagProps {
  upRightArrowIconB64: string;
  pieChartData: GetExpensesByTagsRes[];
}

export default function ExpensesPerTag({
  upRightArrowIconB64,
  pieChartData,
}: ExpensesPerTagProps) {
  const pieCharts = pieChartData.map(({ chartData, label, amountSpent }) => (
    <PieChartCard
      key={`${Math.random()}-${label}`}
      chartData={chartData}
      label={label}
      upRightArrowIconB64={upRightArrowIconB64}
    >
      <p>{`$${amountSpent.toFixed(2)} spent`}</p>
    </PieChartCard>
  ));

  return (
    <div>
      <h4>Expense Per Tag</h4>
      <PieChartCardsContainer>{pieCharts}</PieChartCardsContainer>
    </div>
  );
}
