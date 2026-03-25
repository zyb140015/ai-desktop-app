import { useAuthStore } from '../store/auth-store'

type TokenRefreshResponse = {
  tokens: {
    accessToken: string
    refreshToken: string
  }
}

type ApiErrorPayload = {
  error?: {
    code?: string
    message?: string
  }
}

export class ApiError extends Error {
  status: number
  code?: string

  constructor(message: string, status: number, code?: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
  }
}

const defaultApiBaseURL = 'http://localhost:8080'

let refreshPromise: Promise<string | null> | null = null

export async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await performRequest(path, init)

  if (response.status === 401 && path !== '/desktop/auth/refresh') {
    const nextAccessToken = await refreshAccessToken()
    if (nextAccessToken) {
      const retryResponse = await performRequest(path, init, nextAccessToken)
      return parseResponse<T>(retryResponse)
    }
  }

  return parseResponse<T>(response)
}

async function performRequest(path: string, init?: RequestInit, accessTokenOverride?: string): Promise<Response> {
  const requestURL = `${getApiBaseURL()}${path}`
  const accessToken = accessTokenOverride ?? useAuthStore.getState().accessToken

  const headers = new Headers(init?.headers)
  if (!headers.has('Content-Type') && init?.body) {
    headers.set('Content-Type', 'application/json')
  }
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`)
  }

  return fetch(requestURL, {
    ...init,
    headers,
  })
}

async function parseResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let payload: ApiErrorPayload | null = null
    try {
      payload = (await response.json()) as ApiErrorPayload
    } catch {
      payload = null
    }

    if (response.status === 401) {
      clearSessionAndRedirect()
    }

    throw new ApiError(
      payload?.error?.message ?? 'Request failed',
      response.status,
      payload?.error?.code,
    )
  }

  return (await response.json()) as T
}

async function refreshAccessToken(): Promise<string | null> {
  if (refreshPromise) {
    return refreshPromise
  }

  refreshPromise = (async () => {
    const { refreshToken, setTokens } = useAuthStore.getState()
    if (!refreshToken) {
      clearSessionAndRedirect()
      return null
    }

    const response = await fetch(`${getApiBaseURL()}/desktop/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    })

    if (!response.ok) {
      clearSessionAndRedirect()
      return null
    }

    const payload = (await response.json()) as TokenRefreshResponse
    const accessToken = payload.tokens?.accessToken
    const nextRefreshToken = payload.tokens?.refreshToken

    if (!accessToken || !nextRefreshToken) {
      clearSessionAndRedirect()
      return null
    }

    setTokens({ accessToken, refreshToken: nextRefreshToken })
    return accessToken
  })()

  try {
    return await refreshPromise
  } finally {
    refreshPromise = null
  }
}

function clearSessionAndRedirect() {
  useAuthStore.getState().clearSession()
  if (window.location.hash !== '#/login') {
    window.location.hash = '/login'
  }
}

function getApiBaseURL(): string {
  return String(import.meta.env.VITE_API_BASE_URL ?? defaultApiBaseURL).replace(/\/$/, '')
}

export { getApiBaseURL }
