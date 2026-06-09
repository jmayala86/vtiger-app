import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/auth'

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const session = useAuthStore((s) => s.session)
  return session ? <>{children}</> : <Navigate to="/login" replace />
}
