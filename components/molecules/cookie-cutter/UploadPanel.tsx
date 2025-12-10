import { type ChangeEvent, useCallback } from 'react'
import tw from 'twin.macro'

import { parseSvgFileToCookiePaths } from '@/lib/svg/parseSvgToPaths'
import { useCookieStore } from '@/state/useCookieStore'

const Container = tw.div`space-y-4`
const Title = tw.h2`font-semibold text-lg`
const Description = tw.p`text-xs text-gray-500`

const FileInput = tw.input`
  block w-full text-sm text-gray-500
  file:(mr-4 py-2 px-4 rounded-full border-0)
  file:(text-sm font-semibold)
  file:(bg-primary-50 text-primary-700)
  file:(cursor-pointer)
  file:hover:(bg-primary-100)
`

export function UploadPanel() {
  const setPaths = useCookieStore((s) => s.setPaths)
  const selectPath = useCookieStore((s) => s.selectPath)
  const defaultHeightMm = useCookieStore((s) => s.defaultHeightMm)
  const imprintOffsetMm = useCookieStore((s) => s.imprintOffsetMm)
  const setDefaultHeight = useCookieStore((s) => s.setDefaultHeight)
  const setImprintOffset = useCookieStore((s) => s.setImprintOffset)
  const applyDefaultHeights = useCookieStore((s) => s.applyDefaultHeights)

  const handleSvgUpload = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return

      try {
        const text = await file.text()
        const paths = parseSvgFileToCookiePaths(text, {
          defaultHeightMm,
          imprintOffsetMm,
        })
        setPaths(paths)

        // Select the first path if any
        if (paths.length > 0) {
          selectPath(paths[0].id)
        }
      } catch (error) {
        console.error('Failed to parse SVG:', error)
      }
    },
    [defaultHeightMm, imprintOffsetMm, selectPath, setPaths],
  )

  return (
    <Container>
      <Title>1. Upload SVG</Title>
      <FileInput type="file" accept=".svg" onChange={handleSvgUpload} />
      <Description>
        Upload an SVG file with simple paths. Complex paths will be
        approximated. The design will be scaled to ~80mm.
      </Description>

      <Title>2. Defaults</Title>
      <div tw="space-y-2">
        <label tw="flex flex-col text-sm gap-1">
          Default height (mm)
          <input
            tw="border rounded px-2 py-1 text-sm"
            type="number"
            min={0}
            step={0.5}
            value={defaultHeightMm}
            onChange={(e) => setDefaultHeight(parseFloat(e.target.value) || 0)}
          />
        </label>

        <label tw="flex flex-col text-sm gap-1">
          Imprint offset (mm)
          <input
            tw="border rounded px-2 py-1 text-sm"
            type="number"
            min={0}
            step={0.5}
            value={imprintOffsetMm}
            onChange={(e) => setImprintOffset(parseFloat(e.target.value) || 0)}
          />
          <span tw="text-xs text-gray-500">
            Imprint paths default to height = default height - offset.
          </span>
        </label>

        <button
          tw="rounded bg-primary-600 px-3 py-1 text-sm font-semibold text-white hover:bg-primary-700"
          type="button"
          onClick={applyDefaultHeights}
        >
          Apply defaults to current paths
        </button>
      </div>
    </Container>
  )
}
