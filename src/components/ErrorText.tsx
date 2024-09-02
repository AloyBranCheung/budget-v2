import React from "react";

interface ErrorTextProps {
  children: string;
}

export default function ErrorText({ children }: ErrorTextProps) {
  return <p className="text-error">{children}</p>;
}
