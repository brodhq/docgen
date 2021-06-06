import { File } from './files'

export interface ProviderAdapter {
    find: () => Iterable<File> | AsyncIterable<File>
}
