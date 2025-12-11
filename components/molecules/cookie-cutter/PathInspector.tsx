import { EyeIcon, EyeSlashIcon, TrashIcon } from '@heroicons/react/24/outline'
import { type ChangeEvent, useCallback } from 'react'
import tw from 'twin.macro'

import { useCookieStore } from '@/state/useCookieStore'
import type { CookiePathMode } from '@/types/cookiePath'

const Container = tw.div`space-y-4`
const Title = tw.h2`font-semibold text-lg`
const EmptyMessage = tw.p`text-sm text-gray-500`

const Label = tw.label`flex flex-col text-sm gap-1`
const Select = tw.select`border rounded px-2 py-1 text-sm bg-white`
const Input = tw.input`border rounded px-2 py-1 text-sm`

const PathList = tw.div`space-y-1 mb-4`

const IconButton = tw.button`
  p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700
  text-gray-500 hover:text-gray-700 dark:hover:text-gray-300
`

type NumericField = 'heightMm' | 'wallThicknessMm' | 'bevelMm' | 'zOffsetMm'

export function PathInspector() {
  const paths = useCookieStore((s) => s.paths)
  const selectedId = useCookieStore((s) => s.selectedId)
  const updatePath = useCookieStore((s) => s.updatePath)
  const selectPath = useCookieStore((s) => s.selectPath)
  const removePath = useCookieStore((s) => s.removePath)
  const togglePathVisibility = useCookieStore((s) => s.togglePathVisibility)

  const selectedPath = paths.find((p) => p.id === selectedId)

  const handleNumChange = useCallback(
    (field: NumericField) => (e: ChangeEvent<HTMLInputElement>) => {
      if (!selectedId) return
      const value = parseFloat(e.target.value) || 0
      updatePath(selectedId, (p) => ({ ...p, [field]: value }))
    },
    [selectedId, updatePath],
  )

  const handleModeChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      if (!selectedId) return
      const value = e.target.value as CookiePathMode
      updatePath(selectedId, (p) => ({ ...p, mode: value }))
    },
    [selectedId, updatePath],
  )

  if (paths.length === 0) {
    return (
      <Container>
        <Title>Path Inspector</Title>
        <EmptyMessage>Upload an SVG to get started.</EmptyMessage>
      </Container>
    )
  }

  return (
    <Container>
      <Title>Paths</Title>

      <PathList>
        {paths.map((path) => (
          <div
            key={path.id}
            tw="flex items-center gap-1 rounded"
            css={
              path.id === selectedId
                ? tw`bg-primary-100`
                : tw`hover:bg-gray-100`
            }
          >
            <button
              tw="flex-1 rounded px-2 py-1 text-left text-sm"
              css={[
                path.id === selectedId && tw`text-primary-800`,
                path.isHidden && tw`opacity-50 line-through`,
              ]}
              onClick={() => selectPath(path.id)}
            >
              {path.label}
            </button>
            <IconButton
              onClick={(e) => {
                e.stopPropagation()
                togglePathVisibility(path.id)
              }}
              title={path.isHidden ? 'Show path' : 'Hide path'}
            >
              {path.isHidden ? (
                <EyeSlashIcon tw="h-4 w-4" />
              ) : (
                <EyeIcon tw="h-4 w-4" />
              )}
            </IconButton>
            <IconButton
              onClick={(e) => {
                e.stopPropagation()
                removePath(path.id)
              }}
              title="Remove path"
            >
              <TrashIcon tw="h-4 w-4" />
            </IconButton>
          </div>
        ))}
      </PathList>

      {selectedPath && (
        <>
          <Title>Settings: {selectedPath.label}</Title>

          <Label>
            Mode
            <Select value={selectedPath.mode} onChange={handleModeChange}>
              <option value="cut">Cut (full depth)</option>
              <option value="imprint">Imprint (partial depth)</option>
            </Select>
          </Label>

          <Label>
            Height (mm)
            <Input
              type="number"
              value={selectedPath.heightMm}
              onChange={handleNumChange('heightMm')}
              min={1}
              step={0.5}
            />
          </Label>

          <Label>
            Wall thickness (mm)
            <Input
              type="number"
              value={selectedPath.wallThicknessMm}
              onChange={handleNumChange('wallThicknessMm')}
              min={0}
              step={0.2}
            />
          </Label>

          <Label>
            Bevel amount (mm)
            <Input
              type="number"
              value={selectedPath.bevelMm}
              onChange={handleNumChange('bevelMm')}
              min={0}
              step={0.2}
            />
          </Label>

          <Label>
            Z offset (mm)
            <Input
              type="number"
              value={selectedPath.zOffsetMm}
              onChange={handleNumChange('zOffsetMm')}
              step={0.5}
            />
          </Label>
        </>
      )}
    </Container>
  )
}
