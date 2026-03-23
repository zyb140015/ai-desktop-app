import { app, ipcMain } from 'electron'

import { ipcChannels } from '../../shared/ipc'
import { appMetaSchema, type AppMeta } from '../../shared/meta'
import { appSettingsInputSchema } from '../../shared/settings'
import { getAppSettings, updateAppSettings } from '../services/settings-store'

export function registerIpcHandlers(): void {
  ipcMain.handle(ipcChannels.metaGet, () => {
    const payload: AppMeta = {
      appName: 'Northstar Desk',
      appVersion: app.getVersion(),
      desktopFocus: '面向 AI 持续扩展页面的 Electron 工作台基座。',
      layers: [
        {
          name: 'main',
          responsibility: '窗口、系统能力、设置存储和 IPC handler。',
        },
        {
          name: 'preload',
          responsibility: '对渲染层暴露最小且强类型的桥接 API。',
        },
        {
          name: 'renderer',
          responsibility: 'React 路由、界面、表单、查询和交互状态。',
        },
        {
          name: 'shared',
          responsibility: '跨层共享 schema、类型、导航元数据和 IPC 合约。',
        },
      ],
    }

    return appMetaSchema.parse(payload)
  })

  ipcMain.handle(ipcChannels.settingsGet, () => getAppSettings())

  ipcMain.handle(ipcChannels.settingsUpdate, (_event, payload: unknown) => {
    return updateAppSettings(appSettingsInputSchema.parse(payload))
  })
}
