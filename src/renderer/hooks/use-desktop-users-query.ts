import { useQuery } from '@tanstack/react-query'
import { getDesktopUsers } from '../services/user-api'

export function useDesktopUsersQuery(params: { department?: string; uid?: string; name?: string; role?: string; page?: number; pageSize?: number }) {
	return useQuery({ queryKey: ['desktop', 'users', params], queryFn: () => getDesktopUsers(params) })
}
