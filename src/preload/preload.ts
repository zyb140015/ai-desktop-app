import { contextBridge, ipcRenderer } from 'electron'

import type { DesktopApi } from '../shared/desktop-api'
import { ipcChannels } from '../shared/ipc'
import { appSettingsInputSchema, type AppSettingsInput } from '../shared/settings'

const desktopApi: DesktopApi = {
  meta: {
    get: () => ipcRenderer.invoke(ipcChannels.metaGet),
  },
  settings: {
    get: () => ipcRenderer.invoke(ipcChannels.settingsGet),
    update: (input: AppSettingsInput) => {
      const parsedInput = appSettingsInputSchema.parse(input)
      return ipcRenderer.invoke(ipcChannels.settingsUpdate, parsedInput)
    },
  },
}

contextBridge.exposeInMainWorld('desktop', desktopApi)
