// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Octokit } from '@octokit/core'

const REPOSITORIES = [
  'openhaptics/openhaptics-firmware',
  'openhaptics/openhaptics-hardware',
  'openhaptics/openhaptics.github.io',
  'openhaptics/unihaptics-connect',
  'openhaptics/esptool.ts',
  'thrace-app/addresses',
  'thrace-app/members-and-contributors',
]

const octokit = new Octokit()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<number>,
) {
  const userReposResponse = await octokit.request(
    'GET /users/{username}/repos',
    {
      username: 'leon0399',
    },
  )

  const otherReposResponses = await Promise.all(
    REPOSITORIES.map((repo) =>
      octokit.request('GET /repos/{owner}/{repo}', {
        owner: repo.substring(0, repo.indexOf('/')),
        repo: repo.substring(repo.indexOf('/') + 1),
      }),
    ),
  )

  const userRepos = userReposResponse.data
  const otherRepos = otherReposResponses.map((response) => response.data)

  const allRepos = [...userRepos, ...otherRepos]

  const totalStars = allRepos
    .map((repo) => repo.stargazers_count)
    .filter<number>((c): c is number => !!c)
    .reduce((a, b) => a + b, 0)

  res.status(200).send(totalStars)
}
