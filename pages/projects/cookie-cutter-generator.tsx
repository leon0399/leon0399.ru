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
import ProjectHeader from '@/components/molecules/projects/ProjectHeader'
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
    <div tw="flex min-h-screen flex-col">
      <Head>
        <title>Cookie Cutter Generator - Leonid Meleshin</title>
        <meta
          name="description"
          content="Generate 3D-printable cookie cutters from SVG files. Customize height, wall thickness, and bevel for perfect cookie cutters."
        />
      </Head>

      <div tw="container mx-auto px-4">
        <ProjectHeader
          title="Cookie Cutter Generator"
          category="Tools"
          tags={['3D Printing', 'WebGL']}
          url="https://leon0399.ru/projects/cookie-cutter-generator"
          displayUrl="leon0399.ru/projects/cookie-cutter-generator"
        />
      </div>

      <main tw="flex flex-1 flex-col lg:flex-row">
        {/* Left panel - Upload */}
        <aside tw="w-full border-b bg-gray-50 p-4 lg:w-64 lg:border-b-0 lg:border-r dark:bg-gray-900">
          <UploadPanel />
        </aside>

        {/* Main content - 3D scene */}
        <section tw="flex min-h-[400px] flex-1 flex-col lg:min-h-0">
          <div tw="relative flex-1">
            <CookieScene onGroupReady={handleGroupReady} />
          </div>

          {/* Export buttons */}
          <div tw="flex justify-end gap-2 border-t bg-gray-50 p-3 dark:bg-gray-900">
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

        {/* Right panel - Inspector */}
        <aside tw="w-full border-t bg-gray-50 p-4 lg:w-80 lg:border-l lg:border-t-0 dark:bg-gray-900">
          <PathInspector />
        </aside>
      </main>
    </div>
  )
}

export default CookieCutterGeneratorPage
