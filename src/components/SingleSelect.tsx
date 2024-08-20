import React from "react";
import { MenuOptions } from "@/types/menu";
import { ClassNameValue, twMerge } from "tailwind-merge";

interface SingleSelectProps {
  label: string;
  name: string;
  menuOptions: MenuOptions[];
  icon?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string | number;
  selectClassName?: ClassNameValue;
}

export default function SingleSelect({
  label,
  name,
  menuOptions,
  icon,
  onChange,
  value,
  selectClassName,
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
        className={twMerge(
          "p-4 rounded-2xl bg-secondary shadow-md outline-none border-none cursor-pointer",
          selectClassName
        )}
        onChange={onChange}
        value={value}
        data-testid={label ?? name}
      >
        {menuOptions.map((option) => (
          <option
            key={option.value}
            value={option.value}
            data-testid={option.label}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
