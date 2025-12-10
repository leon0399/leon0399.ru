import { create } from 'zustand'

import type { CookiePath } from '@/types/cookiePath'

interface CookieState {
  paths: CookiePath[]
  selectedId: string | null
  setPaths: (paths: CookiePath[]) => void
  updatePath: (id: string, updater: (p: CookiePath) => CookiePath) => void
  selectPath: (id: string | null) => void
  removePath: (id: string) => void
  togglePathVisibility: (id: string) => void
}

export const useCookieStore = create<CookieState>((set) => ({
  paths: [],
  selectedId: null,
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
}))
