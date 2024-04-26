import Image from "next/image";
import React from "react";
import { ClassNameValue, twMerge } from "tailwind-merge";

interface InputProps {
  label: string;
  name?: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  step?: number;
  inputClassName?: ClassNameValue;
}

export default function Input({
  label,
  name,
  type,
  placeholder,
  inputClassName,
  step,
}: InputProps) {
  return (
    <div className="flex flex-col gap-2 relative">
      <label htmlFor={name ?? label} className="font-semibold text-heading3">
        {label}
      </label>
      <input
        id={name ?? label}
        type={type}
        placeholder={placeholder ?? label}
        className={twMerge(
          "outline-none border-none p-4 rounded-2xl bg-secondary shadow-md",
          inputClassName
        )}
        name={name ?? label}
        step={step}
      />
    </div>
  );
}
