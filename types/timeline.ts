export interface TimelineItem {
  title: string
  description?: string
  duration: {
    start: string
    end?: string | 'Present'
  }

  icon: string
  color?: string

  homepage?: boolean
}
