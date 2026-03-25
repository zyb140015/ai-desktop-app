import { apiRequest } from './http-client'
import type { DesktopOrg } from './org-api'

export async function createDesktopOrg(input: DesktopOrg): Promise<DesktopOrg> {
	return apiRequest<DesktopOrg>('/desktop/orgs', { method: 'POST', body: JSON.stringify(input) })
}

export async function updateDesktopOrg(input: DesktopOrg): Promise<DesktopOrg> {
	return apiRequest<DesktopOrg>('/desktop/orgs', { method: 'PUT', body: JSON.stringify(input) })
}

export async function deleteDesktopOrg(id: number): Promise<void> {
	await apiRequest<{ success: boolean }>('/desktop/orgs/delete', { method: 'POST', body: JSON.stringify({ id }) })
}
