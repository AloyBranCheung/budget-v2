import getUser from "@/auth/get-user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    return new NextResponse('test', {status: 200})
}