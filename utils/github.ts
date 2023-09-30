import { Octokit } from '@octokit/core'

export const OCTOKIT = new Octokit({
  auth: process.env.OCTOKIT_TOKEN,
})
