"use client";
import React, { useEffect } from "react";
import { useFormState } from "react-dom";
// action
import addPaycheck from "@/actions/add-paycheck";
// components
import Button from "@/components/Button";
import Input from "@/components/Input";
import { defaultGenericFormState, GenericFormState } from "@/types/formstate";
import DatePicker from "@/components/DatePicker";

interface AddPaycheckModalContentProps {
  onSuccess: () => void;
}

export default function AddPaycheckModalContent({
  onSuccess,
}: AddPaycheckModalContentProps) {
  const [state, formAction] = useFormState<
    GenericFormState | undefined,
    FormData
  >(addPaycheck, defaultGenericFormState);

  useEffect(() => {
    if (state && state.status === "success") {
      onSuccess();
    }
  }, [onSuccess, state]);

  return (
    <form className="flex flex-col gap-4" action={formAction}>
      <Input
        name="amount"
        label="Amount"
        type="number"
        placeholder="$0.00"
        inputClassName="text-right"
        step={0.01}
      />
      <DatePicker name="date" label="Date" />
      {state && state.status === "error" && (
        <p className="text-red-500">{state.error}</p>
      )}
      <Button type="submit" className="bg-tertiary">
        Submit
      </Button>
    </form>
  );
}
