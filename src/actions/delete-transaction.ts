"use server";

import getUser from "@/auth/get-user";
import prisma from "@/libs/prisma";
import { GenericFormState } from "@/types/formstate";
import { z } from "zod";

const deleteTransaction = async (
  transactionId: string,
): Promise<GenericFormState> => {
  const user = await getUser();
  if (!user) {
    return {
      status: "error",
      message: "User not found.",
      error: null,
    };
  }
  try {
    const validatedTransactionId = z.string().uuid().parse(transactionId);
    await prisma.transaction.delete({
      where: {
        id: validatedTransactionId,
      },
    });
    return {
      status: "success",
      message: "Transaction deleted successfully.",
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Failed to delete transaction.",
      error: null,
    };
  }
};

export default deleteTransaction;
