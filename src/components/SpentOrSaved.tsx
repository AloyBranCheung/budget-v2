import React from "react";

interface SpentOrSavedProps {
  spent: number;
  startingTotal: number;
}

export default function SpentOrSaved({
  spent,
  startingTotal,
}: SpentOrSavedProps) {
  return (
    <p className="text-xs">
      $
      {spent < 0
        ? (Math.abs(spent) + startingTotal).toFixed(2)
        : Math.abs(spent).toFixed(2)}{" "}
      / ${startingTotal.toFixed(2)}{" "}
      <span className="font-medium">{spent < 0 ? "saved" : "spent"}</span>
    </p>
  );
}
