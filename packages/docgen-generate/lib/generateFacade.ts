import { Example } from '@kransio/docgen-example'
import { GenerateConfig } from './generateConfig'
import { Artifact } from './generateTypes'

export function generate(
    example: Example,
    _config: Partial<GenerateConfig> = {}
): Artifact {
    return {
        path: example.path,
        content: [
            '---',
            `title: ${example.name}`,
            '---',
            example.description,
            example.language ? `\`\`\`${example.language}` : '```',
            example.content,
            '```',
        ].join('\n'),
    }
}
