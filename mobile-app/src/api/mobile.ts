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
    throw new Error(`Error del servidor (${res.status})`)
  }

  const text = await res.text()
  let data: { success: boolean; result?: T; error?: { code: number; message: string } }
  try {
    data = JSON.parse(text)
  } catch {
    // El servidor devolvió algo que no es JSON (página de error PHP/Apache/vtiger)
    const preview = text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 120)
    throw new Error(`El servidor devolvió una respuesta inesperada: "${preview}"`)
  }

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
 * Resuelve el ID en formato webservice (ej. "19x1") del usuario logueado
 * usando el campo 'assigned_user_id' del describe de Contacts, que incluye
 * el WS ID del usuario actual en su valor default.
 */
export async function resolveUserWsId(session: string): Promise<string> {
  const result = await callApi<{ describe: { fields: Array<{ name: string; default?: string }> } }>(
    'describe',
    { _session: session, module: 'Contacts' },
  )
  const assignedField = result.describe.fields.find((f) => f.name === 'assigned_user_id')
  if (!assignedField?.default) {
    throw new Error('No se pudo identificar al usuario')
  }
  return assignedField.default
}

export interface ClientRecord {
  id: string
  firstname?: string
  lastname?: string
  email?: string
  phone?: string
  mobile?: string
}

export interface ClientsPage {
  records: ClientRecord[]
  nextPage: number
}

/**
 * Devuelve los contactos (Contacts) asignados al usuario indicado.
 */
export async function fetchClients(
  session: string,
  userWsId: string,
  page = 0,
): Promise<ClientsPage> {
  const query = `SELECT id, firstname, lastname, email, phone, mobile FROM Contacts WHERE assigned_user_id = '${userWsId}'`
  const result = await callApi<{ records: ClientRecord[]; nextPage: number }>('query', {
    _session: session,
    query,
    page: String(page),
  })
  return { records: result.records ?? [], nextPage: result.nextPage ?? 0 }
}
