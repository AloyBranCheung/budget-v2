"use client";
import React, { useState } from "react";

interface TextAreaProps {
  label: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
}

export default function TextArea({
  label,
  name,
  placeholder,
  required,
}: TextAreaProps) {
  const [textValue, setTextValue] = useState("");

  return (
    <div className="flex flex-col gap-2 rounded-2xl relative">
      <label>{label}</label>
      <textarea
        required={required ?? true}
        id={name}
        name={name}
        className="bg-secondary shadow-md outline-none border-none p-4 rounded-2xl resize-none"
        maxLength={250}
        placeholder={placeholder ?? "Enter text here..."}
        rows={5}
        onChange={(e) => setTextValue(e.target.value)}
        value={textValue}
      />
      <div className="absolute bottom-4 right-4 text-placeholder">
        {textValue.length}/250
      </div>
    </div>
  );
}
