"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

interface TextAreaProps {
  label: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string | null;
}

export default function TextArea({
  label,
  name,
  placeholder,
  required,
  defaultValue,
}: TextAreaProps) {
  const [textValue, setTextValue] = useState(defaultValue ?? "");

  return (
    <motion.div layout className="flex flex-col gap-2 rounded-2xl relative">
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
    </motion.div>
  );
}
