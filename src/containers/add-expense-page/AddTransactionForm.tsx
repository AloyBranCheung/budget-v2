"use client";
import React, { useState } from "react";
import SegmentedButton from "@/components/SegmentedButton";
import Input from "@/components/Input";
import Multiselect from "@/components/Multiselect";

export default function AddExpenseForm() {
  const [activeCategory, setActiveCategory] = useState<string>("");

  return (
    <form className="flex flex-col gap-2">
      <SegmentedButton
        onChange={(activeItem) => setActiveCategory(activeItem as string)}
        layoutGroupId="incomeExpenses"
        menuItems={[
          { id: "Income", value: "Income", label: "Income" },
          { id: "Expense", value: "Expense", label: "Expense" },
        ]}
      />
      <Input label="Amount" type="number" />
      <Multiselect />
      <div>date</div>
      <div>notes</div>
    </form>
  );
}
