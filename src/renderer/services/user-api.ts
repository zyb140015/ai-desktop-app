import { apiRequest } from './http-client'

export type DesktopDepartment = { name: string; count: number }
export type DesktopUser = { id: number; uid: string; name: string; dept: string; phone: string; role: string; status: string; date: string }
export type DesktopUsersResponse = { departments: DesktopDepartment[]; items: DesktopUser[]; total: number; page: number; pageSize: number }

export async function getDesktopUsers(params: { department?: string; uid?: string; name?: string; role?: string; page?: number; pageSize?: number }): Promise<DesktopUsersResponse> {
	const searchParams = new URLSearchParams()
	if (params.department) searchParams.set('department', params.department)
	if (params.uid) searchParams.set('uid', params.uid)
	if (params.name) searchParams.set('name', params.name)
	if (params.role) searchParams.set('role', params.role)
	if (params.page) searchParams.set('page', String(params.page))
	if (params.pageSize) searchParams.set('pageSize', String(params.pageSize))
	const suffix = searchParams.toString()
	return apiRequest<DesktopUsersResponse>(`/desktop/users${suffix ? `?${suffix}` : ''}`, { method: 'GET' })
}
