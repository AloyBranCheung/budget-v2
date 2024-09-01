import axios from "axios";
import getTimezone from "@/utils/get-user-timezone";

const fetchIncomeVExpensesChartData = async () => {
    const response = await axios.get("/api/transactions/income-v-expenses", {
        params: {
            date: new Date().toISOString(),
            timezone: getTimezone(),
        }
    })
    return response; 
}

export default fetchIncomeVExpensesChartData