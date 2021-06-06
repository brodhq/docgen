import { ExampleConfig } from './exampleConfig'
import { Examples } from './exampleFacade'

export function config({
    rootDir = 'examples',
    ...config
}: Partial<ExampleConfig> = {}) {
    return new Examples({ rootDir })
}
