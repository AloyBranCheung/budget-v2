import React from "react";
import PieChartCard from "@/components/PieChartCard";

interface ExpensesPerTagProps {
  upRightArrowIconB64: string;
}

export default function ExpensesPerTag({
  upRightArrowIconB64,
}: ExpensesPerTagProps) {
  return (
    <div>
      <h4>Expense Per Tag</h4>
      <div className="w-40 h-40 bg-red">
        <PieChartCard
          chartData={[
            { name: "test", value: 10 },
            { name: "test2", value: 2 },
          ]}
          label="test"
          upRightArrowIconB64={upRightArrowIconB64}
        />
      </div>
    </div>
  );
}
