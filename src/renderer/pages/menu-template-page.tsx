import { Pagination } from '../components/pagination';

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useState } from 'react'
import { useDesktopMenuTemplatesQuery } from '../hooks/use-desktop-menu-templates-query'
import { createDesktopMenuTemplate, deleteDesktopMenuTemplate, updateDesktopMenuTemplate } from '../services/menu-template-api'
import { ConfirmDialog, CrudDialog } from '../components/crud-dialog'
import { exportCsvFile, showActionError, showActionSuccess } from '../lib/action-feedback'

export function MenuTemplatePage() {
  const [nameInput, setNameInput] = useState('')
  const [descInput, setDescInput] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [page, setPage] = useState(1)
  const pageSize = 10
  const query = useDesktopMenuTemplatesQuery({ name, description, page, pageSize })
  const tableData = query.data?.items ?? []
  const [editingTemplate, setEditingTemplate] = useState<{ id: number; name: string; desc: string; tenants: number } | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const handleCreate = async () => {
	setEditingTemplate({ id: 0, name: '', desc: '', tenants: 0 })
  }

  const handleEdit = async (row: typeof tableData[number]) => {
	setEditingTemplate({ id: row.id, name: row.name, desc: row.desc, tenants: row.tenants })
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

  const handleExport = () => {
	if (tableData.length === 0) {
		showActionSuccess('当前没有可导出的模板数据')
		return
	}
	exportCsvFile('menu-templates.csv', ['模板名称', '关联租户数', '模板描述', '最近修改', '创建'], tableData.map((row) => [row.name, row.tenants, row.desc, row.modified, row.created]))
	showActionSuccess('菜单模板导出成功')
  }

  const submitTemplate = async () => {
	if (!editingTemplate || !editingTemplate.name.trim()) return
	try {
		if (editingTemplate.id === 0) {
			await createDesktopMenuTemplate({ id: 0, name: editingTemplate.name.trim(), tenants: editingTemplate.tenants, desc: editingTemplate.desc.trim(), modified: '', created: '' })
			showActionSuccess('模板新增成功')
		} else {
			const current = tableData.find((item) => item.id === editingTemplate.id)
			if (!current) return
			await updateDesktopMenuTemplate({ ...current, name: editingTemplate.name.trim(), desc: editingTemplate.desc.trim(), tenants: editingTemplate.tenants })
			showActionSuccess('模板修改成功')
		}
		setEditingTemplate(null)
		await query.refetch()
	} catch {
		showActionError('模板保存失败')
	}
  }

  const confirmDelete = async () => {
	if (deletingId == null) return
	try {
		if (deletingId === -1) {
			await Promise.all(selectedIds.map((id) => deleteDesktopMenuTemplate(id)))
			setSelectedIds([])
		} else {
			await deleteDesktopMenuTemplate(deletingId)
		}
		showActionSuccess('模板删除成功')
		setDeletingId(null)
		await query.refetch()
	} catch {
		showActionError('模板删除失败')
	}
  }

  return (
    <>
    <div className="w-full h-full max-w-[1600px] mx-auto flex flex-col min-h-0 bg-white dark:bg-slate-950 shadow-sm border border-slate-100 dark:border-slate-800 rounded-lg rounded-tl-none">
      
      {/* Search Header */}
      <div className="flex flex-col p-5 pb-0 shrink-0">
         <div className="flex items-center justify-between pb-5 border-b border-slate-100 dark:border-slate-800">
           <div className="flex items-center space-x-6">
              <div className="flex items-center">
                 <Label className="text-[13px] text-slate-700 dark:text-slate-300 mr-2 shrink-0 font-medium whitespace-nowrap">模板名称:</Label>
                  <Input type="text" placeholder="请输入模板名称" className="h-8 w-48 text-[13px] border-slate-200 dark:border-slate-800" value={nameInput} onChange={(event) => setNameInput(event.target.value)} />
              </div>
              <div className="flex items-center">
                 <Label className="text-[13px] text-slate-700 dark:text-slate-300 mr-2 shrink-0 font-medium whitespace-nowrap">模板描述:</Label>
                  <Input type="text" placeholder="请输入模板描述" className="h-8 w-48 text-[13px] border-slate-200 dark:border-slate-800" value={descInput} onChange={(event) => setDescInput(event.target.value)} />
              </div>
           </div>
           
           <div className="flex items-center space-x-3 shrink-0 ml-4">
               <Button variant="outline" className="h-8 px-5 text-[13px] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800" onClick={() => { setNameInput(''); setDescInput(''); setName(''); setDescription(''); setPage(1) }}>重置</Button>
               <Button className="h-8 px-5 bg-[#10B981] text-[13px] text-white hover:bg-emerald-600" onClick={() => { setName(nameInput.trim()); setDescription(descInput.trim()); setPage(1) }}>查询</Button>
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
                <Button variant="outline" className="h-8 px-4 border-red-200 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 hover:border-red-300 text-[13px] font-medium" disabled={selectedIds.length === 0} onClick={handleBatchDelete}>删除</Button>
            </div>
         </div>
      </div>

      {/* Table Data */}
      <div className="flex-1 overflow-auto custom-scrollbar relative border-t border-slate-100 dark:border-slate-800">
        <Table className="w-full text-left text-[13px] text-slate-600 dark:text-slate-400 min-w-[900px]">
          <TableHeader className="sticky top-0 z-10 border-b border-slate-100 bg-[#F8FAFC] text-slate-700 shadow-sm dark:border-slate-800/80 dark:bg-slate-900 dark:text-slate-300">
            <TableRow className="hover:bg-transparent border-[#E2E8F0] dark:border-slate-700">
              <TableHead className="w-12 pl-6 h-11"><input type="checkbox" className="ai-checkbox" checked={tableData.length > 0 && selectedIds.length === tableData.length} onChange={toggleSelectAll} /></TableHead>
              <TableHead className="font-bold w-16 h-11">序号</TableHead>
              <TableHead className="font-bold w-[18%] h-11">模板名称</TableHead>
              <TableHead className="font-bold w-28 h-11">关联租户数</TableHead>
              <TableHead className="font-bold w-[18%] h-11">模板描述</TableHead>
              <TableHead className="font-bold w-[22%] h-11">最近修改</TableHead>
               <TableHead className="font-bold h-11">创建</TableHead>
               <TableHead className="font-bold pr-5 h-11">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((row) => (
              <TableRow key={row.id} className="border-b border-slate-100 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900">
                <TableCell className="pl-6 py-3"><input type="checkbox" className="ai-checkbox" checked={selectedIds.includes(row.id)} onChange={() => toggleSelected(row.id)} /></TableCell>
                <TableCell className="font-mono text-slate-500 dark:text-slate-400 py-3">{row.id}</TableCell>
                <TableCell className="text-slate-700 dark:text-slate-300 font-medium py-3">{row.name}</TableCell>
                <TableCell className="font-mono text-slate-600 dark:text-slate-400 py-3">{row.tenants}</TableCell>
                <TableCell className="text-slate-500 dark:text-slate-400 py-3">{row.desc}</TableCell>
                <TableCell className="font-mono text-slate-500 dark:text-slate-400 py-3">{row.modified}</TableCell>
                 <TableCell className="font-mono text-slate-500 dark:text-slate-400 py-3">{row.created}</TableCell>
                 <TableCell className="pr-5 py-3">
                    <div className="flex items-center space-x-2">
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

    <CrudDialog
      open={editingTemplate !== null}
      title={editingTemplate?.id ? '修改模板' : '新增模板'}
      onClose={() => setEditingTemplate(null)}
      footer={(
        <>
          <Button variant="outline" onClick={() => setEditingTemplate(null)}>取消</Button>
          <Button onClick={submitTemplate}>保存</Button>
        </>
      )}
    >
      <div className="space-y-2">
        <Label>模板名称</Label>
        <Input value={editingTemplate?.name ?? ''} onChange={(event) => setEditingTemplate((prev) => prev ? { ...prev, name: event.target.value } : prev)} placeholder="请输入模板名称" />
      </div>
      <div className="space-y-2">
        <Label>模板描述</Label>
        <Input value={editingTemplate?.desc ?? ''} onChange={(event) => setEditingTemplate((prev) => prev ? { ...prev, desc: event.target.value } : prev)} placeholder="请输入模板描述" />
      </div>
      <div className="space-y-2">
        <Label>关联租户数</Label>
        <Input value={String(editingTemplate?.tenants ?? 0)} onChange={(event) => setEditingTemplate((prev) => prev ? { ...prev, tenants: Number(event.target.value || 0) } : prev)} placeholder="请输入关联租户数" />
      </div>
    </CrudDialog>

    <ConfirmDialog
      open={deletingId !== null}
      title="删除模板"
      description={deletingId === -1 ? `确认删除已选中的 ${selectedIds.length} 个模板吗？` : '确认删除该模板吗？'}
      confirmText="删除"
      onCancel={() => setDeletingId(null)}
      onConfirm={confirmDelete}
    />
    </>
  );
}
