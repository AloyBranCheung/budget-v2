"use client";
import React, { useState } from "react";
import { useFormState } from "react-dom";
import { Prisma, TransactionType } from "@prisma/client";
import Image from "next/image";
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
import Modal from "@/components/Modal";
import BaseIconButton from "@/components/BaseIconButton";
import AddTagModal from "./AddTagModal";

interface AddTransactionFormProps {
  categories: Prisma.CategoryGetPayload<object>[];
  userTags: Prisma.TagGetPayload<object>[];
  addIcon: string;
  closeIcon: string;
}

export default function AddTransactionForm({
  categories,
  userTags,
  addIcon,
  closeIcon,
}: AddTransactionFormProps) {
  const [state, formAction] = useFormState<
    GenericFormState | undefined,
    FormData
  >(addTransaction, defaultGenericFormState);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <form className="flex flex-col gap-4" action={formAction}>
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
        <Input name="name" label="Name" placeholder="Name of transaction" />
        <Input
          name="amount"
          label="Amount"
          type="number"
          placeholder="$0.00"
          inputClassName="text-right"
          step={0.01}
        />
        <SingleSelect
          label="Category"
          name="category"
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
          icon={
            <BaseIconButton onClick={() => setIsOpen(true)}>
              <Image src={addIcon} alt="add-tag-icon" width={20} height={20} />
            </BaseIconButton>
          }
        />
        <DatePicker label="Date" name="date" />
        <TextArea label="Notes" name="notes" required={false} />
        {state && state.status === "error" && (
          <p className="text-red-500">{state.error}</p>
        )}
        <Button type="submit" className="mt-4 bg-tertiary">
          Save
        </Button>
      </form>
      <Modal
        closeIcon={closeIcon}
        modalTitle="Add Tag"
        onClose={() => setIsOpen(false)}
        isOpen={isOpen}
      >
        <AddTagModal onSuccess={() => setIsOpen(false)} />
      </Modal>
    </>
  );
}
