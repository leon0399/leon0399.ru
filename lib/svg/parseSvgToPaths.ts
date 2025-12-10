import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'
import { v4 as uuid } from 'uuid'

import type { CookiePath, Point2D } from '@/types/cookiePath'

const DEFAULT_PATH_CONFIG: Omit<
  CookiePath,
  'id' | 'points' | 'isClosed' | 'isSelected' | 'isHidden' | 'label'
> = {
  mode: 'cut',
  heightMm: 10,
  wallThicknessMm: 0.4,
  bevelMm: 0.5,
  zOffsetMm: 0,
}

// Sample points from a Three.js Path
function samplePathToPoints(path: THREE.Path, divisions = 64): Point2D[] {
  const points = path.getPoints(divisions)
  return points.map((p) => ({ x: p.x, y: p.y }))
}

function pointInPolygon(point: Point2D, polygon: Point2D[]): boolean {
  let inside = false

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x
    const yi = polygon[i].y
    const xj = polygon[j].x
    const yj = polygon[j].y

    const intersect =
      yi > point.y !== yj > point.y &&
      point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi

    if (intersect) {
      inside = !inside
    }
  }

  return inside
}

function markInternalPaths(paths: CookiePath[]): CookiePath[] {
  return paths.map((path, index) => {
    const isInsideAnother = paths.some((candidate, candidateIndex) => {
      if (candidateIndex === index || candidate.points.length < 3) return false

      // Cheap bounding box rejection
      const candidateBounds = calculateBounds([candidate])
      const pathBounds = calculateBounds([path])

      if (
        pathBounds.minX < candidateBounds.minX ||
        pathBounds.maxX > candidateBounds.maxX ||
        pathBounds.minY < candidateBounds.minY ||
        pathBounds.maxY > candidateBounds.maxY
      ) {
        return false
      }

      // Require every point to be inside the containing polygon to reduce false positives
      return path.points.every((pt) => pointInPolygon(pt, candidate.points))
    })

    if (isInsideAnother && path.mode !== 'imprint') {
      return { ...path, mode: 'imprint' }
    }

    return path
  })
}

// Calculate SVG bounds to center and scale the paths
function calculateBounds(paths: CookiePath[]): {
  minX: number
  minY: number
  maxX: number
  maxY: number
  width: number
  height: number
} {
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity

  for (const path of paths) {
    for (const point of path.points) {
      minX = Math.min(minX, point.x)
      minY = Math.min(minY, point.y)
      maxX = Math.max(maxX, point.x)
      maxY = Math.max(maxY, point.y)
    }
  }

  return {
    minX,
    minY,
    maxX,
    maxY,
    width: maxX - minX,
    height: maxY - minY,
  }
}

// Normalize paths to be centered at origin and scaled to reasonable mm size
// Also flips Y axis since SVG has Y pointing down, Three.js has Y pointing up
function normalizePaths(paths: CookiePath[], targetSizeMm = 80): CookiePath[] {
  if (paths.length === 0 || paths.every((p) => p.points.length === 0)) {
    return paths
  }

  const bounds = calculateBounds(paths)
  const maxDimension = Math.max(bounds.width, bounds.height)
  const scale = maxDimension > 0 ? targetSizeMm / maxDimension : 1
  const centerX = (bounds.minX + bounds.maxX) / 2
  const centerY = (bounds.minY + bounds.maxY) / 2

  return paths.map((path) => ({
    ...path,
    points: path.points.map((p) => ({
      x: (p.x - centerX) * scale,
      // Flip Y axis: SVG Y increases downward, Three.js Y increases upward
      y: -(p.y - centerY) * scale,
    })),
  }))
}

export function parseSvgFileToCookiePaths(svgContent: string): CookiePath[] {
  const loader = new SVGLoader()
  const svgData = loader.parse(svgContent)

  const paths: CookiePath[] = []
  let pathIndex = 0

  for (const shapePath of svgData.paths) {
    // Each shapePath may have multiple shapes (outer + holes)
    for (const shape of shapePath.toShapes(true)) {
      const id = uuid()
      const points = samplePathToPoints(shape, 64)

      if (points.length >= 3) {
        paths.push({
          id,
          points,
          isClosed: true,
          ...DEFAULT_PATH_CONFIG,
          isSelected: pathIndex === 0,
          isHidden: false,
          label: `Path ${pathIndex + 1}`,
        })
        pathIndex++
      }

      // Handle holes as separate paths (useful for compound shapes)
      for (const hole of shape.holes) {
        const holeId = uuid()
        const holePoints = samplePathToPoints(hole, 64)

        if (holePoints.length >= 3) {
          paths.push({
            id: holeId,
            points: holePoints,
            isClosed: true,
            ...DEFAULT_PATH_CONFIG,
            isSelected: false,
            isHidden: false,
            label: `Path ${pathIndex + 1} (hole)`,
          })
          pathIndex++
        }
      }
    }
  }

  // Normalize and center paths, then mark inner paths as imprints
  const normalized = normalizePaths(paths)
  return markInternalPaths(normalized)
}
