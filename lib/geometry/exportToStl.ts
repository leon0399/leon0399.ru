import * as THREE from 'three'
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter'

export function exportSceneGroupToStl(
  group: THREE.Group,
  filename = 'cookie-cutter.stl',
): void {
  const exporter = new STLExporter()
  const result = exporter.parse(group, { binary: true })

  // STLExporter returns DataView for binary, we need its buffer
  const binaryData = result instanceof DataView ? result.buffer : result

  const blob = new Blob([binaryData], { type: 'model/stl' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()

  // Clean up
  URL.revokeObjectURL(url)
}

export function exportSceneGroupToStlString(group: THREE.Group): string {
  const exporter = new STLExporter()
  return exporter.parse(group, { binary: false }) as string
}
