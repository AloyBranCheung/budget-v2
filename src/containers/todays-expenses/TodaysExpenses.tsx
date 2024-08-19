"use client";

import React from "react";
// hooks
import useAxios from "@/hooks/useAxios";
// data-fetching
import fetchTodaysTransactions from "@/data-fetching/fetch-todays-transactions";
// components
import Card from "@/components/Card";

export default function TodaysExpenses() {
  const { isError, data, isLoading } = useAxios(fetchTodaysTransactions);

  return (
    <div className="flex flex-col gap-2">
      <h4>Today&#39; Expenses</h4>
      {isError ? (
        <p className="text-error">
          Error fetching data, please try again later.
        </p>
      ) : (
        <Card className="p-4">hello world</Card>
      )}
    </div>
  );
}
