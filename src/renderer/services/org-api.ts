import { apiRequest } from './http-client'

export type DesktopDepartment = { name: string; count: number }
export type DesktopOrg = { id: number; name: string; code: string; parent1: string; order: number; parent2: string; created: string; modified: string }
export type DesktopOrgsResponse = { departments: DesktopDepartment[]; items: DesktopOrg[]; total: number; page: number; pageSize: number }

export async function getDesktopOrgs(params: { department?: string; name?: string; code?: string; page?: number; pageSize?: number }): Promise<DesktopOrgsResponse> {
	const searchParams = new URLSearchParams()
	if (params.department) searchParams.set('department', params.department)
	if (params.name) searchParams.set('name', params.name)
	if (params.code) searchParams.set('code', params.code)
	if (params.page) searchParams.set('page', String(params.page))
	if (params.pageSize) searchParams.set('pageSize', String(params.pageSize))
	const suffix = searchParams.toString()
	return apiRequest<DesktopOrgsResponse>(`/desktop/orgs${suffix ? `?${suffix}` : ''}`, { method: 'GET' })
}
