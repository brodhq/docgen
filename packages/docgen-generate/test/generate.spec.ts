import outdent from 'outdent'
import { generate } from '../lib'

describe('generate', () => {
    test('simple', () => {
        expect(
            generate({
                id: 'my-example',
                name: 'My example',
                description: 'This is an example',
                content: 'const value = 5',
                path: 'examples/my-example.js',
                language: 'js',
            })
        ).toStrictEqual({
            path: 'examples/my-example.js',
            content: outdent`
                ---
                title: My example
                ---
                This is an example
                \`\`\`js
                const value = 5
                \`\`\`
            `,
        })
    })
    test('no language', () => {
        expect(
            generate({
                id: 'my-example',
                name: 'My example',
                description: 'This is an example',
                content: 'const value = 5',
                path: 'examples/my-example.js',
                language: null,
            })
        ).toStrictEqual({
            path: 'examples/my-example.js',
            content: outdent`
                ---
                title: My example
                ---
                This is an example
                \`\`\`
                const value = 5
                \`\`\`
            `,
        })
    })
})
