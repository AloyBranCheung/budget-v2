import React from "react";
// components
import Insights from "@/containers/insights-page/Insights";
import CategoryByMonthGraph from "@/containers/insights-page/CategoryByMonthGraph";
import ThisMonth from "@/containers/insights-page/ThisMonth";

export default function InsightsPage() {
  return (
    <div className="flex flex-col gap-2">
      <ThisMonth />
      <Insights />
      <CategoryByMonthGraph />
    </div>
  );
}
