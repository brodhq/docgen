import { parse } from '../lib'

describe('parse', () => {
    test('simple', () => {
        expect(
            parse(
                `
                /**
                 *  @file this is my file
                 */
            `.trim()
            )
        ).toStrictEqual({
            success: true,
            replaced: '',
            data: {
                description: 'this is my file',
            },
        })
    })
    test('ignore content', () => {
        expect(
            parse(
                `
                /**
                 *  @file this is my file
                 */
                const value = 5
            `.trim()
            )
        ).toStrictEqual({
            success: true,
            replaced: 'const value = 5',
            data: {
                description: 'this is my file',
            },
        })
    })
    test('multi line', () => {
        expect(
            parse(
                `
                /**
                 *  @file this is my file
                 *  adasd
                 */
                const value = 5
            `.trim()
            )
        ).toStrictEqual({
            success: true,
            replaced: 'const value = 5',
            data: {
                description: 'this is my file\n adasd',
            },
        })
    })
})
