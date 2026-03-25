import type { DesktopMenu } from '../services/menu-types'

const menuVisibilityStorageKey = 'desktop-visible-menu-ids'

export function loadVisibleMenuIds(): number[] | null {
  if (typeof window === 'undefined') {
    return null
  }

  const rawValue = window.localStorage.getItem(menuVisibilityStorageKey)
  if (!rawValue) {
    return null
  }

  try {
    const parsed = JSON.parse(rawValue) as unknown
    if (!Array.isArray(parsed)) {
      return null
    }
    return parsed.filter((item): item is number => typeof item === 'number')
  } catch {
    return null
  }
}

export function saveVisibleMenuIds(menuIds: number[]) {
  if (typeof window === 'undefined') {
    return
  }
  window.localStorage.setItem(menuVisibilityStorageKey, JSON.stringify(menuIds))
}

export function resolveVisibleMenuIds(menus: DesktopMenu[]): number[] {
  const storedIds = loadVisibleMenuIds()
  if (!storedIds || storedIds.length === 0) {
    return menus.map((menu) => menu.id)
  }

  const menuIdSet = new Set(menus.map((menu) => menu.id))
  const validStoredIds = storedIds.filter((menuId) => menuIdSet.has(menuId))
  return validStoredIds.length > 0 ? validStoredIds : menus.map((menu) => menu.id)
}

export function filterMenusByVisibility(menus: DesktopMenu[]): DesktopMenu[] {
  const visibleMenuIds = new Set(resolveVisibleMenuIds(menus))
  return menus.filter((menu) => visibleMenuIds.has(menu.id))
}
