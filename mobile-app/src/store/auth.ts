import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  session: string | null
  userId: string | null
  username: string | null
  setAuth: (session: string, userId: string, username: string) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      session: null,
      userId: null,
      username: null,
      setAuth: (session, userId, username) => set({ session, userId, username }),
      clearAuth: () => set({ session: null, userId: null, username: null }),
    }),
    { name: 'vtiger-auth' },
  ),
)
