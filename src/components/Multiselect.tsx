"use client";
import React, { useState } from "react";
// types
import { MenuOptions } from "@/types/menu";

interface MultiselectProps {
  label: string;
  name?: string;
  menuOptions: MenuOptions[];
  required?: boolean;
  icon?: React.ReactNode;
}

export default function Multiselect({
  label,
  name,
  menuOptions,
  required,
  icon,
}: MultiselectProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label htmlFor={name ?? label}>{label}</label>
        {icon}
      </div>
      <select
        required={required ?? true}
        size={menuOptions.length}
        className="p-4 bg-secondary rounded-2xl shadow-md outline-none border-none h-fit selection:bg-none"
        id={name ?? label}
        name={name}
        multiple
        onChange={(e) => {
          const options = e.target.options;
          const value = [];
          for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
              value.push(options[i].value);
            }
          }
          setSelectedOptions(value);
        }}
        value={selectedOptions}
      >
        {menuOptions.map(({ id, value, label }) => (
          <option
            className="rounded-2xl p-2 my-2 checked:bg-tertiary"
            key={id}
            value={value}
          >
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
