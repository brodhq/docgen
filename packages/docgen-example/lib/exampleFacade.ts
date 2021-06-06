import { File } from '@krans/docgen-provider'
import { parse } from '@krans/docgen-jsdoc'
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
                const extname = path
                    .extname(file.path)
                    .replace(/^\./, '')
                    .trim()
                // Remove file extension
                const extregex = /\.(.+)$/g
                const name = filename.replace(extregex, '')
                yield {
                    id: slugify(name, {
                        lower: true,
                    }),
                    name: result.data.title ?? name,
                    path: file.path.split('/').slice(1).join('/'),
                    content: result.replaced,
                    description: result.data.description ?? '',
                    language: extname === '' ? null : extname,
                }
            }
        }
    }
}
