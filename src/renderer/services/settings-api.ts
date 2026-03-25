import { apiRequest } from './http-client'

export type DesktopSystemSettings = {
  websiteTitle: string
  systemLogo: string
  theme: string
  icp: string
  copyright: string
  requireStrongPassword: boolean
  loginFailLimit: number
  loginLockMinutes: number
}

export async function getDesktopSystemSettings(): Promise<DesktopSystemSettings> {
  return apiRequest<DesktopSystemSettings>('/desktop/settings', { method: 'GET' })
}

export async function saveDesktopSystemSettings(input: DesktopSystemSettings): Promise<DesktopSystemSettings> {
  return apiRequest<DesktopSystemSettings>('/desktop/settings', { method: 'PUT', body: JSON.stringify(input) })
}
