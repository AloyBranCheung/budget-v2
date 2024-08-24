import axios from "axios"
import { GetTransactionsFilteredParams } from "@/actions/get-transactions-filtered"

const fetchFilteredTransactions = async ({ toDate, fromDate, transactionType, tag, categoryId }: GetTransactionsFilteredParams) => {
    const response = axios.get('/api/transactions', {
        params: { toDate, fromDate, transactionType, tag, categoryId }
    })
    return response
}

export default fetchFilteredTransactions