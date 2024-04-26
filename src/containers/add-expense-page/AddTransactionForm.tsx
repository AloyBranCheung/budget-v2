"use client";
import React from "react";
import { useFormState } from "react-dom";
import { Prisma, TransactionType } from "@prisma/client";
// action
import addTransaction from "@/actions/addTransaction";
// components
import SegmentedButton from "@/components/SegmentedButton";
import Input from "@/components/Input";
import Multiselect from "@/components/Multiselect";
import DatePicker from "@/components/DatePicker";
import TextArea from "@/components/TextArea";
import Button from "@/components/Button";

interface AddTransactionFormProps {
  categories: Prisma.CategoryGetPayload<{}>[];
  userTags: Prisma.TagGetPayload<{}>[];
}

export default function AddTransactionForm({
  categories,
  userTags,
}: AddTransactionFormProps) {
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
        menuOptions={categories.map((category) => ({
          id: category.id,
          label: category.name,
          value: category.id,
        }))}
      />
      <Multiselect
        label="Tags"
        name="tags"
        menuOptions={userTags.map((tag) => ({
          id: tag.id,
          label: tag.name,
          value: tag.id,
        }))}
      />
      <DatePicker label="Date" name="date" />
      <TextArea label="Notes" name="notes" required={false} />
      <Button type="submit" className="mt-4 bg-tertiary">
        Save
      </Button>
    </form>
  );
}
