import doctrine from 'doctrine'
import { ParseResult } from './jsdocTypes'

export function parse(content: string): ParseResult {
    const regex = /\/\*\*\s*\n([^\*]|(\*(?!\/)))*\*\//g
    const [header] = content.match(regex) ?? []
    if (!header) {
        return {
            success: false,
            error: new Error(`unable to extract header doc`),
        }
    }
    const { tags } = doctrine.parse(header, { unwrap: true })
    // @ts-expect-error
    const { file: description } = tags.reduce(
        (acc, tag) => ({ ...acc, [tag.title]: tag.description }),
        {}
    )
    const replaced = content.replace(regex, '').trim()
    return { success: true, replaced, data: { description: description } }
}
