import { apiRequest } from './http-client'

export type DesktopMonitorSummary = {
  total: number
  activeAlarmCount: number
  highestLevel: string
  lastCollectedAt: string
}

export type DesktopMonitorItem = {
  id: number
  metric: string
  value: string
  alarm: boolean
  level: string
  occurredAt: string
  description: string
  status: string
}

export type DesktopMonitorResponse = {
  summary: DesktopMonitorSummary
  items: DesktopMonitorItem[]
  total: number
  page: number
  pageSize: number
}

export async function getDesktopMonitor(params: { metric?: string; level?: string; page?: number; pageSize?: number }): Promise<DesktopMonitorResponse> {
  const searchParams = new URLSearchParams()
  if (params.metric) searchParams.set('metric', params.metric)
  if (params.level) searchParams.set('level', params.level)
  if (params.page) searchParams.set('page', String(params.page))
  if (params.pageSize) searchParams.set('pageSize', String(params.pageSize))
  const suffix = searchParams.toString()

  return apiRequest<DesktopMonitorResponse>(`/desktop/monitor${suffix ? `?${suffix}` : ''}`, {
    method: 'GET',
  })
}

export async function updateDesktopMonitorStatus(id: number, status: 'ignored' | 'processing'): Promise<void> {
  await apiRequest<{ success: boolean }>('/desktop/monitor/status', {
    method: 'POST',
    body: JSON.stringify({ id, status }),
  })
}
