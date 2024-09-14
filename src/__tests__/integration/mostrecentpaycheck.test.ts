import { beforeEach, describe, expect, it } from "vitest";
import prisma from "./utils/prisma";
// types
import { User } from "@prisma/client";
// util
import setupTransactionsWithTags from "./utils/setup-transactions-with-tags";
// test this
import getMostRecentPaycheck from "@/actions/most-recent-paycheck";

describe("test paycheck balance", () => {
  let user: User;
  beforeEach(async () => {
    const testUser = await prisma.user.findFirst({
      where: {
        email: "test@test.com",
      },
    });
    if (!testUser) throw new Error("Test user not found");
    user = testUser;

    await setupTransactionsWithTags();
  });

  it("should return the paycheck balance", async () => {
    const { totalRemaining, mostRecentPaycheck } = await getMostRecentPaycheck({
      auth0User: {},
      dbUser: user,
    });

    expect(totalRemaining).toBe(899.31);
    expect(mostRecentPaycheck).not.toBeNull();
    expect(mostRecentPaycheck!.amount).toBe(1000);
  });

  it("should add 100 to the total remaining because expense type is income", async () => {
    const randomCategory = await prisma.category.findFirst();
    if (!randomCategory) throw new Error("Test category not found");
    const currPaycheck = await prisma.paycheck.findFirst();
    if (!currPaycheck) throw new Error("Test paycheck not found.");

    await prisma.transaction.create({
      data: {
        amount: 100,
        date: new Date().toISOString(),
        name: "test add",
        type: "Income",
        userId: user.id,
        paycheckId: currPaycheck.id,
        categoryId: randomCategory?.id,
      },
    });

    const { totalRemaining, mostRecentPaycheck } = await getMostRecentPaycheck({
      auth0User: {},
      dbUser: user,
    });

    expect(totalRemaining).toBe(999.31);
    expect(mostRecentPaycheck).not.toBeNull();
    expect(mostRecentPaycheck!.amount).toBe(1000);
  });

  it("should remove 100 from total remaining if expense type is expense", async () => {
    const randomCategory = await prisma.category.findFirst();
    if (!randomCategory) throw new Error("Test category not found");
    const currPaycheck = await prisma.paycheck.findFirst();
    if (!currPaycheck) throw new Error("Test paycheck not found.");

    await prisma.transaction.create({
      data: {
        amount: 100,
        date: new Date().toISOString(),
        name: "test add",
        type: "Expense",
        userId: user.id,
        paycheckId: currPaycheck.id,
        categoryId: randomCategory?.id,
      },
    });

    const { totalRemaining, mostRecentPaycheck } = await getMostRecentPaycheck({
      auth0User: {},
      dbUser: user,
    });

    expect(totalRemaining).toBe(799.31);
    expect(mostRecentPaycheck).not.toBeNull();
    expect(mostRecentPaycheck!.amount).toBe(1000);
  });

  it("should not show other user data", async () => {
    const { totalRemaining, mostRecentPaycheck } = await getMostRecentPaycheck({
      auth0User: {},
      dbUser: user,
    });

    expect(totalRemaining).toBe(899.31);
    expect(mostRecentPaycheck).not.toBeNull();
    expect(mostRecentPaycheck!.amount).toBe(1000);

    const testThis = await getMostRecentPaycheck({
      auth0User: {},
      dbUser: {
        id: "fakeuuid",
        createdAt: new Date(),
        updatedAt: new Date(),
        name: "fake",
        email: "fake@fake.com",
        auth0Id: "fake|123",
        image: "fake-image-url",
      },
    });

    expect(testThis.mostRecentPaycheck).toBeNull();
    expect(testThis.totalRemaining).toBeNull();
  });
});
