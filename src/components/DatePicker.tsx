"use client";
import React, { useState } from "react";
import dayjs from "dayjs";

interface DatePickerProps {
  label: string;
  name?: string;
  required?: boolean;
}

export default function DatePicker({ label, name, required }: DatePickerProps) {
  const [date, setDate] = useState<string>(
    dayjs(new Date()).format("YYYY-MM-DD")
  );

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name}>{label}</label>
      <input
        required={required ?? true}
        onChange={(e) => {
          setDate(e.target.value);
        }}
        value={date}
        type="date"
        id={name}
        name={name}
        className="p-4 w-full bg-secondary rounded-2xl shadow-md outline-none border-none"
      />
    </div>
  );
}
