import React from "react";

interface CardProps {
  children: React.ReactNode;
}

export default function Card({ children }: CardProps) {
  return (
    <div className="bg-secondary rounded-2xl p-4 shadow-md">{children}</div>
  );
}
