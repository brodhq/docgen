import { config as createExamples } from '@krans/docgen-example'
import { generate } from '@krans/docgen-generate'
import { output } from '@krans/docgen-output'
import { File } from '@krans/docgen-provider'
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
