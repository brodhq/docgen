import { File } from './files'

export interface ProviderAdapter {
    find: () => AsyncIterable<File>
}
