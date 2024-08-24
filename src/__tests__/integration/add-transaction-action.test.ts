import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { TransactionType } from "@prisma/client";
import prisma from "./utils/prisma";
import { defaultGenericFormState } from "@/types/formstate";
// mocks
import mockGetUser from '@/auth/__mocks__/get-user';
// test this
import addTransaction from "@/actions/add-transaction";

vi.mock('@/auth/get-user')
vi.mock('next/navigation', () => ({
    redirect: vi.fn(),
}))

describe("test add transaction server action", async () => {
    let validFormData = new FormData();

    const needsCategory = await prisma.category.findFirst({
        where: {
            name: 'Needs'
        }
    })
    if (!needsCategory) throw new Error("TestDB Setup Error: Needs Category not found")

    const tags = await prisma.tag.findMany()
    if (!tags) throw new Error("TestDB Setup Error: Tags not found")


    beforeEach(() => {
        validFormData.append('amount', '100')
        validFormData.append('date', '2024-04-22')
        validFormData.append('name', 'test transaction')
        validFormData.append('type', TransactionType.Expense)
        validFormData.append('notes', 'test notes')
        validFormData.append('category', needsCategory.id)
        validFormData.append('tags', tags[0].id)
        validFormData.append('tags', tags[1].id)
        validFormData.append('timezone', 'America/Toronto')
    })

    afterEach(() => {
        validFormData = new FormData();
    })

    it("should return validation error", async () => {
        const mockErrFormData = new FormData();
        const result = await addTransaction(defaultGenericFormState, mockErrFormData)

        expect(result).toEqual({ status: 'error', message: null, error: "type: Required, name: Required, amount: Expected number, received nan, category: Required, tags: Required, date: Required" })
    });

    it('should return user not found error', async () => {
        mockGetUser.mockResolvedValue(null);

        const result = await addTransaction(defaultGenericFormState, validFormData)

        expect(result).toEqual({ status: 'error', message: null, error: 'User not found.' })
    })

    it("should return paycheck not found error", async () => {
        mockGetUser.mockResolvedValue({ dbUser: mockGetUser })

        const result = await addTransaction(defaultGenericFormState, validFormData)

        expect(result).toEqual({ status: 'error', message: null, error: 'No paycheck found.' })
    })

    it("should create a transaction", async () => {
        const user = await prisma.user.findFirst({
            where: {
                name: 'test@test.com'
            }
        })
        if (!user) throw new Error("TestDB Setup Error: User not found")
        mockGetUser.mockResolvedValue({ dbUser: user })

        await prisma.paycheck.create({
            data: {
                amount: 1000,
                userId: user.id,
                date: new Date().toISOString()
            }
        })

        const result = await addTransaction(defaultGenericFormState, validFormData)

        expect(result).toBeUndefined()

        const transaction = await prisma.transaction.findMany()

        expect(transaction).toHaveLength(1)
        expect(transaction[0].amount).toEqual(100)
        expect(transaction[0].type).toBe(TransactionType.Expense)

        const paycheck = await prisma.paycheck.findMany({
            where: {
                id: transaction[0].paycheckId
            }
        })

        expect(paycheck).toHaveLength(1)
        expect(paycheck[0].amount).toBe(1000)

        const linkedUser = await prisma.user.findMany({
            where: {
                id: transaction[0].userId

            }
        })

        expect(linkedUser).toHaveLength(1)
        expect(linkedUser[0].name).toBe('test@test.com')
    })
});
