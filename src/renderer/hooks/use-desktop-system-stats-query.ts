import { useQuery } from '@tanstack/react-query'

import { getDesktopSystemStats } from '../services/system-stats-api'

export function useDesktopSystemStatsQuery(range: string) {
  return useQuery({
    queryKey: ['desktop', 'stats', 'system', range],
    queryFn: () => getDesktopSystemStats(range),
  })
}
