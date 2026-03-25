import { useQuery } from '@tanstack/react-query'

import { getDesktopMonitor } from '../services/monitor-api'

export function useDesktopMonitorQuery(params: { metric?: string; level?: string; page?: number; pageSize?: number }) {
  return useQuery({
    queryKey: ['desktop', 'monitor', params],
    queryFn: () => getDesktopMonitor(params),
  })
}
