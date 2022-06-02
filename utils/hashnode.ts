import { Post, User } from "../types/hashnode";

const gql = async <T>(query: string, variables: Record<string, unknown>): Promise<T> => {
  const data = await fetch('https://api.hashnode.com/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables
    })
  });

  return (await data.json()).data as T;
}

const PUBLOCATIOINS_QUERY = `
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

export const getUserPosts = async (username: string, page?: number): Promise<Post[]> => {
  const data = await gql<{ user: User }>(PUBLOCATIOINS_QUERY, {
    username, page
  })

  return data.user.publication.posts
}
