import { config as createExamples } from '@kransio/docgen-example'
import { generate } from '@kransio/docgen-generate'
import { output } from '@kransio/docgen-output'
import { File } from '@kransio/docgen-provider'
import { DocgenConfig } from './mainConfig'

export async function docgen(
    files: Iterable<File> | AsyncIterable<File>,
    { ...config }: Partial<DocgenConfig> = {}
) {
    const examples = createExamples().create(files)
    for await (const example of examples) {
        const artifact = generate(example, {})
        await output([artifact], { outDir: config.outDir })
    }
}
