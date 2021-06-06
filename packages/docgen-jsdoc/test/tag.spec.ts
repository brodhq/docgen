import { parse } from '../lib'

describe('tags', () => {
    test('title', () => {
        expect(
            parse(
                `
                /**
                 *  @title this is my title
                 */
            `.trim()
            )
        ).toStrictEqual({
            success: true,
            replaced: '',
            data: {
                title: 'this is my title',
            },
        })
    })
    test('description', () => {
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
})
