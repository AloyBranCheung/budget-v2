"use client";
import React from "react";
// components
import Card from "@/components/Card";

interface CategoryExpenseProps {}

export default function CategoryExpense({}: CategoryExpenseProps) {
  return (
    <div>
      <h4>Expenses by Category</h4>
      <div className="flex items-start space-between gap-4 p-2 max-w-full overflow-x-auto">
        <Card className="min-w-40 max-w-40 min-h-40 max-h-40 flex flex-col">
          <div className="flex">
            <div>piechart here</div>
            <div>icon</div>
          </div>
          <div>
            <div className="text-body2">label here</div>
            <div className="text-body2">$number spent</div>
          </div>
        </Card>
      </div>
    </div>
  );
}
