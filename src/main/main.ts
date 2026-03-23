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
  } else {
    void browserWindow.loadFile(path.join(__dirname, '../dist/index.html'))
  }

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
