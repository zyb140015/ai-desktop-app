import { apiRequest } from './http-client'

export type DesktopDictItem = {
  id: number
  index: number
  label: string
  keyVal: string
  styleType: string
  modified: string
  created: string
  badgeColor: string
}

export type DesktopDict = {
  id: number
  dictId: string
  name: string
  desc: string
  modified: string
  created: string
  items: DesktopDictItem[]
}

export type DesktopDictsResponse = {
  items: DesktopDict[]
  total: number
}

export async function getDesktopDicts(params: { name?: string; dictId?: string }): Promise<DesktopDictsResponse> {
  const searchParams = new URLSearchParams()
  if (params.name) searchParams.set('name', params.name)
  if (params.dictId) searchParams.set('dictId', params.dictId)
  const suffix = searchParams.toString()
  return apiRequest<DesktopDictsResponse>(`/desktop/dicts${suffix ? `?${suffix}` : ''}`, { method: 'GET' })
}

export async function createDesktopDict(input: DesktopDict): Promise<DesktopDict> {
	return apiRequest<DesktopDict>('/desktop/dicts', { method: 'POST', body: JSON.stringify(input) })
}

export async function updateDesktopDict(input: DesktopDict): Promise<DesktopDict> {
	return apiRequest<DesktopDict>('/desktop/dicts', { method: 'PUT', body: JSON.stringify(input) })
}

export async function deleteDesktopDict(id: number): Promise<void> {
	await apiRequest<{ success: boolean }>('/desktop/dicts/delete', { method: 'POST', body: JSON.stringify({ id }) })
}

export async function createDesktopDictItem(dictId: number, input: DesktopDictItem): Promise<DesktopDictItem> {
	return apiRequest<DesktopDictItem>('/desktop/dicts/items', { method: 'POST', body: JSON.stringify({ dictId, ...input }) })
}

export async function updateDesktopDictItem(input: DesktopDictItem): Promise<DesktopDictItem> {
	return apiRequest<DesktopDictItem>('/desktop/dicts/items', { method: 'PUT', body: JSON.stringify(input) })
}

export async function deleteDesktopDictItem(id: number): Promise<void> {
	await apiRequest<{ success: boolean }>('/desktop/dicts/items/delete', { method: 'POST', body: JSON.stringify({ id }) })
}
