"use server";

import prisma from "@/libs/prisma";
import { Category, Tag, TransactionType } from "@prisma/client";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import getUser from "@/auth/get-user";

dayjs.extend(utc);

export interface GetTransactionsFilteredParams {
  toDate: string;
  fromDate: string;
  transactionType: TransactionType;
  tag: Tag["id"];
  categoryId: Category["id"];
  searchName: string;
}

const getTransactionsFiltered = async ({
  toDate,
  fromDate,
  transactionType,
  tag,
  categoryId,
  searchName,
}: GetTransactionsFilteredParams) => {
  const user = await getUser();
  if (!user) {
    throw new Error("User not found.");
  }

  try {
    const transactions = await prisma.transaction.findMany({
      include: {
        tags: {
          include: {
            image: true,
          },
        },
      },
      where: {
        userId: user.dbUser.id,
        date: {
          gte: fromDate, // frontend already sent date that is the start of the day in utc format
          lt: dayjs.utc(toDate).add(1, "day").toISOString(), // frontend already sent date that is the start of the day in utc format
        },
        ...(transactionType &&
          transactionType.length > 0 && { type: transactionType }),
        ...(tag &&
          tag.length > 0 && {
            tags: {
              some: {
                id: tag,
              },
            },
          }),
        ...(categoryId &&
          categoryId.length > 0 && {
            categoryId,
          }),
        ...(searchName &&
          searchName.length > 0 && {
            name: { search: searchName.replace(" ", "&") }, // https://www.prisma.io/docs/orm/prisma-client/queries/full-text-search
          }),
      },
      orderBy: {
        date: "desc",
      },
    });

    // cannot send bytea over server action
    // https://stackoverflow.com/questions/77091418/warning-only-plain-objects-can-be-passed-to-client-components-from-server-compo
    return JSON.stringify(transactions);
  } catch (error) {
    // cannot send bytea over server action
    // https://stackoverflow.com/questions/77091418/warning-only-plain-objects-can-be-passed-to-client-components-from-server-compo
    return JSON.stringify({
      message: "Error fetching transactions.",
      isError: true,
      data: null,
    });
  }
};

export default getTransactionsFiltered;
