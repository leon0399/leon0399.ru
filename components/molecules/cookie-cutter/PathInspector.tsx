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

type NumericField = 'heightMm' | 'wallThicknessMm' | 'bevelMm' | 'zOffsetMm'

export function PathInspector() {
  const paths = useCookieStore((s) => s.paths)
  const selectedId = useCookieStore((s) => s.selectedId)
  const updatePath = useCookieStore((s) => s.updatePath)
  const selectPath = useCookieStore((s) => s.selectPath)

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
          <button
            key={path.id}
            tw="w-full rounded px-2 py-1 text-left text-sm"
            css={
              path.id === selectedId
                ? tw`bg-primary-100 text-primary-800`
                : tw`hover:bg-gray-100`
            }
            onClick={() => selectPath(path.id)}
          >
            {path.label}
          </button>
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
