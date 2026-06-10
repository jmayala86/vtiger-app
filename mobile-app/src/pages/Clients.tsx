import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/auth'
import {
  fetchClients,
  resolveUserWsId,
  SessionExpiredError,
  type ClientRecord,
} from '../api/mobile'

export default function Clients() {
  const navigate = useNavigate()
  const [clients, setClients] = useState<ClientRecord[]>([])
  const [nextPage, setNextPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [loaded, setLoaded] = useState(false)

  // Leemos el estado fresco del store dentro de la función para que su
  // identidad sea estable y el efecto inicial solo corra una vez.
  const load = useCallback(
    async (page: number) => {
      const { session, username, userWsId, setUserWsId, clearAuth } = useAuthStore.getState()
      if (!session || !username) return
      setLoading(true)
      setError('')
      try {
        let wsid = userWsId
        if (!wsid) {
          wsid = await resolveUserWsId(session)
          setUserWsId(wsid)
        }
        const res = await fetchClients(session, wsid, page)
        setClients((prev) => (page === 0 ? res.records : [...prev, ...res.records]))
        setNextPage(res.nextPage)
        setLoaded(true)
      } catch (e) {
        if (e instanceof SessionExpiredError) {
          clearAuth()
          navigate('/login', { replace: true })
          return
        }
        setError(e instanceof Error ? e.message : 'Error al cargar los clientes')
      } finally {
        setLoading(false)
      }
    },
    [navigate],
  )

  useEffect(() => {
    load(0)
  }, [load])

  return (
    <div className="min-h-full flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm px-4 py-4 flex items-center gap-3 sticky top-0 z-10">
        <button
          onClick={() => navigate('/dashboard')}
          className="text-gray-500 -ml-1 p-1"
          aria-label="Volver"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="font-semibold text-gray-800 text-lg">Mis clientes</h1>
      </header>

      <main className="flex-1 px-4 py-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        {!loaded && loading && (
          <div className="text-center text-gray-400 py-12">Cargando clientes...</div>
        )}

        {loaded && clients.length === 0 && !error && (
          <div className="text-center text-gray-400 py-12">
            Aún no has registrado tu primer contacto
          </div>
        )}

        <ul className="space-y-3">
          {clients.map((c) => (
            <li key={c.id} className="bg-white rounded-2xl shadow-sm p-4">
              <div className="font-semibold text-gray-800">{c.accountname || 'Sin nombre'}</div>
              {c.bill_city && <div className="text-sm text-gray-500 mt-0.5">{c.bill_city}</div>}
              <div className="mt-2 flex flex-col gap-1">
                {c.phone && (
                  <a href={`tel:${c.phone}`} className="text-sm text-primary flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {c.phone}
                  </a>
                )}
                {c.email1 && (
                  <a href={`mailto:${c.email1}`} className="text-sm text-primary flex items-center gap-2 break-all">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {c.email1}
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>

        {nextPage > 0 && (
          <button
            onClick={() => load(nextPage)}
            disabled={loading}
            className="w-full mt-4 bg-white border border-gray-300 text-gray-700 font-medium py-3 rounded-xl disabled:opacity-60"
          >
            {loading ? 'Cargando...' : 'Cargar más'}
          </button>
        )}
      </main>
    </div>
  )
}
