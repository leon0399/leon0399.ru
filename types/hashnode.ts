export interface User {
  _id: string
  username: string
  name: string
  blogHandle: string
  publicationDomain: string
  publication: Publication
}

export interface Publication {
  _id: string
  posts: Post[]
}

export interface Post {
  _id: string
  dateAdded: string
  slug: string
  title: string
  brief: string
  coverImage: string
}
