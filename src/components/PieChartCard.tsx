"use client";

import React from "react";
import Image from "next/image";
import { truncate } from "lodash";
// types
import { PieChartData } from "@/types/piechart-data";
// components
import Card from "./Card";
import ResponsivePieChart from "./ResponsivePieChart";
import CardClickWrapper from "@/animations/CardClickWrapper";

interface PieChartCard {
  chartData: PieChartData;
  label: string;
  upRightArrowIconB64: string;
  children?: React.ReactNode;
  onClickContainer?: React.MouseEventHandler<HTMLDivElement>;
}

export default function PieChartCard({
  chartData,
  upRightArrowIconB64,
  label,
  children,
  onClickContainer,
}: PieChartCard) {
  return (
    <CardClickWrapper isOn={false} onClick={onClickContainer}>
      <Card className="w-40 h-40 flex flex-col gap-2">
        <div className="w-full h-16 flex">
          <ResponsivePieChart
            containerWidth="100%"
            containerHeight={64}
            chartData={chartData}
          />
          <div>
            <Image
              src={upRightArrowIconB64}
              alt="icon-arrow"
              width={15}
              height={15}
            />
          </div>
        </div>
        <h5>{truncate(label, { length: 15 })}</h5>
        {children}
      </Card>
    </CardClickWrapper>
  );
}
