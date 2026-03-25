import { apiRequest } from './http-client'
import type { DesktopMenusResponse } from './menu-types'

export async function getCurrentMenus(): Promise<DesktopMenusResponse> {
  return apiRequest<DesktopMenusResponse>('/desktop/menus/current', {
    method: 'GET',
  })
}
