import { create } from 'zustand'

type UiState = {
  mobileNavigationOpen: boolean
  setMobileNavigationOpen: (nextValue: boolean) => void
}

export const useUiStore = create<UiState>((set) => ({
  mobileNavigationOpen: false,
  setMobileNavigationOpen: (nextValue) => set({ mobileNavigationOpen: nextValue }),
}))
