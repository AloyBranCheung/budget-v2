import React, { useState } from "react";
// types
import { MenuOptions } from "@/types/menu";

interface MultiselectProps {
  label: string;
  name?: string;
  menuOptions: MenuOptions[];
}

export default function Multiselect({
  label,
  name,
  menuOptions,
}: MultiselectProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name ?? label}>{label}</label>
      <select
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
        {menuOptions.map(({ id, value }) => (
          <option
            className="rounded-2xl p-2 my-2 checked:bg-tertiary"
            key={id}
            value={value}
          >
            {value}
          </option>
        ))}
      </select>
    </div>
  );
}
