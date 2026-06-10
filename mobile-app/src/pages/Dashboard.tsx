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

      <main className="flex-1 px-6 py-6">
        <div className="max-w-sm mx-auto">
          <h2 className="text-xl font-bold text-gray-800 mb-1">¡Bienvenido!</h2>
          <p className="text-gray-500 text-sm mb-6">{username}</p>

          <button
            onClick={() => navigate('/clients')}
            className="w-full bg-white rounded-2xl shadow-sm p-5 flex items-center gap-4 text-left active:scale-[0.98] transition-transform"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-3-6.65" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-800">Mis clientes</div>
              <div className="text-sm text-gray-500">Clientes asignados a ti</div>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </main>
    </div>
  )
}
