import { Artifact } from '@kransio/docgen-generate'
import fs from 'fs'
import path from 'path'
import { OutputConfig } from './outputConfig'

export async function output(
    source: Iterable<Artifact> | AsyncIterable<Artifact>,
    {
        outDir = path.resolve(process.cwd(), 'examples'),
    }: Partial<OutputConfig> = {}
): Promise<void> {
    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir)
    }
    for await (const artifact of source) {
        const absolute = path.resolve(outDir, artifact.path)
        fs.writeFileSync(absolute, artifact.content)
    }
}
