import React from "react";
// components
import AddTransactionForm from "@/containers/add-expense-page/AddTransactionForm";

export default function AddIncomeExpensePage() {
  return (
    <div className="flex flex-col gap-2">
      <AddTransactionForm />
    </div>
  );
}
