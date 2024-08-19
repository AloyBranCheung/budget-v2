import { type NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { config as authOptions } from '@/auth/auth-helper'
import prisma from '@/libs/prisma'

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions)

    if (!session) {
        return new NextResponse('Unauthorized', { status: 403 })
    }

    const url = new URL(req.url);
    const todaysDate = url.searchParams.get('todaysDate')

    if (!todaysDate) {
        return new NextResponse('Error: No date given', { status: 500 })
    }

    const todaysTransactions = await prisma.transaction.findMany({
        where: {
            createdAt: {
                gte: todaysDate
            }
        }
    })

    return NextResponse.json(todaysTransactions)
}
