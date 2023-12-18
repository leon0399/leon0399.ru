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

  const date =
    (req.query.date as string) ?? new Date().toISOString().slice(0, 10)
  const url = `https://wakatime.com/api/v1/users/current/durations?date=${date}`
  const response = await fetch(url, {
    headers: {
      Authorization: authHeader,
    },
  }).then((response) => response.json())
  const durations = response.data as Duration[]

  return res.status(200).send({
    total: Math.round(
      durations.reduce((total, duration) => total + duration.duration, 0),
    ),
  })
}
