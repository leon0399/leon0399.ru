export interface User {
  posts: { nodes: Post[] }
}

export interface Post {
  id: string
  slug: string
  title: string
  brief: string

  publishedAt: string
  coverImage?: PostCoverImage
}

export interface PostCoverImage {
  url?: string
  base64?: string | null
  blurhash: any
}
