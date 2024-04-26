import React from "react";
import { MenuOptions } from "@/types/menu";

interface SingleSelectProps {
  label: string;
  name: string;
  menuOptions: MenuOptions[];
}

export default function SingleSelect({
  label,
  name,
  menuOptions,
}: SingleSelectProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name ?? label}>label here</label>
      <select
        id={name ?? label}
        name={name ?? label}
        className="p-4 rounded-2xl bg-secondary shadow-md outline-none border-none"
      >
        {menuOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
