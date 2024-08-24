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
        expect(result).toBe('/api/test?jsonData="%7B%22dict%22:%7B%22test%22:%22this%22%7D,%22array%22:%5B1,2,3%5D,%22string%22:%22test%22,%22number%22:123,%22boolean%22:true%7D"')

        const decodedParams = decodedUrlParams(result);
        expect(decodedParams).toEqual(params)
    })
})