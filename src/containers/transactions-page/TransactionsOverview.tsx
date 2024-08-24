"use client";
import React, { useCallback, useState } from "react";
import dayjs from "dayjs";
import { Prisma, Tag, TransactionType } from "@prisma/client";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
// action
import deleteTransaction from "@/actions/delete-transaction";
// data-fetching
import fetchFilteredTransactions from "@/data-fetching/fetch-transactions-filtered";
// hooks
import useAxios from "@/hooks/useAxios";
// components
import SingleSelect from "@/components/SingleSelect";
import DatePicker from "@/components/DatePicker";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ExpenseFormat from "@/components/ExpenseFormat";
import Card from "@/components/Card";
import Switch from "@/components/Switch";
import EditTransactionModal from "./EditTransactionModal";

export type TransactionWithTags = Prisma.TransactionGetPayload<{
  include: { tags: { include: { image: true } } };
}>;

type CategorySelectedField = Prisma.CategoryGetPayload<{
  select: {
    id: true;
    name: true;
  };
}>;

interface TransactionsOverviewProps {
  tags: Tag[];
  categories: CategorySelectedField[];
  editIcon: string;
  trashIcon: string;
  closeIcon: string;
  addIcon: string;
}

export default function TransactionsOverview({
  tags,
  categories,
  editIcon,
  trashIcon,
  closeIcon,
  addIcon,
}: TransactionsOverviewProps) {
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [currEditTransactionId, setCurrEditTransactionId] =
    useState<string>("");

  const [isOn, setIsOn] = useState(false);

  const last30Days = dayjs().startOf("day").subtract(30, "days").toISOString();
  const today = dayjs().startOf("day").toISOString();
  const last7Days = dayjs().startOf("day").subtract(7, "days").toISOString();

  const [selectOption, setSelectOption] = useState<string>(last30Days);
  const [fromDate, setFromDate] = useState<string>(last30Days);
  const [toDate, setToDate] = useState<string>(today);
  const [transactionType, setTransactionType] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const [categoryId, setCategoryId] = useState("");

  const fetchData = useCallback(
    () =>
      fetchFilteredTransactions({
        fromDate,
        toDate,
        transactionType: transactionType as TransactionType,
        tag,
        categoryId,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      fromDate,
      toDate,
      transactionType,
      tag,
      categoryId,
      currEditTransactionId,
      shouldRefresh,
    ]
  );
  const { data: transactionsArr, isLoading } = useAxios(fetchData) as {
    data: TransactionWithTags[];
    isLoading: boolean
  }


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
        menuOptions={[
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
        ]}
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
        label="Category"
        name="category"
        menuOptions={[
          { id: "", label: "No filter", value: "" },
          ...categories.map(({ id, name }) => ({
            id,
            label: name,
            value: id,
          })),
        ]}
        onChange={(e) => setCategoryId(e.target.value)}
        value={categoryId}
        selectClassName="p-2"
      />
      <SingleSelect
        label="Transaction Type"
        name="transaction-type"
        menuOptions={[
          { id: "", label: "No filter", value: "" },
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
          { id: "", label: "No filter", value: "" },
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
      <div className="flex items-center space-between">
        <h4 className="w-full">Results</h4>
        <div className="flex gap-2 items-center w-full justify-end">
          <Image src={editIcon} height={15} width={15} alt="edit-icon" />
          <Switch onChange={() => setIsOn(!isOn)} isOn={isOn} />
        </div>
      </div>
      <div>
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <div className="flex flex-col gap-2">
            <AnimatePresence>
              {transactionsArr &&
                transactionsArr.length > 0 &&
                transactionsArr.map((transaction, i) => (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }} // Stagger by 0.1 seconds
                  >
                    <EditTransactionModal
                      isOpen={transaction.id == currEditTransactionId}
                      onClose={() => setCurrEditTransactionId("")}
                      closeIcon={closeIcon}
                      transaction={transaction}
                      categories={categories}
                      tags={tags}
                      addIcon={addIcon}
                      onSuccess={() => {
                        setCurrEditTransactionId("");
                      }}
                    />
                    <Card
                      className={`flex space-between items-center border-l-8 gap-4 ${transaction.type === TransactionType.Expense
                        ? "border-expense"
                        : "border-income"
                        }`}
                    >
                      <AnimatePresence>
                        <ExpenseFormat
                          transaction={transaction}
                          dayjsDateFormat="YYYY-MM-DD HH:mm"
                        />
                        {isOn && (
                          <motion.div
                            key={`${transaction.id}-${Math.random()}`}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{
                              opacity: 0,
                              x: 10,
                            }}
                            transition={{ delay: i * 0.1 }} // Stagger by 0.1 seconds
                            className="flex items-center gap-2"
                          >
                            <Image
                              src={editIcon}
                              height={15}
                              width={15}
                              alt="edit-icon"
                              className="cursor-pointer"
                              onClick={() =>
                                setCurrEditTransactionId(transaction.id)
                              }
                            />
                            <Image
                              src={trashIcon}
                              height={15}
                              width={15}
                              alt="trash-icon"
                              className="cursor-pointer"
                              onClick={async () => {
                                const response = await deleteTransaction(
                                  transaction.id
                                );
                                if (response.status === "success") {
                                  setShouldRefresh(!shouldRefresh);
                                  return;
                                }
                              }}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
