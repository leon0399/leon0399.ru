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
// Removed large commented out code block
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

const PUBLOCATION_QUERY = gql`
  query Publication($hostname: String!, $slug: String!) {
    post(hostname: $hostname, slug: $slug) {
      _id
      cuid
      slug

      type
      title
      contentMarkdown
      brief
      coverImage

      tags {
        name
        slug
      }

      dateAdded
      isActive
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

export const getPost = async (
  hostname: string,
  slug: string,
): Promise<Post> => {
  const data = await CLIENT.request<{ post: Post }>(PUBLICATION_LIST_QUERY, {
    hostname,
    slug,
  })

  const plaiceholder = data.post.coverImage
    ? await getPlaiceholder(data.post.coverImage)
    : null

  return {
    ...data.post,
    coverImageBase64: plaiceholder?.base64 ?? null,
    coverImageBlurhash: plaiceholder?.blurhash ?? null,
  }
}
