"use client";
import React, { MouseEventHandler } from "react";
import { motion } from "framer-motion";
import { ClassNameValue, twMerge } from "tailwind-merge";

interface BaseIconButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  className?: ClassNameValue;
}

export default function BaseIconButton({
  onClick,
  children,
  className,
}: BaseIconButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={twMerge("p-1 rounded-2xl", className)}
      type="button"
      whileTap={{ scale: 0.95 }}
      whileHover={{ backgroundColor: "#7c7c7c" }}
    >
      {children}
    </motion.button>
  );
}
