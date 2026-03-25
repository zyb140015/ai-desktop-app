import { useQuery } from '@tanstack/react-query'
import { getDesktopDicts } from '../services/dict-api'

export function useDesktopDictsQuery(params: { name?: string; dictId?: string }) {
  return useQuery({ queryKey: ['desktop', 'dicts', params], queryFn: () => getDesktopDicts(params) })
}
