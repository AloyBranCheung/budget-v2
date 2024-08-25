import { describe, it, expect, vi } from "vitest";
import prisma from "./utils/prisma";
// mocks
import mockGetUser from "@/auth/__mocks__/get-user";
// test this
import expensesByCategory from "@/actions/expenses-by-category";
import { TransactionType } from "@prisma/client";

vi.mock("@/auth/get-user");

describe("test expenses by category util fn", () => {
  it("should return null if user not found", async () => {
    mockGetUser.mockResolvedValue(null);

    const result = await expensesByCategory();

    expect(result).toBeNull();
  });

  it("should return null if no paycheck found", async () => {
    const user = await prisma.user.findFirst({
      where: {
        name: "test@test.com",
      },
    });
    if (!user)
      throw new Error("TestDB Setup Error: test@test.com user not found. ");
    mockGetUser.mockResolvedValue({ dbUser: user });

    const result = await expensesByCategory();

    expect(result).toBeNull();
  });

  it("should return an array of 3 categories", async () => {
    const user = await prisma.user.findFirst({
      where: {
        name: "test@test.com",
      },
    });
    if (!user)
      throw new Error("TestDB Setup Error: test@test.com user not found. ");
    mockGetUser.mockResolvedValue({ dbUser: user });

    const randomAmount = Math.floor(Math.random() * 1000);
    const mostRecentPaycheck = await prisma.paycheck.create({
      data: {
        amount: randomAmount,
        userId: user.id,
        date: new Date().toISOString(),
      },
    });

    const needCategory = await prisma.category.findFirst({
      where: {
        name: "Needs",
      },
    });
    if (!needCategory)
      throw new Error("TestDB Setup Error: Needs Category not found");
    const randomTag = await prisma.tag.findFirst();
    if (!randomTag) throw new Error("TestDB Setup Error: Tags not found");
    const randomSpent = Math.floor(randomAmount * 0.5 * 0.5);
    await prisma.transaction.create({
      data: {
        amount: randomSpent, // needs * 0.5, and then 0.5 of needs starting total
        date: new Date().toISOString(),
        name: "test need transaction",
        type: TransactionType.Expense,
        userId: user.id,
        categoryId: needCategory.id,
        tags: {
          connect: [{ id: randomTag.id }],
        },
        paycheckId: mostRecentPaycheck.id,
      },
    });

    /* -------------------------------------------------------------------------- */
    const result = await expensesByCategory();
    if (!result) throw new Error("Err: Result returned null");

    const testStartingTotal =
      Math.round(
        (randomAmount * needCategory.percentageSplit.toNumber() +
          Number.EPSILON) *
          100,
      ) / 100;

    const { chartData, label, spent, startingTotal } = result[0];
    expect(label).toBe("Needs");
    expect(spent).toBe(randomSpent);
    expect(startingTotal).toBe(testStartingTotal);
    expect(chartData[0].name).toBe("Transactions Total");
    expect(chartData[0].value).toBe(randomSpent);
    expect(chartData[1].name).toBe("Needs Total Remaining");
    expect(chartData[1].value).toBe(testStartingTotal - randomSpent);
    expect(result).toHaveLength(3);
  });
});
