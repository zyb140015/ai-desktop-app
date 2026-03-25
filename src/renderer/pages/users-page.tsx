import { useEffect, useMemo, useState } from 'react'
import { ChevronDown, ChevronRight, Search } from 'lucide-react'

import { Pagination } from '../components/pagination'
import { ConfirmDialog, CrudDialog } from '../components/crud-dialog'
import { useDesktopUsersQuery } from '../hooks/use-desktop-users-query'
import { createDesktopUser, deleteDesktopUser, resetDesktopUserPassword, updateDesktopUser } from '../services/user-crud-api'
import type { DesktopUser } from '../services/user-api'
import { exportCsvFile, showActionError, showActionSuccess } from '../lib/action-feedback'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'

type EditableUser = DesktopUser

export function UsersPage() {
  const [activeDept, setActiveDept] = useState('')
  const [treeKeyword, setTreeKeyword] = useState('')
  const [treeExpanded, setTreeExpanded] = useState(true)
  const [uidInput, setUidInput] = useState('')
  const [nameInput, setNameInput] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [uid, setUid] = useState('')
  const [name, setName] = useState('')
  const [page, setPage] = useState(1)
  const pageSize = 10

  const query = useDesktopUsersQuery({
    department: activeDept,
    uid,
    name,
    role: roleFilter,
    page,
    pageSize,
  })

  const treeData = query.data?.departments ?? []
  const tableData = query.data?.items ?? []
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [editingUser, setEditingUser] = useState<EditableUser | null>(null)
  const [deletingIds, setDeletingIds] = useState<number[] | null>(null)

  useEffect(() => {
    if (treeData.length === 0) return
    if (activeDept === '') return
    if (!treeData.some((node) => node.name === activeDept)) {
      setActiveDept(treeData[0].name)
      setPage(1)
    }
  }, [activeDept, treeData])

  const roleOptions = useMemo(() => {
    const roles = Array.from(new Set(tableData.map((item) => item.role)))
    return roles.length ? roles : ['超管', '管理员', '财务', '运营']
  }, [tableData])

  const filteredTreeData = useMemo(() => {
    const keyword = treeKeyword.trim()
    if (!keyword) return treeData
    return treeData.filter((node) => node.name.includes(keyword))
  }, [treeData, treeKeyword])

  const toggleSelected = (id: number) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const toggleSelectAll = () => {
    setSelectedIds((prev) => (prev.length === tableData.length ? [] : tableData.map((row) => row.id)))
  }

  const handleCreate = () => {
    setEditingUser({
      id: 0,
      uid: '',
      name: '',
      dept: activeDept,
      phone: '',
      role: roleOptions[0] ?? '管理员',
      status: '开启',
      date: '',
    })
  }

  const handleEdit = (row: DesktopUser) => {
    setEditingUser({ ...row })
  }

  const submitUser = async () => {
    if (!editingUser) return
    if (editingUser.id === 0) {
      await createDesktopUser(editingUser)
      showActionSuccess('用户新增成功')
    } else {
      await updateDesktopUser(editingUser)
      showActionSuccess('用户修改成功')
    }
    setEditingUser(null)
    await query.refetch()
  }

  const handleDelete = (id: number) => {
    setDeletingIds([id])
  }

  const handleBatchDelete = () => {
    if (selectedIds.length === 0) return
    setDeletingIds(selectedIds)
  }

  const confirmDeleteUsers = async () => {
    if (!deletingIds?.length) return
    await Promise.all(deletingIds.map((id) => deleteDesktopUser(id)))
    showActionSuccess('用户删除成功')
    setSelectedIds((prev) => prev.filter((id) => !deletingIds.includes(id)))
    setDeletingIds(null)
    await query.refetch()
  }

  const handleToggleStatus = async (row: DesktopUser) => {
    await updateDesktopUser({ ...row, status: row.status === '开启' ? '关闭' : '开启' })
    showActionSuccess(`用户已${row.status === '开启' ? '关闭' : '开启'}`)
    await query.refetch()
  }

  const handleBatchToggleStatus = async (status: '开启' | '关闭') => {
    if (selectedIds.length === 0) return
    await Promise.all(
      selectedIds.map((id) => {
        const current = tableData.find((row) => row.id === id)
        return current ? updateDesktopUser({ ...current, status }) : Promise.resolve()
      }),
    )
    showActionSuccess(`已批量${status}`)
    await query.refetch()
  }

  const handleResetPassword = async (id: number) => {
    await resetDesktopUserPassword(id)
    showActionSuccess('密码已重置')
    await query.refetch()
  }

  const handleExport = () => {
    if (tableData.length === 0) {
      showActionError('当前没有可导出的用户数据')
      return
    }
    exportCsvFile(
      'users.csv',
      ['用户ID', '姓名', '所属组织', '手机号码', '角色', '状态', '最近修改'],
      tableData.map((row) => [row.uid, row.name, row.dept, row.phone, row.role, row.status, row.date]),
    )
    showActionSuccess('用户导出成功')
  }

  return (
    <>
      <div className="mx-auto flex h-full min-h-0 w-full max-w-[1600px] rounded-lg border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="flex w-[240px] shrink-0 flex-col rounded-l-lg border-r border-slate-100 bg-[#FAFAFA]/30 dark:border-slate-800/80">
          <div className="shrink-0 p-4">
            <div className="relative">
              <Input type="text" placeholder="请输入关键字搜索" className="h-8 bg-white pr-10 text-[12px] dark:bg-slate-950" value={treeKeyword} onChange={(event) => setTreeKeyword(event.target.value)} />
              <button className="absolute right-0 top-0 flex h-full w-8 items-center justify-center rounded-r-md border border-[#10B981] bg-[#10B981] text-white transition-colors hover:bg-emerald-600">
                <Search className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="custom-scrollbar flex-1 overflow-y-auto px-3 pb-4">
            <div className="group mb-1 flex cursor-pointer items-center rounded px-2 py-1.5 text-slate-700 transition-colors hover:bg-slate-100 dark:bg-slate-800/50 dark:text-slate-300" onClick={() => setTreeExpanded((prev) => !prev)}>
              {treeExpanded ? <ChevronDown className="mr-2 h-3.5 w-3.5 text-slate-500 dark:text-slate-400" /> : <ChevronRight className="mr-2 h-3.5 w-3.5 text-slate-500 dark:text-slate-400" />}
              <span className="text-[13px] font-medium">全部部门 ({filteredTreeData.reduce((sum, item) => sum + item.count, 0)})</span>
            </div>

            {treeExpanded ? <div className="flex flex-col space-y-0.5">
              <div
                onClick={() => {
                  setActiveDept('')
                  setPage(1)
                }}
                className={cn(
                  'flex cursor-pointer items-center rounded px-3 py-1.5 pl-8 text-[13px] transition-colors',
                  activeDept === ''
                    ? 'bg-emerald-50 font-medium text-[#10B981]'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-slate-100',
                )}
              >
                <ChevronRight className={cn('mr-2 h-3.5 w-3.5', activeDept === '' ? 'text-[#10B981]' : 'text-slate-400 dark:text-slate-500')} />
                <span className="flex-1 truncate">全部</span>
              </div>
              {filteredTreeData.map((node) => {
                const isActive = activeDept === node.name
                return (
                  <div
                    key={node.name}
                    onClick={() => {
                      setActiveDept(node.name)
                      setPage(1)
                    }}
                    className={cn(
                      'flex cursor-pointer items-center rounded px-3 py-1.5 pl-8 text-[13px] transition-colors',
                      isActive
                        ? 'bg-emerald-50 font-medium text-[#10B981]'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-slate-100',
                    )}
                  >
                    <ChevronRight className={cn('mr-2 h-3.5 w-3.5', isActive ? 'text-[#10B981]' : 'text-slate-400 dark:text-slate-500')} />
                    <span className="flex-1 truncate">{node.name} ({node.count})</span>
                  </div>
                )
              })}
            </div> : null}
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col rounded-r-lg bg-white dark:bg-slate-950">
          <div className="flex shrink-0 flex-col px-5 pb-0 pt-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-5 dark:border-slate-800">
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <Label className="mr-2 shrink-0 whitespace-nowrap text-[13px] font-medium text-slate-700 dark:text-slate-300">用户ID:</Label>
                  <Input type="text" placeholder="请输入" className="h-8 w-44 text-[13px]" value={uidInput} onChange={(event) => setUidInput(event.target.value)} />
                </div>
                <div className="flex items-center">
                  <Label className="mr-2 shrink-0 whitespace-nowrap text-[13px] font-medium text-slate-700 dark:text-slate-300">姓名:</Label>
                  <Input type="text" placeholder="请输入" className="h-8 w-44 text-[13px]" value={nameInput} onChange={(event) => setNameInput(event.target.value)} />
                </div>
                <div className="flex items-center">
                  <Label className="mr-2 shrink-0 whitespace-nowrap text-[13px] font-medium text-slate-700 dark:text-slate-300">角色:</Label>
                  <Select value={roleFilter || undefined} onValueChange={(value: string | null) => setRoleFilter(value ?? '')}>
                    <SelectTrigger className="h-8 w-44 text-[13px] text-slate-500 dark:text-slate-400">
                      <SelectValue placeholder="请选择" />
                    </SelectTrigger>
                    <SelectContent>
                      {roleOptions.map((item) => (
                        <SelectItem key={item} value={item}>{item}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="ml-4 flex shrink-0 items-center space-x-3">
                <Button variant="outline" className="h-8 px-5 text-[13px] text-slate-600 dark:text-slate-400" onClick={() => { setUidInput(''); setNameInput(''); setUid(''); setName(''); setRoleFilter(''); setPage(1) }}>重置</Button>
                <Button className="h-8 bg-[#10B981] px-5 text-[13px] text-white hover:bg-emerald-600" onClick={() => { setUid(uidInput.trim()); setName(nameInput.trim()); setPage(1) }}>查询</Button>
              </div>
            </div>

            <div className="flex items-center justify-between py-4">
              <div className="flex items-center text-[13px]">
                <span className="mr-3 text-slate-700 dark:text-slate-300">已选 <span className="font-bold">{selectedIds.length}</span> 项</span>
                <button className="text-[#10B981] disabled:cursor-not-allowed disabled:opacity-50" disabled={selectedIds.length === 0} onClick={() => setSelectedIds([])}>取消</button>
              </div>
              <div className="flex items-center space-x-3">
                <Button className="h-8 bg-[#10B981] px-4 text-[13px] font-medium text-white hover:bg-emerald-600" onClick={handleCreate}>新增</Button>
                <Button className="h-8 bg-[#10B981] px-4 text-[13px] font-medium text-white hover:bg-emerald-600">导入</Button>
                <Button className="h-8 bg-[#10B981] px-4 text-[13px] font-medium text-white hover:bg-emerald-600" onClick={handleExport}>导出</Button>
                <Button className="h-8 bg-[#10B981] px-4 text-[13px] font-medium text-white hover:bg-emerald-600" disabled={selectedIds.length === 0} onClick={() => handleBatchToggleStatus('开启')}>批量开启</Button>
                <Button className="h-8 bg-[#10B981] px-4 text-[13px] font-medium text-white hover:bg-emerald-600" disabled={selectedIds.length === 0} onClick={() => handleBatchToggleStatus('关闭')}>批量关闭</Button>
                <Button variant="outline" className="h-8 border-red-200 bg-red-50 px-4 text-[13px] font-medium text-red-500 hover:border-red-300 hover:bg-red-100 hover:text-red-600" disabled={selectedIds.length === 0} onClick={handleBatchDelete}>删除</Button>
              </div>
            </div>
          </div>

          <div className="custom-scrollbar relative flex-1 overflow-auto border-t border-slate-100 dark:border-slate-800">
            <Table className="min-w-[1100px] w-full text-left text-[13px] text-slate-600 dark:text-slate-400">
              <TableHeader className="sticky top-0 z-10 border-b border-slate-100 bg-[#F8FAFC] text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                <TableRow className="border-[#E2E8F0] hover:bg-transparent dark:border-slate-700">
                  <TableHead className="h-11 w-12 pl-6"><input type="checkbox" className="ai-checkbox" checked={tableData.length > 0 && selectedIds.length === tableData.length} onChange={toggleSelectAll} /></TableHead>
                  <TableHead className="h-11 w-12 font-bold">序号</TableHead>
                  <TableHead className="h-11 w-20 font-bold">用户ID</TableHead>
                  <TableHead className="h-11 w-24 font-bold">姓名</TableHead>
                  <TableHead className="h-11 w-28 font-bold">所属组织</TableHead>
                  <TableHead className="h-11 w-32 font-bold">手机号码</TableHead>
                  <TableHead className="h-11 w-20 font-bold">角色</TableHead>
                  <TableHead className="h-11 w-20 font-bold">状态</TableHead>
                  <TableHead className="h-11 w-48 font-bold">最近修改</TableHead>
                  <TableHead className="h-11 pr-5 font-bold">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.map((row) => (
                  <TableRow key={row.id} className="border-b border-slate-100 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900">
                    <TableCell className="h-11 py-2.5 pl-6"><input type="checkbox" className="ai-checkbox" checked={selectedIds.includes(row.id)} onChange={() => toggleSelected(row.id)} /></TableCell>
                    <TableCell className="font-mono text-slate-500 dark:text-slate-400">{row.id}</TableCell>
                    <TableCell className="font-mono text-slate-600 dark:text-slate-400">{row.uid}</TableCell>
                    <TableCell className="font-medium text-slate-700 dark:text-slate-300">{row.name}</TableCell>
                    <TableCell>{row.dept}</TableCell>
                    <TableCell className="font-mono text-slate-500 dark:text-slate-400">{row.phone}</TableCell>
                    <TableCell>{row.role}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn('rounded border-[#E2E8F0] px-2 py-0 font-medium dark:border-slate-700 pointer-events-none', row.status === '开启' ? 'text-[#10B981]' : 'bg-red-50 text-red-500')}>
                        {row.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-slate-500 dark:text-slate-400">{row.date}</TableCell>
                    <TableCell className="pr-5">
                      <div className="flex items-center space-x-2">
                        <button onClick={() => handleResetPassword(row.id)} className="rounded bg-emerald-50 px-2.5 py-[3px] text-[12px] font-medium text-[#10B981] transition-colors hover:bg-emerald-100">重置密码</button>
                        <button onClick={() => handleToggleStatus(row)} className="rounded bg-emerald-50 px-2.5 py-[3px] text-[12px] font-medium text-[#10B981] transition-colors hover:bg-emerald-100">{row.status === '开启' ? '关闭' : '开启'}</button>
                        <button onClick={() => handleEdit(row)} className="rounded bg-emerald-50 px-2.5 py-[3px] text-[12px] font-medium text-[#10B981] transition-colors hover:bg-emerald-100">修改</button>
                        <button onClick={() => handleDelete(row.id)} className="rounded bg-red-50 px-2.5 py-[3px] text-[12px] font-medium text-red-500 transition-colors hover:bg-red-100">删除</button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Pagination total={query.data?.total ?? 0} page={page} pageSize={pageSize} onPageChange={setPage} />
        </div>
      </div>

      <CrudDialog
        open={editingUser !== null}
        title={editingUser?.id ? '修改用户' : '新增用户'}
        onClose={() => setEditingUser(null)}
        footer={(
          <>
            <Button variant="outline" onClick={() => setEditingUser(null)}>取消</Button>
            <Button onClick={() => {
              if (!editingUser?.uid.trim()) { showActionError('请输入用户ID'); return }
              if (!editingUser?.name.trim()) { showActionError('请输入姓名'); return }
              if (!editingUser?.phone.trim()) { showActionError('请输入手机号'); return }
              submitUser()
            }}>保存</Button>
          </>
        )}
      >
        <div className="space-y-2">
          <Label>用户ID</Label>
          <Input value={editingUser?.uid ?? ''} onChange={(event) => setEditingUser((prev) => prev ? { ...prev, uid: event.target.value } : prev)} placeholder="请输入用户ID" />
        </div>
        <div className="space-y-2">
          <Label>姓名</Label>
          <Input value={editingUser?.name ?? ''} onChange={(event) => setEditingUser((prev) => prev ? { ...prev, name: event.target.value } : prev)} placeholder="请输入姓名" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>部门</Label>
            <Select value={editingUser?.dept ?? activeDept} onValueChange={(value: string | null) => setEditingUser((prev) => prev ? { ...prev, dept: value ?? activeDept } : prev)}>
              <SelectTrigger className="w-full"><SelectValue placeholder="请选择部门" /></SelectTrigger>
              <SelectContent>
                {treeData.map((node) => <SelectItem key={node.name} value={node.name}>{node.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>角色</Label>
            <Select value={editingUser?.role ?? '管理员'} onValueChange={(value: string | null) => setEditingUser((prev) => prev ? { ...prev, role: value ?? '管理员' } : prev)}>
              <SelectTrigger className="w-full"><SelectValue placeholder="请选择角色" /></SelectTrigger>
              <SelectContent>
                {roleOptions.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>手机号码</Label>
            <Input value={editingUser?.phone ?? ''} onChange={(event) => setEditingUser((prev) => prev ? { ...prev, phone: event.target.value } : prev)} placeholder="请输入手机号" />
          </div>
          <div className="space-y-2">
            <Label>状态</Label>
            <Select value={editingUser?.status ?? '开启'} onValueChange={(value: string | null) => setEditingUser((prev) => prev ? { ...prev, status: value ?? '开启' } : prev)}>
              <SelectTrigger className="w-full"><SelectValue placeholder="请选择状态" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="开启">开启</SelectItem>
                <SelectItem value="关闭">关闭</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CrudDialog>

      <ConfirmDialog
        open={deletingIds !== null}
        title="删除用户"
        description={`确认删除${deletingIds?.length === 1 ? '该用户' : `已选中的 ${deletingIds?.length ?? 0} 个用户`}吗？`}
        confirmText="删除"
        onCancel={() => setDeletingIds(null)}
        onConfirm={confirmDeleteUsers}
      />
    </>
  )
}
