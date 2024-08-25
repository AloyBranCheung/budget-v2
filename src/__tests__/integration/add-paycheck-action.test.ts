import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
// mock
import mockGetUser from "@/auth/__mocks__/get-user";
// test this
import addPaycheck from "@/actions/add-paycheck";
import { defaultGenericFormState } from "@/types/formstate";
import prisma from "./utils/prisma";

vi.mock("@/auth/get-user");
vi.mock("next/cache");

describe("test add-paycheck server action", () => {
  let validFormData: FormData;
  beforeEach(() => {
    validFormData = new FormData();
    validFormData.append("amount", "123");
    validFormData.append("date", new Date().toISOString());
  });

  afterEach(() => {
    validFormData = new FormData();
  });

  it("should return validation error", async () => {
    const mockErrFormData = new FormData();

    const result = await addPaycheck(defaultGenericFormState, mockErrFormData);

    expect(result).toEqual({
      status: "error",
      message: "Invalid data",
      error: "amount: Expected number, received nan, date: Required",
    });
  });

  it("should return user not found error", async () => {
    const result = await addPaycheck(defaultGenericFormState, validFormData);

    expect(result).toEqual({
      status: "error",
      message: null,
      error: "User not found",
    });
  });

  it("should create a paycheck", async () => {
    const user = await prisma.user.findFirst({
      where: {
        name: "test@test.com",
      },
    });
    if (!user)
      throw new Error("TestDB Setup Error: test@test.com user not found.");

    mockGetUser.mockResolvedValue({ dbUser: user });

    const randomAmount = Math.floor(Math.random() * 1000);
    validFormData.delete("amount");
    validFormData.append("amount", randomAmount.toString());

    const result = await addPaycheck(defaultGenericFormState, validFormData);

    expect(result).toEqual({
      status: "success",
      message: "Paycheck added successfully",
      error: null,
    });

    const newPaycheck = await prisma.paycheck.findMany({
      where: {
        userId: user.id,
        amount: randomAmount,
      },
    });

    expect(newPaycheck).toHaveLength(1);
    expect(newPaycheck).not.toBeNull();
    expect(newPaycheck[0].amount).toBe(randomAmount);
  });
});
