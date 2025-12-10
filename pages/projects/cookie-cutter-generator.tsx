import 'twin.macro'

import dynamic from 'next/dynamic'
import Head from 'next/head'
import type { FC } from 'react'
import { useCallback, useRef } from 'react'
import * as THREE from 'three'

import Button from '@/components/atoms/Button'
import {
  PathInspector,
  UploadPanel,
} from '@/components/molecules/cookie-cutter'
import { exportSceneGroupToStl } from '@/lib/geometry/exportToStl'
import { downloadScadFile } from '@/lib/openscad/cookieToScad'
import { useCookieStore } from '@/state/useCookieStore'

// Dynamic import for CookieScene to avoid SSR issues with Three.js
const CookieScene = dynamic(
  () =>
    import('@/components/molecules/cookie-cutter/CookieScene').then(
      (mod) => mod.CookieScene,
    ),
  { ssr: false },
)

const CookieCutterGeneratorPage: FC = () => {
  const groupRef = useRef<THREE.Group | null>(null)
  const paths = useCookieStore((s) => s.paths)

  const handleGroupReady = useCallback((group: THREE.Group) => {
    groupRef.current = group
  }, [])

  const handleExportStl = useCallback(() => {
    if (groupRef.current && groupRef.current.children.length > 0) {
      exportSceneGroupToStl(groupRef.current)
    }
  }, [])

  const handleExportScad = useCallback(() => {
    if (paths.length > 0) {
      downloadScadFile(paths)
    }
  }, [paths])

  return (
    <div tw="flex h-screen flex-col overflow-hidden">
      <Head>
        <title>Cookie Cutter Generator - Leonid Meleshin</title>
        <meta
          name="description"
          content="Generate 3D-printable cookie cutters from SVG files. Customize height, wall thickness, and bevel for perfect cookie cutters."
        />
      </Head>

      <div tw="shrink-0 border-b px-4 py-2">
        <h1 tw="text-xl font-bold">Cookie Cutter Generator</h1>
      </div>

      <main tw="flex min-h-0 flex-1 flex-col lg:flex-row">
        {/* Left panel - Upload & Paths */}
        <aside tw="flex w-full shrink-0 flex-col gap-4 overflow-y-auto border-b bg-gray-50 p-4 lg:w-72 lg:border-b-0 lg:border-r dark:bg-gray-900">
          <UploadPanel />
          <PathInspector />
        </aside>

        {/* Main content - 3D scene */}
        <section tw="flex min-h-0 flex-1 flex-col">
          <div tw="relative min-h-0 flex-1">
            <CookieScene onGroupReady={handleGroupReady} />
          </div>

          {/* Export buttons */}
          <div tw="flex shrink-0 justify-end gap-2 border-t bg-gray-50 p-3 dark:bg-gray-900">
            <Button
              onClick={handleExportScad}
              tw="text-sm"
              disabled={paths.length === 0}
            >
              Download SCAD
            </Button>
            <Button
              onClick={handleExportStl}
              tw="text-sm"
              disabled={paths.length === 0}
            >
              Download STL
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}

export default CookieCutterGeneratorPage
