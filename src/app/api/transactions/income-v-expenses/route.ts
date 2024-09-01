import getUser from "@/auth/get-user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const user = getUser();
    if (!user) return new NextResponse("Unauthorized", { status: 401 });
}