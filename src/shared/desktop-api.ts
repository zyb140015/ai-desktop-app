import type { AppMeta } from './meta'
import type { AppSettings, AppSettingsInput } from './settings'

export type DesktopApi = {
  meta: {
    get: () => Promise<AppMeta>
  }
  settings: {
    get: () => Promise<AppSettings>
    update: (input: AppSettingsInput) => Promise<AppSettings>
  }
}
