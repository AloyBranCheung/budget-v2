import prisma from "./prisma";
import { TransactionType } from "@prisma/client";

// resets at the start of each test per setup.ts
const setupTransactionsWithTags = async () => {
  const date = new Date("2024-08-01");
  const findUser = async () =>
    await prisma.user.findFirst({
      where: {
        email: "test@test.com",
      },
    });
  const findTag = async () =>
    await prisma.tag.findFirst({
      where: {
        name: "Housing",
      },
    });
  const findCategory = async () =>
    await prisma.category.findFirst({
      where: {
        name: "Needs",
      },
    });

  const [user, tag, category] = await Promise.all([
    findUser(),
    findTag(),
    findCategory(),
  ]);

  if (!user) throw new Error("Test user not found.");
  if (!tag) throw new Error("Test tag not found.");
  if (!category) throw new Error("Test category not found.");

  const paycheck = await prisma.paycheck.create({
    data: {
      amount: 1000,
      userId: user.id,
      date,
    },
  });

  const createBasicTransactions = async () =>
    await prisma.transaction.createMany({
      data: [
        {
          amount: 100.69,
          name: "test expense",
          type: TransactionType.Expense,
          date,
          notes: "test expense note",
          userId: user.id,
          categoryId: category.id,
          paycheckId: paycheck.id,
        },
        {
          amount: 100.69,
          name: "test income",
          type: TransactionType.Income,
          date: new Date("2024-07-15"),
          notes: "test income note",
          userId: user.id,
          categoryId: category.id,
          paycheckId: paycheck.id,
        },
      ],
    });

  const createTransactionWithTag = async () =>
    await prisma.transaction.create({
      data: {
        amount: 100.69,
        name: "test 2 months ago",
        type: TransactionType.Expense,
        date: new Date("2024-06-01"),
        notes: "test 2 months ago note",
        userId: user.id,
        categoryId: category.id,
        paycheckId: paycheck.id,
        tags: {
          connect: {
            id: tag.id,
          },
        },
      },
    });

  await Promise.all([createBasicTransactions(), createTransactionWithTag()]);

  return { date, user, tag, category, paycheck };
};

export default setupTransactionsWithTags;
