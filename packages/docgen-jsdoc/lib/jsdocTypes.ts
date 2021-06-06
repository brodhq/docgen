export interface ParseMetadata {
    description: string
}

export interface ParseSuccessResult {
    success: true
    replaced: string
    data: ParseMetadata
}

export interface ParseErrorResult {
    success: false
    error: Error
}

export type ParseResult = ParseSuccessResult | ParseErrorResult
