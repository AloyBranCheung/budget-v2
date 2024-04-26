import React from "react";
import { ClassNameValue, twMerge } from "tailwind-merge";

interface CardProps {
  className?: ClassNameValue;
  children: React.ReactNode;
}

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={twMerge("bg-secondary rounded-2xl p-4 shadow-md", className)}
    >
      {children}
    </div>
  );
}
