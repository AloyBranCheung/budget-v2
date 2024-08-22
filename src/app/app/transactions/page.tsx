import React from "react";
import prisma from "@/libs/prisma";
// auth
import getUser from "@/auth/get-user";
// components
import TransactionsOverview from "@/containers/transactions-page/TransactionsOverview";
import Page403 from "@/app/Page403";
import Page500 from "@/app/error";

export default async function TransactionsPage() {
  const user = await getUser();
  if (!user) <Page403 />;

  const tags = await prisma.tag.findMany({
    where: {
      OR: [
        {
          userId: null,
        },
        {
          userId: user?.dbUser.id,
        },
      ],
    },
    orderBy: {
      name: "asc",
    },
  });

  const categories = await prisma.category.findMany({
    where: {
      OR: [
        { userId: null },
        {
          userId: user?.dbUser.id,
        },
      ],
    },
  });

  if (!tags || !categories) <Page500 />;

  return <TransactionsOverview tags={tags} categories={categories} />;
}
