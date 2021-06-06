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
                path: 'examples/example-1.js',
                name: 'example-1',
                description: `this is my example`,
                content: `const value = 5`,
            },
        ])
    })
    test('skip files outside rootdir', async () => {
        const examples = config({})
        await expect(
            toArray(
                examples.create([
                    {
                        path: 'examples',
                        content: `
                            /**
                             *  @file this is my example
                             */
                            const value = 5
                        `,
                    },
                    {
                        path: 'some_other_folder',
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
                id: 'examples',
                name: 'examples',
                path: 'examples',
                description: `this is my example`,
                content: `const value = 5`,
            },
        ])
    })
})
