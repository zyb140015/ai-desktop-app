import { apiRequest } from './http-client'

export type DesktopUsageStatsTenantOption = { code: string; name: string }
export type DesktopUsageStatsTrendPoint = { label: string; loginCount: number; usageCount: number }
export type DesktopUsageStatsModuleRank = { rank: number; name: string; count: number; change: string }

export type DesktopUsageStatsResponse = {
  tenants: DesktopUsageStatsTenantOption[]
  trend: DesktopUsageStatsTrendPoint[]
  topMost: DesktopUsageStatsModuleRank[]
  topLeast: DesktopUsageStatsModuleRank[]
}

export async function getDesktopUsageStats(params: { range: string; tenant?: string }): Promise<DesktopUsageStatsResponse> {
  const searchParams = new URLSearchParams()
  searchParams.set('range', params.range)
  if (params.tenant && params.tenant !== 'all') searchParams.set('tenant', params.tenant)
  return apiRequest<DesktopUsageStatsResponse>(`/desktop/stats/usage?${searchParams.toString()}`, { method: 'GET' })
}
