import { File } from '@kransio/docgen-provider'
import { parse } from '@kransio/docgen-jsdoc'
import slugify from 'slugify'
import path from 'path'
import { ExampleConfig } from './exampleConfig'
import { Example } from './exampleTypes'

export class Examples {
    constructor(public config: ExampleConfig) {}
    async *create(
        files: Iterable<File> | AsyncIterable<File> = []
    ): AsyncGenerator<Example> {
        for await (const file of files) {
            if (file.path.startsWith(this.config.rootDir)) {
                const result = parse(file.content)
                if (result.success === false) {
                    throw result.error
                }
                const filename = path.basename(file.path)
                // Remove file extension
                const extregex = /\.(.+)$/g
                const name = filename.replace(extregex, '')
                yield {
                    id: slugify(name, {
                        lower: true,
                    }),
                    name: result.data.title ?? name,
                    path: file.path,
                    content: result.replaced,
                    description: result.data.description ?? '',
                }
            }
        }
    }
}
