const API_URL = '/modules/Mobile/api.php'

export class SessionExpiredError extends Error {
  constructor() {
    super('Tu sesión expiró. Inicia sesión de nuevo.')
    this.name = 'SessionExpiredError'
  }
}

async function callApi<T>(operation: string, params: Record<string, string>): Promise<T> {
  const body = new URLSearchParams({ _operation: operation, ...params })

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })

  if (!res.ok) {
    throw new Error('Error de conexión con el servidor')
  }

  const data = await res.json()

  if (!data.success) {
    // 1501 = Login required / session expired
    if (data.error?.code === 1501) {
      throw new SessionExpiredError()
    }
    throw new Error(data.error?.message ?? 'Error en la solicitud')
  }

  return data.result as T
}

export interface LoginResult {
  userid: string
  session: string
  crm_tz: string
  user_currency: string
  date_format: string
}

export async function loginUser(username: string, password: string): Promise<LoginResult> {
  try {
    const result = await callApi<{ login: LoginResult }>('login', { username, password })
    return result.login
  } catch (err) {
    // Normaliza el mensaje del backend ("Authentication Failed")
    if (err instanceof Error && /authentication failed/i.test(err.message)) {
      throw new Error('Usuario o contraseña incorrectos')
    }
    throw err
  }
}

/**
 * Resuelve el ID en formato webservice (ej. "19x1") del usuario logueado,
 * necesario para filtrar registros por assigned_user_id en VTQL.
 */
export async function resolveUserWsId(session: string, username: string): Promise<string> {
  const escaped = username.replace(/'/g, "\\'")
  const result = await callApi<{ records: Array<{ id: string }> }>('query', {
    _session: session,
    query: `SELECT id FROM Users WHERE user_name = '${escaped}';`,
  })
  if (!result.records?.length) {
    throw new Error('No se pudo identificar al usuario')
  }
  return result.records[0].id
}

export interface ClientRecord {
  id: string
  accountname: string
  phone?: string
  email?: string
  bill_city?: string
}

export interface ClientsPage {
  records: ClientRecord[]
  nextPage: number
}

/**
 * Devuelve los clientes (Accounts) asignados al usuario indicado.
 */
export async function fetchClients(
  session: string,
  userWsId: string,
  page = 0,
): Promise<ClientsPage> {
  const query = `SELECT id, accountname, phone, email, bill_city FROM Accounts WHERE assigned_user_id = '${userWsId}'`
  const result = await callApi<{ records: ClientRecord[]; nextPage: number }>('query', {
    _session: session,
    query,
    page: String(page),
  })
  return { records: result.records ?? [], nextPage: result.nextPage ?? 0 }
}
