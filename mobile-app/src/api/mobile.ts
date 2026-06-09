const API_URL = '/modules/Mobile/api.php'

export interface LoginResult {
  userid: string
  session: string
  crm_tz: string
  user_currency: string
  date_format: string
}

export async function loginUser(username: string, password: string): Promise<LoginResult> {
  const body = new URLSearchParams({
    _operation: 'login',
    username,
    password,
  })

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
    throw new Error(data.error?.message ?? 'Usuario o contraseña incorrectos')
  }

  return data.result.login as LoginResult
}
