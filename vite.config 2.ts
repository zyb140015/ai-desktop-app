/// <reference types="vitest/config" />

import electron from 'vite-plugin-electron/simple'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const config = {
  plugins: [
    react(),
    electron({
      main: {
        entry: 'src/main/main.ts',
      },
      preload: {
        input: 'src/preload/preload.ts',
      },
    }),
  ],
  test: {
    environment: 'node',
    globals: true,
  },
}

export default defineConfig(config)
