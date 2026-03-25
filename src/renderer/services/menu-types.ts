export type DesktopMenu = {
  id: number
  name: string
  parentId: number
  path: string
  icon: string
  sort: number
  level: number
  componentName: string
  createdAt: string
  updatedAt: string
}

export type DesktopMenusResponse = {
  list: DesktopMenu[]
}
