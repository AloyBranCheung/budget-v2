import React from "react";
import { MenuOptions } from "@/types/menu";

interface SingleSelectProps {
  label: string;
  name: string;
  menuOptions: MenuOptions[];
  icon?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string | number;
}

export default function SingleSelect({
  label,
  name,
  menuOptions,
  icon,
  onChange,
  value,
}: SingleSelectProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center w-full justify-between">
        <label htmlFor={name ?? label}>{label}</label>
        {icon && icon}
      </div>
      <select
        id={name ?? label}
        name={name ?? label}
        className="p-4 rounded-2xl bg-secondary shadow-md outline-none border-none cursor-pointer"
        onChange={onChange}
        value={value}
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
