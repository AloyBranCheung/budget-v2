import React from "react";
import prisma from "@/libs/prisma";
// auth
import getUser from "@/auth/get-user";
// util
import IconHelper from "@/utils/IconHelper";
// components
import AddTransactionForm from "@/containers/add-expense-page/AddTransactionForm";
import Page403 from "@/app/Page403";
import Page500 from "@/app/Page500";

export default async function AddTransactionPage() {
  const user = await getUser();
  if (!user) return <Page403 />;

  const categories = await prisma.category.findMany();
  if (!categories) return <Page500 />;

  const userTags = await prisma.tag.findMany({
    where: {
      OR: [
        {
          userId: null,
        },
        {
          userId: user.dbUser.id,
        },
      ],
    },
  });
  if (!userTags) return <Page500 />;

  const addIconb64 = await new IconHelper("add-icon.png").getIcon64();
  if (!addIconb64) return <Page500 />;

  const closeIconb64 = await new IconHelper("close-icon.png").getIcon64();
  if (!closeIconb64) return <Page500 />;

  return (
    <div className="flex flex-col gap-2">
      <AddTransactionForm
        categories={categories}
        userTags={userTags}
        addIcon={addIconb64}
        closeIcon={closeIconb64}
      />
    </div>
  );
}
