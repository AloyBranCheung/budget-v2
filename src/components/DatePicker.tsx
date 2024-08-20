"use client";
import React, { useState } from "react";
import dayjs from "dayjs";
import { ClassNameValue, twMerge } from "tailwind-merge";

interface DatePickerProps {
  label: string;
  name?: string;
  required?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
  className?: ClassNameValue;
}

export default function DatePicker({
  label,
  name,
  required,
  onChange,
  value,
  className,
}: DatePickerProps) {
  const [date, setDate] = useState<string>(
    dayjs(new Date()).format("YYYY-MM-DD")
  );

  return (
    <div className={twMerge("flex flex-col gap-2", className)}>
      <label htmlFor={name}>{label}</label>
      <input
        required={required ?? true}
        onChange={
          onChange ??
          ((e) => {
            setDate(e.target.value);
          })
        }
        value={value ?? date}
        type="date"
        id={name}
        name={name}
        className="p-4 w-full bg-secondary rounded-2xl shadow-md outline-none border-none cursor-pointer"
      />
    </div>
  );
}
