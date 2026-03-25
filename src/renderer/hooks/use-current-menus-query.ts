import { useQuery } from '@tanstack/react-query'

import { getCurrentMenus } from '../services/menu-api'

export function useCurrentMenusQuery() {
  return useQuery({
    queryKey: ['desktop', 'menus', 'current'],
    queryFn: getCurrentMenus,
    staleTime: 5 * 60 * 1000,
  })
}
