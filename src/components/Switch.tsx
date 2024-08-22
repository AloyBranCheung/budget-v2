"use client";
import React from "react";
import { motion } from "framer-motion";
import { ClassNameValue, twMerge } from "tailwind-merge";

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

interface SwitchProps {
  isOn: boolean;
  onChange: () => void;
  switchClassName?: ClassNameValue;
  handleClassName?: ClassNameValue;
}

export default function Switch({
  isOn,
  onChange,
  switchClassName,
  handleClassName,
}: SwitchProps) {
  return (
    <div
      className={twMerge(
        `${!isOn ? "bg-secondary" : "bg-green-200"} w-16 h-7 rounded-2xl flex ${
          isOn ? "justify-end" : "justify-start"
        } p-2 cursor-pointer items-center shadows-inner shadow-md`,
        switchClassName
      )}
      onClick={onChange}
    >
      <motion.div
        className={twMerge(
          "w-5 h-5 bg-white rounded-full shadow-md",
          handleClassName
        )}
        layout
        transition={spring}
      />
    </div>
  );
}
