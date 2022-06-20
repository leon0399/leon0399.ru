export interface Project {
  slug: string
  title: string
  description?: string
  category: string
  tags?: string[]
  logo?: string

  url?: string
  displayUrl?: string
  isExternalUrl?: boolean

  display?: boolean
  pin?: true
}
