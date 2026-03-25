import { apiRequest } from './http-client'

export type DesktopManagedMenu = {
	id: number
	parentId: number
	name: string
	level: string
	order: number
	type: string
	icon: string
	status: string
	path: string
	perm: string
	depth: number
	hasSub: boolean
}

export type DesktopManagedMenusResponse = { items: DesktopManagedMenu[] }

export async function getDesktopManagedMenus(params: { name?: string; type?: string; status?: string }): Promise<DesktopManagedMenusResponse> {
	const searchParams = new URLSearchParams()
	if (params.name) searchParams.set('name', params.name)
	if (params.type) searchParams.set('type', params.type)
	if (params.status) searchParams.set('status', params.status)
	const suffix = searchParams.toString()
	return apiRequest<DesktopManagedMenusResponse>(`/desktop/menus/manage${suffix ? `?${suffix}` : ''}`, { method: 'GET' })
}

export async function createDesktopManagedMenu(input: DesktopManagedMenu): Promise<DesktopManagedMenu> {
	return apiRequest<DesktopManagedMenu>('/desktop/menus/manage', { method: 'POST', body: JSON.stringify(input) })
}

export async function updateDesktopManagedMenu(input: DesktopManagedMenu): Promise<DesktopManagedMenu> {
	return apiRequest<DesktopManagedMenu>('/desktop/menus/manage', { method: 'PUT', body: JSON.stringify(input) })
}

export async function deleteDesktopManagedMenu(id: number): Promise<void> {
	await apiRequest<{ success: boolean }>('/desktop/menus/manage/delete', { method: 'POST', body: JSON.stringify({ id }) })
}
