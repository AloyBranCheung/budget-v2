"use client";

import React from "react";
import { useRouter } from "next/navigation";
// animations
import CardClickWrapper from "@/animations/CardClickWrapper";
// types
import { Transaction, Prisma } from "@prisma/client";
// hooks
import useAxios from "@/hooks/useAxios";
// data-fetching
import fetchTodaysTransactions from "@/data-fetching/fetch-todays-transactions";
// components
import Card from "@/components/Card";
import ExpenseFormat from "@/components/ExpenseFormat";
import Button from "@/components/Button";
import H4WithH6Icon from "@/components/H4WithH6Icon";
// util
import LoadingSkeleton from "@/components/LoadingSkeleton";
import appendUrlParams from "@/utils/append-url-params";

interface TodaysExpensesProps {
  icons: { borderAllIconB64: string };
}

export default function TodaysExpenses({ icons }: TodaysExpensesProps) {
  const router = useRouter();
  const { isError, data, isLoading } = useAxios(fetchTodaysTransactions);

  return (
    <div className="flex flex-col gap-2">
      <H4WithH6Icon icon={icons.borderAllIconB64} iconAltText='all-transactions-icon.png' h4Text={"Today's Expenses"} h6Text='All Transactions' onClick={() => router.push("/app/transactions")} />
      {isLoading ? (
        <LoadingSkeleton />
      ) : isError ? (
        <p className="text-error">
          Error fetching data, please try again later.
        </p>
      ) : (
        <Card className="p-4">
          {(data as Transaction[]).length > 0 ? (
            (
              data as Prisma.TransactionGetPayload<{
                include: { tags: { include: { image: true } } };
              }>[]
            ).map((transaction, i) => (
              <CardClickWrapper key={transaction.id} isOn={(data as Transaction[]).length > 0} onClick={() => router.push(appendUrlParams({ baseUrl: '/app/transactions', params: { fromDate: transaction.date, isToday: true } }))}>
                <ExpenseFormat transaction={transaction} />
                {i !== (data as Transaction[]).length - 1 && (
                  <hr className="h-[2px] my-4 bg-tertiary border-0" />
                )}
              </CardClickWrapper>
            ))
          ) : (
            <div className="w-full flex items-center justify-center">
              <Button
                onClick={() => router.push("/app/add")}
                className="bg-tertiary py-2"
              >
                <p>Add an Expense</p>
              </Button>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
