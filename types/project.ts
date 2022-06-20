export interface Project {
  slug: string
  title: string
  description: string
  category: string
  tags: string[]

  url: string
  displayUrl?: string

  pin: true
  isExternalUrl?: boolean

  logo?: string

  display?: boolean
  sort: number
}
