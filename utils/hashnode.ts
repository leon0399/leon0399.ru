import { gql, GraphQLClient } from 'graphql-request'
import { getPlaiceholder } from 'plaiceholder'

import { type Post, type User } from '../types/hashnode'

export const API_URL = 'https://api.hashnode.com/'

export const CLIENT = new GraphQLClient(API_URL)

const PUBLOCATIONS_QUERY = gql`
  query Publications($username: String!, $page: Int) {
    user(username: $username) {
      publicationDomain
      publication {
        posts(page: $page) {
          _id
          cuid
          slug

          type
          title
          brief
          coverImage

          # tags {
          #   name
          #   slug
          # }

          dateAdded
          isActive
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
  const data = await CLIENT.request<{ user: User }>(PUBLOCATIONS_QUERY, {
    username,
    page,
  })

  return data.user.publication.posts
}

export const getPost = async (
  hostname: string,
  slug: string,
): Promise<Post> => {
  const data = await CLIENT.request<{ post: Post }>(PUBLOCATION_QUERY, {
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
