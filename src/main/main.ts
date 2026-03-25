import { app, BrowserWindow } from 'electron'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { registerIpcHandlers } from './ipc/register-ipc'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function createMainWindow(): BrowserWindow {
  const browserWindow = new BrowserWindow({
    width: 1440,
    height: 920,
    minWidth: 1180,
    minHeight: 760,
    backgroundColor: '#f4efe7',
    title: 'Northstar Desk',
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    void browserWindow.loadURL(process.env.VITE_DEV_SERVER_URL)
    browserWindow.webContents.openDevTools()
  } else {
    void browserWindow.loadFile(path.join(__dirname, '../dist/index.html'))
  }

  // 允许通过 F12 或 Cmd+Option+I (Mac) / Ctrl+Shift+I (Win) 随时打开关闭控制台
  browserWindow.webContents.on('before-input-event', (event, input) => {
    if (
      input.key === 'F12' ||
      (input.control && input.shift && input.key.toLowerCase() === 'i') ||
      (input.meta && input.alt && input.key.toLowerCase() === 'i')
    ) {
      browserWindow.webContents.toggleDevTools()
      event.preventDefault()
    }
  })

  return browserWindow
}

app.whenReady().then(() => {
  registerIpcHandlers()
  createMainWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
