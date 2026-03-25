import { useQuery } from '@tanstack/react-query'
import { getDesktopOrgs } from '../services/org-api'

export function useDesktopOrgsQuery(params: { department?: string; name?: string; code?: string; page?: number; pageSize?: number }) {
	return useQuery({ queryKey: ['desktop', 'orgs', params], queryFn: () => getDesktopOrgs(params) })
}
