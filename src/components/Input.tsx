import React from "react";

interface InputProps {
  label: string;
  name?: string;
  type?: React.HTMLInputTypeAttribute;
}

export default function Input({ label, name, type }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold text-heading3">{label}</label>
      <input
        type={type}
        placeholder={label}
        className="outline-none border-none p-4 rounded-2xl bg-secondary shadow-md"
        name={name ?? label}
      />
    </div>
  );
}
