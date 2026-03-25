import { apiRequest, getApiBaseURL } from './http-client'
import type { ChangePasswordInput, CurrentUser, LoginInput, LoginResponse, RefreshResponse, UpdateProfileInput } from './auth-types'
import { useAuthStore } from '../store/auth-store'

export async function login(input: LoginInput): Promise<LoginResponse> {
  return apiRequest<LoginResponse>('/desktop/auth/login', {
    method: 'POST',
    body: JSON.stringify(input),
  })
}

export async function refresh(refreshToken: string): Promise<RefreshResponse> {
  return apiRequest<RefreshResponse>('/desktop/auth/refresh', {
    method: 'POST',
    body: JSON.stringify({ refreshToken }),
  })
}

export async function getCurrentUser(): Promise<CurrentUser> {
  return apiRequest<CurrentUser>('/desktop/auth/me', {
    method: 'GET',
  })
}

export async function changePassword(input: ChangePasswordInput): Promise<{ message: string }> {
  return apiRequest<{ message: string }>('/desktop/auth/password', {
    method: 'PUT',
    body: JSON.stringify(input),
  })
}

export async function updateProfile(input: UpdateProfileInput): Promise<CurrentUser> {
  return apiRequest<CurrentUser>('/desktop/auth/profile', {
    method: 'PUT',
    body: JSON.stringify(input),
  })
}

export async function uploadAvatar(file: File): Promise<{ avatar: string }> {
  const baseURL = getApiBaseURL()
  const token = useAuthStore.getState().accessToken
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch(`${baseURL}/desktop/auth/avatar`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    body: formData,
  })

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as { error?: { message?: string } } | null
    throw new Error(payload?.error?.message ?? '头像上传失败')
  }

  return (await response.json()) as { avatar: string }
}
