import { useState, type FormEvent } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { login } from '../services/auth-api'
import { ApiError } from '../services/http-client'
import { useAuthStore } from '../store/auth-store'
import { User, Lock, AlertCircle, Hexagon, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react'

type LocationState = {
  from?: {
    pathname?: string
  }
}

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const accessToken = useAuthStore((state) => state.accessToken)
  const setSession = useAuthStore((state) => state.setSession)
  
  const [view, setView] = useState<'login' | 'forgotPassword'>('login')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [resetEmail, setResetEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [resetStatus, setResetStatus] = useState<'idle' | 'success'>('idle')

  if (accessToken) {
    return <Navigate to="/" replace />
  }

  const redirectTo = (location.state as LocationState | null)?.from?.pathname ?? '/'

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorMessage(null)
    setIsSubmitting(true)

    try {
      const response = await login({ username, password })
      setSession({
        accessToken: response.tokens.accessToken,
        refreshToken: response.tokens.refreshToken,
        user: response.user,
      })
      navigate(redirectTo, { replace: true })
    } catch (error) {
      if (error instanceof ApiError) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage('登录失败，请稍后重试')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleForgotPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!resetEmail) {
      setErrorMessage('请输入您绑定的业务邮箱')
      return;
    }
    setErrorMessage(null)
    setIsSubmitting(true)

    // Simulate sending reset email network request
    setTimeout(() => {
      setIsSubmitting(false)
      setResetStatus('success')
    }, 1200)
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950 selection:bg-emerald-500/30">
      {/* Decorative Background Elements */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Modern Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        {/* Glowing Orbs for Light/Dark */}
        <div className="absolute -top-[20%] -left-[10%] h-[50%] w-[50%] rounded-full bg-emerald-400/20 blur-[120px] mix-blend-normal dark:bg-emerald-600/20 dark:mix-blend-screen" />
        <div className="absolute top-[20%] -right-[10%] h-[60%] w-[40%] rounded-full bg-teal-300/20 blur-[120px] mix-blend-normal dark:bg-teal-700/20 dark:mix-blend-screen" />
        <div className="absolute -bottom-[20%] left-[20%] h-[40%] w-[60%] rounded-full bg-blue-400/10 blur-[120px] mix-blend-normal dark:bg-blue-600/20 dark:mix-blend-screen" />
      </div>

      <div className="relative z-10 w-full max-w-[420px] animate-in fade-in zoom-in-95 duration-700">
        {/* Brand Header */}
        <div className="mb-8 flex flex-col items-center justify-center space-y-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/30">
             <Hexagon className="h-8 w-8 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">MTBM SYSTEM</h1>
          <p className="text-sm font-medium tracking-widest text-slate-500 dark:text-slate-400">
             {view === 'login' ? '登 录 到 桌 面 端 系 统' : '发 送 密 码 重 置 邮 件'}
          </p>
        </div>

        {/* Card */}
        <div className="overflow-hidden rounded-3xl border border-white/60 bg-white/60 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-2xl transition-all dark:border-white/10 dark:bg-slate-900/50 dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
          {view === 'login' ? (
            <form key="login" className="space-y-5 animate-in fade-in slide-in-from-left-4 duration-500" onSubmit={handleSubmit}>
              <div className="space-y-2.5">
                <Label htmlFor="username" className="ml-1 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">用户名</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors peer-focus:text-emerald-500" />
                  <Input
                    id="username"
                    className="peer h-11 rounded-xl border-slate-200 bg-white/50 pl-10 shadow-none transition-colors hover:border-emerald-500/30 focus:border-emerald-500 dark:border-slate-800 dark:bg-black/20 dark:hover:border-emerald-500/30 dark:focus:border-emerald-500"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder="请输入您的用户名"
                    autoComplete="username"
                  />
                </div>
              </div>
              
              <div className="space-y-2.5">
                <Label htmlFor="password" className="ml-1 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">密码</Label>
                <div className="relative">
                   <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors peer-focus:text-emerald-500" />
                  <Input
                    id="password"
                    type="password"
                    className="peer h-11 rounded-xl border-slate-200 bg-white/50 pl-10 shadow-none transition-colors hover:border-emerald-500/30 focus:border-emerald-500 dark:border-slate-800 dark:bg-black/20 dark:hover:border-emerald-500/30 dark:focus:border-emerald-500"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="请输入您的密码"
                    autoComplete="current-password"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-1 pb-2">
                <div className="flex items-center space-x-2">
                   <input type="checkbox" id="remember" className="h-4 w-4 cursor-pointer rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:checked:bg-emerald-500" />
                   <Label htmlFor="remember" className="cursor-pointer text-[13px] font-normal text-slate-600 dark:text-slate-400">保持登录状态</Label>
                </div>
                <button type="button" onClick={() => { setView('forgotPassword'); setErrorMessage(null); }} className="text-[13px] font-medium text-emerald-600 transition-colors hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300">忘记密码?</button>
              </div>

              {errorMessage && (
                <div className="animate-in slide-in-from-top-1 flex flex-row items-center rounded-xl bg-red-50 p-3 dark:bg-red-500/10">
                   <AlertCircle className="mr-2 h-4 w-4 shrink-0 text-red-500" />
                   <p className="text-xs font-medium text-red-600 dark:text-red-400">{errorMessage}</p>
                </div>
              )}

              <Button 
                  className="group relative h-11 w-full overflow-hidden rounded-xl bg-[#10B981] text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all hover:bg-emerald-500 hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] active:scale-[0.98]" 
                  disabled={isSubmitting} 
                  type="submit"
              >
                <span className={`relative z-10 text-[15px] font-medium tracking-wide ${isSubmitting ? 'opacity-90' : ''}`}>
                  {isSubmitting ? '正在验证身份...' : '立 即 登 录'}
                </span>
                {!isSubmitting && (
                  <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] animate-[shimmer_2s_infinite]"></div>
                )}
              </Button>
            </form>
          ) : (
            <form key="forgotPassword" className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500" onSubmit={handleForgotPassword}>
              {resetStatus === 'idle' ? (
                <>
                  <button type="button" onClick={() => { setView('login'); setErrorMessage(null); }} className="flex items-center text-xs font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors mb-2">
                    <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                    返回登录
                  </button>
                  <div className="space-y-1 mb-4">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">重置您的密码</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">请输入您账号所绑定的工作邮箱，由于您是 go-admin 桌面系统用户，重置链接将在几秒后发出。</p>
                  </div>
                  <div className="space-y-2.5">
                    <Label htmlFor="email" className="ml-1 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">邮箱地址</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors peer-focus:text-emerald-500" />
                      <Input
                        id="email"
                        type="email"
                        className="peer h-11 rounded-xl border-slate-200 bg-white/50 pl-10 shadow-none transition-colors hover:border-emerald-500/30 focus:border-emerald-500 dark:border-slate-800 dark:bg-black/20 dark:hover:border-emerald-500/30 dark:focus:border-emerald-500"
                        value={resetEmail}
                        onChange={(event) => setResetEmail(event.target.value)}
                        placeholder="zhangsan@example.com"
                      />
                    </div>
                  </div>
                  
                  {errorMessage && (
                    <div className="animate-in slide-in-from-top-1 flex flex-row items-center rounded-xl bg-red-50 p-3 dark:bg-red-500/10">
                       <AlertCircle className="mr-2 h-4 w-4 shrink-0 text-red-500" />
                       <p className="text-xs font-medium text-red-600 dark:text-red-400">{errorMessage}</p>
                    </div>
                  )}

                  <Button 
                      className="group relative h-11 w-full overflow-hidden rounded-xl bg-slate-900 text-white transition-all hover:bg-slate-800 active:scale-[0.98] dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white mt-2" 
                      disabled={isSubmitting} 
                      type="submit"
                  >
                    <span className={`relative z-10 text-[14px] font-medium tracking-wide ${isSubmitting ? 'opacity-90' : ''}`}>
                      {isSubmitting ? '正在发送重置邮件...' : '发 送 重 置 链 接'}
                    </span>
                  </Button>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-6 text-center space-y-4 animate-in fade-in zoom-in-95 duration-500">
                  <div className="h-16 w-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                     <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">邮件已发送！</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 px-2 leading-relaxed">
                      包含重置密码安全链接的电子邮件已经发送至 <span className="font-semibold text-slate-700 dark:text-slate-300">{resetEmail}</span>，请注意查收。
                    </p>
                  </div>
                  <Button 
                      className="h-10 w-full rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 mt-4 shadow-none" 
                      onClick={() => { setView('login'); setResetEmail(''); }}
                      type="button"
                  >
                    返回继续登录
                  </Button>
                </div>
              )}
            </form>
          )}
        </div>
        
        <p className="mt-8 text-center text-[11px] font-medium tracking-wide text-slate-400 dark:text-slate-500">
          POWERED BY <span className="text-slate-500 dark:text-slate-400">NORTHSTAR DESK</span> © 2024
        </p>
      </div>
    </div>
  )
}
