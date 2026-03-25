import { useQuery } from '@tanstack/react-query'
import { getDesktopRoles } from '../services/role-api'

export function useDesktopRolesQuery(params: { name?: string; key?: string; status?: string; page?: number; pageSize?: number }) {
	return useQuery({ queryKey: ['desktop', 'roles', params], queryFn: () => getDesktopRoles(params) })
}
