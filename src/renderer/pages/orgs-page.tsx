import * as React from 'react';
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
import { cn } from "@/lib/utils"
import { ChevronRight, ChevronDown, Search } from "lucide-react";
import { useDesktopOrgsQuery } from '../hooks/use-desktop-orgs-query'
import { createDesktopOrg, deleteDesktopOrg, updateDesktopOrg } from '../services/org-crud-api'
import { ConfirmDialog } from '../components/crud-dialog'
import { EntityFormDialog } from '../components/entity-form-dialog'
import { exportCsvFile, showActionError, showActionSuccess } from '../lib/action-feedback'

export function OrgsPage() {
  const [activeNode, setActiveNode] = React.useState('');
  const [treeKeyword, setTreeKeyword] = React.useState('')
  const [treeExpanded, setTreeExpanded] = React.useState(true)
  const [nameInput, setNameInput] = React.useState('')
  const [codeInput, setCodeInput] = React.useState('')
  const [name, setName] = React.useState('')
  const [code, setCode] = React.useState('')
  const [page, setPage] = React.useState(1)
  const pageSize = 10
  const query = useDesktopOrgsQuery({ department: activeNode, name, code, page, pageSize })

  const treeData = query.data?.departments ?? []
  const tableData = query.data?.items ?? []
  const [editingOrg, setEditingOrg] = React.useState<(typeof tableData)[number] | { id: number; name: string; code: string; parent1: string; order: number; parent2: string; created: string; modified: string } | null>(null)
  const [deletingId, setDeletingId] = React.useState<number | null>(null)
  const [selectedIds, setSelectedIds] = React.useState<number[]>([])

  const filteredTreeData = React.useMemo(() => {
    const keyword = treeKeyword.trim()
    if (!keyword) return treeData
    return treeData.filter((node) => node.name.includes(keyword))
  }, [treeData, treeKeyword])

  React.useEffect(() => {
    if (treeData.length === 0) return
    if (activeNode === '') return
    if (!treeData.some((node) => node.name === activeNode)) {
      setActiveNode(treeData[0].name)
      setPage(1)
    }
  }, [activeNode, treeData])

  const handleCreate = async () => {
	setEditingOrg({ id: 0, name: '', code: '', parent1: '东方科技', order: tableData.length + 1, parent2: '部门', created: '', modified: '' })
  }

  const handleEdit = async (row: typeof tableData[number]) => {
	setEditingOrg({ ...row })
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
		showActionSuccess('当前没有可导出的组织数据')
		return
	}
	exportCsvFile('orgs.csv', ['组织名称', '组织编码', '上级组织', '排序', '类型', '创建', '最近修改'], tableData.map((row) => [row.name, row.code, row.parent1, row.order, row.parent2, row.created, row.modified]))
	showActionSuccess('组织导出成功')
  }

  const submitOrg = async () => {
	if (!editingOrg || !editingOrg.name.trim() || !editingOrg.code.trim()) return
	try {
		if (editingOrg.id === 0) {
			await createDesktopOrg({ ...editingOrg, name: editingOrg.name.trim(), code: editingOrg.code.trim() })
			showActionSuccess('组织新增成功')
		} else {
			await updateDesktopOrg({ ...editingOrg, name: editingOrg.name.trim(), code: editingOrg.code.trim() })
			showActionSuccess('组织修改成功')
		}
		setEditingOrg(null)
		await query.refetch()
	} catch {
		showActionError('组织保存失败')
	}
  }

  const confirmDelete = async () => {
	if (deletingId == null) return
	try {
		if (deletingId === -1) {
			await Promise.all(selectedIds.map((id) => deleteDesktopOrg(id)))
			setSelectedIds([])
		} else {
			await deleteDesktopOrg(deletingId)
		}
		showActionSuccess('组织删除成功')
		setDeletingId(null)
		await query.refetch()
	} catch {
		showActionError('组织删除失败')
	}
  }

  return (
    <>
    <div className="w-full h-full max-w-[1600px] mx-auto flex min-h-0 bg-white dark:bg-slate-950 shadow-sm border border-slate-100 dark:border-slate-800 rounded-lg">
      
      {/* Left Tree Panel */}
      <div className="w-[240px] flex flex-col shrink-0 border-r border-slate-100 dark:border-slate-800/80 bg-[#FAFAFA]/30 rounded-l-lg">
        <div className="p-4 shrink-0">
          <div className="relative">
            <Input 
              type="text" 
              placeholder="请输入关键字搜索" 
              className="h-8 pr-10 text-[12px] bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800"
              value={treeKeyword}
              onChange={(event) => setTreeKeyword(event.target.value)}
            />
            <button className="absolute right-0 top-0 h-full w-8 bg-[#10B981] hover:bg-emerald-600 transition-colors flex items-center justify-center rounded-r-md text-white border border-[#10B981]">
              <Search className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto px-3 pb-4 custom-scrollbar">
           {/* Root Node */}
           <div className="flex items-center px-2 py-1.5 cursor-pointer text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:bg-slate-800/50 rounded transition-colors group mb-1" onClick={() => setTreeExpanded((prev) => !prev)}>
             {treeExpanded ? <ChevronDown className="w-3.5 h-3.5 mr-2 text-slate-500 dark:text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 mr-2 text-slate-500 dark:text-slate-400" />}
              <span className="text-[13px] font-medium">全部部门 ({filteredTreeData.reduce((sum, item) => sum + item.count, 0)})</span>
            </div>
            
            {/* Child Nodes */}
            {treeExpanded ? <div className="flex flex-col space-y-0.5">
              <div 
                onClick={() => { setActiveNode(''); setPage(1) }}
                className={cn(
                  "flex items-center pl-8 pr-3 py-1.5 cursor-pointer rounded transition-colors text-[13px]",
                  activeNode === '' 
                    ? "bg-emerald-50 text-[#10B981] font-medium" 
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-slate-100"
                )}
              >
                <ChevronRight className={cn(
                  "w-3.5 h-3.5 mr-2 transition-colors",
                  activeNode === '' ? "text-[#10B981]" : "text-slate-400 dark:text-slate-500"
                )} />
                <span className="flex-1 truncate">全部</span>
              </div>
              {filteredTreeData.map((node) => {
                const isActive = activeNode === node.name;
               return (
                 <div 
                   key={node.name}
                    onClick={() => { setActiveNode(node.name); setPage(1) }}
                   className={cn(
                     "flex items-center pl-8 pr-3 py-1.5 cursor-pointer rounded transition-colors text-[13px]",
                     isActive 
                       ? "bg-emerald-50 text-[#10B981] font-medium" 
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-slate-100"
                   )}
                 >
                   <ChevronRight className={cn(
                     "w-3.5 h-3.5 mr-2 transition-colors",
                     isActive ? "text-[#10B981]" : "text-slate-400 dark:text-slate-500"
                   )} />
                   <span className="flex-1 truncate">{node.name} ({node.count})</span>
                 </div>
                );
              })}
            </div> : null}
         </div>
       </div>

      {/* Right Data Panel */}
      <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-slate-950 rounded-r-lg">
        {/* Search Header */}
        <div className="flex flex-col px-5 pt-5 pb-0 shrink-0">
          <div className="flex items-center justify-between pb-5 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <Label className="text-[13px] text-slate-700 dark:text-slate-300 mr-2 shrink-0 font-medium whitespace-nowrap">组织名称:</Label>
                  <Input type="text" placeholder="请输入组织名称" className="h-8 w-44 text-[13px] border-slate-200 dark:border-slate-800" value={nameInput} onChange={(event) => setNameInput(event.target.value)} />
                </div>
                <div className="flex items-center">
                  <Label className="text-[13px] text-slate-700 dark:text-slate-300 mr-2 shrink-0 font-medium whitespace-nowrap">组织编码:</Label>
                  <Input type="text" placeholder="请输入组织编码" className="h-8 w-44 text-[13px] border-slate-200 dark:border-slate-800" value={codeInput} onChange={(event) => setCodeInput(event.target.value)} />
                </div>
            </div>
            
            <div className="flex items-center space-x-3 shrink-0 ml-4">
                <Button variant="outline" className="h-8 px-5 text-[13px] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800" onClick={() => { setNameInput(''); setCodeInput(''); setName(''); setCode(''); setPage(1) }}>重置</Button>
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
                 <Button className="h-8 px-4 bg-[#10B981] text-[13px] text-white hover:bg-emerald-600 font-medium">导入</Button>
                 <Button className="h-8 px-4 bg-[#10B981] text-[13px] text-white hover:bg-emerald-600 font-medium" onClick={handleExport}>导出</Button>
                 <Button variant="outline" className="h-8 px-4 border-red-200 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 hover:border-red-300 text-[13px] font-medium" disabled={selectedIds.length === 0} onClick={handleBatchDelete}>删除</Button>
              </div>
          </div>
        </div>

        {/* Table Data */}
        <div className="flex-1 overflow-auto custom-scrollbar relative border-t border-slate-100 dark:border-slate-800">
          <Table className="w-full text-left text-[13px] text-slate-600 dark:text-slate-400 min-w-[1100px]">
            <TableHeader className="sticky top-0 z-10 border-b border-slate-100 bg-[#F8FAFC] text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
              <TableRow className="hover:bg-transparent border-[#E2E8F0] dark:border-slate-700">
                <TableHead className="w-12 pl-6 h-11"><input type="checkbox" className="ai-checkbox" checked={tableData.length > 0 && selectedIds.length === tableData.length} onChange={toggleSelectAll} /></TableHead>
                <TableHead className="font-bold w-12 h-11">序号</TableHead>
                <TableHead className="font-bold w-32 h-11">组织名称</TableHead>
                <TableHead className="font-bold w-24 h-11">组织编码</TableHead>
                <TableHead className="font-bold w-32 h-11">上级组织</TableHead>
                <TableHead className="font-bold w-16 h-11">排序</TableHead>
                <TableHead className="font-bold w-24 h-11">上级组织</TableHead>
                <TableHead className="font-bold w-48 h-11">创建</TableHead>
                <TableHead className="font-bold w-48 h-11">最近修改</TableHead>
                <TableHead className="font-bold pr-5 h-11">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((row) => (
                <TableRow key={row.id} className="border-b border-slate-100 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900">
                  <TableCell className="pl-6 h-11 py-2.5"><input type="checkbox" className="ai-checkbox" checked={selectedIds.includes(row.id)} onChange={() => toggleSelected(row.id)} /></TableCell>
                  <TableCell className="font-mono text-slate-500 dark:text-slate-400 py-2.5">{row.id}</TableCell>
                  <TableCell className="text-slate-700 dark:text-slate-300 font-medium py-2.5">{row.name}</TableCell>
                  <TableCell className="font-mono text-slate-600 dark:text-slate-400 py-2.5">{row.code}</TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-400 py-2.5">{row.parent1}</TableCell>
                  <TableCell className="font-mono text-slate-500 dark:text-slate-400 py-2.5">{row.order}</TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-400 py-2.5">{row.parent2}</TableCell>
                  <TableCell className="font-mono text-slate-500 dark:text-slate-400 py-2.5">{row.created}</TableCell>
                  <TableCell className="font-mono text-slate-500 dark:text-slate-400 py-2.5">{row.modified}</TableCell>
                  <TableCell className="pr-5 py-2.5">
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

        {/* Extracted Shared Pagination Component */}
        <Pagination total={query.data?.total ?? 0} page={page} pageSize={pageSize} onPageChange={setPage} />
      </div>

    </div>

    <EntityFormDialog
      open={editingOrg !== null}
      title={editingOrg?.id ? '修改组织' : '新增组织'}
      onClose={() => setEditingOrg(null)}
      onSubmit={submitOrg}
      fields={[
        { key: 'name', label: '组织名称', value: editingOrg?.name ?? '', onChange: (value) => setEditingOrg((prev) => prev ? { ...prev, name: value } : prev), placeholder: '请输入组织名称' },
        { key: 'code', label: '组织编码', value: editingOrg?.code ?? '', onChange: (value) => setEditingOrg((prev) => prev ? { ...prev, code: value } : prev), placeholder: '请输入组织编码' },
        { key: 'order', label: '排序', value: String(editingOrg?.order ?? 1), onChange: (value) => setEditingOrg((prev) => prev ? { ...prev, order: Number(value || 1) } : prev), placeholder: '请输入排序' },
        { key: 'parent1', label: '上级组织', value: editingOrg?.parent1 ?? '', onChange: (value) => setEditingOrg((prev) => prev ? { ...prev, parent1: value } : prev), placeholder: '请输入上级组织' },
        { key: 'parent2', label: '类型', value: editingOrg?.parent2 ?? '', onChange: (value) => setEditingOrg((prev) => prev ? { ...prev, parent2: value } : prev), placeholder: '请输入类型' },
      ]}
      validate={() => {
        if (!editingOrg?.name.trim()) return '请输入组织名称'
        if (!editingOrg?.code.trim()) return '请输入组织编码'
        return null
      }}
    />

    <ConfirmDialog
      open={deletingId !== null}
      title="删除组织"
      description={deletingId === -1 ? `确认删除已选中的 ${selectedIds.length} 个组织吗？` : '确认删除该组织吗？'}
      confirmText="删除"
      onCancel={() => setDeletingId(null)}
      onConfirm={confirmDelete}
    />
    </>
  );
}
