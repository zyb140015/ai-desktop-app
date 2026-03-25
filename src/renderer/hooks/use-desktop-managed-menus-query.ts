import { useQuery } from '@tanstack/react-query'
import { getDesktopManagedMenus } from '../services/menu-manage-api'

export function useDesktopManagedMenusQuery(params: { name?: string; type?: string; status?: string }) {
	return useQuery({ queryKey: ['desktop', 'menus', 'manage', params], queryFn: () => getDesktopManagedMenus(params) })
}
