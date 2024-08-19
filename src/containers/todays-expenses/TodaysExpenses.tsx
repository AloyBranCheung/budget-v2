"use client";

import React from "react";
// types
import { Transaction } from "@prisma/client";
// hooks
import useAxios from "@/hooks/useAxios";
// data-fetching
import fetchTodaysTransactions from "@/data-fetching/fetch-todays-transactions";
// components
import Card from "@/components/Card";

export default function TodaysExpenses() {
  const { isError, data, isLoading } = useAxios(fetchTodaysTransactions);

  console.log(isLoading, data);

  return (
    <div className="flex flex-col gap-2">
      <h4>Today&#39;s Expenses</h4>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <p className="text-error">
          Error fetching data, please try again later.
        </p>
      ) : (
        <Card className="p-4">
          {(data as Transaction[]).map((transaction, i) => (
            <>
              <div key={transaction.id}>
                <div>icon</div>
                <div>
                  <div>name of txn</div>
                  <div>time of txn</div>
                </div>
                <div>+/- amount</div>
              </div>
              {i !== (data as Transaction[]).length - 1 && <hr />}
            </>
          ))}
        </Card>
      )}
    </div>
  );
}
