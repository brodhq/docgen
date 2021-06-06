import { ProviderAdapter } from '@kransio/docgen-provider'
// @ts-expect-error
import { download } from 'download-git-repo'
import { GithubConfig } from './githubConfig'

export class GithubProvider implements ProviderAdapter {
    constructor(public config: GithubConfig) {}
    async *find() {
        const { owner, name } = this.config.repo
        const id = `${owner}/${name}`
        download(id, 'test/tmp', function (error: Error | null) {
            console.log(error ? 'Error' : 'Success')
        })
    }
}
