import type { Octokit } from '@octokit/rest'
import { Repository } from './githubTypes'

export interface GithubConfig {
    client: Octokit
    repo: Repository
}
