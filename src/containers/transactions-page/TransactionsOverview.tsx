"use client";
import React, { useCallback, useState } from "react";
import dayjs from "dayjs";
import { Prisma, Tag, TransactionType } from "@prisma/client";
// action
import getTransactionsFiltered from "@/actions/get-transactions-filtered";
// hooks
import useServerAction from "@/hooks/useServerAction";
// components
import SingleSelect from "@/components/SingleSelect";
import DatePicker from "@/components/DatePicker";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ExpenseFormat from "@/components/ExpenseFormat";
import Card from "@/components/Card";

interface TransactionsOverviewProps {
  tags: Tag[];
}

export default function TransactionsOverview({
  tags,
}: TransactionsOverviewProps) {
  const last30Days = dayjs().startOf("day").subtract(30, "days").toISOString();
  const today = dayjs().startOf("day").toISOString();
  const last7Days = dayjs().startOf("day").subtract(7, "days").toISOString();

  const [selectOption, setSelectOption] = useState<string>(last30Days);
  const [fromDate, setFromDate] = useState<string>(last30Days);
  const [toDate, setToDate] = useState<string>(today);
  const [transactionType, setTransactionType] = useState<string>("");
  const [tag, setTag] = useState<string>("");

  const fetchData = useCallback(
    () =>
      getTransactionsFiltered({
        fromDate,
        toDate,
        transactionType: transactionType as TransactionType,
        tag,
      }),
    [fromDate, toDate, transactionType, tag]
  );
  const { data: transactionsArr, isLoading } = useServerAction(fetchData) as {
    data:
      | Prisma.TransactionGetPayload<{
          include: { tags: { include: { image: true } } };
        }>[]
      | null;
    isLoading: boolean;
    isError: boolean;
  };

  const dateRangeMenuOptions = [
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

    // set datetime to 0, date only
    // https://stackoverflow.com/questions/48362930/setting-iso-date-time-to-zero
    const zeroUTC = new Date().setUTCHours(0, 0, 0, 0);
    const today = new Date(zeroUTC).toISOString();

    if (value === today) {
      setSelectOption(value);
      setFromDate(value);
      setToDate(value);
    } else {
      setSelectOption(value);
      setFromDate(value);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <SingleSelect
        label="Date Range"
        name="date-filter"
        menuOptions={dateRangeMenuOptions}
        onChange={handleChangeSelect}
        value={selectOption}
        selectClassName="p-2"
      />
      <div className="w-full flex gap-2 items-center">
        <DatePicker
          label="From"
          name="from"
          onChange={(e) => setFromDate(dayjs(e.target.value).toISOString())}
          value={dayjs(fromDate).format("YYYY-MM-DD")}
          className="w-full"
          inputClassName="p-2"
        />
        <DatePicker
          label="To"
          name="to"
          onChange={(e) => setToDate(dayjs(e.target.value).toISOString())}
          value={dayjs(toDate).format("YYYY-MM-DD")}
          className="w-full"
          inputClassName="p-2"
        />
      </div>
      <SingleSelect
        label="Transaction Type"
        name="transaction-type"
        menuOptions={[
          { id: "", label: "None", value: "" },
          {
            id: TransactionType.Expense,
            label: TransactionType.Expense,
            value: TransactionType.Expense,
          },
          {
            id: TransactionType.Income,
            label: TransactionType.Income,
            value: TransactionType.Income,
          },
        ]}
        onChange={(e) => setTransactionType(e.target.value as TransactionType)}
        value={transactionType}
        selectClassName="p-2"
      />
      <SingleSelect
        label="Tags"
        name="Tags"
        menuOptions={[
          { id: "", label: "None", value: "" },
          ...tags.map(({ id, name }) => ({
            id,
            label: name,
            value: id,
          })),
        ]}
        onChange={(e) => setTag(e.target.value as Tag["id"])}
        value={tag}
        selectClassName="p-2"
      />
      <hr className="my-4" />
      <h4>Results</h4>
      <div>
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <div className="flex flex-col gap-2">
            {transactionsArr &&
              transactionsArr.length > 0 &&
              transactionsArr.map((transaction) => (
                <Card
                  key={transaction.id}
                  className={`border-l-8 ${
                    transaction.type === TransactionType.Expense
                      ? "border-tertiary"
                      : "border-quaternary"
                  }`}
                >
                  <ExpenseFormat
                    transaction={transaction}
                    dayjsDateFormat="YYYY-MM-DD HH:mm"
                  />
                </Card>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
