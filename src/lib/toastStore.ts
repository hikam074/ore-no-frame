import { create } from "zustand"

interface ToastState {
  loadingId: string | null
  setLoadingId: (id: string | null) => void
}

export const useToastStore = create<ToastState>((set) => ({
  loadingId: null,
  setLoadingId: (id) => set({ loadingId: id }),
}))
