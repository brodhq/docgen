import { docgen } from '@krans/docgen'
import fs from 'fs'
import { outdent } from 'outdent'
import path from 'path'

const outDir = path.resolve(__dirname, 'tmp')

describe('e2e', () => {
    beforeEach(() => {
        if (fs.existsSync(outDir)) {
            fs.rmSync(outDir, { recursive: true })
        }
    })

    afterEach(() => {
        if (fs.existsSync(outDir)) {
            fs.rmSync(outDir, { recursive: true })
        }
    })

    test('simple', async () => {
        await docgen(
            [
                {
                    path: 'examples/example1.js',
                    content: `
                        /**
                         * @file this is example 1
                         */
                        const value = 1
                    `,
                },
                {
                    path: 'examples/example2.js',
                    content: `
                        /**
                         * @file this is example 2
                         */
                        const value = 2
                    `,
                },
                {
                    path: 'examples/example3.js',
                    content: `
                        /**
                         * @file this is example 3
                         */
                        const value = 3
                    `,
                },
            ],
            {
                outDir,
            }
        )
        expect(
            fs
                .readFileSync(path.resolve(outDir, 'example1.md'))
                .toString('utf-8')
        ).toBe(outdent`
            ---
            title: example1
            ---
            this is example 1
            \`\`\`js
            const value = 1
            \`\`\`
        `)
        expect(
            fs
                .readFileSync(path.resolve(outDir, 'example2.md'))
                .toString('utf-8')
        ).toBe(outdent`
            ---
            title: example2
            ---
            this is example 2
            \`\`\`js
            const value = 2
            \`\`\`
        `)
        expect(
            fs
                .readFileSync(path.resolve(outDir, 'example3.md'))
                .toString('utf-8')
        ).toBe(outdent`
            ---
            title: example3
            ---
            this is example 3
            \`\`\`js
            const value = 3
            \`\`\`
        `)
    })
})
