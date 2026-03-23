import Store from 'electron-store'

import {
  appSettingsInputSchema,
  appSettingsSchema,
  defaultAppSettings,
  type AppSettings,
  type AppSettingsInput,
} from '../../shared/settings'

type SettingsStoreShape = {
  preferences: {
    ui: AppSettings
  }
}

const settingsStore = new Store<SettingsStoreShape>({
  name: 'northstar-preferences',
  defaults: {
    preferences: {
      ui: defaultAppSettings,
    },
  },
})

export function getAppSettings(): AppSettings {
  return appSettingsSchema.parse(settingsStore.get('preferences.ui'))
}

export function updateAppSettings(input: AppSettingsInput): AppSettings {
  const parsedInput = appSettingsInputSchema.parse(input)
  settingsStore.set('preferences.ui', parsedInput)
  return getAppSettings()
}
