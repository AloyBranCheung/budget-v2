import { NextRequest, NextResponse } from "next/server";
import getUser from "@/auth/get-user";
// util
import getTransactionsFiltered from "@/actions/get-transactions-filtered";
import { TransactionType } from "@prisma/client";

export async function GET(req: NextRequest) {
    const user = getUser();
    if (!user) return new NextResponse("Unauthorized", { status: 401 });

    // get params
    const url = new URL(req.url);
    const toDate = url.searchParams.get('toDate') || '' // comes in as utc 
    const fromDate = url.searchParams.get('fromDate') || ''
    const transactionType = url.searchParams.get('transactionType') || ''
    const tag = url.searchParams.get('tag') || ''
    const categoryId = url.searchParams.get('categoryId') || ''

    const data = await getTransactionsFiltered({ toDate, fromDate, transactionType: transactionType as TransactionType, tag, categoryId })

    return new NextResponse(data, { status: 200 })
}
