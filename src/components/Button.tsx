import React, { ButtonHTMLAttributes } from "react";
import { ClassNameValue, twMerge } from "tailwind-merge";

interface ButtonProps {
  children: React.ReactNode;
  className?: ClassNameValue;
  type?: "submit" | "reset" | "button" | undefined;
}

export default function Button({ children, className, type }: ButtonProps) {
  return (
    <button
      type={type}
      className={twMerge(
        "bg-secondary p-4 rounded-2xl text-center text-body1 shadow-md font-semibold",
        className
      )}
    >
      {children}
    </button>
  );
}
