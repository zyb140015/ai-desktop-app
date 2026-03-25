import { useQuery } from '@tanstack/react-query'
import { getDesktopMenuTemplates } from '../services/menu-template-api'

export function useDesktopMenuTemplatesQuery(params: { name?: string; description?: string; page?: number; pageSize?: number }) {
	return useQuery({ queryKey: ['desktop', 'menu-templates', params], queryFn: () => getDesktopMenuTemplates(params) })
}
