import React from "react";
// components
import SegmentedButton from "@/components/SegmentedButton";

export default function AddIncomeExpensePage() {
  return (
    <div className="flex flex-col gap-2">
      <SegmentedButton
        layoutGroupId="incomeExpenses"
        menuItems={[
          { id: "Income", value: "Income", label: "Income" },
          { id: "Expense", value: "Expense", label: "Expense" },
        ]}
      />
      <div>name</div>
      <div>categories</div>
      <div>date</div>
      <div>notes</div>
    </div>
  );
}
