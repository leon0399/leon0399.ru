// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { Endpoints } from '@octokit/types'
import type { NextApiRequest, NextApiResponse } from 'next'

import { OCTOKIT as octokit } from '@/utils/github'

type Stargazer =
  Endpoints['GET /repos/{owner}/{repo}/stargazers']['response']['data'][0]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Record<string, Record<string, number>>>,
) {
  let repos = req.query.repos as string[]
  if (!Array.isArray(repos)) {
    repos = [repos]
  }

  const stargazersPerRepo = await Promise.all(
    repos.map(async (repo) => {
      const stargazers: Stargazer[] = []
      let page = 1

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const response = await octokit.request(
          'GET /repos/{owner}/{repo}/stargazers',
          {
            owner: repo.substring(0, repo.indexOf('/')),
            repo: repo.substring(repo.indexOf('/') + 1),
            headers: {
              accept: 'application/vnd.github.v3.star+json',
            },
            per_page: 100,
            page: page,
          },
        )

        stargazers.push(...response.data)

        if (!response.headers.link?.includes('rel="next"')) {
          break
        }
        page++
      }

      return stargazers
    }),
  )

  const stargazersPerDay = stargazersPerRepo.map((stargazers) =>
    // calculate cumulative sum of stars per day
    stargazers
      .map((stargazer) => stargazer.starred_at)
      .filter((starred_at): starred_at is string => starred_at !== undefined)
      .map((starred_at) => starred_at.substring(0, 10))
      .sort()
      .reduce(
        (acc, date) => {
          const prevDate = Object.keys(acc).pop()
          const prev = prevDate ? acc[prevDate] : 0
          const today = acc[date] ?? 0
          if (today === 0) {
            acc[date] = prev
          }
          acc[date] += 1

          return acc
        },
        {} as Record<string, number>,
      ),
  )

  return res.status(200).json(
    stargazersPerDay.reduce(
      (acc, stargazers, index) => {
        acc[repos[index]] = stargazers
        return acc
      },
      {} as Record<string, Record<string, number>>,
    ),
  )
}
