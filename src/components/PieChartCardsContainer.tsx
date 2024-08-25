import React from "react";

interface PieChartCardsContainerProps {
  children: React.ReactNode;
}
export default function PieChartCardsContainer({
  children,
}: PieChartCardsContainerProps) {
  return (
    <div className="flex items-start space-between gap-4 p-2 py-6 flex-wrap">
      {children}
    </div>
  );
}
