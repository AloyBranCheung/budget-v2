"use client";
import React from "react";
// components
import Card from "@/components/Card";
import { PieChartData } from "@/types/piechart-data";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#F3D0D7", "#FFEFEF"];

const data01 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
  { name: "Group E", value: 278 },
  { name: "Group F", value: 189 },
];

interface CategoryExpenseProps {
  pieChartData: PieChartData | null;
}

export default function CategoryExpense({
  pieChartData,
}: CategoryExpenseProps) {
  return (
    <div>
      <h4>Expenses by Category</h4>
      <div className="flex items-start space-between gap-4 p-2 max-w-full overflow-x-auto">
        {pieChartData &&
          pieChartData.map((chartData, i) => (
            <Card
              key={`${Math.random()}-${i}`}
              className="min-w-40 h-40 flex flex-col gap-2"
            >
              <div className="w-full h-40 flex">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      dataKey="value"
                      data={data01}
                      innerRadius={23}
                      outerRadius={30}
                      fill="#8884d8"
                      cx={25}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div>icon</div>
              </div>
              <div>label here</div>
              <div>$number spent</div>
            </Card>
          ))}
      </div>
    </div>
  );
}
