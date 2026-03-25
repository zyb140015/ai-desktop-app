import { apiRequest } from './http-client'
import type { DesktopTenant } from './tenant-api'

export async function createDesktopTenant(input: DesktopTenant): Promise<DesktopTenant> {
	return apiRequest<DesktopTenant>('/desktop/tenants', { method: 'POST', body: JSON.stringify(input) })
}

export async function updateDesktopTenant(input: DesktopTenant): Promise<DesktopTenant> {
	return apiRequest<DesktopTenant>('/desktop/tenants', { method: 'PUT', body: JSON.stringify(input) })
}

export async function deleteDesktopTenant(id: number): Promise<void> {
	await apiRequest<{ success: boolean }>('/desktop/tenants/delete', { method: 'POST', body: JSON.stringify({ id }) })
}
