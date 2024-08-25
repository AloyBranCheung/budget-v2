import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import prisma from "@/libs/prisma";
// mocks
import mockGetUser from "@/auth/__mocks__/get-user";
import mockUser from "../mocks/mock-user";
// utils
import setupTransactionsWithTags from "./utils/setup-transactions-with-tags";
// test this
import deleteTransaction from "@/actions/delete-transaction";

vi.mock("@/auth/get-user");

describe("test delete transaction", () => {
  const originalConsole = global.console;

  beforeAll(() => {
    // mute console error https://stackoverflow.com/questions/44467657/better-way-to-disable-console-inside-unit-tests
    global.console = {
      ...console,
      error: vi.fn(),
    };
  });

  afterAll(() => {
    global.console = originalConsole;
  });

  beforeEach(async (testCtx) => {
    await setupTransactionsWithTags();
    if (testCtx.task.name === "should fail auth") return;
    mockGetUser.mockReturnValue(mockUser);
  });

  it("should fail auth", async () => {
    const transactions = await prisma.transaction.findMany();
    expect(transactions.length).toBe(3);

    const response = await deleteTransaction(transactions[0].id);
    expect(response.status).toBe("error");
    expect(response.message).toBe("User not found.");
  });

  it("should fail validation", async () => {
    const transactions = await prisma.transaction.findMany();
    expect(transactions.length).toBe(3);

    const response = await deleteTransaction("asdf");
    expect(response.status).toBe("error");
    expect(response.message).toBe("Failed to delete transaction.");
  });

  it("should delete transaction", async () => {
    const transactions = await prisma.transaction.findMany();
    expect(transactions.length).toBe(3);

    await deleteTransaction(transactions[0].id);

    const newTransactions = await prisma.transaction.findMany();
    expect(newTransactions.length).toBe(2);
    expect(newTransactions.some((t) => t.id === transactions[0].id)).toBe(
      false,
    );
  });
});
