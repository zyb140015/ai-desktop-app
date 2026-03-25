import { apiRequest } from './http-client'
import type { DesktopRole } from './role-api'

export async function createDesktopRole(input: DesktopRole): Promise<DesktopRole> {
	return apiRequest<DesktopRole>('/desktop/roles', { method: 'POST', body: JSON.stringify(input) })
}

export async function updateDesktopRole(input: DesktopRole): Promise<DesktopRole> {
	return apiRequest<DesktopRole>('/desktop/roles', { method: 'PUT', body: JSON.stringify(input) })
}

export async function deleteDesktopRole(id: number): Promise<void> {
	await apiRequest<{ success: boolean }>('/desktop/roles/delete', { method: 'POST', body: JSON.stringify({ id }) })
}
