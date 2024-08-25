import { SafeParseReturnType } from "zod";
import joinZodErrMsg from "./join-zod-err-msg";
import { GenericFormState } from "@/types/formstate";

const zodFormErrorObj = (
  validatedData: SafeParseReturnType<unknown, unknown>,
): GenericFormState => {
  if (!validatedData.success) {
    return {
      status: "error",
      message: "Invalid data",
      error: joinZodErrMsg(validatedData.error),
    };
  }
  return {
    status: "error",
    message: "Something went wrong validating the data",
    error: null,
  };
};

export default zodFormErrorObj;
