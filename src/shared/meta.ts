import { z } from 'zod'

export const appMetaSchema = z.object({
  appName: z.string(),
  appVersion: z.string(),
  desktopFocus: z.string(),
  layers: z.array(
    z.object({
      name: z.string(),
      responsibility: z.string(),
    }),
  ),
})

export type AppMeta = z.infer<typeof appMetaSchema>
