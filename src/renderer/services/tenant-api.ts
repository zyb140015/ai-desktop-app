import { apiRequest } from './http-client'

export type DesktopTenant = { id: number; code: string; name: string; status: string; period: string; admin: string; phone: string }
export type DesktopTenantsResponse = { items: DesktopTenant[]; total: number; page: number; pageSize: number }

export async function getDesktopTenants(params: { name?: string; code?: string; status?: string; page?: number; pageSize?: number }): Promise<DesktopTenantsResponse> {
	const searchParams = new URLSearchParams()
	if (params.name) searchParams.set('name', params.name)
	if (params.code) searchParams.set('code', params.code)
	if (params.status) searchParams.set('status', params.status)
	if (params.page) searchParams.set('page', String(params.page))
	if (params.pageSize) searchParams.set('pageSize', String(params.pageSize))
	const suffix = searchParams.toString()
	return apiRequest<DesktopTenantsResponse>(`/desktop/tenants${suffix ? `?${suffix}` : ''}`, { method: 'GET' })
}
