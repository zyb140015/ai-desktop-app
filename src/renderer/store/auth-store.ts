import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { CurrentUser } from '../services/auth-types'

type SessionPayload = {
  accessToken: string
  refreshToken: string
  user: CurrentUser
}

type AuthState = {
  accessToken: string | null
  refreshToken: string | null
  currentUser: CurrentUser | null
  setSession: (payload: SessionPayload) => void
  setTokens: (payload: { accessToken: string; refreshToken: string }) => void
  setCurrentUser: (user: CurrentUser | null) => void
  clearSession: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      currentUser: null,
      setSession: ({ accessToken, refreshToken, user }) =>
        set({ accessToken, refreshToken, currentUser: user }),
      setTokens: ({ accessToken, refreshToken }) => set({ accessToken, refreshToken }),
      setCurrentUser: (user) => set({ currentUser: user }),
      clearSession: () => set({ accessToken: null, refreshToken: null, currentUser: null }),
    }),
    {
      name: 'desktop-auth',
    },
  ),
)
