import fs from 'fs'
import path from 'path'
import { output } from '../lib'

const outDir = path.resolve(__dirname, 'tmp')

describe('output', () => {
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
        await output(
            [
                {
                    path: 'my-example.md',
                    content: 'const value = 5',
                },
            ],
            { outDir: path.resolve(__dirname, 'tmp') }
        )
        expect(
            fs
                .readFileSync(path.resolve(outDir, 'my-example.md'))
                .toString('utf-8')
        ).toBe(`const value = 5`)
    })
})
