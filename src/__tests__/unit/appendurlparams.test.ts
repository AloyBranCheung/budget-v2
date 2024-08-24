import { describe, expect, it } from 'vitest';
// test this
import appendUrlParams, { decodedUrlParams } from '@/utils/append-url-params';

describe('test append uri component to base url', () => {
    it('should append uri component to base url and decode full url and return params', () => {
        const baseUrl = '/api/test'
        const params = {
            dict: {
                test: 'this'
            },
            array: [1, 2, 3],
            string: 'test',
            number: 123,
            boolean: true,
        }
        const result = appendUrlParams({ baseUrl, params })
        expect(result).toBe('/api/test?jsonData=%7B%22dict%22%3A%7B%22test%22%3A%22this%22%7D%2C%22array%22%3A%5B1%2C2%2C3%5D%2C%22string%22%3A%22test%22%2C%22number%22%3A123%2C%22boolean%22%3Atrue%7D')

        const decodedParams = decodedUrlParams(result);
        expect(decodedParams).toEqual(params)
    })
})