import type { DesktopApi } from '../../shared/desktop-api'

function getDesktopApi(): DesktopApi {
  if (!window.desktop) {
    throw new Error('Desktop API is unavailable. Check the preload bridge.')
  }

  return window.desktop
}

export const desktopApi = {
  meta: {
    get: () => getDesktopApi().meta.get(),
  },
  settings: {
    get: () => getDesktopApi().settings.get(),
    update: (input: Parameters<DesktopApi['settings']['update']>[0]) =>
      getDesktopApi().settings.update(input),
  },
}
