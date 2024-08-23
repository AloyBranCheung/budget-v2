"use client";
import React, { useEffect } from "react";
import { useFormState } from "react-dom";
// types
import { GenericFormState } from "@/types/formstate";
// actions
import addTag from "@/actions/add-tag";
// components
import TextArea from "@/components/TextArea";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Modal from "@/components/Modal";

interface AddTagModalProps {
  onSuccess: () => void;
  closeIcon: string;
  onClose: () => void;
  isOpen: boolean;
}

export default function AddTagModal({
  onSuccess,
  closeIcon,
  onClose,
  isOpen,
}: AddTagModalProps) {
  const [state, formAction] = useFormState<GenericFormState, FormData>(addTag, {
    status: null,
    message: null,
    error: null,
  });

  useEffect(() => {
    if (state.status === "success") {
      onSuccess();
    }
  });

  return (
    <Modal
      closeIcon={closeIcon}
      modalTitle="Add Tag"
      onClose={onClose}
      isOpen={isOpen}
    >
      <form className="flex flex-col gap-4" action={formAction}>
        <Input label="Name" name="name" />
        <TextArea label="Description" name="description" required={false} />
        {state.status === "error" && (
          <p className="text-red-500">{state.error}</p>
        )}
        <Button type="submit" className="bg-tertiary">
          Submit
        </Button>
      </form>
    </Modal>
  );
}
