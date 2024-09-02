"use client";
import React, { useState } from "react";
import { useFormState } from "react-dom";
import { Prisma, TransactionType } from "@prisma/client";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
// types
import { GenericFormState, defaultGenericFormState } from "@/types/formstate";
// action
import addTransaction from "@/actions/add-transaction";
// components
import SegmentedButton from "@/components/SegmentedButton";
import Input from "@/components/Input";
import Multiselect from "@/components/Multiselect";
import DatePicker from "@/components/DatePicker";
import TextArea from "@/components/TextArea";
import Button from "@/components/Button";
import SingleSelect from "@/components/SingleSelect";
import BaseIconButton from "@/components/BaseIconButton";
import AddTagModal from "./AddTagModal";

interface AddTransactionFormProps {
  JSONcategories: string; // Prisma.CategoryGetPayload<object>[];
  userTags: Prisma.TagGetPayload<object>[];
  addIcon: string;
  closeIcon: string;
}

export default function AddTransactionForm({
  JSONcategories,
  userTags,
  addIcon,
  closeIcon,
}: AddTransactionFormProps) {
  const [state, formAction] = useFormState<
    GenericFormState | undefined,
    FormData
  >(addTransaction, defaultGenericFormState);

  const [isOpen, setIsOpen] = useState(false);
  const [currType, setCurrType] = useState<string | null>(null);

  const handleTypeChange = (value: string | number) => {
    setCurrType(value as string);
  };

  return (
    <AnimatePresence>
      <form key="form" className="flex flex-col gap-4" action={formAction}>
        <SegmentedButton
          key="type-seg-button"
          onValueChange={handleTypeChange}
          name="type"
          layoutGroupId="incomeExpenses"
          defaultValue={TransactionType.Expense}
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
          key="name"
          name="name"
          label="Name"
          placeholder="Name of transaction"
        />
        <Input
          key="amount"
          name="amount"
          label="Amount"
          type="number"
          placeholder="$0.00"
          inputClassName="text-right"
          step={0.01}
        />
        <SingleSelect
          key="category"
          label="Category"
          name="category"
          menuOptions={JSON.parse(JSONcategories).map(
            (category: Prisma.CategoryGetPayload<object>) => ({
              id: category.id,
              label: category.name,
              value: category.id,
            }),
          )}
        />
        <Multiselect
          key="tags"
          label="Tags"
          name="tags"
          menuOptions={userTags
            .filter((tag) => {
              if (currType === TransactionType.Income) {
                return tag.type === TransactionType.Income;
              } else {
                return tag.type === TransactionType.Expense;
              }
            })
            .map((tag) => ({
              id: tag.id,
              label: tag.name,
              value: tag.id,
            }))}
          icon={
            <BaseIconButton onClick={() => setIsOpen(true)}>
              <Image src={addIcon} alt="add-tag-icon" width={20} height={20} />
            </BaseIconButton>
          }
        />
        <DatePicker key="date" label="Date" name="date" isDateTime />
        <TextArea key="notes" label="Notes" name="notes" required={false} />
        {state && state.status === "error" && (
          <p key="err-msg" className="text-red-500">
            {state.error}
          </p>
        )}
        <Button key="submit-btn" type="submit" className="mt-4 bg-tertiary">
          Save
        </Button>
      </form>
      <AddTagModal
        key="add-tag-modal"
        closeIcon={closeIcon}
        onClose={() => setIsOpen(false)}
        isOpen={isOpen}
        onSuccess={() => setIsOpen(false)}
      />
    </AnimatePresence>
  );
}
