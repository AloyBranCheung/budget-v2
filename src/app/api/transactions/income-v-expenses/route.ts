import { NextRequest, NextResponse } from "next/server";
import getIncomeVExpense from "@/actions/get-incomevexpenses";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const date = url.searchParams.get("date");
  const timezone = url.searchParams.get("timezone");

  if (!date || !timezone || timezone.length < 1)
    return new NextResponse("Error: no date/timezone given.", { status: 500 });

  const data = await getIncomeVExpense(date, timezone);
  if (!data) return new NextResponse("Error: no data found.", { status: 500 });

  return NextResponse.json(data);
}
