import { type Post, type User } from '../types/hashnode'
import { getPlaiceholder } from 'plaiceholder'

const gql = async <T>(
  query: string,
  variables: Record<string, unknown>,
): Promise<T> => {
  const data = await fetch('https://api.hashnode.com/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  return (await data.json()).data as T
}

const PUBLOCATIONS_QUERY = `
  query Publications($username: String!, $page: Int){
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

const PUBLOCATION_QUERY = `
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
  const data = await gql<{ user: User }>(PUBLOCATIONS_QUERY, {
    username,
    page,
  })

  return data.user.publication.posts
}

export const getPost = async (
  hostname: string,
  slug: string,
): Promise<Post> => {
  const data = await gql<{ post: Post }>(PUBLOCATION_QUERY, {
    hostname,
    slug,
  })

  const { base64, blurhash } = await getPlaiceholder(data.post.coverImage)

  return {
    ...data.post,
    coverImageBase64: base64,
    coverImageBlurhash: blurhash,
  }
}
