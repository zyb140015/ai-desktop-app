import { useQuery } from '@tanstack/react-query'

import { desktopApi } from '../services/desktop-api'

export function useAppMetaQuery() {
  return useQuery({
    queryKey: ['app-meta'],
    queryFn: desktopApi.meta.get,
    staleTime: Infinity,
    retry: 1,
  })
}
