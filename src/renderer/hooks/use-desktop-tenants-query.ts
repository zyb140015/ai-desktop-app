import { useQuery } from '@tanstack/react-query'
import { getDesktopTenants } from '../services/tenant-api'

export function useDesktopTenantsQuery(params: { name?: string; code?: string; status?: string; page?: number; pageSize?: number }) {
	return useQuery({ queryKey: ['desktop', 'tenants', params], queryFn: () => getDesktopTenants(params) })
}
