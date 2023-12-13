import type { NextApiRequest, NextApiResponse } from 'next'

interface Duration {
  color: string
  duration: number
  project: string
  time: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any | undefined>,
) {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).send(undefined)
  }

  const user = await fetch('https://wakatime.com/api/v1/users/current', {
    headers: {
      Authorization: authHeader,
    },
  }).then((response) => response.json())

  const timeoutMinutes = user.data.timeout

  const now = new Date()
  const date = now.toISOString().slice(0, 10)
  const url = `https://wakatime.com/api/v1/users/current/durations?date=${date}`
  const response = await fetch(url, {
    headers: {
      Authorization: authHeader,
    },
  }).then((response) => response.json())
  const durations = response.data as Duration[]

  const windowStart = now.getTime() - timeoutMinutes * 60 * 1000
  const currentProject = durations
    .sort((a: Duration, b: Duration) => b.time - a.time)
    .map((duration: Duration) => ({
      ...duration,
      end: duration.time + duration.duration,
    }))
    .find((duration) => duration.end >= windowStart / 1000)

  return res.status(200).send(
    currentProject
      ? {
          project: currentProject.project,
          start: currentProject.time,
          duration: currentProject.duration,
          end: currentProject.end,
        }
      : undefined,
  )
}
