import React from "react";
import Card from "@/components/Card";

export default function Insights() {
  return (
    <div className="flex flex-col gap-2">
      <h4>Insights</h4>
      <Card>
        <p>This month you spent dollars more in category than last month.</p>
      </Card>
    </div>
  );
}
