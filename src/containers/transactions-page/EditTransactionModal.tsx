import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { Prisma, Tag, TransactionType } from "@prisma/client";
import Image from "next/image";
// actions
import updateTransaction from "@/actions/update-transaction";
import { defaultGenericFormState, GenericFormState } from "@/types/formstate";
// components
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import SingleSelect from "@/components/SingleSelect";
import Multiselect from "@/components/Multiselect";
import BaseIconButton from "@/components/BaseIconButton";
import AddTagModal from "../add-expense-page/AddTagModal";
import DatePicker from "@/components/DatePicker";
import TextArea from "@/components/TextArea";
import Button from "@/components/Button";

interface EditTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  closeIcon: string;
  transaction: Prisma.TransactionGetPayload<{
    include: { tags: { include: { image: true } } };
  }>;
  categories: Prisma.CategoryGetPayload<{
    select: {
      id: true;
      name: true;
    };
  }>[];
  tags: Tag[];
  addIcon: string;
  onSuccess: (state: GenericFormState) => void;
}

export default function EditTransactionModal({
  isOpen,
  onClose,
  closeIcon,
  transaction,
  categories,
  tags,
  addIcon,
  onSuccess,
}: EditTransactionModalProps) {
  const [state, formAction] = useFormState<
    GenericFormState | undefined,
    FormData
  >(updateTransaction, defaultGenericFormState);
  const [isAddingTag, setIsAddingTag] = useState(false);

  useEffect(() => {
    if (state?.status === "success") {
      onSuccess(state);
      state.status = defaultGenericFormState.status;
    }
  }, [onSuccess, state, state?.status]);

  return (
    <Modal
      modalTitle="Editing transaction..."
      isOpen={isOpen}
      onClose={onClose}
      closeIcon={closeIcon}
    >
      <form className="flex flex-col gap-2" action={formAction}>
        <input type="hidden" name="transactionId" value={transaction.id} />
        <input
          type="hidden"
          name="oldTagIdsArr"
          value={JSON.stringify(transaction.tags.map(({ id }) => id))}
        />
        <SingleSelect
          defaultValue={transaction.type}
          label="Transaction Type"
          name="type"
          menuOptions={Object.values(TransactionType)
            .map((type) => ({
              id: type,
              label: type,
              value: type,
            }))
            .sort((a, b) => {
              if (a.label < b.label) return -1;
              if (a.label > b.label) return 1;
              return 0;
            })}
        />
        <Input label="Name" name="name" defaultValue={transaction.name} />
        <Input
          label="Amount ($)"
          name="amount"
          type="number"
          defaultValue={transaction.amount}
          inputClassName="text-right"
          step={0.01}
        />
        <SingleSelect
          defaultValue={transaction.categoryId}
          label="Category"
          name="categoryId"
          menuOptions={categories.map(({ id, name }) => ({
            id,
            label: name,
            value: id,
          }))}
        />
        <Multiselect
          defaultValue={transaction.tags.map((tag) => tag.id)}
          label="Tags"
          name="tags"
          menuOptions={tags.map(({ id, name }) => ({
            id: id,
            label: name,
            value: id,
          }))}
          icon={
            <BaseIconButton onClick={() => setIsAddingTag(true)}>
              <Image src={addIcon} alt="add-tag-icon" width={20} height={20} />
            </BaseIconButton>
          }
        />
        <DatePicker
          label="Date"
          name="date"
          isDateTime
          defaultValue={transaction.date}
        />
        <TextArea
          label="Notes"
          name="notes"
          required={false}
          defaultValue={transaction.notes}
        />
        {state && state.status === "error" && (
          <p className="text-red-500">{state.error}</p>
        )}
        <Button type="submit" className="bg-tertiary mt-4">
          Save
        </Button>
      </form>
      <AddTagModal
        onSuccess={() => setIsAddingTag(false)}
        closeIcon={closeIcon}
        onClose={() => setIsAddingTag(false)}
        isOpen={isAddingTag}
      />
    </Modal>
  );
}
