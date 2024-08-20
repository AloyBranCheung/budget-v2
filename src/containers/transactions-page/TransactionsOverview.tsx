"use client";
import React, { useState } from "react";
import dayjs from "dayjs";
// components
import SingleSelect from "@/components/SingleSelect";
import DatePicker from "@/components/DatePicker";

export default function TransactionsOverview() {
  const last30Days = dayjs().startOf("day").subtract(30, "days").toISOString();
  const today = dayjs().startOf("day").toISOString();
  const last7Days = dayjs().startOf("day").subtract(7, "days").toISOString();

  const [selectOption, setSelectOption] = useState<string>(last30Days);
  const [fromDate, setFromDate] = useState<string>(last30Days);
  const [toDate, setToDate] = useState<string>(today);

  const menuOptions = [
    {
      id: 1,
      label: "Last 30 days",
      value: last30Days,
    },
    { id: 2, label: "Today", value: today },
    {
      id: 3,
      label: "Last 7 days",
      value: last7Days,
    },
  ];

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectOption(value);
    setFromDate(value);
  };

  return (
    <div className="flex flex-col gap-2">
      <SingleSelect
        label="Date Range"
        name="date-filter"
        menuOptions={menuOptions}
        onChange={handleChangeSelect}
        value={selectOption}
      />
      <div className="flex items-center justify-between gap-4">
        <DatePicker
          label="From"
          name="from"
          onChange={() => console.log("changed")}
          value={dayjs(fromDate).format("YYYY-MM-DD")}
          className="w-full"
        />
        <DatePicker
          label="To"
          name="to"
          onChange={() => console.log("changed")}
          value={dayjs(toDate).format("YYYY-MM-DD")}
          className="w-full"
        />
      </div>
    </div>
  );
}
