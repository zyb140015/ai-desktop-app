import { useEffect, useRef } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { getCurrentUser } from '../services/auth-api'
import { useAuthStore } from '../store/auth-store'

export function RequireAuth() {
  const location = useLocation()
  const accessToken = useAuthStore((state) => state.accessToken)
  const currentUser = useAuthStore((state) => state.currentUser)
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser)
  const clearSession = useAuthStore((state) => state.clearSession)
  const isCheckingRef = useRef(false)

  useEffect(() => {
    if (!accessToken || currentUser || isCheckingRef.current) {
      return
    }

    let active = true
    isCheckingRef.current = true

    void getCurrentUser()
      .then((user) => {
        if (active) {
          setCurrentUser(user)
        }
      })
      .catch(() => {
        if (active) {
          clearSession()
        }
      })
      .finally(() => {
        if (active) {
          isCheckingRef.current = false
        }
      })

    return () => {
      active = false
    }
  }, [accessToken, clearSession, currentUser, setCurrentUser])

  if (!accessToken) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (!currentUser) {
    return <div className="flex min-h-screen items-center justify-center text-sm text-slate-500">正在校验登录状态...</div>
  }

  return <Outlet />
}
