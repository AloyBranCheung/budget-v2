"use client";
import React, { useState } from "react";
import SegmentedButton from "@/components/SegmentedButton";

export default function AddExpenseForm() {
  const [activeCategory, setActiveCategory] = useState<string>("");

  return (
    <div>
      <SegmentedButton
        onChange={(activeItem) => setActiveCategory(activeItem as string)}
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
