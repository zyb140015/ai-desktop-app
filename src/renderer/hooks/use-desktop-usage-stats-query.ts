import { useQuery } from '@tanstack/react-query'

import { getDesktopUsageStats } from '../services/usage-stats-api'

export function useDesktopUsageStatsQuery(range: string, tenant: string) {
  return useQuery({
    queryKey: ['desktop', 'stats', 'usage', range, tenant],
    queryFn: () => getDesktopUsageStats({ range, tenant }),
  })
}
