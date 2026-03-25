import { apiRequest } from './http-client'

export type DesktopRole = { id: number; name: string; key: string; order: number; status: boolean; date: string }
export type DesktopRolesResponse = { items: DesktopRole[]; total: number; page: number; pageSize: number }

export async function getDesktopRoles(params: { name?: string; key?: string; status?: string; page?: number; pageSize?: number }): Promise<DesktopRolesResponse> {
	const searchParams = new URLSearchParams()
	if (params.name) searchParams.set('name', params.name)
	if (params.key) searchParams.set('key', params.key)
	if (params.status) searchParams.set('status', params.status)
	if (params.page) searchParams.set('page', String(params.page))
	if (params.pageSize) searchParams.set('pageSize', String(params.pageSize))
	const suffix = searchParams.toString()
	return apiRequest<DesktopRolesResponse>(`/desktop/roles${suffix ? `?${suffix}` : ''}`, { method: 'GET' })
}
