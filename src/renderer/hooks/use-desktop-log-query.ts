import { useQuery } from '@tanstack/react-query'
import { getDesktopLoginLogs, getDesktopOperationLogs } from '../services/log-api'

export function useDesktopLoginLogsQuery(params: { name?: string; status?: string; operationDate?: string; page?: number; pageSize?: number }) {
  return useQuery({ queryKey: ['desktop', 'logs', 'login', params], queryFn: () => getDesktopLoginLogs(params) })
}

export function useDesktopOperationLogsQuery(params: { name?: string; status?: string; operationDate?: string; page?: number; pageSize?: number }) {
  return useQuery({ queryKey: ['desktop', 'logs', 'operation', params], queryFn: () => getDesktopOperationLogs(params) })
}
