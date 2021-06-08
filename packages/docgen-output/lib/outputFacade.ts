import { Artifact } from '@krans/docgen-generate'
import fsextra from 'fs-extra'
import path from 'path'
import { OutputConfig } from './outputConfig'

export async function output(
    source: Iterable<Artifact> | AsyncIterable<Artifact>,
    {
        outDir = path.resolve(process.cwd(), 'examples'),
    }: Partial<OutputConfig> = {}
): Promise<void> {
    if (!fsextra.existsSync(outDir)) {
        fsextra.mkdirSync(outDir)
    }
    for await (const artifact of source) {
        const absolute = path.resolve(outDir, artifact.path)
        fsextra.outputFileSync(absolute, artifact.content)
    }
}
