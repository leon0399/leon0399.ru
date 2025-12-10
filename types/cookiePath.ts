export type CookiePathMode = 'cut' | 'imprint'

export interface Point2D {
  x: number
  y: number
}

export interface CookiePath {
  id: string
  points: Point2D[] // closed polygon in 2D (mm units)
  isClosed: boolean

  // User parameters
  mode: CookiePathMode
  heightMm: number // extrusion height
  wallThicknessMm: number // 0 -> solid shape
  bevelMm: number // 0 -> no bevel
  zOffsetMm: number // for stacking / backing

  // UI
  isSelected: boolean
  label: string // "Outer", "Inner #1", etc.
}
