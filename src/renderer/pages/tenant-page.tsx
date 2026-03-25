import { Pagination } from '../components/pagination';

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { useState } from 'react'
import { useDesktopTenantsQuery } from '../hooks/use-desktop-tenants-query'
import { createDesktopTenant, deleteDesktopTenant, updateDesktopTenant } from '../services/tenant-crud-api'
import { ConfirmDialog } from '../components/crud-dialog'
import { EntityFormDialog } from '../components/entity-form-dialog'
import { exportCsvFile, showActionError, showActionSuccess } from '../lib/action-feedback'

export function TenantPage() {
  const [nameInput, setNameInput] = useState('')
  const [codeInput, setCodeInput] = useState('')
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)
  const pageSize = 10
  const query = useDesktopTenantsQuery({ name, code, status, page, pageSize })
  const tableData = query.data?.items ?? []
  const [editingTenant, setEditingTenant] = useState<(typeof tableData)[number] | { id: number; code: string; name: string; status: string; period: string; admin: string; phone: string } | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const handleCreate = async () => {
	setEditingTenant({ id: 0, code: '', name: '', status: '开启', period: '2023-01-01 - 2023-12-31', admin: '桌面端', phone: '131 0000 0000' })
  }

  const handleEdit = async (row: typeof tableData[number]) => {
	setEditingTenant({ ...row })
  }

  const handleDelete = async (id: number) => {
	setDeletingId(id)
	}

  const toggleSelected = (id: number) => {
	setSelectedIds((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id])
	}

  const toggleSelectAll = () => {
	setSelectedIds((prev) => prev.length === tableData.length ? [] : tableData.map((row) => row.id))
	}

  const handleBatchDelete = () => {
	if (selectedIds.length === 0) return
	setDeletingId(-1)
  }

  const handleBatchToggleStatus = async (statusValue: '开启' | '关闭') => {
	if (selectedIds.length === 0) return
	await Promise.all(
		selectedIds.map((id) => {
			const current = tableData.find((row) => row.id === id)
			return current ? updateDesktopTenant({ ...current, status: statusValue }) : Promise.resolve(current)
		})
	)
	showActionSuccess(`租户已批量${statusValue}`)
	await query.refetch()
  }

  const submitTenant = async () => {
	if (!editingTenant || !editingTenant.name.trim() || !editingTenant.code.trim()) return
    if (editingTenant.id === 0) {
		await createDesktopTenant({ ...editingTenant, name: editingTenant.name.trim(), code: editingTenant.code.trim() })
		showActionSuccess('租户新增成功')
	} else {
		await updateDesktopTenant({ ...editingTenant, name: editingTenant.name.trim(), code: editingTenant.code.trim() })
		showActionSuccess('租户修改成功')
	}
	setEditingTenant(null)
	await query.refetch()
  }

  const confirmDelete = async () => {
	if (deletingId == null) return
	if (deletingId === -1) {
		await Promise.all(selectedIds.map((id) => deleteDesktopTenant(id)))
		setSelectedIds([])
	} else {
		await deleteDesktopTenant(deletingId)
	}
	showActionSuccess('租户删除成功')
	setDeletingId(null)
	await query.refetch()
  }

  const handleToggleStatus = async (row: typeof tableData[number]) => {
	await updateDesktopTenant({ ...row, status: row.status === '开启' ? '关闭' : '开启' })
	showActionSuccess(`租户已${row.status === '开启' ? '关闭' : '开启'}`)
	await query.refetch()
  }

  const handleExport = () => {
	if (tableData.length === 0) {
		showActionError('当前没有可导出的租户数据')
		return
	}
	exportCsvFile('tenants.csv', ['租户编码', '租户名称', '租户状态', '有效期', '租户管理员', '管理员电话'], tableData.map((row) => [row.code, row.name, row.status, row.period, row.admin, row.phone]))
	showActionSuccess('租户导出成功')
  }

  return (
    <>
    <div className="w-full h-full max-w-[1600px] mx-auto flex flex-col min-h-0 bg-white dark:bg-slate-950 shadow-sm border border-slate-100 dark:border-slate-800 rounded-lg rounded-tl-none">
      
      {/* Search Header */}
      <div className="flex flex-col p-5 pb-0 shrink-0">
         <div className="flex items-center justify-between pb-5 border-b border-slate-100 dark:border-slate-800">
           <div className="flex items-center space-x-6">
              <div className="flex items-center">
                 <Label className="text-[13px] text-slate-700 dark:text-slate-300 mr-2 shrink-0 font-medium whitespace-nowrap">租户名称:</Label>
                  <Input type="text" placeholder="请输入租户名称" className="h-8 w-48 text-[13px] border-slate-200 dark:border-slate-800" value={nameInput} onChange={(event) => setNameInput(event.target.value)} />
              </div>
              <div className="flex items-center">
                 <Label className="text-[13px] text-slate-700 dark:text-slate-300 mr-2 shrink-0 font-medium whitespace-nowrap">租户编码:</Label>
                  <Input type="text" placeholder="请输入租户编码" className="h-8 w-48 text-[13px] border-slate-200 dark:border-slate-800" value={codeInput} onChange={(event) => setCodeInput(event.target.value)} />
              </div>
              <div className="flex items-center">
                 <Label className="text-[13px] text-slate-700 dark:text-slate-300 mr-3 shrink-0 font-medium whitespace-nowrap">租户状态:</Label>
                  <RadioGroup value={status || 'all'} onValueChange={(value: string) => setStatus(value === 'all' ? '' : value === 'open' ? '开启' : '关闭')} className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1.5 cursor-pointer">
                      <RadioGroupItem value="all" id="t_r1" className="text-emerald-500 border-emerald-500 fill-emerald-500 w-[14px] h-[14px]" />
                      <Label htmlFor="t_r1" className="text-[13px] text-slate-600 dark:text-slate-400 cursor-pointer font-normal">全部</Label>
                    </div>
                    <div className="flex items-center space-x-1.5 cursor-pointer">
                      <RadioGroupItem value="open" id="t_r2" className="w-[14px] h-[14px]" />
                      <Label htmlFor="t_r2" className="text-[13px] text-slate-600 dark:text-slate-400 cursor-pointer font-normal">开启</Label>
                    </div>
                    <div className="flex items-center space-x-1.5 cursor-pointer">
                      <RadioGroupItem value="closed" id="t_r3" className="w-[14px] h-[14px]" />
                      <Label htmlFor="t_r3" className="text-[13px] text-slate-600 dark:text-slate-400 cursor-pointer font-normal">关闭</Label>
                    </div>
                 </RadioGroup>
              </div>
           </div>
           
           <div className="flex items-center space-x-3 shrink-0 ml-4">
               <Button variant="outline" className="h-8 px-5 text-[13px] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800" onClick={() => { setNameInput(''); setCodeInput(''); setName(''); setCode(''); setStatus(''); setPage(1) }}>重置</Button>
               <Button className="h-8 px-5 bg-[#10B981] text-[13px] text-white hover:bg-emerald-600" onClick={() => { setName(nameInput.trim()); setCode(codeInput.trim()); setPage(1) }}>查询</Button>
           </div>
         </div>
         
         {/* Batch Actions Row */}
         <div className="flex items-center justify-between py-4">
            <div className="flex items-center text-[13px]">
                <span className="text-slate-700 dark:text-slate-300 mr-3">已选 <span className="font-bold">{selectedIds.length}</span> 项</span>
                <button className="text-[#10B981] disabled:cursor-not-allowed disabled:opacity-50" disabled={selectedIds.length === 0} onClick={() => setSelectedIds([])}>取消</button>
            </div>
            <div className="flex items-center space-x-3">
                <Button className="h-8 px-4 bg-[#10B981] text-[13px] text-white hover:bg-emerald-600 font-medium" onClick={handleCreate}>新增</Button>
                 <Button className="h-8 px-4 bg-[#10B981] text-[13px] text-white hover:bg-emerald-600 font-medium" onClick={handleExport}>导出</Button>
                 <Button className="h-8 px-4 bg-[#10B981] text-[13px] text-white hover:bg-emerald-600 font-medium" disabled={selectedIds.length === 0} onClick={() => handleBatchToggleStatus('开启')}>批量开启</Button>
                <Button className="h-8 px-4 bg-[#10B981] text-[13px] text-white hover:bg-emerald-600 font-medium" disabled={selectedIds.length === 0} onClick={() => handleBatchToggleStatus('关闭')}>批量关闭</Button>
                <Button variant="outline" className="h-8 px-4 border-red-200 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 hover:border-red-300 text-[13px] font-medium" disabled={selectedIds.length === 0} onClick={handleBatchDelete}>删除</Button>
            </div>
         </div>
      </div>

      {/* Table Data */}
      <div className="flex-1 overflow-auto custom-scrollbar relative border-t border-slate-100 dark:border-slate-800">
        <Table className="w-full text-left text-[13px] text-slate-600 dark:text-slate-400 min-w-[1200px]">
          <TableHeader className="sticky top-0 z-10 border-b border-slate-100 bg-[#F8FAFC] text-slate-700 shadow-sm dark:border-slate-800/80 dark:bg-slate-900 dark:text-slate-300">
            <TableRow className="hover:bg-transparent border-[#E2E8F0] dark:border-slate-700">
              <TableHead className="w-12 pl-6 h-11"><input type="checkbox" className="ai-checkbox" checked={tableData.length > 0 && selectedIds.length === tableData.length} onChange={toggleSelectAll} /></TableHead>
              <TableHead className="font-bold w-14 h-11">序号</TableHead>
              <TableHead className="font-bold w-24 h-11">租户编码</TableHead>
              <TableHead className="font-bold w-[20%] h-11">租户名称</TableHead>
              <TableHead className="font-bold w-20 h-11">租户状态</TableHead>
              <TableHead className="font-bold w-[18%] h-11">有效期</TableHead>
              <TableHead className="font-bold w-24 h-11">租户管理员</TableHead>
              <TableHead className="font-bold w-32 h-11">管理员电话</TableHead>
              <TableHead className="font-bold pr-5 h-11">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((row) => (
              <TableRow key={row.id} className="border-b border-slate-100 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900">
                <TableCell className="pl-6 py-3"><input type="checkbox" className="ai-checkbox" checked={selectedIds.includes(row.id)} onChange={() => toggleSelected(row.id)} /></TableCell>
                <TableCell className="font-mono text-slate-500 dark:text-slate-400 py-3">{row.id}</TableCell>
                <TableCell className="font-mono text-slate-600 dark:text-slate-400 py-3">{row.code}</TableCell>
                <TableCell className="text-slate-700 dark:text-slate-300 font-medium py-3">{row.name}</TableCell>
                <TableCell className="py-3">
                   <Badge 
                      variant="outline" 
                      className={cn(
                        "rounded font-medium px-2 py-0 border-[#E2E8F0] dark:border-slate-700 pointer-events-none",
                        row.status === '开启' 
                          ? "bg-emerald-50 text-[#10B981]" 
                          : "bg-red-50 text-red-500"
                      )}
                    >
                      {row.status}
                   </Badge>
                </TableCell>
                <TableCell className="font-mono text-slate-500 dark:text-slate-400 py-3">{row.period}</TableCell>
                <TableCell className="text-slate-600 dark:text-slate-400 py-3">{row.admin}</TableCell>
                <TableCell className="font-mono text-slate-500 dark:text-slate-400 py-3">{row.phone}</TableCell>
                <TableCell className="pr-5 py-3">
                   <div className="flex items-center space-x-2">
                     <button className="px-2.5 py-[3px] bg-emerald-50 text-[#10B981] text-[12px] font-medium rounded hover:bg-emerald-100 transition-colors">分配菜单</button>
                      <button onClick={() => handleToggleStatus(row)} className="px-2.5 py-[3px] bg-emerald-50 text-[#10B981] text-[12px] font-medium rounded hover:bg-emerald-100 transition-colors">
                        {row.status === '开启' ? '关闭' : '开启'}
                      </button>
                      <button onClick={() => handleEdit(row)} className="px-2.5 py-[3px] bg-emerald-50 text-[#10B981] text-[12px] font-medium rounded hover:bg-emerald-100 transition-colors">修改</button>
                      <button onClick={() => handleDelete(row.id)} className="px-2.5 py-[3px] bg-red-50 text-red-500 text-[12px] font-medium rounded hover:bg-red-100 transition-colors">删除</button>
                    </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
       <Pagination total={query.data?.total ?? 0} page={page} pageSize={pageSize} onPageChange={setPage} />
    </div>

    <EntityFormDialog
      open={editingTenant !== null}
      title={editingTenant?.id ? '修改租户' : '新增租户'}
      onClose={() => setEditingTenant(null)}
      onSubmit={submitTenant}
      fields={[
        { key: 'name', label: '租户名称', value: editingTenant?.name ?? '', onChange: (value) => setEditingTenant((prev) => prev ? { ...prev, name: value } : prev), placeholder: '请输入租户名称' },
        { key: 'code', label: '租户编码', value: editingTenant?.code ?? '', onChange: (value) => setEditingTenant((prev) => prev ? { ...prev, code: value } : prev), placeholder: '请输入租户编码' },
        { key: 'admin', label: '管理员', value: editingTenant?.admin ?? '', onChange: (value) => setEditingTenant((prev) => prev ? { ...prev, admin: value } : prev), placeholder: '请输入管理员' },
        { key: 'phone', label: '管理员电话', value: editingTenant?.phone ?? '', onChange: (value) => setEditingTenant((prev) => prev ? { ...prev, phone: value } : prev), placeholder: '请输入管理员电话' },
        { key: 'status', label: '状态', value: editingTenant?.status ?? '', onChange: (value) => setEditingTenant((prev) => prev ? { ...prev, status: value } : prev), placeholder: '请输入状态（开启/关闭）' },
        { key: 'period', label: '有效期', value: editingTenant?.period ?? '', onChange: (value) => setEditingTenant((prev) => prev ? { ...prev, period: value } : prev), placeholder: '请输入有效期' },
      ]}
      validate={() => {
        if (!editingTenant?.name.trim()) return '请输入租户名称'
        if (!editingTenant?.code.trim()) return '请输入租户编码'
        if (!editingTenant?.admin.trim()) return '请输入管理员'
        if (!editingTenant?.phone.trim()) return '请输入管理员电话'
        return null
      }}
    />

    <ConfirmDialog
      open={deletingId !== null}
      title="删除租户"
      description={deletingId === -1 ? `确认删除已选中的 ${selectedIds.length} 个租户吗？` : '确认删除该租户吗？'}
      confirmText="删除"
      onCancel={() => setDeletingId(null)}
      onConfirm={confirmDelete}
    />
    </>
  );
}
