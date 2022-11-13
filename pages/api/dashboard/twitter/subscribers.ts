// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

interface Widget {
  name: string
  screen_name: string

  followers_count: number
  formatted_followers_count: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<number>,
) {
  const response = await fetch(
    'https://cdn.syndication.twimg.com/widgets/followbutton/info.json?screen_names=leon0399',
  )
  const json: Widget[] = await response.json()

  res.status(200).send(json[0].followers_count)
}
