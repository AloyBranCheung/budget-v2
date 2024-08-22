import { type NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { config as authOptions } from '@/auth/auth-helper'
import prisma from '@/libs/prisma'

// params
// todaysDate: string/Date
// includeIcon: boolean

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions)

    if (!session) {
        return new NextResponse('Unauthorized', { status: 403 })
    }

    const url = new URL(req.url);
    const todaysDate = url.searchParams.get('todaysDate') // comes in as utc 
    const isIncludeIcon = url.searchParams.get('includeIcon')

    if (!todaysDate) {
        return new NextResponse('Error: No date given', { status: 500 })
    }

    const todaysTransactions = await prisma.transaction.findMany({
        where: {
            date: {
                gte: todaysDate // utc date search db (db uses utc dates)
            }
        },
        ...(isIncludeIcon && { include: { tags: { include: { image: true } } } }),
        orderBy: {
            date: 'desc'
        }
    })

    return NextResponse.json(todaysTransactions)
}
