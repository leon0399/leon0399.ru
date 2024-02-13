import { gql, GraphQLClient } from 'graphql-request'
import { getPlaiceholder } from 'plaiceholder'

import { type Post, type User } from '../types/hashnode'

export const API_URL = 'https://gql.hashnode.com/'

export const CLIENT = new GraphQLClient(API_URL)

const PUBLICATION_LIST_QUERY = gql`
  query Publications($username: String!, $page: Int!, $pageSize: Int!) {
    user(username: $username) {
      posts(page: $page, pageSize: $pageSize) {
        nodes {
          id
          cuid
          slug
          title
          brief
          coverImage {
            url
          }
          publishedAt
        }
      }
    }
  }
`

const PUBLICATION_QUERY = gql`
  query Publication($id: ID!) {
    post(id: $id) {
      id
      cuid
      slug
      title
      brief
      coverImage {
        url
      }
      publishedAt
    }
  }
`

export const getUserPosts = async (
  username: string,
  page?: number,
): Promise<Post[]> => {
  const data = await CLIENT.request<{ user: User }>(PUBLICATION_LIST_QUERY, {
    username,
    page: page ?? 1,
    pageSize: 10,
  })

  return data.user.posts.nodes
}

export const getPost = async (id: string): Promise<Post> => {
  const data = await CLIENT.request<{ post: Post }>(PUBLICATION_QUERY, {
    id,
  })

  const plaiceholder =
    data.post.coverImage && data.post.coverImage.url
      ? await getPlaiceholder(data.post.coverImage.url)
      : null

  return {
    ...data.post,
    coverImage: {
      ...data.post.coverImage,
      base64: plaiceholder?.base64 ?? null,
      blurhash: plaiceholder?.base64 ?? null,
    },
  }
}
