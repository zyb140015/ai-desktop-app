import { describe, expect, it } from 'vitest'

import { appSettingsInputSchema, defaultAppSettings } from './settings'

describe('appSettingsInputSchema', () => {
  it('accepts the default settings payload', () => {
    expect(appSettingsInputSchema.parse(defaultAppSettings)).toEqual(defaultAppSettings)
  })

  it('rejects a workspace name that is too short', () => {
    const result = appSettingsInputSchema.safeParse({
      ...defaultAppSettings,
      workspaceName: 'A',
    })

    expect(result.success).toBe(false)
  })
})
