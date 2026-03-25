import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getDesktopSystemSettings, saveDesktopSystemSettings, type DesktopSystemSettings } from '../services/settings-api'

const settingsKey = ['desktop', 'settings'] as const

export function useDesktopSettingsQuery() {
  return useQuery({ queryKey: settingsKey, queryFn: getDesktopSystemSettings })
}

export function useSaveDesktopSettingsMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: DesktopSystemSettings) => saveDesktopSystemSettings(input),
    onSuccess: (data) => {
      queryClient.setQueryData(settingsKey, data)
    },
  })
}
