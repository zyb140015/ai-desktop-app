import * as React from 'react';

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
import { ChevronRight, ChevronDown } from "lucide-react";
import { useDesktopDictsQuery } from '../hooks/use-desktop-dicts-query'
import { createDesktopDict, createDesktopDictItem, deleteDesktopDict, deleteDesktopDictItem, updateDesktopDict, updateDesktopDictItem } from '../services/dict-api'
import { ConfirmDialog, CrudDialog } from '../components/crud-dialog'
import { exportCsvFile, showActionError, showActionSuccess } from '../lib/action-feedback'

type DictSubItem = {
  id: number
  index: number
  label: string
  keyVal: string
  styleType: string
  modified: string
  created: string
  badgeColor: string
}

export function DictPage() {
  const [nameInput, setNameInput] = React.useState('')
  const [dictIdInput, setDictIdInput] = React.useState('')
  const [name, setName] = React.useState('')
  const [dictId, setDictId] = React.useState('')
  const [expandedRows, setExpandedRows] = React.useState<Record<number, boolean>>({
    2: true // Auto expand row 2 ("职称") to match Figma
  });
  const query = useDesktopDictsQuery({ name, dictId })

  const toggleRow = (id: number) => {
    setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const parentData = query.data?.items ?? []
  const [editingDict, setEditingDict] = React.useState<(typeof parentData)[number] | { id: number; dictId: string; name: string; desc: string; modified: string; created: string; items: DictSubItem[] } | null>(null)
  const [editingItem, setEditingItem] = React.useState<(DictSubItem & { dictId: number }) | null>(null)
  const [deletingTarget, setDeletingTarget] = React.useState<{ type: 'dict' | 'item'; id: number } | null>(null)
  const [selectedDictIds, setSelectedDictIds] = React.useState<number[]>([])

  const handleCreateDict = async () => {
	setEditingDict({ id: 0, dictId: '', name: '', desc: '', modified: '', created: '', items: [] })
  }

  const handleEditDict = async (row: typeof parentData[number]) => {
	setEditingDict({ ...row })
  }

  const handleDeleteDict = async (id: number) => {
	setDeletingTarget({ type: 'dict', id })
  }

  const toggleSelectedDict = (id: number) => {
	setSelectedDictIds((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id])
	}

  const toggleSelectAllDicts = () => {
	setSelectedDictIds((prev) => prev.length === parentData.length ? [] : parentData.map((row) => row.id))
	}

  const handleBatchDeleteDicts = () => {
	if (selectedDictIds.length === 0) return
	setDeletingTarget({ type: 'dict', id: -1 })
  }

  const handleExport = () => {
	if (parentData.length === 0) {
		showActionSuccess('当前没有可导出的字典数据')
		return
	}
	exportCsvFile('dicts.csv', ['字典ID', '字典名称', '字典说明', '最近修改', '创建'], parentData.map((row) => [row.dictId, row.name, row.desc, row.modified, row.created]))
	showActionSuccess('字典导出成功')
  }

  const handleCreateDictItem = async (row: typeof parentData[number]) => {
	setEditingItem({ dictId: row.id, id: 0, index: row.items.length + 1, label: '', keyVal: '', styleType: '主要', modified: '', created: '', badgeColor: 'bg-emerald-50 text-emerald-500' })
    setExpandedRows((prev) => ({ ...prev, [row.id]: true }))
  }

  const handleEditDictItem = async (sub: DictSubItem) => {
	const owner = parentData.find((item) => item.items.some((child) => child.id === sub.id))
	setEditingItem({ dictId: owner?.id ?? 0, ...sub })
  }

  const handleDeleteDictItem = async (id: number) => {
	setDeletingTarget({ type: 'item', id })
	}

  const submitDict = async () => {
	if (!editingDict || !editingDict.dictId.trim() || !editingDict.name.trim()) return
	try {
		if (editingDict.id === 0) {
			await createDesktopDict({ ...editingDict, dictId: editingDict.dictId.trim(), name: editingDict.name.trim(), desc: editingDict.desc.trim() || editingDict.name.trim() })
			showActionSuccess('字典新增成功')
		} else {
			await updateDesktopDict({ ...editingDict, dictId: editingDict.dictId.trim(), name: editingDict.name.trim(), desc: editingDict.desc.trim() || editingDict.name.trim() })
			showActionSuccess('字典修改成功')
		}
		setEditingDict(null)
		await query.refetch()
	} catch {
		showActionError('字典保存失败')
	}
  }

  const submitDictItem = async () => {
	if (!editingItem || !editingItem.label.trim() || !editingItem.keyVal.trim()) return
	try {
		if (editingItem.id === 0) {
			await createDesktopDictItem(editingItem.dictId, { ...editingItem, label: editingItem.label.trim(), keyVal: editingItem.keyVal.trim() })
			showActionSuccess('枚举新增成功')
		} else {
			await updateDesktopDictItem({ ...editingItem, label: editingItem.label.trim(), keyVal: editingItem.keyVal.trim() })
			showActionSuccess('枚举修改成功')
		}
		setEditingItem(null)
		await query.refetch()
	} catch {
		showActionError('枚举保存失败')
	}
  }

  const confirmDelete = async () => {
	if (!deletingTarget) return
	try {
		if (deletingTarget.type === 'dict') {
			if (deletingTarget.id === -1) {
				await Promise.all(selectedDictIds.map((id) => deleteDesktopDict(id)))
				setSelectedDictIds([])
			} else {
				await deleteDesktopDict(deletingTarget.id)
			}
			showActionSuccess('字典删除成功')
		} else {
			await deleteDesktopDictItem(deletingTarget.id)
			showActionSuccess('枚举删除成功')
		}
		setDeletingTarget(null)
		await query.refetch()
	} catch {
		showActionError(deletingTarget.type === 'dict' ? '字典删除失败' : '枚举删除失败')
	}
  }

  return (
    <>
    <div className="w-full h-full max-w-[1600px] mx-auto flex flex-col min-h-0 bg-white dark:bg-slate-950 shadow-sm border border-slate-100 dark:border-slate-800 rounded-lg">
      
      {/* Search Header */}
      <div className="flex flex-col p-5 pb-0 shrink-0">
         <div className="flex items-center justify-between pb-5 border-b border-slate-100 dark:border-slate-800">
           <div className="flex items-center space-x-6">
              <div className="flex items-center">
                 <Label className="text-[13px] text-slate-700 dark:text-slate-300 mr-2 shrink-0 font-medium whitespace-nowrap">字典名称:</Label>
                 <Input type="text" placeholder="请输入" className="h-8 w-48 text-[13px] border-slate-200 dark:border-slate-800" value={nameInput} onChange={(event) => setNameInput(event.target.value)} />
              </div>
              <div className="flex items-center">
                 <Label className="text-[13px] text-slate-700 dark:text-slate-300 mr-2 shrink-0 font-medium whitespace-nowrap">字典ID:</Label>
                 <Input type="text" placeholder="请输入" className="h-8 w-48 text-[13px] border-slate-200 dark:border-slate-800" value={dictIdInput} onChange={(event) => setDictIdInput(event.target.value)} />
              </div>
           </div>
           
           <div className="flex items-center space-x-3 shrink-0 ml-4">
               <Button variant="outline" className="h-8 px-5 text-[13px] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800" onClick={() => { setNameInput(''); setDictIdInput(''); setName(''); setDictId('') }}>重置</Button>
               <Button className="h-8 px-5 bg-[#10B981] text-[13px] text-white hover:bg-emerald-600" onClick={() => { setName(nameInput.trim()); setDictId(dictIdInput.trim()) }}>查询</Button>
           </div>
         </div>
         
         {/* Batch Actions Row */}
         <div className="flex items-center justify-between py-4">
            <div className="flex items-center text-[13px]">
                <span className="text-slate-700 dark:text-slate-300 mr-3">已选 <span className="font-bold">{selectedDictIds.length}</span> 项</span>
                <button className="text-[#10B981] disabled:cursor-not-allowed disabled:opacity-50" disabled={selectedDictIds.length === 0} onClick={() => setSelectedDictIds([])}>取消</button>
            </div>
            <div className="flex items-center space-x-3">
               <Button className="h-8 px-4 bg-[#10B981] text-[13px] text-white hover:bg-emerald-600 font-medium" onClick={handleCreateDict}>新增</Button>
               <Button className="h-8 px-4 bg-[#10B981] text-[13px] text-white hover:bg-emerald-600 font-medium" onClick={handleExport}>导出</Button>
                <Button variant="outline" className="h-8 px-4 border-red-200 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 hover:border-red-300 text-[13px] font-medium" disabled={selectedDictIds.length === 0} onClick={handleBatchDeleteDicts}>删除</Button>
            </div>
         </div>
      </div>

      {/* Table Data */}
      <div className="flex-1 overflow-auto custom-scrollbar relative border-t border-slate-100 dark:border-slate-800">
        <Table className="w-full text-left text-[13px] text-slate-600 dark:text-slate-400 min-w-[1100px] border-collapse relative">
          <TableHeader className="sticky top-0 z-20 border-b border-slate-100 bg-[#F8FAFC] text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
            <TableRow className="hover:bg-transparent border-[#E2E8F0] dark:border-slate-700 h-11">
              <TableHead className="w-12 pl-6 pt-1"><input type="checkbox" className="ai-checkbox" checked={parentData.length > 0 && selectedDictIds.length === parentData.length} onChange={toggleSelectAllDicts} /></TableHead>
              <TableHead className="font-bold w-32">字典ID</TableHead>
              <TableHead className="font-bold w-[12%]">字典名称</TableHead>
              <TableHead className="font-bold w-[20%]">字典说明</TableHead>
              <TableHead className="font-bold w-[20%]">最近修改</TableHead>
              <TableHead className="font-bold w-[20%]">创建</TableHead>
              <TableHead className="font-bold pr-5">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
             {parentData.map((row) => {
               const isExpanded = expandedRows[row.id];
               const subItems = row.items as DictSubItem[];

              return (
                <React.Fragment key={row.id}>
                  {/* Parent Row */}
                  <TableRow className="group border-b border-slate-100 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900">
                    <TableCell className="pl-6 h-12 w-12 align-middle"><input type="checkbox" className="ai-checkbox" checked={selectedDictIds.includes(row.id)} onChange={() => toggleSelectedDict(row.id)} /></TableCell>
                    <TableCell className="font-mono text-slate-500 dark:text-slate-400 h-12 align-middle">
                        <div className="flex items-center -ml-1">
                          <button 
                            onClick={() => toggleRow(row.id)}
                            className="mr-1.5 p-0.5 rounded text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:bg-slate-800 transition-colors focus:outline-none"
                          >
                            {isExpanded ? <ChevronDown className="w-[15px] h-[15px]" /> : <ChevronRight className="w-[15px] h-[15px]" />}
                          </button>
                          {row.dictId}
                        </div>
                    </TableCell>
                    <TableCell className="text-slate-700 dark:text-slate-300 font-medium h-12 align-middle">{row.name}</TableCell>
                    <TableCell className="text-slate-500 dark:text-slate-400 h-12 align-middle">{row.desc}</TableCell>
                    <TableCell className="font-mono text-slate-500 dark:text-slate-400 h-12 align-middle">{row.modified}</TableCell>
                    <TableCell className="font-mono text-slate-500 dark:text-slate-400 h-12 align-middle">{row.created}</TableCell>
                    <TableCell className="pr-5 h-12 align-middle">
                       <div className="flex items-center space-x-2">
                          <button onClick={() => handleCreateDictItem(row)} className="px-2.5 py-[3px] bg-emerald-50 text-[#10B981] text-[12px] font-medium rounded hover:bg-emerald-100 transition-colors">新增枚举</button>
                          <button onClick={() => handleEditDict(row)} className="px-2.5 py-[3px] bg-emerald-50 text-[#10B981] text-[12px] font-medium rounded hover:bg-emerald-100 transition-colors">修改</button>
                          <button onClick={() => handleDeleteDict(row.id)} className="px-2.5 py-[3px] bg-red-50 text-red-500 text-[12px] font-medium rounded hover:bg-red-100 transition-colors">删除</button>
                       </div>
                    </TableCell>
                  </TableRow>

                  {/* Expanded Sub Table */}
                  {isExpanded && subItems && (
                     <TableRow className="bg-[#F2FBF6]/40 hover:bg-[#F2FBF6]/40 border-b border-slate-100 dark:border-slate-800">
                         <TableCell colSpan={7} className="p-0">
                             <div className="flex w-full">
                                <div className="w-[72px] shrink-0"></div>
                                <div className="flex-1 pb-4">
                                   <Table className="w-full text-left text-[13px] border-collapse bg-transparent">
                                      <TableHeader className="bg-[#E7F8EE]/60 text-[#10B981] border-b-0">
                                        <TableRow className="hover:bg-transparent border-[#E2E8F0] dark:border-slate-700 h-10">
                                          <TableHead className="font-medium text-[#10B981] w-20">序号</TableHead>
                                          <TableHead className="font-medium text-[#10B981] w-32">枚举值</TableHead>
                                          <TableHead className="font-medium text-[#10B981] w-24">键值</TableHead>
                                          <TableHead className="font-medium text-[#10B981] w-32">回显样式</TableHead>
                                          <TableHead className="font-medium text-[#10B981] w-[20%]">最近修改</TableHead>
                                          <TableHead className="font-medium text-[#10B981] w-[20%]">创建</TableHead>
                                          <TableHead className="font-medium text-[#10B981] pr-5">操作</TableHead>
                                        </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                        {subItems.map((sub) => (
                                          <TableRow key={sub.id} className="hover:bg-white dark:bg-slate-950/40 border-[#E2E8F0] dark:border-slate-700 transition-colors">
                                            <TableCell className="font-mono text-slate-500 dark:text-slate-400/80 py-2.5">{sub.index}</TableCell>
                                            <TableCell className="py-2.5">
                                               <Badge variant="outline" className={cn("rounded-sm font-medium px-1.5 py-0 border-[#E2E8F0] dark:border-slate-700 h-5", sub.badgeColor)}>
                                                 {sub.label}
                                               </Badge>
                                            </TableCell>
                                            <TableCell className="font-mono text-slate-600 dark:text-slate-400 py-2.5">{sub.keyVal}</TableCell>
                                            <TableCell className="text-slate-500 dark:text-slate-400 py-2.5">{sub.styleType}</TableCell>
                                            <TableCell className="font-mono text-slate-500 dark:text-slate-400/80 py-2.5">{sub.modified}</TableCell>
                                            <TableCell className="font-mono text-slate-500 dark:text-slate-400/80 py-2.5">{sub.created}</TableCell>
                                            <TableCell className="pr-5 py-2.5">
                                               <div className="flex items-center space-x-2">
                                                  <button onClick={() => handleEditDictItem(sub)} className="px-2.5 py-[3px] bg-emerald-50 text-[#10B981] text-[12px] font-medium rounded hover:bg-emerald-100 transition-colors">修改</button>
                                                  <button onClick={() => handleDeleteDictItem(sub.id)} className="px-2.5 py-[3px] bg-red-50 text-red-500 text-[12px] font-medium rounded hover:bg-red-100 transition-colors">删除</button>
                                               </div>
                                            </TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                   </Table>
                                </div>
                             </div>
                         </TableCell>
                     </TableRow>
                  )}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </div>

    </div>

    <CrudDialog
      open={editingDict !== null}
      title={editingDict?.id ? '修改字典' : '新增字典'}
      onClose={() => setEditingDict(null)}
      footer={(
        <>
          <Button variant="outline" onClick={() => setEditingDict(null)}>取消</Button>
          <Button onClick={() => {
            if (!editingDict?.dictId.trim()) { showActionError('请输入字典ID'); return }
            if (!editingDict?.name.trim()) { showActionError('请输入字典名称'); return }
            submitDict()
          }}>保存</Button>
        </>
      )}
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>字典ID</Label>
          <Input value={editingDict?.dictId ?? ''} onChange={(event) => setEditingDict((prev) => prev ? { ...prev, dictId: event.target.value } : prev)} placeholder="请输入字典ID" />
        </div>
        <div className="space-y-2">
          <Label>字典名称</Label>
          <Input value={editingDict?.name ?? ''} onChange={(event) => setEditingDict((prev) => prev ? { ...prev, name: event.target.value } : prev)} placeholder="请输入字典名称" />
        </div>
      </div>
      <div className="space-y-2">
        <Label>字典说明</Label>
        <Input value={editingDict?.desc ?? ''} onChange={(event) => setEditingDict((prev) => prev ? { ...prev, desc: event.target.value } : prev)} placeholder="请输入字典说明" />
      </div>
    </CrudDialog>

    <CrudDialog
      open={editingItem !== null}
      title={editingItem?.id ? '修改枚举' : '新增枚举'}
      onClose={() => setEditingItem(null)}
      footer={(
        <>
          <Button variant="outline" onClick={() => setEditingItem(null)}>取消</Button>
          <Button onClick={() => {
            if (!editingItem?.label.trim()) { showActionError('请输入枚举值'); return }
            if (!editingItem?.keyVal.trim()) { showActionError('请输入键值'); return }
            submitDictItem()
          }}>保存</Button>
        </>
      )}
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>枚举值</Label>
          <Input value={editingItem?.label ?? ''} onChange={(event) => setEditingItem((prev) => prev ? { ...prev, label: event.target.value } : prev)} placeholder="请输入枚举值" />
        </div>
        <div className="space-y-2">
          <Label>键值</Label>
          <Input value={editingItem?.keyVal ?? ''} onChange={(event) => setEditingItem((prev) => prev ? { ...prev, keyVal: event.target.value } : prev)} placeholder="请输入键值" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>回显样式</Label>
          <Input value={editingItem?.styleType ?? ''} onChange={(event) => setEditingItem((prev) => prev ? { ...prev, styleType: event.target.value } : prev)} placeholder="请输入回显样式" />
        </div>
        <div className="space-y-2">
          <Label>排序</Label>
          <Input value={String(editingItem?.index ?? 1)} onChange={(event) => setEditingItem((prev) => prev ? { ...prev, index: Number(event.target.value || 1) } : prev)} placeholder="请输入排序" />
        </div>
      </div>
    </CrudDialog>

    <ConfirmDialog
      open={deletingTarget !== null}
      title={deletingTarget?.type === 'dict' ? '删除字典' : '删除枚举项'}
      description={deletingTarget?.type === 'dict' ? (deletingTarget.id === -1 ? `确认删除已选中的 ${selectedDictIds.length} 个字典吗？` : '确认删除该字典吗？') : '确认删除该枚举项吗？'}
      confirmText="删除"
      onCancel={() => setDeletingTarget(null)}
      onConfirm={confirmDelete}
    />
    </>
  );
}
