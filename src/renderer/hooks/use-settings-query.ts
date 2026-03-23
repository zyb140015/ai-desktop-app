import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type { AppSettingsInput } from '../../shared/settings'
import { desktopApi } from '../services/desktop-api'

const settingsQueryKey = ['app-settings'] as const

export function useSettingsQuery() {
  return useQuery({
    queryKey: settingsQueryKey,
    queryFn: desktopApi.settings.get,
    staleTime: 30_000,
    retry: 1,
  })
}

export function useUpdateSettingsMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: AppSettingsInput) => desktopApi.settings.update(input),
    onSuccess: (settings) => {
      queryClient.setQueryData(settingsQueryKey, settings)
    },
  })
}
