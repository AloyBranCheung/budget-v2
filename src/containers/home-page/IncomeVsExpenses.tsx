"use client";

import Card from "@/components/Card";
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  ReferenceLine,
  Bar,
  BarChart,
  LabelList,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { capitalize } from "lodash";
// hooks
import useAxios from "@/hooks/useAxios";
// datafetch
import fetchIncomeVExpensesChartData from "@/data-fetching/fetch-incomevexpenses";
// utils
import nFormatter from "@/utils/format-number";
// types
import { ChartData } from "@/actions/get-incomevexpenses";
import { ErrMsg } from "@/types/errmsg";
// components
import H4WithH6Icon from "@/components/H4WithH6Icon";
import DependsAxios from "@/components/DependsAxios";

interface IncomeVsExpensesProps {
  icons: { borderAllIconB64: string };
}

const formatLabel = (value: number) => {
  // need to Math.abs value as nFormatter does not work with negative numbers
  return `$${value >= 0 ? "" : "-"}${nFormatter(Math.abs(value), 1)}`;
};

const chartWidth = 1504 - 32;

export default function IncomeVsExpenses({
  icons: { borderAllIconB64 },
}: IncomeVsExpensesProps) {
  const router = useRouter();
  const chartCardRef = useRef<HTMLDivElement | null>(null);

  const { data, isLoading, isError } = useAxios(fetchIncomeVExpensesChartData);

  useEffect(() => {
    if (chartCardRef.current) {
      const thisMonth = new Date().getMonth();
      const scrollTo =
        (chartWidth / 12) * thisMonth -
        chartCardRef.current.getBoundingClientRect().width / 2;

      // scroll the chart to current month
      chartCardRef.current.scrollLeft = scrollTo;
    }
  }, [data]);

  return (
    <div className="flex flex-col gap-2">
      <H4WithH6Icon
        icon={borderAllIconB64}
        iconAltText="all-transactions-icon.png"
        h4Text="Monthly Expense"
        h6Text="All Transactions"
        onClick={() => router.push("/app/transactions")}
      />
      <DependsAxios
        isError={isError}
        isLoading={isLoading}
        errMsg={ErrMsg.NO_DATA}
      >
        <Card ref={chartCardRef} className="h-96 w-full overflow-x-auto">
          <ResponsiveContainer width={chartWidth} height="100%">
            <BarChart
              stackOffset="sign"
              width={chartWidth}
              height={384}
              data={data as ChartData[]}
              barSize={15}
              margin={{ top: 16, bottom: 16 }}
            >
              <YAxis hide padding={{ bottom: 25 }} />
              <XAxis dataKey="name" strokeWidth={2} />
              <Legend formatter={(value) => <p>{capitalize(value)}</p>} />
              <Bar
                dataKey="income"
                stackId="a"
                fill="#A2D9A8"
                radius={[16, 16, 0, 0]}
              >
                <LabelList
                  dataKey="income"
                  position="top"
                  formatter={formatLabel}
                />
              </Bar>
              <ReferenceLine y={0} strokeWidth={1} />
              <Bar
                dataKey="expense"
                stackId="a"
                fill="#F3D0D7"
                radius={[16, 16, 0, 0]}
              >
                <LabelList
                  dataKey="expense"
                  position="top"
                  formatter={formatLabel}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </DependsAxios>
    </div>
  );
}
