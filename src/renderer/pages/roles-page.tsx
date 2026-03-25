import { useState } from 'react'

import { Pagination } from '../components/pagination'
import { CrudDialog, ConfirmDialog } from '../components/crud-dialog'
import { useDesktopRolesQuery } from '../hooks/use-desktop-roles-query'
import { useDesktopUsersQuery } from '../hooks/use-desktop-users-query'
import { createDesktopRole, deleteDesktopRole, updateDesktopRole } from '../services/role-crud-api'
import { getDesktopRoleDataPermission, saveDesktopRoleDataPermission } from '../services/role-permission-api'
import { exportCsvFile, showActionError, showActionSuccess } from '../lib/action-feedback'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
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

type EditableRole = { id: number; name: string; key: string; order: number; status: boolean; date: string }

export function RolesPage() {
  const [nameInput, setNameInput] = useState('')
  const [keyInput, setKeyInput] = useState('')
  const [name, setName] = useState('')
  const [key, setKey] = useState('')
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)
  const pageSize = 10
  const query = useDesktopRolesQuery({ name, key, status, page, pageSize })
  const departmentQuery = useDesktopUsersQuery({ department: '', uid: '', name: '', role: '', page: 1, pageSize: 1 })
  const departments = departmentQuery.data?.departments ?? []
  const tableData = query.data?.items ?? []
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [editingRole, setEditingRole] = useState<EditableRole | null>(null)
  const [deletingIds, setDeletingIds] = useState<number[] | null>(null)
  const [permissionRoleId, setPermissionRoleId] = useState<number | null>(null)
  const [permissionScope, setPermissionScope] = useState('all')
  const [permissionDepartments, setPermissionDepartments] = useState<string[]>([])

  const toggleSelected = (id: number) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const toggleSelectAll = () => {
    setSelectedIds((prev) => (prev.length === tableData.length ? [] : tableData.map((row) => row.id)))
  }

  const handleCreate = () => {
    setEditingRole({ id: 0, name: '', key: '', order: tableData.length + 1, status: true, date: '' })
  }

  const handleEdit = (row: EditableRole) => {
    setEditingRole({ ...row })
  }

  const submitRole = async () => {
    if (!editingRole) return
    if (editingRole.id === 0) {
      await createDesktopRole(editingRole)
      showActionSuccess('角色新增成功')
    } else {
      await updateDesktopRole(editingRole)
      showActionSuccess('角色修改成功')
    }
    setEditingRole(null)
    await query.refetch()
  }

  const handleDelete = (id: number) => {
    setDeletingIds([id])
  }

  const handleBatchDelete = () => {
    if (selectedIds.length === 0) return
    setDeletingIds(selectedIds)
  }

  const confirmDeleteRoles = async () => {
    if (!deletingIds?.length) return
    await Promise.all(deletingIds.map((id) => deleteDesktopRole(id)))
    showActionSuccess('角色删除成功')
    setSelectedIds((prev) => prev.filter((id) => !deletingIds.includes(id)))
    setDeletingIds(null)
    await query.refetch()
  }

  const handleBatchToggleStatus = async (nextStatus: boolean) => {
    if (selectedIds.length === 0) return
    await Promise.all(selectedIds.map((id) => {
      const current = tableData.find((row) => row.id === id)
      return current ? updateDesktopRole({ ...current, status: nextStatus }) : Promise.resolve()
    }))
    showActionSuccess(`角色已批量${nextStatus ? '启用' : '停用'}`)
    await query.refetch()
  }

  const handleExport = () => {
    if (tableData.length === 0) {
      showActionError('当前没有可导出的角色数据')
      return
    }
    exportCsvFile('roles.csv', ['角色编号', '角色名称', '权限字符', '显示顺序', '状态', '创建时间'], tableData.map((row) => [row.id, row.name, row.key, row.order, row.status ? '正常' : '停用', row.date]))
    showActionSuccess('角色导出成功')
  }

  const handleOpenDataPermission = async (id: number) => {
    const result = await getDesktopRoleDataPermission(id)
    setPermissionRoleId(id)
    setPermissionScope(result.scope)
    setPermissionDepartments(result.departments)
  }

  const togglePermissionDepartment = (department: string) => {
    setPermissionDepartments((prev) => (prev.includes(department) ? prev.filter((item) => item !== department) : [...prev, department]))
  }

  const toggleAllPermissionDepartments = () => {
    setPermissionDepartments((prev) => (prev.length === departments.length ? [] : departments.map((item) => item.name)))
  }

  const submitRolePermission = async () => {
    if (permissionRoleId == null) return
    await saveDesktopRoleDataPermission({ roleId: permissionRoleId, scope: permissionScope, departments: permissionDepartments })
    showActionSuccess('数据权限已保存')
    setPermissionRoleId(null)
  }

  return (
    <>
      <div className="mx-auto flex h-full min-h-0 w-full max-w-[1600px] rounded-lg border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="flex min-w-0 flex-1 flex-col rounded-lg bg-white dark:bg-slate-950">
          <div className="flex shrink-0 flex-col px-5 pb-0 pt-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-5 dark:border-slate-800">
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <Label className="mr-2 shrink-0 whitespace-nowrap text-[13px] font-medium text-slate-700 dark:text-slate-300">角色名称:</Label>
                  <Input type="text" placeholder="请输入角色名称" className="h-8 w-44 text-[13px]" value={nameInput} onChange={(event) => setNameInput(event.target.value)} />
                </div>
                <div className="flex items-center">
                  <Label className="mr-2 shrink-0 whitespace-nowrap text-[13px] font-medium text-slate-700 dark:text-slate-300">权限字符:</Label>
                  <Input type="text" placeholder="请输入权限字符" className="h-8 w-44 text-[13px]" value={keyInput} onChange={(event) => setKeyInput(event.target.value)} />
                </div>
                <div className="flex items-center">
                  <Label className="mr-2 shrink-0 whitespace-nowrap text-[13px] font-medium text-slate-700 dark:text-slate-300">状态:</Label>
                  <Select value={status || undefined} onValueChange={(value: string | null) => setStatus(value ?? '')}>
                    <SelectTrigger className="h-8 w-44 text-[13px] text-slate-500 dark:text-slate-400">
                      <SelectValue placeholder="角色状态" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="正常">正常</SelectItem>
                      <SelectItem value="停用">停用</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="ml-4 flex shrink-0 items-center space-x-3">
                <Button variant="outline" className="h-8 px-5 text-[13px] text-slate-600 dark:text-slate-400" onClick={() => { setNameInput(''); setKeyInput(''); setName(''); setKey(''); setStatus(''); setPage(1) }}>重置</Button>
                <Button className="h-8 bg-[#10B981] px-5 text-[13px] text-white hover:bg-emerald-600" onClick={() => { setName(nameInput.trim()); setKey(keyInput.trim()); setPage(1) }}>查询</Button>
              </div>
            </div>

            <div className="flex items-center justify-between py-4">
              <div className="flex items-center text-[13px]">
                <span className="mr-3 text-slate-700 dark:text-slate-300">已选 <span className="font-bold">{selectedIds.length}</span> 项</span>
                <button className="text-[#10B981] disabled:cursor-not-allowed disabled:opacity-50" disabled={selectedIds.length === 0} onClick={() => setSelectedIds([])}>取消</button>
              </div>
              <div className="flex items-center space-x-3">
                <Button className="h-8 bg-[#10B981] px-4 text-[13px] font-medium text-white hover:bg-emerald-600" onClick={handleCreate}>新增</Button>
                <Button className="h-8 bg-[#10B981] px-4 text-[13px] font-medium text-white hover:bg-emerald-600" onClick={handleExport}>导出</Button>
                <Button className="h-8 bg-[#10B981] px-4 text-[13px] font-medium text-white hover:bg-emerald-600" disabled={selectedIds.length === 0} onClick={() => handleBatchToggleStatus(true)}>批量启用</Button>
                <Button className="h-8 bg-[#10B981] px-4 text-[13px] font-medium text-white hover:bg-emerald-600" disabled={selectedIds.length === 0} onClick={() => handleBatchToggleStatus(false)}>批量停用</Button>
                <Button variant="outline" className="h-8 border-red-200 bg-red-50 px-4 text-[13px] font-medium text-red-500 hover:border-red-300 hover:bg-red-100 hover:text-red-600" disabled={selectedIds.length === 0} onClick={handleBatchDelete}>删除</Button>
              </div>
            </div>
          </div>

          <div className="custom-scrollbar relative flex-1 overflow-auto border-t border-slate-100 dark:border-slate-800">
            <Table className="min-w-[900px] w-full text-left text-[13px] text-slate-600 dark:text-slate-400">
              <TableHeader className="sticky top-0 z-10 border-b border-slate-100 bg-[#F8FAFC] text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                <TableRow className="border-[#E2E8F0] hover:bg-transparent dark:border-slate-700">
                  <TableHead className="h-11 w-12 pl-6"><input type="checkbox" className="ai-checkbox" checked={tableData.length > 0 && selectedIds.length === tableData.length} onChange={toggleSelectAll} /></TableHead>
                  <TableHead className="h-11 w-20 font-bold">角色编号</TableHead>
                  <TableHead className="h-11 w-32 font-bold">角色名称</TableHead>
                  <TableHead className="h-11 w-32 font-bold">权限字符</TableHead>
                  <TableHead className="h-11 w-20 font-bold">显示顺序</TableHead>
                  <TableHead className="h-11 w-24 font-bold">状态</TableHead>
                  <TableHead className="h-11 w-48 font-bold">创建时间</TableHead>
                  <TableHead className="h-11 pr-5 font-bold">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.map((row) => (
                  <TableRow key={row.id} className="border-b border-slate-100 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900">
                    <TableCell className="h-11 py-2.5 pl-6"><input type="checkbox" className="ai-checkbox" checked={selectedIds.includes(row.id)} onChange={() => toggleSelected(row.id)} /></TableCell>
                    <TableCell className="font-mono text-slate-500 dark:text-slate-400">{row.id}</TableCell>
                    <TableCell className="font-medium text-slate-700 dark:text-slate-300">{row.name}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded bg-emerald-50 px-2 py-[2px] text-[12px] font-mono text-[#10B981]">{row.key}</span>
                    </TableCell>
                    <TableCell className="font-mono text-slate-500 dark:text-slate-400">{row.order}</TableCell>
                    <TableCell>
                      <span className={cn('flex w-fit items-center rounded-full px-2 py-0.5 text-[12px]', row.status ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400')}>
                        <span className={cn('mr-1.5 h-1.5 w-1.5 rounded-full', row.status ? 'bg-emerald-500' : 'bg-slate-400')} />
                        {row.status ? '正常' : '停用'}
                      </span>
                    </TableCell>
                    <TableCell className="font-mono text-slate-500 dark:text-slate-400">{row.date}</TableCell>
                    <TableCell className="pr-5">
                      <div className="flex items-center space-x-2">
                        <button onClick={() => handleEdit(row)} className="rounded bg-emerald-50 px-2.5 py-[3px] text-[12px] font-medium text-[#10B981] transition-colors hover:bg-emerald-100">修改</button>
                        <button onClick={() => handleOpenDataPermission(row.id)} className="rounded bg-emerald-50 px-2.5 py-[3px] text-[12px] font-medium text-[#10B981] transition-colors hover:bg-emerald-100">数据权限</button>
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
        open={editingRole !== null}
        title={editingRole?.id ? '修改角色' : '新增角色'}
        onClose={() => setEditingRole(null)}
        footer={(
          <>
            <Button variant="outline" onClick={() => setEditingRole(null)}>取消</Button>
            <Button onClick={() => {
              if (!editingRole?.name.trim()) { showActionError('请输入角色名称'); return }
              if (!editingRole?.key.trim()) { showActionError('请输入权限字符'); return }
              submitRole()
            }}>保存</Button>
          </>
        )}
      >
        <div className="space-y-2">
          <Label>角色名称</Label>
          <Input value={editingRole?.name ?? ''} onChange={(event) => setEditingRole((prev) => prev ? { ...prev, name: event.target.value } : prev)} placeholder="请输入角色名称" />
        </div>
        <div className="space-y-2">
          <Label>权限字符</Label>
          <Input value={editingRole?.key ?? ''} onChange={(event) => setEditingRole((prev) => prev ? { ...prev, key: event.target.value } : prev)} placeholder="请输入权限字符" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>显示顺序</Label>
            <Input value={String(editingRole?.order ?? 1)} onChange={(event) => setEditingRole((prev) => prev ? { ...prev, order: Number(event.target.value || 1) } : prev)} placeholder="请输入显示顺序" />
          </div>
          <div className="space-y-2">
            <Label>状态</Label>
            <Select value={editingRole?.status ? '正常' : '停用'} onValueChange={(value: string | null) => setEditingRole((prev) => prev ? { ...prev, status: value === '正常' } : prev)}>
              <SelectTrigger className="w-full"><SelectValue placeholder="请选择状态" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="正常">正常</SelectItem>
                <SelectItem value="停用">停用</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CrudDialog>

      <ConfirmDialog
        open={deletingIds !== null}
        title="删除角色"
        description={`确认删除${deletingIds?.length === 1 ? '该角色' : `已选中的 ${deletingIds?.length ?? 0} 个角色`}吗？`}
        confirmText="删除"
        onCancel={() => setDeletingIds(null)}
        onConfirm={confirmDeleteRoles}
      />

      <CrudDialog
        open={permissionRoleId !== null}
        title="数据权限"
        description="设置当前角色可查看的数据范围"
        onClose={() => setPermissionRoleId(null)}
        footer={(
          <>
            <Button variant="outline" onClick={() => setPermissionRoleId(null)}>取消</Button>
            <Button onClick={submitRolePermission}>保存</Button>
          </>
        )}
      >
        <div className="space-y-2">
          <Label>数据范围</Label>
          <Select value={permissionScope} onValueChange={(value: string | null) => setPermissionScope(value ?? 'all')}>
            <SelectTrigger className="w-full"><SelectValue placeholder="请选择数据范围" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部数据</SelectItem>
              <SelectItem value="department">指定部门</SelectItem>
              <SelectItem value="self">仅本人</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>组织树</Label>
          <div className="max-h-56 overflow-auto rounded-md border border-slate-200 p-3 dark:border-slate-800">
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
              <input type="checkbox" className="ai-checkbox" checked={departments.length > 0 && permissionDepartments.length === departments.length} onChange={toggleAllPermissionDepartments} />
              <span>东方科技</span>
              <span className="text-xs text-slate-400">({permissionDepartments.length}/{departments.length})</span>
            </label>
            <div className="space-y-2 pl-6">
              {departments.map((department) => (
                <label key={department.name} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <span className="text-slate-400">└</span>
                  <input type="checkbox" className="ai-checkbox" checked={permissionDepartments.includes(department.name)} onChange={() => togglePermissionDepartment(department.name)} />
                  <span>{department.name}</span>
                  <span className="text-xs text-slate-400">({department.count})</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </CrudDialog>
    </>
  )
}
