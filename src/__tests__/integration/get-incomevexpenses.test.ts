import { beforeEach, describe, expect, it, vi } from 'vitest';
import prisma from '@/libs/prisma';
// utils/mocks
import setupTransactionsWithTags from './utils/setup-transactions-with-tags';
import mockGetUser from '@/auth/__mocks__/get-user';
// test this
import getIncomeVExpense from '@/actions/get-incomevexpenses';

vi.mock('next-auth', () => ({ getServerSession: vi.fn() }))
vi.mock('@/auth/get-user')

describe('test get income vs expenses for chart', async () => {
    const user = await prisma.user.findFirst({ where: { email: 'test@test.com' } })
    beforeEach(async () => {
        await setupTransactionsWithTags()
    })

    it('should return income vs expenses array for chat', async () => {
        mockGetUser.mockResolvedValue({ dbUser: user })
        const response = await getIncomeVExpense()

        expect(response.length).toBe(12)
        expect(response).toStrictEqual([
            { name: 'Jan', income: null, expense: null },
            { name: 'Feb', income: null, expense: null },
            { name: 'Mar', income: null, expense: null },
            { name: 'Apr', income: null, expense: null },
            { name: 'May', income: null, expense: null },
            { name: 'Jun', income: null, expense: -100.69 },
            { name: 'Jul', income: 100.69, expense: null },
            { name: 'Aug', income: null, expense: -100.69 },
            { name: 'Sep', income: null, expense: null },
            { name: 'Oct', income: null, expense: null },
            { name: 'Nov', income: null, expense: null },
            { name: 'Dec', income: null, expense: null }
        ])
    })
})