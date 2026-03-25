import { apiRequest } from './http-client'

export type DesktopMessage = {
  id: number
  type: string
  title: string
  description: string
  publishedAt: string
  author: string
  read: boolean
}

export type DesktopMessagesResponse = {
  items: DesktopMessage[]
  total: number
  page: number
  pageSize: number
}

export async function getDesktopMessages(params: { type?: string; q?: string; page?: number; pageSize?: number }): Promise<DesktopMessagesResponse> {
  const searchParams = new URLSearchParams()
  if (params.type) searchParams.set('type', params.type)
  if (params.q) searchParams.set('q', params.q)
  if (params.page) searchParams.set('page', String(params.page))
  if (params.pageSize) searchParams.set('pageSize', String(params.pageSize))
  const suffix = searchParams.toString()

  return apiRequest<DesktopMessagesResponse>(`/desktop/messages${suffix ? `?${suffix}` : ''}`, {
    method: 'GET',
  })
}

export async function markDesktopMessageRead(id: number): Promise<void> {
  await apiRequest<{ success: boolean }>('/desktop/messages/read', {
    method: 'POST',
    body: JSON.stringify({ id }),
  })
}

export async function markDesktopMessagesRead(ids: number[]): Promise<void> {
	await apiRequest<{ success: boolean }>('/desktop/messages/read-batch', {
		method: 'POST',
		body: JSON.stringify({ ids }),
	})
}
