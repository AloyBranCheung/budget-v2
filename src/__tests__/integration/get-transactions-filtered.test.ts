import { describe, it, beforeEach, vi, afterEach, expect } from 'vitest';
import prisma from '@/libs/prisma';
import { Transaction, TransactionType } from '@prisma/client';
import dayjs from 'dayjs';
// mocks
import mockGetUser from '@/auth/__mocks__/get-user';
// test this
import getTransactionsFiltered from "@/actions/get-transactions-filtered";

vi.mock('@/auth/get-user')

describe('test get-transactions-filtered server action/api thing', async () => {
    const date = new Date('2024-08-01')
    const findUser = async () => await prisma.user.findFirst({
        where: {
            email: 'test@test.com'
        }
    })
    const findTag = async () => await prisma.tag.findFirst({
        where: {
            name: 'Housing'
        }
    })
    const findCategory = async () => await prisma.category.findFirst({
        where: {
            name: 'Needs',
        }
    })

    const [user, tag, category] = await Promise.all([findUser(), findTag(), findCategory()])

    if (!user) throw new Error("Test user not found.")
    if (!tag) throw new Error("Test tag not found.")
    if (!category) throw new Error("Test category not found.")

    beforeEach(() => {
        mockGetUser.mockResolvedValue(mockGetUser)
    })

    beforeEach(async () => {
        vi.useFakeTimers();
        vi.setSystemTime(date);

        const paycheck = await prisma.paycheck.create({
            data: {
                amount: 1000,
                userId: user.id
            }
        })

        const createBasicTransactions = async () => await prisma.transaction.createMany({
            data: [
                {
                    amount: 100.69,
                    name: 'test expense',
                    type: TransactionType.Expense,
                    date,
                    notes: 'test expense note',
                    userId: user.id,
                    categoryId: category.id,
                    paycheckId: paycheck.id,
                },
                {
                    amount: 100.69,
                    name: 'test income',
                    type: TransactionType.Income,
                    date: new Date('2024-07-15'),
                    notes: 'test income note',
                    userId: user.id,
                    categoryId: category.id,
                    paycheckId: paycheck.id,
                },
            ],
        })

        const createTransactionWithTag = async () => await prisma.transaction.create({
            data: {
                amount: 100.69,
                name: 'test 2 months ago',
                type: TransactionType.Expense,
                date: new Date('2024-06-01'),
                notes: 'test 2 months ago note',
                userId: user.id,
                categoryId: category.id,
                paycheckId: paycheck.id,
                tags: {
                    connect: {
                        id: tag.id
                    }
                }
            }
        })

        await Promise.all([createBasicTransactions(), createTransactionWithTag()])
    })

    afterEach(async () => {
        vi.useRealTimers()
    })

    it('should return last 30 days', async () => {
        // all transactions
        const transactions = await prisma.transaction.findMany()
        expect(transactions.length).toBe(3)

        const jsonFilteredTransactions = await getTransactionsFiltered({
            toDate: new Date().toISOString(),
            fromDate: dayjs().subtract(30, 'day').toISOString(),
            transactionType: '' as TransactionType,
            tag: '',
            categoryId: category.id
        })
        const filteredTransactions = JSON.parse(jsonFilteredTransactions)
        expect(filteredTransactions.length).toBe(2)
        expect(filteredTransactions[0].name).toBe('test expense')
        expect(filteredTransactions[1].name).toBe('test income')
    })

    it('should return only expense from last 90 days', async () => {
        const jsonFilteredTransactions = await getTransactionsFiltered({
            toDate: new Date().toISOString(),
            fromDate: dayjs().subtract(90, 'day').toISOString(),
            transactionType: TransactionType.Expense,
            tag: '',
            categoryId: category.id

        })
        const filteredTransactions = JSON.parse(jsonFilteredTransactions)

        expect(filteredTransactions.length).toBe(2)
        expect(filteredTransactions.some((t: Transaction) => t.type !== TransactionType.Expense)).toBeFalsy()
    })

    it('should return only Housing tag from within 1 day time range', async () => {
        const jsonFilteredTransactions = await getTransactionsFiltered({
            toDate: new Date('2024-06-01').toISOString(),
            fromDate: new Date('2024-06-01').toISOString(),
            transactionType: TransactionType.Expense,
            tag: '',
            categoryId: category.id
        })
        const filteredTransactions = JSON.parse(jsonFilteredTransactions)

        expect(filteredTransactions.length).toBe(1)
        expect(filteredTransactions[0].tags[0].name).toBe("Housing")
    })

})