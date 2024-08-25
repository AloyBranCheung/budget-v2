import axios from "axios";
import dayjs from "dayjs";

const fetchTodaysTransactions = async () => {
  const response = await axios.get("/api/transactions/today", {
    params: {
      todaysDate: dayjs().startOf("day").toISOString(),
      includeIcon: true,
    },
  });
  return response;
};

export default fetchTodaysTransactions;
