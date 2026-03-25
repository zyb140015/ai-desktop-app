import { apiRequest } from './http-client'

export type DesktopLoginLog = {
  id: number
  logId: string
  category: string
  userId: string
  name: string
  status: string
  time: string
  ip: string
  address: string
  browser: string
  desc: string
}

export type DesktopOperationLog = {
  id: number
  logId: string
  module: string
  category: string
  userId: string
  name: string
  status: string
  time: string
  ip: string
  browser: string
  desc: string
}

type LogResponse<T> = { items: T[]; total: number; page: number; pageSize: number }

export async function getDesktopLoginLogs(params: { name?: string; status?: string; operationDate?: string; page?: number; pageSize?: number }): Promise<LogResponse<DesktopLoginLog>> {
  const searchParams = new URLSearchParams()
  if (params.name) searchParams.set('name', params.name)
  if (params.status) searchParams.set('status', params.status)
  if (params.operationDate) {
    searchParams.set('startDate', params.operationDate)
    searchParams.set('endDate', params.operationDate)
  }
  if (params.page) searchParams.set('page', String(params.page))
  if (params.pageSize) searchParams.set('pageSize', String(params.pageSize))
  const suffix = searchParams.toString()
  return apiRequest<LogResponse<DesktopLoginLog>>(`/desktop/logs/login${suffix ? `?${suffix}` : ''}`, { method: 'GET' })
}

export async function getDesktopOperationLogs(params: { name?: string; status?: string; operationDate?: string; page?: number; pageSize?: number }): Promise<LogResponse<DesktopOperationLog>> {
  const searchParams = new URLSearchParams()
  if (params.name) searchParams.set('name', params.name)
  if (params.status) searchParams.set('status', params.status)
  if (params.operationDate) {
    searchParams.set('startDate', params.operationDate)
    searchParams.set('endDate', params.operationDate)
  }
  if (params.page) searchParams.set('page', String(params.page))
  if (params.pageSize) searchParams.set('pageSize', String(params.pageSize))
  const suffix = searchParams.toString()
  return apiRequest<LogResponse<DesktopOperationLog>>(`/desktop/logs/operation${suffix ? `?${suffix}` : ''}`, { method: 'GET' })
}
