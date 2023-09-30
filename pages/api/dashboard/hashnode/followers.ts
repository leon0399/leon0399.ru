import { gql } from 'graphql-request'
import type { NextApiRequest, NextApiResponse } from 'next'

import { CLIENT } from '../../../../utils/hashnode'

const QUERY = gql`
  query Publications($username: String!) {
    user(username: $username) {
      numFollowers
    }
  }
`

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<number>,
) {
  const response = await CLIENT.request<{
    user: {
      numFollowers: number
    }
  }>(QUERY, {
    username: 'leon0399',
  })

  res.status(200).json(response.user.numFollowers)
}
