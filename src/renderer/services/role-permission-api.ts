import { apiRequest } from './http-client'

export type DesktopRoleDataPermission = {
  roleId: number
  scope: string
  departments: string[]
}

export async function getDesktopRoleDataPermission(roleId: number): Promise<DesktopRoleDataPermission> {
  return apiRequest<DesktopRoleDataPermission>(`/desktop/roles/data-permission?roleId=${roleId}`, { method: 'GET' })
}

export async function saveDesktopRoleDataPermission(input: DesktopRoleDataPermission): Promise<DesktopRoleDataPermission> {
  return apiRequest<DesktopRoleDataPermission>('/desktop/roles/data-permission', { method: 'PUT', body: JSON.stringify(input) })
}
