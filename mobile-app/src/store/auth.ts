import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  session: string | null
  userId: string | null
  username: string | null
  userWsId: string | null
  setAuth: (session: string, userId: string, username: string) => void
  setUserWsId: (userWsId: string) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      session: null,
      userId: null,
      username: null,
      userWsId: null,
      setAuth: (session, userId, username) => set({ session, userId, username }),
      setUserWsId: (userWsId) => set({ userWsId }),
      clearAuth: () => set({ session: null, userId: null, username: null, userWsId: null }),
    }),
    { name: 'vtiger-auth' },
  ),
)
