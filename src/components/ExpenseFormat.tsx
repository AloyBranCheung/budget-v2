import React from "react";
import Image from "next/image";
import dayjs from "dayjs";
// util
import BinaryUtil from "@/utils/BinaryUtil";
import { Prisma } from "@prisma/client";

interface ExpenseFormatProps {
  transaction: Prisma.TransactionGetPayload<{
    include: { tags: { include: { image: true } } };
  }>;
  dayjsDateFormat?: string;
}

export default function ExpenseFormat({
  transaction,
  dayjsDateFormat,
}: ExpenseFormatProps) {
  return (
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
          <h6>{dayjs(transaction.date).format(dayjsDateFormat ?? "HH:mm")}</h6>
        </div>
      </div>
      <h5>
        {`${
          transaction.type === "Expense" ? "-" : "+"
        }$${transaction.amount.toFixed(2)}`}
      </h5>
    </div>
  );
}
