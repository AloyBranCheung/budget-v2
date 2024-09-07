import axios from "axios";
import { GetTransactionsFilteredParams } from "@/actions/get-transactions-filtered";

const fetchFilteredTransactions = async ({
  toDate,
  fromDate,
  transactionType,
  tag,
  categoryId,
  searchName,
}: GetTransactionsFilteredParams) => {
  const response = axios.get("/api/transactions", {
    params: { toDate, fromDate, transactionType, tag, categoryId, searchName },
  });
  return response;
};

export default fetchFilteredTransactions;
