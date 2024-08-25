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
  inputClassName?: ClassNameValue;
  isDateTime?: boolean;
  defaultValue?: Date | string;
}

export default function DatePicker({
  label,
  name,
  required,
  onChange,
  value,
  className,
  inputClassName,
  isDateTime,
  defaultValue,
}: DatePickerProps) {
  const stateDefault = (() => {
    if (isDateTime) {
      if (defaultValue) return dayjs(defaultValue).format("YYYY-MM-DDTHH:mm");
      return dayjs().format("YYYY-MM-DDTHH:mm");
    } else {
      if (defaultValue) return dayjs(defaultValue).format("YYYY-MM-DD");
      return dayjs(new Date()).format("YYYY-MM-DD");
    }
  })();

  const [date, setDate] = useState<string>(stateDefault);

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
        type={isDateTime ? "datetime-local" : "date"}
        id={name}
        name={name}
        className={twMerge(
          "p-4 w-full bg-secondary rounded-2xl shadow-md outline-none border-none cursor-pointer",
          inputClassName,
        )}
      />
      <input
        type="hidden"
        name="_clientTimezone"
        value={Intl.DateTimeFormat().resolvedOptions().timeZone}
        data-testid="_hiddenClientTimezone"
      />
    </div>
  );
}
