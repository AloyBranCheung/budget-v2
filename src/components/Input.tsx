import React, { HTMLAttributes } from "react";
import { ClassNameValue, twMerge } from "tailwind-merge";

interface InputProps {
  label: string;
  name?: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  step?: number;
  inputClassName?: ClassNameValue;
  required?: boolean;
  maxLength?: number;
  defaultValue?: HTMLAttributes<HTMLInputElement>["defaultValue"];
}

export default function Input({
  label,
  name,
  type,
  placeholder,
  inputClassName,
  step,
  required,
  maxLength,
  defaultValue,
}: InputProps) {
  return (
    <div className="flex flex-col gap-2 relative">
      <label htmlFor={name ?? label}>{label}</label>
      <input
        required={required ?? true}
        id={name ?? label}
        type={type}
        placeholder={placeholder ?? label}
        className={twMerge(
          "outline-none border-none p-4 rounded-2xl bg-secondary shadow-md",
          inputClassName,
        )}
        name={name ?? label}
        step={step}
        maxLength={maxLength ?? 30}
        defaultValue={defaultValue}
      />
    </div>
  );
}
