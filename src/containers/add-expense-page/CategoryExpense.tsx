"use client";
import React from "react";
import Image from "next/image";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { motion } from "framer-motion";
// types
import { ExpensesByCategory } from "@/types/piechart-data";
// components
import Card from "@/components/Card";
import BaseIconButton from "@/components/BaseIconButton";

const COLORS = ["#F3D0D7", "#FFEFEF"];

interface CategoryExpenseProps {
  pieChartData: ExpensesByCategory[] | null;
  upRightArrowIconB64: string;
}

export default function CategoryExpense({
  pieChartData,
  upRightArrowIconB64,
}: CategoryExpenseProps) {
  return (
    <div>
      <h4>Expenses by Category</h4>
      <div className="flex items-start space-between gap-4 p-2 py-6 flex-wrap">
        {pieChartData &&
          pieChartData
            .sort((a) => {
              if (a.label === "Needs") {
                return -1;
              }
              if (a.label === "Wants") {
                return 0;
              }
              if (a.label === "Savings") {
                return 1;
              }
              return 0;
            })
            .map(({ chartData, label, spent, startingTotal }, i) => (
              <motion.div
                key={`${Math.random()}-${i}`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card className="w-40 h-40 flex flex-col gap-2 cursor-pointer">
                  <div className="w-full h-40 flex">
                    <ResponsiveContainer width="100%" height="100%">
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
                    <BaseIconButton
                      className="w-7 h-7"
                      onClick={() => console.log("icon clicked")}
                    >
                      <Image
                        src={upRightArrowIconB64}
                        alt="icon-arrow"
                        width={30}
                        height={30}
                      />
                    </BaseIconButton>
                  </div>
                  <h5>{label}</h5>
                  <p className="text-xs">
                    $
                    {spent < 0
                      ? (Math.abs(spent) + startingTotal).toFixed(2)
                      : Math.abs(spent).toFixed(2)}{" "}
                    / ${startingTotal.toFixed(2)}{" "}
                    <span className="font-medium">
                      {spent < 0 ? "saved" : "spent"}
                    </span>
                  </p>
                </Card>
              </motion.div>
            ))}
      </div>
    </div>
  );
}
