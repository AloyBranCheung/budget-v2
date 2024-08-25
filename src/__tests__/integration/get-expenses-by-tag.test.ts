import { beforeEach, describe, expect, it, vi } from "vitest";
import prisma from "@/libs/prisma";
// utils/mocks
import setupTransactionsWithTags from "./utils/setup-transactions-with-tags";
import mockGetUser from "@/auth/__mocks__/get-user";
// test this
import getExpensesByTags from "@/actions/get-expenses-by-tag";

vi.mock("next-auth");
vi.mock("@/auth/get-user");

describe("test get expenses by tags for pie chart data", async () => {
  const user = await prisma.user.findFirst({
    where: { email: "test@test.com" },
  });
  if (!user) throw new Error("User not found.");

  beforeEach(async () => {
    await setupTransactionsWithTags();
  });

  it("should return correct data for pie chart", async () => {
    mockGetUser.mockReturnValue({ dbUser: user });

    const expensesByTags = await getExpensesByTags();

    // even though 2 expenses are added in the setup, one of them doesn't have a
    // tag relation so it is not part of any expenses by tag (intended, even
    // though that means the data is bad)
    const { tagId, amountSpent, label, chartData } = expensesByTags[0];
    expect(amountSpent).toBe(100.69);
    expect(label).toBe("Housing");
    expect(chartData.length).toBe(2);
    expect(chartData[0].name).toBe("Housing");
    expect(chartData[0].value).toBe(100.69);
    expect(chartData[1].name).toBe("Total");
    expect(chartData[1].value).toBe(100.69);
    expect(tagId.length > 0).toBeTruthy();
  });
});
