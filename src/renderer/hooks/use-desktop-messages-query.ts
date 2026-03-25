import { useQuery } from '@tanstack/react-query'

import { getDesktopMessages } from '../services/message-api'

export function useDesktopMessagesQuery(params: { type?: string; q?: string; page?: number; pageSize?: number }) {
  return useQuery({
    queryKey: ['desktop', 'messages', params],
    queryFn: () => getDesktopMessages(params),
  })
}
