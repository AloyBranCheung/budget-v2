"use client";

import React from "react";
import { PieChartData } from "@/types/piechart-data";
import { ResponsiveContainer, Pie, PieChart, Cell } from "recharts";

const COLORS = ["#F3D0D7", "#FFEFEF"];

interface ResponsivePieChartProps {
  chartData: PieChartData; // length 2
  containerWidth: string | number;
  containerHeight: string | number;
}

export default function ResponsivePieChart({
  chartData,
  containerWidth,
  containerHeight,
}: ResponsivePieChartProps) {
  return (
    <ResponsiveContainer width={containerWidth} height={containerHeight}>
      <PieChart>
        <Pie
          dataKey="value"
          data={chartData}
          innerRadius={23}
          outerRadius={30}
          cx={25}
        >
          {chartData.map((data, i) => (
            <Cell
              className="outline-none"
              key={`${data.name}-${Math.random()}`}
              fill={COLORS[i]}
              stroke="none"
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
