import { apiRequest } from './http-client'

export type DesktopAnnouncement = {
  id: number
  title: string
  type: string
  status: string
  publish: string
  create: string
}

export type DesktopAnnouncementsResponse = {
  items: DesktopAnnouncement[]
  total: number
  page: number
  pageSize: number
}

export async function getDesktopAnnouncements(params: { title?: string; type?: string; status?: string; page?: number; pageSize?: number }): Promise<DesktopAnnouncementsResponse> {
  const searchParams = new URLSearchParams()
  if (params.title) searchParams.set('title', params.title)
  if (params.type) searchParams.set('type', params.type)
  if (params.status) searchParams.set('status', params.status)
  if (params.page) searchParams.set('page', String(params.page))
  if (params.pageSize) searchParams.set('pageSize', String(params.pageSize))
  const suffix = searchParams.toString()
  return apiRequest<DesktopAnnouncementsResponse>(`/desktop/announcements${suffix ? `?${suffix}` : ''}`, { method: 'GET' })
}

export async function createDesktopAnnouncement(input: DesktopAnnouncement): Promise<DesktopAnnouncement> {
	return apiRequest<DesktopAnnouncement>('/desktop/announcements', { method: 'POST', body: JSON.stringify(input) })
}

export async function updateDesktopAnnouncement(input: DesktopAnnouncement): Promise<DesktopAnnouncement> {
	return apiRequest<DesktopAnnouncement>('/desktop/announcements', { method: 'PUT', body: JSON.stringify(input) })
}

export async function publishDesktopAnnouncement(id: number): Promise<void> {
	await apiRequest<{ success: boolean }>('/desktop/announcements/publish', { method: 'POST', body: JSON.stringify({ id }) })
}

export async function deleteDesktopAnnouncement(id: number): Promise<void> {
	await apiRequest<{ success: boolean }>('/desktop/announcements/delete', { method: 'POST', body: JSON.stringify({ id }) })
}
