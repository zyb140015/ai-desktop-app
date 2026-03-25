import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { Fingerprint, Link2, LogOut, Monitor, Shield, User } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { useCurrentMenusQuery } from '../hooks/use-current-menus-query'
import { changePassword, updateProfile, uploadAvatar } from '../services/auth-api'
import { ApiError } from '../services/http-client'
import { useAuthStore } from '../store/auth-store'

type ProfileTabKey = 'basic' | 'account' | 'permission' | 'bindAuth' | 'realName' | 'device' | 'logout'

const profileTabs: Array<{ key: ProfileTabKey; label: string; icon: React.ComponentType<{ className?: string }> }> = [
  { key: 'basic', label: '基本信息', icon: User },
  { key: 'account', label: '账号信息', icon: User },
  { key: 'permission', label: '权限信息', icon: Shield },
  { key: 'bindAuth', label: '绑定授权', icon: Link2 },
  { key: 'realName', label: '实名认证', icon: Fingerprint },
  { key: 'device', label: '我的设备', icon: Monitor },
  { key: 'logout', label: '退出登录', icon: LogOut },
]

export function ProfilePage() {
  const navigate = useNavigate()
  const currentUser = useAuthStore((state) => state.currentUser)
  const clearSession = useAuthStore((state) => state.clearSession)
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser)
  const { data: menuResponse } = useCurrentMenusQuery()
  const [activeTab, setActiveTab] = React.useState<ProfileTabKey>('basic')
  const [profileUsername, setProfileUsername] = React.useState(currentUser?.username ?? '')
  const [profileSex, setProfileSex] = React.useState(currentUser?.sex ?? '0')
  const [profileMessage, setProfileMessage] = React.useState<string | null>(null)
  const [profileError, setProfileError] = React.useState<string | null>(null)
  const [isUpdatingProfile, setIsUpdatingProfile] = React.useState(false)
  const [isUploadingAvatar, setIsUploadingAvatar] = React.useState(false)
  const [oldPassword, setOldPassword] = React.useState('')
  const [newPassword, setNewPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [passwordMessage, setPasswordMessage] = React.useState<string | null>(null)
  const [passwordError, setPasswordError] = React.useState<string | null>(null)
  const [isUpdatingPassword, setIsUpdatingPassword] = React.useState(false)

  const displayName = currentUser?.username?.trim() || '未登录'
  const avatarSrc = resolveAvatarSrc(currentUser?.avatar)
  const accessibleMenus = (menuResponse?.list ?? []).filter((menu) => menu.level >= 1)

  React.useEffect(() => {
    setProfileUsername(currentUser?.username ?? '')
    setProfileSex(currentUser?.sex ?? '0')
  }, [currentUser?.sex, currentUser?.username])

  const handleLogout = () => {
    clearSession()
    navigate('/login', { replace: true })
  }

  const handlePasswordSubmit = async () => {
    setPasswordMessage(null)
    setPasswordError(null)

    if (!oldPassword || !newPassword || !confirmPassword) {
      setPasswordError('请完整填写密码信息')
      return
    }

    if (newPassword.length < 6 || newPassword.length > 18) {
      setPasswordError('新密码长度需为6-18位')
      return
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('两次输入的新密码不一致')
      return
    }

    setIsUpdatingPassword(true)
    try {
      const result = await changePassword({ oldPassword, newPassword })
      setPasswordMessage(result.message)
      setOldPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (error) {
      if (error instanceof ApiError) {
        setPasswordError(error.message)
      } else {
        setPasswordError('密码修改失败，请稍后重试')
      }
    } finally {
      setIsUpdatingPassword(false)
    }
  }

  const handleProfileSubmit = async () => {
    setProfileMessage(null)
    setProfileError(null)
    if (!profileUsername.trim()) {
      setProfileError('用户名不能为空')
      return
    }
    setIsUpdatingProfile(true)
    try {
      const user = await updateProfile({
        username: profileUsername.trim(),
        avatar: currentUser?.avatar || '',
        sex: profileSex,
      })
      setCurrentUser({ ...currentUser, ...user } as typeof currentUser)
      setProfileMessage('资料保存成功')
    } catch (error) {
      if (error instanceof ApiError) {
        setProfileError(error.message)
      } else {
        setProfileError('资料保存失败，请稍后重试')
      }
    } finally {
      setIsUpdatingProfile(false)
    }
  }

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !currentUser) {
      return
    }

    setProfileMessage(null)
    setProfileError(null)
    setIsUploadingAvatar(true)
    try {
      const result = await uploadAvatar(file)
      const user = await updateProfile({
        username: profileUsername.trim() || currentUser.username,
        avatar: result.avatar,
        sex: profileSex,
      })
      setCurrentUser({ ...currentUser, ...user })
      setProfileMessage('头像更新成功')
    } catch (error) {
      setProfileError(error instanceof Error ? error.message : '头像上传失败，请稍后重试')
    } finally {
      setIsUploadingAvatar(false)
      event.target.value = ''
    }
  }

  return (
    <div className="mx-auto flex h-full min-h-0 w-full max-w-[1600px]">
      <div className="flex w-[300px] shrink-0 flex-col items-center pt-8">
        <div className="mb-2 h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-gradient-to-br from-cyan-100 to-emerald-100 shadow-lg">
          <img src={avatarSrc} alt={displayName} className="h-full w-full object-cover" />
        </div>
        <div className="mt-2 text-center">
          <div className="text-[15px] font-semibold text-slate-800 dark:text-slate-100">{displayName}</div>
          <div className="mt-1 text-[12px] text-slate-500 dark:text-slate-400">{currentUser?.email || '未设置邮箱'}</div>
        </div>

        <nav className="mt-6 flex w-full flex-col space-y-1 px-4">
          {profileTabs.map((item) => {
            const isActive = activeTab === item.key
            const IconComp = item.icon
            return (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                className={cn(
                  'flex w-full items-center rounded-lg px-6 py-2.5 text-left text-[13px] transition-colors',
                  isActive
                    ? 'border border-emerald-100 bg-emerald-50 font-medium text-[#10B981]'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-200',
                )}
              >
                <IconComp className={cn('mr-3 h-[16px] w-[16px] shrink-0', isActive ? 'text-[#10B981]' : 'text-slate-400 dark:text-slate-500')} />
                {item.label}
              </button>
            )
          })}
        </nav>
      </div>

      <div className="min-w-0 flex-1 p-6 pl-0 pt-10">
        <div className="flex h-full flex-col rounded-xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <div className="flex items-center justify-between border-b border-slate-100 px-8 pb-4 pt-5 dark:border-slate-800">
            <h2 className="text-[14px] font-bold text-slate-800 dark:text-slate-200">
              {profileTabs.find((item) => item.key === activeTab)?.label}
            </h2>
            {activeTab === 'logout' ? (
              <Button className="h-[28px] bg-red-500 px-4 text-[12px] font-medium text-white hover:bg-red-600" onClick={handleLogout}>
                立即退出
              </Button>
            ) : activeTab === 'basic' ? (
              <Button className="h-[28px] bg-[#10B981] px-4 text-[12px] font-medium text-white hover:bg-emerald-600" disabled={isUpdatingProfile || isUploadingAvatar} onClick={handleProfileSubmit}>
                {isUpdatingProfile ? '保存中...' : '保存'}
              </Button>
            ) : (
              <Button disabled className="h-[28px] bg-[#10B981] px-4 text-[12px] font-medium text-white hover:bg-emerald-600">
                编辑
              </Button>
            )}
          </div>

          <div className="custom-scrollbar flex-1 overflow-auto px-8 py-8">
            {activeTab === 'basic' && (
              <div className="space-y-7">
                <div className="flex items-start">
                  <span className="w-16 shrink-0 pt-0.5 text-[13px] text-slate-500 dark:text-slate-400">头像</span>
                  <div className="ml-8 flex items-center gap-4">
                    <div className="h-16 w-16 overflow-hidden rounded-full border border-slate-200 dark:border-slate-700">
                      <img src={avatarSrc} alt={displayName} className="h-full w-full object-cover" />
                    </div>
                    <label className="cursor-pointer text-[13px] text-[#10B981] hover:text-emerald-600">
                      {isUploadingAvatar ? '上传中...' : '更换头像'}
                      <input className="hidden" type="file" accept="image/*" onChange={handleAvatarChange} disabled={isUploadingAvatar} />
                    </label>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="w-16 shrink-0 pt-2 text-[13px] text-slate-500 dark:text-slate-400">姓名</span>
                  <div className="ml-8 w-full max-w-sm">
                    <Input value={profileUsername} onChange={(event) => setProfileUsername(event.target.value)} placeholder="请输入用户名" />
                  </div>
                </div>
                <ProfileField label="用户ID" value={String(currentUser?.id ?? '-')} mono />
                <ProfileField label="邮箱" value={currentUser?.email || '未设置'} mono />
                <div className="flex items-center">
                  <span className="w-16 shrink-0 text-[13px] text-slate-500 dark:text-slate-400">状态</span>
                  <span className="ml-8">
                    <Badge variant="outline" className="pointer-events-none rounded border-[#E2E8F0] bg-emerald-50 px-2 py-0 font-medium text-[#10B981] dark:border-slate-700">
                      已启用
                    </Badge>
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="w-16 shrink-0 pt-2 text-[13px] text-slate-500 dark:text-slate-400">性别</span>
                  <div className="ml-8 flex gap-2">
                    {[
                      { value: '0', label: '未知' },
                      { value: '1', label: '男' },
                      { value: '2', label: '女' },
                    ].map((option) => (
                      <Button
                        key={option.value}
                        variant={profileSex === option.value ? 'default' : 'outline'}
                        type="button"
                        onClick={() => setProfileSex(option.value)}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>
                <ProfileField label="创建时间" value={currentUser?.createdAt || '-'} mono />
                {profileError ? <p className="text-[13px] text-red-500">{profileError}</p> : null}
                {profileMessage ? <p className="text-[13px] text-emerald-600">{profileMessage}</p> : null}
              </div>
            )}

            {activeTab === 'account' && (
              <div className="space-y-8">
                <div className="space-y-6">
                <ProfileField label="账号" value={displayName} mono />
                <ProfileField label="手机号" value={currentUser?.phone || '未设置'} mono />
                <ProfileField label="密码" value="******" />
                <ProfileField label="邮箱" value={currentUser?.email || '未设置'} mono />
                <div className="flex items-center">
                  <span className="w-16 shrink-0 text-[13px] text-slate-500 dark:text-slate-400">备注</span>
                  <span className="ml-8 text-[13px] text-slate-800 dark:text-slate-200">{currentUser?.remark || '无'}</span>
                </div>
              </div>

                <div>
                  <h3 className="mb-4 border-l-2 border-[#10B981] pl-2 text-[13px] font-bold text-slate-800 dark:text-slate-200">修改密码</h3>
                  <div className="max-w-xl space-y-4 rounded-lg border border-slate-100 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
                    <div className="space-y-2">
                      <Label htmlFor="old-password">旧密码</Label>
                      <Input id="old-password" type="password" value={oldPassword} onChange={(event) => setOldPassword(event.target.value)} placeholder="请输入当前密码" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">新密码</Label>
                      <Input id="new-password" type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} placeholder="请输入6-18位新密码" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">确认新密码</Label>
                      <Input id="confirm-password" type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="请再次输入新密码" />
                    </div>
                    {passwordError ? <p className="text-[13px] text-red-500">{passwordError}</p> : null}
                    {passwordMessage ? <p className="text-[13px] text-emerald-600">{passwordMessage}</p> : null}
                    <div className="flex justify-end">
                      <Button className="bg-[#10B981] text-white hover:bg-emerald-600" disabled={isUpdatingPassword} onClick={handlePasswordSubmit}>
                        {isUpdatingPassword ? '提交中...' : '更新密码'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'permission' && (
              <div className="space-y-8 pb-4">
                <div>
                  <h3 className="mb-4 border-l-2 border-[#10B981] pl-2 text-[13px] font-bold text-slate-800 dark:text-slate-200">当前可访问菜单</h3>
                  <div className="flex flex-wrap gap-2">
                    {accessibleMenus.length > 0 ? (
                      accessibleMenus.map((menu) => (
                        <Badge key={`${menu.parentId}-${menu.id}`} variant="outline" className="border-[#E2E8F0] dark:border-slate-700">
                          {menu.name}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-[13px] text-slate-500 dark:text-slate-400">暂无菜单权限数据</span>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 border-l-2 border-[#10B981] pl-2 text-[13px] font-bold text-slate-800 dark:text-slate-200">功能权限</h3>
                  <div className="overflow-hidden rounded-md border border-slate-100 dark:border-slate-800">
                    <Table className="w-full text-[13px] text-slate-600 dark:text-slate-400">
                      <TableHeader className="bg-[#F8FAFC] dark:bg-slate-900">
                        <TableRow className="border-slate-100 hover:bg-transparent dark:border-slate-800">
                          <TableHead className="h-10 w-48 border-r border-slate-100 font-bold dark:border-slate-800">菜单</TableHead>
                          <TableHead className="h-10 text-center font-bold">可见</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {accessibleMenus.map((menu) => (
                          <TableRow key={menu.id} className="border-slate-100 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900">
                            <TableCell className="h-12 border-r border-slate-100 font-medium dark:border-slate-800">{menu.name}</TableCell>
                            <TableCell className="h-12 p-0 text-center align-middle">
                              <input type="checkbox" checked className="ai-checkbox pointer-events-none opacity-80" readOnly />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'bindAuth' && (
              <div className="max-w-2xl space-y-6">
                <BindItem title="微信" description="当前未绑定微信账号" buttonLabel="绑定" />
                <BindItem title="钉钉" description="当前未绑定钉钉账号" buttonLabel="绑定" />
              </div>
            )}

            {activeTab === 'realName' && (
              <div className="space-y-8">
                <div className="mb-6 flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                    <Fingerprint className="h-[18px] w-[18px]" />
                  </div>
                  <h3 className="text-[15px] font-bold text-slate-800 dark:text-slate-200">当前未接入实名认证数据</h3>
                </div>
                <div className="max-w-2xl rounded-lg border border-slate-100 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-[13px] leading-6 text-slate-500 dark:text-slate-400">
                    该模块当前使用桌面端静态占位，后续如 go-admin 提供实名接口，可直接接入 BFF 展示。
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'device' && (
              <div className="max-w-4xl space-y-6">
                <h3 className="mb-4 border-l-2 border-[#10B981] pl-2 text-[13px] font-bold text-slate-800 dark:text-slate-200">当前登录设备</h3>
                <div className="overflow-hidden rounded-lg border border-slate-100 dark:border-slate-800">
                  <Table className="w-full text-[13px] text-slate-600 dark:text-slate-400">
                    <TableHeader className="bg-[#F8FAFC] dark:bg-slate-900">
                      <TableRow className="border-slate-100 hover:bg-transparent dark:border-slate-800">
                        <TableHead className="h-10 pl-6 font-bold">设备名称</TableHead>
                        <TableHead className="h-10 w-48 font-bold">类型</TableHead>
                        <TableHead className="h-10 w-48 font-bold">状态</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="border-slate-100 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900">
                        <TableCell className="h-12 py-2 pl-6">
                          <div className="flex items-center space-x-3">
                            <Monitor className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                            <div>
                              <div className="flex items-center font-medium text-slate-700 dark:text-slate-300">
                                Electron Desktop
                                <Badge className="ml-2 h-5 border-[#E2E8F0] bg-emerald-50 px-1.5 text-[10px] text-emerald-600 shadow-none hover:bg-emerald-50 dark:border-slate-700">
                                  当前设备
                                </Badge>
                              </div>
                              <div className="mt-0.5 text-[11px] text-slate-400 dark:text-slate-500">桌面端登录会话</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="h-12 py-2 font-mono text-[12px]">桌面应用</TableCell>
                        <TableCell className="h-12 py-2 text-[12px] text-slate-500 dark:text-slate-400">在线</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}

            {activeTab === 'logout' && (
              <div className="max-w-2xl py-4">
                <div className="flex items-start space-x-4 rounded-lg border border-red-100 bg-red-50 p-5">
                  <div className="mt-0.5 text-red-500">
                    <LogOut className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-[15px] font-bold text-red-800">退出当前账号</h3>
                    <p className="mb-4 text-[13px] leading-relaxed text-red-600/90">
                      退出后需要重新登录桌面端才可继续访问系统。当前版本不会删除后端账号，仅清除本地登录态。
                    </p>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="confirm-logout" checked className="pointer-events-none opacity-100 data-[state=checked]:border-red-500 data-[state=checked]:bg-red-500" />
                      <Label htmlFor="confirm-logout" className="cursor-pointer text-[13px] font-bold text-red-800">
                        我已确认退出当前账号
                      </Label>
                    </div>
                    <div className="mt-8">
                      <Button className="bg-red-500 px-6 text-white hover:bg-red-600" onClick={handleLogout}>立即退出</Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProfileField({ label, value, strong, mono }: { label: string; value: string; strong?: boolean; mono?: boolean }) {
  return (
    <div className="flex items-start">
      <span className="w-16 shrink-0 pt-0.5 text-[13px] text-slate-500 dark:text-slate-400">{label}</span>
      <span
        className={cn(
          'ml-8 text-[13px] text-slate-800 dark:text-slate-200',
          strong && 'font-medium',
          mono && 'font-mono',
        )}
      >
        {value}
      </span>
    </div>
  )
}

function BindItem({ title, description, buttonLabel }: { title: string; description: string; buttonLabel: string }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 py-4 dark:border-slate-800">
      <div className="flex items-center space-x-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-900 dark:text-slate-400">
          <Link2 className="h-5 w-5" />
        </div>
        <div>
          <h4 className="text-[14px] font-bold text-slate-800 dark:text-slate-200">{title}</h4>
          <p className="mt-1 text-[12px] text-slate-500 dark:text-slate-400">{description}</p>
        </div>
      </div>
      <Button variant="outline" className="h-8 px-4 text-[13px]">
        {buttonLabel}
      </Button>
    </div>
  )
}

function resolveAvatarSrc(avatar: string | undefined): string {
  if (!avatar) {
    return 'https://api.dicebear.com/7.x/notionists/svg?seed=Felix'
  }

  if (avatar.startsWith('http://') || avatar.startsWith('https://')) {
    return avatar
  }

  const goAdminBaseURL = String(import.meta.env.VITE_GOADMIN_BASE_URL ?? '').replace(/\/$/, '')
  if (goAdminBaseURL && avatar.startsWith('/')) {
    return `${goAdminBaseURL}${avatar}`
  }

  return 'https://api.dicebear.com/7.x/notionists/svg?seed=Felix'
}
