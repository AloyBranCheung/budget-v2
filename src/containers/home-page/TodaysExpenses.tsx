"use client";

import React from "react";
import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
// types
import { Transaction, Prisma } from "@prisma/client";
// hooks
import useAxios from "@/hooks/useAxios";
// data-fetching
import fetchTodaysTransactions from "@/data-fetching/fetch-todays-transactions";
// components
import Card from "@/components/Card";
import Button from "@/components/Button";
// util
import BinaryUtil from "@/utils/BinaryUtil";
import LoadingSkeleton from "@/components/LoadingSkeleton";

interface TodaysExpensesProps {
  icons: { borderAllIconB64: string };
}

export default function TodaysExpenses({ icons }: TodaysExpensesProps) {
  const router = useRouter();
  const { isError, data, isLoading } = useAxios(fetchTodaysTransactions);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center w-full justify-between">
        <h4>Today&#39;s Expenses</h4>
        <div
          className="cursor-pointer flex items-center gap-1"
          onClick={() => router.push("/app/transactions")}
        >
          <h6>View All</h6>
          <Image
            src={icons.borderAllIconB64}
            alt="all-icon.png"
            width={20}
            height={20}
          />
        </div>
      </div>
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
              <div key={transaction.id}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-8">
                    <div>
                      {
                        <Image
                          src={new BinaryUtil(
                            transaction.tags[0].image!.bytes
                          ).pngBinaryToBase64()}
                          alt="tag image"
                          width={25}
                          height={25}
                        />
                      }
                    </div>
                    <div className="flex flex-col">
                      <h5>{transaction.name}</h5>
                      <h6>{dayjs(transaction.createdAt).format("HH:mm")}</h6>
                    </div>
                  </div>
                  <h5>{`${transaction.type === "Expense" ? "-" : "+"}$${
                    transaction.amount
                  }`}</h5>
                </div>
                {i !== (data as Transaction[]).length - 1 && (
                  <hr className="h-[2px] my-4 bg-tertiary border-0" />
                )}
              </div>
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
