import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
// test this
import addTag from "@/actions/add-tag";
import { defaultGenericFormState } from "@/types/formstate";
import mockGetUser from "@/auth/__mocks__/get-user";
import prisma from "./utils/prisma";

vi.mock('@/auth/get-user')
vi.mock('next/cache')

describe("test add tag server action", () => {
    let validFormData: FormData;

    beforeEach(() => {
        validFormData = new FormData()
        validFormData.append('name', 'test name')
    })

    afterEach(() => {
        validFormData = new FormData()
    })

    it("should return validation error", async () => {
        const mockErrFormData = new FormData()

        const result = await addTag(defaultGenericFormState, mockErrFormData)

        expect(result).toEqual({ status: 'error', message: 'Error', error: 'name: Required' })
    });

    it("should return user not found error", async () => {
        const result = await addTag(defaultGenericFormState, validFormData)

        expect(result).toEqual({ status: 'error', message: 'Error', error: 'User not found' })
    })

    it('should create new tag', async () => {
        const user = await prisma.user.findFirst({
            where: {
                name: 'test@test.com'
            }
        })
        if (!user) throw new Error('TestDB Setup Error: User not found.')

        mockGetUser.mockResolvedValue({ dbUser: user })

        const result = await addTag(defaultGenericFormState, validFormData)

        expect(result).toEqual({ status: 'success', message: 'Success', error: null })

        const userTags = await prisma.tag.findMany({
            where: {
                userId: user.id
            }
        })

        expect(userTags).toHaveLength(1)
        expect(userTags[0].name).toBe('test name')
        expect(userTags[0].description).toBeNull()
    })


});
