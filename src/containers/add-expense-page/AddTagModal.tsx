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

interface AddTagModalProps {
  onSuccess: () => void;
}

export default function AddTagModal({ onSuccess }: AddTagModalProps) {
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
    <form className="flex flex-col gap-4" action={formAction}>
      <Input label="Name" name="name" />
      <TextArea label="Description" name="description" />
      {state.status === "error" && (
        <p className="text-red-500">{state.error}</p>
      )}
      <Button type="submit" className="bg-tertiary">
        Submit
      </Button>
    </form>
  );
}
