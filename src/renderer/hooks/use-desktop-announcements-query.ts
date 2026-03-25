import { useQuery } from '@tanstack/react-query'
import { getDesktopAnnouncements } from '../services/announcement-api'

export function useDesktopAnnouncementsQuery(params: { title?: string; type?: string; status?: string; page?: number; pageSize?: number }) {
  return useQuery({ queryKey: ['desktop', 'announcements', params], queryFn: () => getDesktopAnnouncements(params) })
}
