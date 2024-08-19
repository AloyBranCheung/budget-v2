import axios from "axios";
import dayjs from "dayjs";

const fetchTodaysTransactions = async () => {
    const response = await axios.get('/api/transactions', {
        params: {
            todaysDate: dayjs().startOf('day').toISOString()
        }
    })
    return response
}

export default fetchTodaysTransactions