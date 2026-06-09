import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/auth'

export default function Dashboard() {
  const navigate = useNavigate()
  const { username, clearAuth } = useAuthStore()

  function handleLogout() {
    clearAuth()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-full flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">V</span>
          </div>
          <span className="font-semibold text-gray-800">vtiger CRM</span>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-gray-500 font-medium"
        >
          Salir
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="bg-white rounded-2xl shadow-sm p-8 max-w-sm w-full">
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-1">¡Bienvenido!</h2>
          <p className="text-gray-500 text-sm">{username}</p>
          <p className="text-gray-400 text-xs mt-4">
            Sesión iniciada correctamente
          </p>
        </div>
      </main>
    </div>
  )
}
