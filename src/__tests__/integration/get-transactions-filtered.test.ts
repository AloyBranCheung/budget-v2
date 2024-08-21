import { describe, it, beforeEach, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react'
import prisma from '@/libs/prisma';
import { TransactionType } from '@prisma/client';
// test this
import getTransactionsFiltered from "@/actions/get-transactions-filtered";

// TODO: write integration test for filter transaction server action
// TODO: test results are filtered by date range, transaction type, tags and a combination of them 


describe('test get-transactions-filtered server action/api thing', () => {
    beforeEach(async () => {
        vi.useFakeTimers();
        const date = new Date('2024-08-01')
        vi.setSystemTime(date);

        // todo: add mock transactions
        const user = await prisma.user.findFirst({
            where: {
                email: 'test@test.com'
            }
        })
        if (!user) throw new Error("Test user not found.")

        const category = await prisma.category.findFirst({
            where: {
                name: 'Needs',
            }
        })
        if (!category) throw new Error("Test category not found.")

        const paycheck = await prisma.paycheck.create({
            data: {
                amount: 1000,
                userId: user.id
            }
        })

        await prisma.transaction.createMany({
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
                    date,
                    notes: 'test income note',
                    userId: user.id,
                    categoryId: category.id,
                    paycheckId: paycheck.id,
                }
            ]
        })
    })

    afterEach(async () => {
        vi.useRealTimers()
        cleanup()
    })

    it('should return last 30 days', async () => {
        const transactions = await prisma.transaction.findMany();

        console.log(transactions);
    })
})