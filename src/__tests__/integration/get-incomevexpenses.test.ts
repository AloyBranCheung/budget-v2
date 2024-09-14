import { beforeEach, describe, expect, it, vi } from "vitest";
import prisma from "@/libs/prisma";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
// utils/mocks
import setupTransactionsWithTags from "./utils/setup-transactions-with-tags";
import mockGetUser from "@/auth/__mocks__/get-user";
// test this
import getIncomeVExpense from "@/actions/get-incomevexpenses";
import { Category, Paycheck, TransactionType } from "@prisma/client";

dayjs.extend(utc);

vi.mock("next-auth", () => ({ getServerSession: vi.fn() }));
vi.mock("@/auth/get-user");

describe("test get income vs expenses for chart", async () => {
  const user = await prisma.user.findFirst({
    where: { email: "test@test.com" },
  });
  if (!user) throw new Error("Test user not found.");

  let category: Category;
  let paycheck: Paycheck;

  beforeEach(async () => {
    const result = await setupTransactionsWithTags();
    category = result.category;
    paycheck = result.paycheck;

    mockGetUser.mockResolvedValue({ dbUser: user });
  });

  it("should return income vs expenses array for chat", async () => {
    const response = await getIncomeVExpense(
      new Date().toISOString(),
      "America/Toronto",
    );

    expect(response.length).toBe(12);

    /* 
    The following are all stored in UTC: e.g. paycheck date 2024-08-01 ->
    America/Toronto time -4 so 2024-07-31 when converted so July has income
    1100.69. Likewise for transaction expenses. 
    */

    expect(response).toStrictEqual([
      { name: "Jan", income: null, expense: null },
      { name: "Feb", income: null, expense: null },
      { name: "Mar", income: null, expense: null },
      { name: "Apr", income: null, expense: null },
      { name: "May", income: null, expense: -100.69 },
      { name: "Jun", income: null, expense: null },
      // includes paycheck as income
      { name: "Jul", income: 1100.69, expense: -100.69 },
      { name: "Aug", income: null, expense: null },
      { name: "Sep", income: null, expense: null },
      { name: "Oct", income: null, expense: null },
      { name: "Nov", income: null, expense: null },
      { name: "Dec", income: null, expense: null },
    ]);
  });

  it("should place sept31 2359h and oct1 0001h in the right month", async () => {
    const sept31 = dayjs
      .tz("2024-09-30", "America/Toronto")
      .set("hour", 23)
      .set("minute", 59)
      .set("second", 59)
      .toISOString();

    const oct1 = dayjs
      .tz("2024-10-01", "America/Toronto")
      .set("hour", 0)
      .set("minute", 0)
      .set("second", 1)
      .toISOString();

    const common = {
      amount: 100,
      type: TransactionType.Expense,
      categoryId: category.id,
      paycheckId: paycheck.id,
      userId: user.id,
    };

    await prisma.transaction.createMany({
      data: [
        {
          ...common,
          date: sept31,
          name: "sept31",
        },
        {
          ...common,
          date: oct1,
          name: "oct1",
        },
      ],
    });

    const response = await getIncomeVExpense(
      dayjs
        .tz("2024-09-30", "America/Toronto")
        .set("hour", 23)
        .set("minute", 59)
        .set("second", 59)
        .toISOString(),
      "America/Toronto",
    );

    expect(response).toStrictEqual([
      { name: "Jan", income: null, expense: null },
      { name: "Feb", income: null, expense: null },
      { name: "Mar", income: null, expense: null },
      { name: "Apr", income: null, expense: null },
      { name: "May", income: null, expense: -100.69 },
      { name: "Jun", income: null, expense: null },
      { name: "Jul", income: 1100.69, expense: -100.69 },
      { name: "Aug", income: null, expense: null },
      { name: "Sep", income: null, expense: -100 },
      { name: "Oct", income: null, expense: -100 },
      { name: "Nov", income: null, expense: null },
      { name: "Dec", income: null, expense: null },
    ]);
  });

  it("should not have data cross contamination", async () => {
    // 'other' user
    mockGetUser.mockResolvedValueOnce({ dbUser: { id: "fakeuuid" } });

    const response = await getIncomeVExpense(
      new Date().toISOString(),
      "America/Toronto",
    );

    for (const month of response) {
      expect(month.income).toBeNull();
      expect(month.expense).toBeNull();
    }

    // real user
    mockGetUser.mockResolvedValueOnce({ dbUser: user });
    const realUserResponse = await getIncomeVExpense(
      new Date().toISOString(),
      "America/Toronto",
    );
    for (const month of realUserResponse) {
      if (month.name === "May") {
        expect(month.expense).toBe(-100.69);
      }
      if (month.name === "Jul") {
        expect(month.income).toBe(1100.69);
        expect(month.expense).toBe(-100.69);
      }
    }
  });
});
