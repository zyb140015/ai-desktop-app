import { apiRequest } from './http-client'

export type DesktopSystemStatsAlertCard = { label: string; value: number; change: string; period: string }
export type DesktopSystemStatsTrendPoint = { label: string; value: number }
export type DesktopSystemStatsTenantBucket = { count: number; names: string[] }
export type DesktopSystemStatsRoleStat = { label: string; count: number }
export type DesktopSystemStatsDepartment = { name: string; count: number }

export type DesktopSystemStatsResponse = {
  alertCards: DesktopSystemStatsAlertCard[]
  trend: DesktopSystemStatsTrendPoint[]
  tenantTotal: number
  tenantOpenCount: number
  tenantClosedCount: number
  tenantNormal: DesktopSystemStatsTenantBucket
  tenantExpiring: DesktopSystemStatsTenantBucket
  tenantExpired: DesktopSystemStatsTenantBucket
  employeeTotal: number
  roleStats: DesktopSystemStatsRoleStat[]
  departmentStats: DesktopSystemStatsDepartment[]
}

export async function getDesktopSystemStats(range: string): Promise<DesktopSystemStatsResponse> {
  return apiRequest<DesktopSystemStatsResponse>(`/desktop/stats/system?range=${range}`, { method: 'GET' })
}
