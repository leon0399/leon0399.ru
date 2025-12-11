import * as THREE from 'three'

import type { CookiePath } from '@/types/cookiePath'

import { cookiePathToShape } from './pathToShape'

// Color palette for different modes and selection states
const COLORS = {
  cut: {
    normal: 0x3366ff,
    selected: 0x6699ff,
  },
  imprint: {
    normal: 0x66ccff,
    selected: 0x99ddff,
  },
}

export function extrudeCookiePath(path: CookiePath): THREE.Mesh {
  const { shape } = cookiePathToShape(path)

  // Calculate bevel parameters
  const bevelEnabled = path.bevelMm > 0
  const bevelThickness = Math.min(path.bevelMm, path.heightMm / 4)
  const bevelSize = Math.min(
    path.bevelMm,
    Math.max(path.wallThicknessMm / 2, 2),
  )

  const extrudeSettings: THREE.ExtrudeGeometryOptions = {
    depth: path.heightMm,
    bevelEnabled,
    bevelThickness,
    bevelSize,
    bevelSegments: bevelEnabled ? 3 : 1,
  }

  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)

  // Don't center individually - let the scene handle overall centering
  // This preserves relative positions between multiple paths

  // Select color based on mode and selection state
  const colorSet = path.mode === 'cut' ? COLORS.cut : COLORS.imprint
  const color = path.isSelected ? colorSet.selected : colorSet.normal

  const material = new THREE.MeshStandardMaterial({
    color,
    metalness: path.isSelected ? 0.3 : 0.1,
    roughness: 0.6,
    side: THREE.DoubleSide,
  })

  const mesh = new THREE.Mesh(geometry, material)

  // Rotate to lay flat on the ground plane with extrusion along +Y
  mesh.rotation.x = Math.PI / 2

  // Position so bottom sits on Y=0 plane (after rotation, Z becomes Y)
  mesh.position.y = path.zOffsetMm

  mesh.userData.cookiePathId = path.id

  return mesh
}
