import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import {
  appSettingsInputSchema,
  defaultAppSettings,
  densityOptions,
  themeOptions,
  type AppSettingsInput,
} from '../../shared/settings'
import { SectionCard } from '../components/section-card'
import { useSettingsQuery, useUpdateSettingsMutation } from '../hooks/use-settings-query'

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Unknown error'
}

export function SettingsPage() {
  const settingsQuery = useSettingsQuery()
  const updateSettingsMutation = useUpdateSettingsMutation()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<AppSettingsInput>({
    resolver: zodResolver(appSettingsInputSchema),
    defaultValues: defaultAppSettings,
  })

  useEffect(() => {
    if (settingsQuery.data) {
      reset(settingsQuery.data)
    }
  }, [reset, settingsQuery.data])

  const onSubmit = handleSubmit(async (values) => {
    const nextSettings = await updateSettingsMutation.mutateAsync(values)
    reset(nextSettings)
  })

  if (settingsQuery.isLoading) {
    return <div className="rounded-[28px] border border-white/70 bg-white/75 p-8 text-sm text-stone-600">Loading settings...</div>
  }

  if (settingsQuery.isError) {
    return (
      <div className="rounded-[28px] border border-rose-200 bg-rose-50/90 p-8 text-sm text-rose-700">
        Failed to load settings: {getErrorMessage(settingsQuery.error)}
      </div>
    )
  }

  return (
    <div className="space-y-6" data-testid="settings-page">
      <section className="rounded-[30px] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.97),rgba(242,233,221,0.9))] p-8 shadow-panel sm:p-10">
        <p className="text-xs uppercase tracking-[0.32em] text-amber-800/70">Settings</p>
        <h2 className="mt-4 max-w-3xl font-display text-5xl leading-[0.98] text-stone-950 sm:text-6xl">Persist desktop preferences through a typed preload bridge.</h2>
        <p className="mt-6 max-w-3xl text-base leading-7 text-stone-700">
          This form uses shared Zod schemas, React Hook Form, TanStack Query, and main-process persistence so future settings can follow the same delivery surface.
        </p>
      </section>

      <SectionCard
        eyebrow="Workspace"
        title="Preference model"
        description="Every field here maps to the shared settings schema and is persisted by the Electron main process."
        action={
          <button
            type="submit"
            form="settings-form"
            className="rounded-full bg-stone-950 px-5 py-2 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:bg-stone-400"
            disabled={isSubmitting || updateSettingsMutation.isPending || !isDirty}
          >
            {isSubmitting || updateSettingsMutation.isPending ? 'Saving...' : 'Save changes'}
          </button>
        }
      >
        <form id="settings-form" className="space-y-6" data-testid="settings-form" onSubmit={onSubmit}>
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <label className="block rounded-3xl border border-stone-200/80 bg-stone-50/80 p-5">
              <span className="text-xs uppercase tracking-[0.28em] text-stone-500">Workspace name</span>
              <input
                {...register('workspaceName')}
                className="mt-3 w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-base text-stone-900 outline-none transition focus:border-amber-400"
                placeholder="Northstar Desk"
                data-testid="workspace-name-input"
              />
              {errors.workspaceName ? <span className="mt-2 block text-sm text-rose-600">{errors.workspaceName.message}</span> : null}
            </label>

            <div className="rounded-3xl border border-stone-200/80 bg-stone-50/80 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Operational switches</p>
              <label className="mt-4 flex items-start gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-3">
                <input type="checkbox" className="mt-1 h-4 w-4" {...register('launchOnStartup')} />
                <span>
                  <span className="block text-sm font-semibold text-stone-900">Launch on startup</span>
                  <span className="mt-1 block text-sm text-stone-600">Reserve a dedicated startup behavior flag for later system integration.</span>
                </span>
              </label>
              <label className="mt-3 flex items-start gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-3">
                <input type="checkbox" className="mt-1 h-4 w-4" {...register('sidebarCollapsed')} />
                <span>
                  <span className="block text-sm font-semibold text-stone-900">Keep sidebar collapsed</span>
                  <span className="mt-1 block text-sm text-stone-600">Persist the desktop shell density without duplicating the source of truth in renderer state.</span>
                </span>
              </label>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-stone-200/80 bg-stone-50/80 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Theme</p>
              <div className="mt-4 space-y-3">
                {themeOptions.map((option) => (
                  <label key={option.value} className="flex gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-4">
                    <input type="radio" value={option.value} className="mt-1 h-4 w-4" {...register('theme')} />
                    <span>
                      <span className="block text-sm font-semibold text-stone-900">{option.label}</span>
                      <span className="mt-1 block text-sm text-stone-600">{option.description}</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-stone-200/80 bg-stone-50/80 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Density</p>
              <div className="mt-4 space-y-3">
                {densityOptions.map((option) => (
                  <label key={option.value} className="flex gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-4">
                    <input type="radio" value={option.value} className="mt-1 h-4 w-4" {...register('density')} />
                    <span>
                      <span className="block text-sm font-semibold text-stone-900">{option.label}</span>
                      <span className="mt-1 block text-sm text-stone-600">{option.description}</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {updateSettingsMutation.isError ? (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              Failed to save settings: {getErrorMessage(updateSettingsMutation.error)}
            </div>
          ) : null}

          {updateSettingsMutation.isSuccess && !isDirty ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              Preferences saved to the main-process settings store.
            </div>
          ) : null}
        </form>
      </SectionCard>
    </div>
  )
}
