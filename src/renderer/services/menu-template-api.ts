import { apiRequest } from './http-client'

export type DesktopMenuTemplate = { id: number; name: string; tenants: number; desc: string; modified: string; created: string }
export type DesktopMenuTemplatesResponse = { items: DesktopMenuTemplate[]; total: number; page: number; pageSize: number }

export async function getDesktopMenuTemplates(params: { name?: string; description?: string; page?: number; pageSize?: number }): Promise<DesktopMenuTemplatesResponse> {
	const searchParams = new URLSearchParams()
	if (params.name) searchParams.set('name', params.name)
	if (params.description) searchParams.set('description', params.description)
	if (params.page) searchParams.set('page', String(params.page))
	if (params.pageSize) searchParams.set('pageSize', String(params.pageSize))
	const suffix = searchParams.toString()
	return apiRequest<DesktopMenuTemplatesResponse>(`/desktop/menu-templates${suffix ? `?${suffix}` : ''}`, { method: 'GET' })
}

export async function createDesktopMenuTemplate(input: DesktopMenuTemplate): Promise<DesktopMenuTemplate> {
	return apiRequest<DesktopMenuTemplate>('/desktop/menu-templates', { method: 'POST', body: JSON.stringify(input) })
}

export async function updateDesktopMenuTemplate(input: DesktopMenuTemplate): Promise<DesktopMenuTemplate> {
	return apiRequest<DesktopMenuTemplate>('/desktop/menu-templates', { method: 'PUT', body: JSON.stringify(input) })
}

export async function deleteDesktopMenuTemplate(id: number): Promise<void> {
	await apiRequest<{ success: boolean }>('/desktop/menu-templates/delete', { method: 'POST', body: JSON.stringify({ id }) })
}
