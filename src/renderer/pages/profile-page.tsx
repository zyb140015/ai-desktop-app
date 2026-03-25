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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useCurrentMenusQuery } from '../hooks/use-current-menus-query'
import { showActionSuccess } from '../lib/action-feedback'
import { resolveVisibleMenuIds, saveVisibleMenuIds } from '../lib/menu-visibility'
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
  const [isEditingBasic, setIsEditingBasic] = React.useState(false)
  const [isEditingPermission, setIsEditingPermission] = React.useState(false)
  const [profileUsername, setProfileUsername] = React.useState(currentUser?.username ?? '')
  const [profileAvatar, setProfileAvatar] = React.useState(currentUser?.avatar ?? '')
  const [profileAvatarPreview, setProfileAvatarPreview] = React.useState<string | null>(null)
  const [profileSex, setProfileSex] = React.useState(currentUser?.sex ?? '0')
  const [profileError, setProfileError] = React.useState<string | null>(null)
  const [isUpdatingProfile, setIsUpdatingProfile] = React.useState(false)
  const [isUploadingAvatar, setIsUploadingAvatar] = React.useState(false)
  const [oldPassword, setOldPassword] = React.useState('')
  const [newPassword, setNewPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [passwordError, setPasswordError] = React.useState<string | null>(null)
  const [isUpdatingPassword, setIsUpdatingPassword] = React.useState(false)
  const [visibleMenuIds, setVisibleMenuIds] = React.useState<number[]>([])

  const displayName = currentUser?.username?.trim() || '未登录'
  const sidebarAvatarSrc = resolveAvatarSrc(currentUser?.avatar)
  const editorAvatarSrc = profileAvatarPreview ?? resolveAvatarSrc(profileAvatar || currentUser?.avatar)
  const accessibleMenus = (menuResponse?.list ?? []).filter((menu) => menu.level >= 1)
  const visibleMenus = accessibleMenus.filter((menu) => visibleMenuIds.includes(menu.id))

  React.useEffect(() => {
    setProfileUsername(currentUser?.username ?? '')
    setProfileAvatar(currentUser?.avatar ?? '')
    setProfileAvatarPreview(null)
    setProfileSex(currentUser?.sex ?? '0')
  }, [currentUser?.avatar, currentUser?.sex, currentUser?.username])

  React.useEffect(() => {
    return () => {
      if (profileAvatarPreview) {
        URL.revokeObjectURL(profileAvatarPreview)
      }
    }
  }, [profileAvatarPreview])

  React.useEffect(() => {
    setVisibleMenuIds(resolveVisibleMenuIds(accessibleMenus))
  }, [menuResponse?.list])

  React.useEffect(() => {
    if (activeTab !== 'basic') {
      setIsEditingBasic(false)
      setProfileError(null)
      setProfileAvatarPreview(null)
    }
    if (activeTab !== 'permission') {
      setIsEditingPermission(false)
      setVisibleMenuIds(resolveVisibleMenuIds(accessibleMenus))
    }
  }, [activeTab])

  const handleLogout = () => {
    clearSession()
    navigate('/login', { replace: true })
  }

  const handlePasswordSubmit = async () => {
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
      showActionSuccess(result.message || '密码修改成功')
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
    setProfileError(null)
    const nextUsername = profileUsername.trim()
    const nextAvatar = profileAvatar
    const nextSex = profileSex

    if (!nextUsername) {
      setProfileError('用户名不能为空')
      return
    }

    if (
      nextUsername === (currentUser?.username ?? '') &&
      nextAvatar === (currentUser?.avatar ?? '') &&
      nextSex === (currentUser?.sex ?? '0')
    ) {
      setIsEditingBasic(false)
      return
    }

    setIsUpdatingProfile(true)
    try {
      const user = await updateProfile({
        username: nextUsername,
        avatar: nextAvatar,
        sex: nextSex,
      })
      setCurrentUser({ ...currentUser, ...user } as typeof currentUser)
      showActionSuccess('资料保存成功')
      setIsEditingBasic(false)
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
    if (!file || !currentUser || !isEditingBasic) {
      return
    }

    setProfileError(null)
    setIsUploadingAvatar(true)
    const localPreview = URL.createObjectURL(file)
    setProfileAvatarPreview((previous) => {
      if (previous) {
        URL.revokeObjectURL(previous)
      }
      return localPreview
    })
    try {
      const result = await uploadAvatar(file)
      setProfileAvatar(result.avatar)
    } catch (error) {
      setProfileAvatarPreview((previous) => {
        if (previous) {
          URL.revokeObjectURL(previous)
        }
        return null
      })
      setProfileError(error instanceof Error ? error.message : '头像上传失败，请稍后重试')
    } finally {
      setIsUploadingAvatar(false)
      event.target.value = ''
    }
  }

  const handleBasicAction = async () => {
    if (!isEditingBasic) {
      setProfileError(null)
      setIsEditingBasic(true)
      return
    }
    await handleProfileSubmit()
  }

  const handlePermissionAction = () => {
    if (!isEditingPermission) {
      setVisibleMenuIds(resolveVisibleMenuIds(accessibleMenus))
      setIsEditingPermission(true)
      return
    }
    saveVisibleMenuIds(visibleMenuIds)
    setIsEditingPermission(false)
    showActionSuccess('权限设置已保存')
  }

  const toggleVisibleMenu = (menuId: number) => {
    setVisibleMenuIds((prev) => {
      if (prev.includes(menuId)) {
        return prev.filter((item) => item !== menuId)
      }
      return [...prev, menuId]
    })
  }

  const formattedCreatedAt = formatProfileDateTime(currentUser?.createdAt)

  return (
    <div className="mx-auto flex h-full min-h-0 w-full max-w-[1600px]">
      <div className="flex w-[300px] shrink-0 flex-col items-center pt-8">
        <div className="mb-2 h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-gradient-to-br from-cyan-100 to-emerald-100 shadow-lg">
          <img src={sidebarAvatarSrc} alt={displayName} className="h-full w-full object-cover" />
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
            {activeTab === 'logout' ? null : activeTab === 'basic' ? (
              <Button className="h-[28px] bg-[#10B981] px-4 text-[12px] font-medium text-white hover:bg-emerald-600" disabled={isUpdatingProfile || isUploadingAvatar} onClick={handleBasicAction}>
                {isEditingBasic ? (isUpdatingProfile ? '保存中...' : '保存') : '编辑'}
              </Button>
            ) : activeTab === 'permission' ? (
              <Button className="h-[28px] bg-[#10B981] px-4 text-[12px] font-medium text-white hover:bg-emerald-600" onClick={handlePermissionAction}>
                {isEditingPermission ? '保存' : '编辑'}
              </Button>
            ) : activeTab === 'account' || activeTab === 'bindAuth' || activeTab === 'realName' || activeTab === 'device' ? null : (
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
                      <img src={editorAvatarSrc} alt={displayName} className="h-full w-full object-cover" />
                    </div>
                    {isEditingBasic ? (
                      <label className="cursor-pointer text-[13px] text-[#10B981] hover:text-emerald-600">
                        {isUploadingAvatar ? '上传中...' : '更换头像'}
                        <input className="hidden" type="file" accept="image/*" onChange={handleAvatarChange} disabled={isUploadingAvatar} />
                      </label>
                    ) : (
                      <span className="text-[13px] text-slate-400 dark:text-slate-500">点击编辑后可修改</span>
                    )}
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="w-16 shrink-0 pt-2 text-[13px] text-slate-500 dark:text-slate-400">姓名</span>
                  <div className="ml-8 w-full max-w-sm">
                    {isEditingBasic ? (
                      <Input value={profileUsername} onChange={(event) => setProfileUsername(event.target.value)} placeholder="请输入用户名" />
                    ) : (
                      <div className="pt-2 text-[13px] text-slate-800 dark:text-slate-200">{profileUsername || '-'}</div>
                    )}
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
                    {isEditingBasic ? (
                      <RadioGroup value={profileSex} onValueChange={setProfileSex} className="flex items-center space-x-4 pt-2">
                        {[
                          { value: '0', label: '未知' },
                          { value: '1', label: '男' },
                          { value: '2', label: '女' },
                        ].map((option) => (
                          <div key={option.value} className="flex items-center space-x-1.5">
                            <RadioGroupItem value={option.value} id={`profile-sex-${option.value}`} />
                            <Label htmlFor={`profile-sex-${option.value}`} className="cursor-pointer text-[13px] text-slate-600 dark:text-slate-400 font-normal">
                              {option.label}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    ) : (
                      <div className="pt-2 text-[13px] text-slate-800 dark:text-slate-200">{formatProfileSex(profileSex)}</div>
                    )}
                  </div>
                </div>
                <ProfileField label="创建时间" value={formattedCreatedAt} mono />
                {profileError ? <p className="text-[13px] text-red-500">{profileError}</p> : null}
              </div>
            )}

            {activeTab === 'account' && (
              <div className="space-y-8">
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
                    {visibleMenus.length > 0 ? (
                      visibleMenus.map((menu) => (
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
                              <input type="checkbox" checked={visibleMenuIds.includes(menu.id)} className="ai-checkbox disabled:cursor-not-allowed disabled:opacity-80" readOnly={!isEditingPermission} disabled={!isEditingPermission} onChange={() => toggleVisibleMenu(menu.id)} />
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
                {/* <div className="max-w-2xl rounded-lg border border-slate-100 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-[13px] leading-6 text-slate-500 dark:text-slate-400">
                    该模块当前使用桌面端静态占位，后续如 go-admin 提供实名接口，可直接接入 BFF 展示。
                  </p>
                </div> */}
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
                <div className="relative overflow-hidden rounded-xl border border-red-100 bg-gradient-to-br from-red-50 via-white to-red-50/80 p-6 shadow-sm dark:border-red-900/40 dark:from-red-950/30 dark:via-slate-950 dark:to-red-950/10">
                  <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-red-200/40 blur-2xl dark:bg-red-500/10" />
                  <div className="relative flex items-start space-x-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-500 shadow-sm dark:bg-red-500/10 dark:text-red-400">
                      <LogOut className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2 text-[16px] font-bold text-red-800 dark:text-red-200">退出当前账号</h3>
                      <p className="mb-5 text-[13px] leading-relaxed text-red-700/90 dark:text-red-200/80">
                        退出后需要重新登录桌面端才可继续访问系统。当前版本不会删除后端账号，仅清除本地登录态。
                      </p>
                      <div className="rounded-lg border border-red-100 bg-white/80 p-3 dark:border-red-900/30 dark:bg-slate-900/70">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="confirm-logout" checked className="pointer-events-none opacity-100 data-[state=checked]:border-red-500 data-[state=checked]:bg-red-500" />
                          <Label htmlFor="confirm-logout" className="cursor-pointer text-[13px] font-medium text-red-800 dark:text-red-200">
                            我已确认退出当前账号
                          </Label>
                        </div>
                      </div>
                      <div className="mt-6 flex items-center justify-end">
                        <Button className="bg-red-500 px-6 text-white shadow-sm hover:bg-red-600" onClick={handleLogout}>立即退出</Button>
                      </div>
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
      <Button type="button" variant="outline" className="h-8 px-4 text-[13px]" onClick={() => showActionSuccess(`${title}功能开发中`)}>
        {buttonLabel}
      </Button>
    </div>
  )
}

function resolveAvatarSrc(avatar: string | undefined): string {
  if (!avatar) {
    return 'https://api.dicebear.com/7.x/notionists/svg?seed=Felix'
  }

  if (avatar.startsWith('http://') || avatar.startsWith('https://') || avatar.startsWith('blob:') || avatar.startsWith('data:')) {
    return avatar
  }

  const goAdminBaseURL = String(import.meta.env.VITE_GOADMIN_BASE_URL ?? 'http://127.0.0.1:8081').replace(/\/$/, '')
  if (avatar.startsWith('/')) {
    return `${goAdminBaseURL}${avatar}`
  }

  return `${goAdminBaseURL}/${avatar.replace(/^\/+/, '')}`
}

function formatProfileSex(value: string): string {
  if (value === '1') return '男'
  if (value === '2') return '女'
  return '未知'
}

function formatProfileDateTime(value: string | undefined): string {
  if (!value) {
    return '-'
  }

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return value
  }

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}
