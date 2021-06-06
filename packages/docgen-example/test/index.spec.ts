import { toArray } from 'ix/asynciterable'
import { config } from '../lib'

describe('examples', () => {
    test('simple', async () => {
        const examples = config({})
        await expect(
            toArray(
                examples.create([
                    {
                        path: 'examples/example-1.js',
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
                path: 'example-1.js',
                name: 'this is my title',
                description: `this is my example`,
                content: `const value = 5`,
                language: 'js',
            },
        ])
    })
    test('skip files outside rootdir', async () => {
        const examples = config({})
        await expect(
            toArray(
                examples.create([
                    {
                        path: 'examples/my-example.js',
                        content: `
                            /**
                             *  @file this is my example
                             */
                            const value = 5
                        `,
                    },
                    {
                        path: 'ignore/my-other-example.js',
                        content: `
                            /**
                             *  @file this is my example
                             */
                            const value = 5
                        `,
                    },
                ])
            )
        ).resolves.toStrictEqual([
            {
                id: 'my-example',
                name: 'my-example',
                path: 'my-example.js',
                description: `this is my example`,
                content: `const value = 5`,
                language: 'js',
            },
        ])
    })
})
