"use server";

import prisma from "@/libs/prisma";
// auth
import getUser from "@/auth/get-user";
// types
import { GenericFormState } from "@/types/formstate";
import { UpdateTransactionSchema } from "@/validators/transaction";
// utils
import formDataToObj from "@/utils/formdata-to-obj";
import joinZodErrMsg from "@/utils/join-zod-err-msg";
import { TransactionType } from "@prisma/client";

const updateTransaction = async (
  _currState: GenericFormState | undefined,
  formData: FormData,
): Promise<GenericFormState | undefined> => {
  const user = await getUser();
  if (!user) {
    return { status: "error", message: null, error: "User not found." };
  }

  const data = formDataToObj(formData);

  if ("oldTagIdsArr" in data) {
    data.oldTagIdsArr = JSON.parse(data.oldTagIdsArr);
  }
  if ("tags" in data) {
    if (!Array.isArray(data.tags)) {
      data.tags = [data.tags];
    }
  }

  const validatedData = UpdateTransactionSchema.safeParse(data);
  if (!validatedData.success) {
    return {
      status: "error",
      message: null,
      error: joinZodErrMsg(validatedData.error),
    };
  }

  const {
    data: {
      transactionId,
      type,
      amount,
      categoryId,
      date,
      name,
      notes,
      oldTagIdsArr,
      tags,
    },
  } = validatedData;

  try {
    await prisma.transaction.update({
      where: {
        id: transactionId,
      },
      data: {
        type: type as TransactionType,
        amount: Number(amount),
        categoryId,
        date,
        name,
        notes,
        tags: {
          disconnect: oldTagIdsArr.map((id) => ({ id })),
          connect: tags.map((id) => ({ id })),
        },
      },
    });
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: null,
      error: "Error updating transaction.",
    };
  }

  return {
    status: "success",
    message: "Transaction successfully updated.",
    error: null,
  };
};

export default updateTransaction;
