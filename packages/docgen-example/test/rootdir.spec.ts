import { toArray } from 'ix/asynciterable'
import { config } from '../lib'

describe('rootdir', () => {
    test('strips rootdir', async () => {
        const examples = config({})
        await expect(
            toArray(
                examples.create([
                    {
                        path: 'examples/nested/example-1.js',
                        content: `
                            /**
                             *  @title this is my title
                             *  @file this is my example
                             */
                            const value = 5
                        `,
                    },
                ])
            )
        ).resolves.toStrictEqual([
            {
                id: 'example-1',
                path: 'nested/example-1.js',
                name: 'this is my title',
                description: `this is my example`,
                content: `const value = 5`,
                language: 'js',
            },
        ])
    })
})
