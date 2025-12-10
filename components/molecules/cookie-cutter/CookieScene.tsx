import { Grid, OrbitControls } from '@react-three/drei'
import { Canvas, ThreeEvent, useThree } from '@react-three/fiber'
import { useCallback, useEffect, useRef } from 'react'
import * as THREE from 'three'

import { extrudeCookiePath } from '@/lib/geometry/extrudeCookiePath'
import { useCookieStore } from '@/state/useCookieStore'

interface CookieSceneProps {
  onGroupReady?: (group: THREE.Group) => void
}

// Component that renders all cookie paths as 3D meshes
function CookieGeometryGroup({
  onGroupReady,
}: {
  onGroupReady?: (group: THREE.Group) => void
}) {
  const paths = useCookieStore((s) => s.paths)
  const selectedId = useCookieStore((s) => s.selectedId)
  const selectPath = useCookieStore((s) => s.selectPath)
  const groupRef = useRef<THREE.Group>(null)

  // Rebuild meshes when paths change
  useEffect(() => {
    const group = groupRef.current
    if (!group) return

    // Clear previous meshes
    while (group.children.length) {
      const child = group.children[0]
      group.remove(child)
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose()
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => m.dispose())
        } else {
          child.material.dispose()
        }
      }
    }

    // Add new meshes (skip hidden paths)
    for (const path of paths) {
      if (path.isHidden) continue

      // Update isSelected based on current selection
      const pathWithSelection = {
        ...path,
        isSelected: path.id === selectedId,
      }
      const mesh = extrudeCookiePath(pathWithSelection)
      group.add(mesh)
    }
  }, [paths, selectedId])

  // Notify parent when group is ready
  useEffect(() => {
    if (groupRef.current && onGroupReady) {
      onGroupReady(groupRef.current)
    }
  }, [onGroupReady])

  const handleClick = useCallback(
    (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation()
      const mesh = e.object as THREE.Mesh
      const id = mesh.userData.cookiePathId as string | undefined
      if (id) {
        selectPath(id)
      }
    },
    [selectPath],
  )

  return <group ref={groupRef} onClick={handleClick} />
}

// Camera controller to fit view to content
function CameraController() {
  const { camera } = useThree()
  const paths = useCookieStore((s) => s.paths)

  useEffect(() => {
    if (paths.length === 0) {
      // Default camera position when no paths
      camera.position.set(0, -100, 60)
      camera.lookAt(0, 0, 0)
    }
  }, [paths, camera])

  return null
}

export function CookieScene({ onGroupReady }: CookieSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, -100, 60], fov: 40 }}
      style={{ background: '#111827' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[80, 80, 100]} intensity={0.7} />
      <directionalLight position={[-50, -50, 50]} intensity={0.3} />
      <Grid
        infiniteGrid
        cellSize={10}
        sectionSize={50}
        position={[0, -0.01, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        cellColor="#374151"
        sectionColor="#4b5563"
        fadeDistance={200}
      />
      <CookieGeometryGroup onGroupReady={onGroupReady} />
      <CameraController />
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        minDistance={20}
        maxDistance={300}
      />
    </Canvas>
  )
}
