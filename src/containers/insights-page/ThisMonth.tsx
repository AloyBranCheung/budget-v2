import React from "react";

export default function ThisMonth() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h4>This Month</h4>
        <p>More Details</p>
      </div>
      <div>
        Income vs Expense Chart for This Month (or more than just this month?)
      </div>
      <div>Piechart for each eategory broken down by tags in each category</div>
      <div>
        brush chart (both ways including income) for total spent this month in
        tag ordered by highest expenditure first then income last
      </div>
    </div>
  );
}
