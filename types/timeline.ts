export interface TimelineItem {
  title: string
  description?: string
  tags?: string[]
  duration: {
    start: string
    end?: string | 'Present'
  }

  icon: string
  color?: string

  homepage?: boolean
}
