import { describe, it, expect } from 'vitest';
// test this
import formDataToObj from '@/utils/formdata-to-obj';

describe("test the formdata to object util fn", () => {
    it("should turn FormData to a Javascript Object with array if keys are duplicated", () => {
        const testFormData = new FormData();
        testFormData.append("name", "test");
        testFormData.append("name", "test1")
        testFormData.append("pass", "pas")

        const result = formDataToObj(testFormData);

        expect(result["name"]).toStrictEqual(["test", "test1"])
        expect(result["pass"]).toBe("pas")
        expect(Array.isArray(result["pass"])).not.toBe(true)
    })
})