import { create } from 'zustand'

import type { CookiePath } from '@/types/cookiePath'

interface CookieState {
  paths: CookiePath[]
  selectedId: string | null
  defaultHeightMm: number
  imprintOffsetMm: number
  setPaths: (paths: CookiePath[]) => void
  updatePath: (id: string, updater: (p: CookiePath) => CookiePath) => void
  selectPath: (id: string | null) => void
  removePath: (id: string) => void
  togglePathVisibility: (id: string) => void
  setDefaultHeight: (height: number) => void
  setImprintOffset: (offset: number) => void
  applyDefaultHeights: () => void
}

const applyDefaultHeights = (
  paths: CookiePath[],
  defaultHeightMm: number,
  imprintOffsetMm: number,
): CookiePath[] => {
  const imprintHeight = Math.max(defaultHeightMm - imprintOffsetMm, 0)
  return paths.map((p) => ({
    ...p,
    heightMm: p.mode === 'imprint' ? imprintHeight : defaultHeightMm,
  }))
}

export const useCookieStore = create<CookieState>((set) => ({
  paths: [],
  selectedId: null,
  defaultHeightMm: 10,
  imprintOffsetMm: 4,
  setPaths: (paths) => set({ paths }),
  updatePath: (id, updater) =>
    set((state) => ({
      paths: state.paths.map((p) => (p.id === id ? updater(p) : p)),
    })),
  selectPath: (id) => set({ selectedId: id }),
  removePath: (id) =>
    set((state) => ({
      paths: state.paths.filter((p) => p.id !== id),
      selectedId: state.selectedId === id ? null : state.selectedId,
    })),
  togglePathVisibility: (id) =>
    set((state) => ({
      paths: state.paths.map((p) =>
        p.id === id ? { ...p, isHidden: !p.isHidden } : p,
      ),
    })),
  setDefaultHeight: (height) =>
    set((state) => ({
      defaultHeightMm: height,
      paths: applyDefaultHeights(state.paths, height, state.imprintOffsetMm),
    })),
  setImprintOffset: (offset) =>
    set((state) => ({
      imprintOffsetMm: offset,
      paths: applyDefaultHeights(state.paths, state.defaultHeightMm, offset),
    })),
  applyDefaultHeights: () =>
    set((state) => ({
      paths: applyDefaultHeights(
        state.paths,
        state.defaultHeightMm,
        state.imprintOffsetMm,
      ),
    })),
}))
