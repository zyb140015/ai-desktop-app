import { apiRequest } from './http-client'
import type { DesktopUser } from './user-api'

export async function createDesktopUser(input: DesktopUser): Promise<DesktopUser> {
	return apiRequest<DesktopUser>('/desktop/users', { method: 'POST', body: JSON.stringify(input) })
}

export async function updateDesktopUser(input: DesktopUser): Promise<DesktopUser> {
	return apiRequest<DesktopUser>('/desktop/users', { method: 'PUT', body: JSON.stringify(input) })
}

export async function deleteDesktopUser(id: number): Promise<void> {
	await apiRequest<{ success: boolean }>('/desktop/users/delete', { method: 'POST', body: JSON.stringify({ id }) })
}

export async function resetDesktopUserPassword(id: number): Promise<void> {
	await apiRequest<{ success: boolean }>('/desktop/users/reset-password', { method: 'POST', body: JSON.stringify({ id }) })
}
