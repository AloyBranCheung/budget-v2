"use client";
import React, { useState } from "react";
// components
import SegmentedButton from "@/components/SegmentedButton";
import Input from "@/components/Input";
import Multiselect from "@/components/Multiselect";
import DatePicker from "@/components/DatePicker";

export default function AddExpenseForm() {
  return (
    <form className="flex flex-col gap-2">
      <SegmentedButton
        layoutGroupId="incomeExpenses"
        menuItems={[
          { id: "Income", value: "Income", label: "Income" },
          { id: "Expense", value: "Expense", label: "Expense" },
        ]}
      />
      <Input
        label="Amount"
        type="number"
        placeholder="$0.00"
        inputClassName="text-right"
        step={0.01}
      />
      <Multiselect
        label={"Categories"}
        name={"categories"}
        menuOptions={[
          ...new Array(5).fill(0).map((_, i) => {
            const test = `test${i}`;
            return {
              id: test,
              value: test,
              label: test,
            };
          }),
        ]}
      />
      <DatePicker label="Date" name="date" />
      <div>notes</div>
    </form>
  );
}
