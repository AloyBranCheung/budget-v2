"use client";
import React from "react";
import { motion } from "framer-motion";
import { ClassNameValue, twMerge } from "tailwind-merge";
import { useFormStatus } from "react-dom";

interface ButtonProps {
  children: React.ReactNode;
  className?: ClassNameValue;
  type?: "submit" | "reset" | "button" | undefined;
}

export default function Button({ children, className, type }: ButtonProps) {
  const { pending } = useFormStatus();

  const isLoading = pending;

  return (
    <motion.button
      disabled={isLoading}
      whileHover={{ backgroundColor: "#7c7c7c" }}
      whileTap={{ scale: 0.97 }}
      type={type}
      className={twMerge(
        "bg-secondary p-4 rounded-2xl text-center text-body1 shadow-md font-semibold",
        className
      )}
    >
      {isLoading ? "Loading..." : children}
    </motion.button>
  );
}
