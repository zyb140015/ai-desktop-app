import { z } from 'zod'

export const appThemeSchema = z.enum(['system', 'linen', 'harbor'])
export const densitySchema = z.enum(['compact', 'comfortable'])

export const appSettingsSchema = z.object({
  theme: appThemeSchema,
  density: densitySchema,
  launchOnStartup: z.boolean(),
  sidebarCollapsed: z.boolean(),
  workspaceName: z.string().trim().min(2).max(32),
})

export type AppSettings = z.infer<typeof appSettingsSchema>
export type AppTheme = z.infer<typeof appThemeSchema>
export type Density = z.infer<typeof densitySchema>

export const defaultAppSettings: AppSettings = {
  theme: 'linen',
  density: 'comfortable',
  launchOnStartup: false,
  sidebarCollapsed: false,
  workspaceName: 'Northstar Desk',
}

export const appSettingsInputSchema = appSettingsSchema
export type AppSettingsInput = z.infer<typeof appSettingsInputSchema>

export const themeOptions: Array<{ value: AppTheme; label: string; description: string }> = [
  {
    value: 'system',
    label: '跟随系统',
    description: '保留系统外观偏好，适合后续扩展更多主题。',
  },
  {
    value: 'linen',
    label: 'Linen',
    description: '暖白底和铜色点缀，适合信息密度较高的工作台。',
  },
  {
    value: 'harbor',
    label: 'Harbor',
    description: '偏冷灰蓝语气，适合数据监控和任务面板。',
  },
]

export const densityOptions: Array<{ value: Density; label: string; description: string }> = [
  {
    value: 'comfortable',
    label: 'Comfortable',
    description: '更宽松的面板留白，适合策略浏览和长时间阅读。',
  },
  {
    value: 'compact',
    label: 'Compact',
    description: '收紧间距，适合同时查看更多任务和状态信息。',
  },
]
