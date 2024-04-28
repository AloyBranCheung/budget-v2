import { describe, it, expect, beforeEach } from 'vitest';
import { SafeParseReturnType } from 'zod';
import { CreateTagSchema } from '@/validators/tag';
// test this
import zodFormErrorObj from '@/utils/zod-validation-error';
import joinZodErrMsg from '@/utils/join-zod-err-msg';

describe("test util fn join zod err msg", () => {
    let testValidatedData: SafeParseReturnType<{
        name: string;
        description?: string | null | undefined;
    }, {
        name: string;
        description?: string | null | undefined;
    }>;

    beforeEach(() => {
        testValidatedData = CreateTagSchema.safeParse({ name: '', description: false })

        if (testValidatedData.success) {
            throw new Error("Validation should throw an error")
        }
    })
    it('should join zod err messages with comma space separation', () => {
        const errors = zodFormErrorObj(testValidatedData)

        expect(errors.error).toBe('name: Must contain at least 1 character, description: Expected string, received boolean')
        expect(errors.status).toBe('error')
        expect(errors.message).toBe('Invalid data')
    })
    it('should return a string', () => {
        if (testValidatedData.success) {
            throw new Error("Validation should throw an error")
        }

        const errors = joinZodErrMsg(testValidatedData.error)

        expect(errors).toBe('name: Must contain at least 1 character, description: Expected string, received boolean')
    })
})