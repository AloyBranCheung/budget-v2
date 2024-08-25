import { Prisma } from "@prisma/client";
import { buffer } from "./mock-icon";

const mockTransactionOverviewTransaction: (
  date: Date,
) => Prisma.TransactionGetPayload<{
  include: { tags: { include: { image: true } } };
}> = (date: Date) => ({
  id: "1",
  amount: 123,
  categoryId: "2",
  createdAt: date,
  updatedAt: date,
  date: date,
  name: "transaction test name",
  notes: "",
  paycheckId: "3",
  type: "Expense",
  userId: "123",
  tags: [
    {
      description: "none",
      createdAt: date,
      id: "4",
      image: {
        id: "5",
        bytes: buffer,
        createdAt: date,
        name: "test-icon",
        tagId: "test-tag-id",
        updatedAt: date,
      },
      name: "test-tag",
      updatedAt: date,
      userId: "123",
    },
  ],
});

export default mockTransactionOverviewTransaction;
