import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import prisma from "@/libs/prisma";
// mocks
import mockGetUser from "@/auth/__mocks__/get-user";
import mockUser from "../mocks/mock-user";
import setupTransactionsWithTags from "./utils/setup-transactions-with-tags";
// utils
import { defaultGenericFormState } from "@/types/formstate";
// this
import updateTransaction from "@/actions/update-transaction";

vi.mock("@/auth/get-user");

describe("test updateTransaction server action", () => {
  beforeEach(async (testCtx) => {
    const { date } = await setupTransactionsWithTags();
    vi.useFakeTimers();
    vi.setSystemTime(date);

    if (testCtx.task.name === "should fail auth") {
      return;
    } else {
      mockGetUser.mockReturnValue(mockUser);
    }
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should fail auth", async () => {
    const mockErrFormData = new FormData();
    const response = await updateTransaction(
      defaultGenericFormState,
      mockErrFormData,
    );

    expect(response).toBeDefined();
    expect(response!.status).toBe("error");
    expect(response!.error).toBe("User not found.");
  });

  it("should fail validation", async () => {
    const mockErrFormData = new FormData();
    const response = await updateTransaction(
      defaultGenericFormState,
      mockErrFormData,
    );

    expect(response).toBeDefined();
    expect(response!.status).toBe("error");
    expect(response!.error).toBe(
      "transactionId: Required, oldTagIdsArr: Required, type: Required, name: Required, amount: Expected number, received nan, categoryId: Required, date: Required, notes: Required, tags: Required",
    );
  });

  it("should change tag relationship, date, amount and name of transaction", async () => {
    const oldTransaction = await prisma.transaction.findFirst({
      where: { name: "test 2 months ago" },
      include: {
        tags: true,
      },
    });
    if (!oldTransaction) throw new Error("curr/old transaction not found");

    const newTag = await prisma.tag.findFirst({ where: { name: "Food" } });
    if (!newTag) throw new Error("new tag not found.");

    const formData = new FormData();
    formData.append("transactionId", oldTransaction.id);
    formData.append(
      "oldTagIdsArr",
      JSON.stringify(oldTransaction.tags.map(({ id }) => id)),
    );
    formData.append("type", oldTransaction.type);
    formData.append("name", "new name test");
    formData.append("amount", "12313");
    formData.append("categoryId", oldTransaction.categoryId);
    formData.append("tags", newTag.id);
    formData.append("date", "2024-08-23T16:05");
    formData.append("notes", "new notes test");
    formData.append("_clientTimezone", "America/Toronto");

    const response = await updateTransaction(defaultGenericFormState, formData);

    expect(response?.status).toBe("success");
    expect(response?.message).toBe("Transaction successfully updated.");

    const expectNull = await prisma.transaction.findFirst({
      where: { name: oldTransaction.name },
    });
    expect(expectNull).toBeNull();

    const updatedTransaction = await prisma.transaction.findFirst({
      where: { id: oldTransaction.id },
      include: { tags: true },
    });
    expect(updateTransaction).toBeDefined();
    expect(updatedTransaction?.id).toBe(oldTransaction.id);
    expect(updatedTransaction?.amount).toBe(12313);
    expect(updatedTransaction?.date).toStrictEqual(
      new Date("2024-08-23T20:05:00.000Z"),
    );
    expect(updatedTransaction?.name).toBe("new name test");
    expect(updatedTransaction?.tags).not.toEqual(oldTransaction.tags);
    expect(updatedTransaction?.tags.length).toBe(1);
    expect(updatedTransaction?.tags[0].name).toBe("Food");
    expect(oldTransaction?.tags.length).toBe(1);
    expect(oldTransaction?.tags[0].name).toBe("Housing");
  });
});
