import { type NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { config as authOptions } from '@/auth/auth-helper'

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions)

    console.log(session?.user.name)

    return NextResponse.json({ "hello": "world" })
}
