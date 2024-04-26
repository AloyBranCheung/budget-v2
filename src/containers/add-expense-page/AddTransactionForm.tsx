"use client";
import React from "react";
import { useFormState } from "react-dom";
import { TransactionType } from "@prisma/client";
// action
import addTransaction from "@/actions/addTransaction";
// components
import SegmentedButton from "@/components/SegmentedButton";
import Input from "@/components/Input";
import Multiselect from "@/components/Multiselect";
import DatePicker from "@/components/DatePicker";
import TextArea from "@/components/TextArea";
import Button from "@/components/Button";

export default function AddExpenseForm() {
  const [state, formAction] = useFormState(addTransaction, null);

  return (
    <form className="flex flex-col gap-2" action={formAction}>
      <SegmentedButton
        name="type"
        layoutGroupId="incomeExpenses"
        menuItems={[
          {
            id: TransactionType.Income,
            value: TransactionType.Income,
            label: TransactionType.Income,
          },
          {
            id: TransactionType.Expense,
            value: TransactionType.Expense,
            label: TransactionType.Expense,
          },
        ]}
      />
      <Input
        name="amount"
        label="Amount"
        type="number"
        placeholder="$0.00"
        inputClassName="text-right"
        step={0.01}
      />
      <Multiselect
        label="Categories"
        name="categories"
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
      <Multiselect
        label="Tags"
        name="tags"
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
      <TextArea label="Notes" name="notes" required={false} />
      <Button type="submit" className="mt-4 bg-tertiary">
        Save
      </Button>
    </form>
  );
}
