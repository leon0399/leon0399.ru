// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from 'twitter-api-sdk'

const twitter = new Client(process.env.TWITTER_TOKEN as string)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<number>,
) {
  return res.status(200).json(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    (await twitter.users.findMyUser({ 'user.fields': ['public_metrics'] }))
      .data!.public_metrics!.followers_count,
  )
}
