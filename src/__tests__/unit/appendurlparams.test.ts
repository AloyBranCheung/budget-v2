import { describe, it } from 'vitest';
// test this
import appendUrlParams from '@/utils/append-url-params';

describe('test append uri component to base url', () => {
    it('should append uri component to base url', () => {
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

        console.log(result)
    })
})