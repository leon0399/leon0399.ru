import ClipperLib from 'clipper-lib'
import * as THREE from 'three'

import type { CookiePath } from '@/types/cookiePath'

export interface ShapeResult {
  shape: THREE.Shape
}

// Scale factor for Clipper (uses integer math)
const CLIPPER_SCALE = 1000

export function cookiePathToShape(path: CookiePath): ShapeResult {
  const shape = new THREE.Shape()

  if (path.points.length < 3) {
    return { shape }
  }

  // Convert points to Clipper format
  const polygon = path.points.map((p) => ({
    X: Math.round(p.x * CLIPPER_SCALE),
    Y: Math.round(p.y * CLIPPER_SCALE),
  }))

  // Create the outer shape
  shape.moveTo(path.points[0].x, path.points[0].y)
  for (let i = 1; i < path.points.length; i++) {
    shape.lineTo(path.points[i].x, path.points[i].y)
  }
  shape.closePath()

  // If wallThicknessMm > 0, create an inner hole by offsetting inward
  if (path.wallThicknessMm > 0) {
    const co = new ClipperLib.ClipperOffset()

    // Add the polygon path for offsetting
    co.AddPath(
      polygon,
      ClipperLib.JoinType.jtMiter,
      ClipperLib.EndType.etClosedPolygon,
    )

    const solution: Array<Array<{ X: number; Y: number }>> = []
    const offset = -path.wallThicknessMm * CLIPPER_SCALE // negative = inward

    co.Execute(solution, offset)

    // Add the offset polygon as a hole
    if (solution.length > 0 && solution[0].length >= 3) {
      const inner = solution[0]
      const holePath = new THREE.Path()

      holePath.moveTo(inner[0].X / CLIPPER_SCALE, inner[0].Y / CLIPPER_SCALE)
      for (let i = 1; i < inner.length; i++) {
        holePath.lineTo(inner[i].X / CLIPPER_SCALE, inner[i].Y / CLIPPER_SCALE)
      }
      holePath.closePath()
      shape.holes.push(holePath)
    }
  }

  return { shape }
}
