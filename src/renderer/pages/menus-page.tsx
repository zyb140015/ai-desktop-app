import * as React from 'react';

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { ChevronRight, ChevronDown, Home } from "lucide-react";
import { useDesktopManagedMenusQuery } from '../hooks/use-desktop-managed-menus-query'
import { createDesktopManagedMenu, deleteDesktopManagedMenu, updateDesktopManagedMenu } from '../services/menu-manage-api'
import { ConfirmDialog, CrudDialog } from '../components/crud-dialog'
import { exportCsvFile, showActionError, showActionSuccess } from '../lib/action-feedback'

type MenuNode = {
  id: number;
  name: string;
  hasSub: boolean;
  depth: number;
  level: string;
  order: number;
  type: string;
  status: string;
  path: string;
  perm: string;
  parentId: number | null;
};

export function MenusPage() {
  const [nameInput, setNameInput] = React.useState('')
  const [name, setName] = React.useState('')
  const [menuType, setMenuType] = React.useState('')
  const [status, setStatus] = React.useState('')
  const [expandedIds, setExpandedIds] = React.useState<Record<number, boolean>>({
    2: true, // Auto expand "租户配置"
    5: true  // Auto expand "组织管理"
  });

  const toggleRow = (id: number) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleAll = () => {
    const isAllExpanded = Object.keys(expandedIds).length >= 5; // roughly
    if (isAllExpanded) {
      setExpandedIds({});
    } else {
      setExpandedIds({ 1: true, 2: true, 3: true, 4: true, 5: true });
    }
  };

  const query = useDesktopManagedMenusQuery({ name, type: menuType, status })
  const rawData: MenuNode[] = query.data?.items.map((item) => ({ id: item.id, parentId: item.parentId || null, name: item.name, hasSub: item.hasSub, depth: item.depth, level: item.level, order: item.order, type: item.type, status: item.status, path: item.path, perm: item.perm })) ?? []
  const [editingMenu, setEditingMenu] = React.useState<(MenuNode & { icon?: string }) | { id: number; parentId: number | null; name: string; hasSub: boolean; depth: number; level: string; order: number; type: string; status: string; path: string; perm: string; icon?: string } | null>(null)
  const [deletingId, setDeletingId] = React.useState<number | null>(null)
  const [selectedIds, setSelectedIds] = React.useState<number[]>([])

  const handleCreate = async () => {
	setEditingMenu({ id: 0, parentId: 0, name: '', hasSub: false, depth: 0, level: '1级', order: rawData.length + 1, type: '目录', status: '可见', path: '/', perm: '', icon: 'Home' })
  }

  const handleEdit = async (row: MenuNode) => {
	setEditingMenu({ ...row, icon: 'Home' })
  }

  const handleCreateChild = async (row: MenuNode) => {
	const nextLevel = row.level === '1级' ? '2级' : '3级'
	const nextType = row.level === '2级' ? '按钮' : '菜单'
	setEditingMenu({
		id: 0,
		parentId: row.id,
		name: '',
		hasSub: false,
		depth: row.depth + 1,
		level: nextLevel,
		order: 1,
		type: nextType,
		status: '可见',
		path: buildInheritedMenuPath(row, nextType),
		perm: buildInheritedMenuPerm(row, nextType),
		icon: row.type === '按钮' ? 'Home' : 'Home',
	})
  }

  const handleDelete = async (id: number) => {
	setDeletingId(id)
	}

  const toggleSelected = (id: number) => {
	setSelectedIds((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id])
	}

  const toggleSelectAll = () => {
	setSelectedIds((prev) => prev.length === rawData.length ? [] : rawData.map((row) => row.id))
	}

  const handleBatchDelete = () => {
	if (selectedIds.length === 0) return
	setDeletingId(-1)
  }

  const submitMenu = async () => {
	if (!editingMenu || !editingMenu.name.trim()) return
	const normalizedMenu = {
		...editingMenu,
		parentId: editingMenu.parentId || 0,
		name: editingMenu.name.trim(),
		path: editingMenu.path.trim() || inferPathFromCurrentMenu(editingMenu),
		perm: editingMenu.perm.trim() || inferPermFromCurrentMenu(editingMenu),
		icon: editingMenu.icon || 'Home',
	}
    if (editingMenu.id === 0) {
		await createDesktopManagedMenu(normalizedMenu)
		showActionSuccess('菜单新增成功')
	} else {
		await updateDesktopManagedMenu(normalizedMenu)
		showActionSuccess('菜单修改成功')
	}
	setEditingMenu(null)
	await query.refetch()
  }

  const confirmDelete = async () => {
	if (deletingId == null) return
	if (deletingId === -1) {
		await Promise.all(selectedIds.map((id) => deleteDesktopManagedMenu(id)))
		setSelectedIds([])
	} else {
		await deleteDesktopManagedMenu(deletingId)
	}
	showActionSuccess('菜单删除成功')
	setDeletingId(null)
    await query.refetch()
  }

  const handleExport = () => {
	if (rawData.length === 0) {
		showActionError('当前没有可导出的菜单数据')
		return
	}
	exportCsvFile('menus.csv', ['菜单名称', '层级', '排序', '类型', '状态', '请求地址', '权限标识'], rawData.map((row) => [row.name, row.level, row.order, row.type, row.status, row.path, row.perm]))
	showActionSuccess('菜单导出成功')
  }

  // Logic to only show rows whose parents are expanded
  const visibleData = rawData.filter(row => {
    if (row.parentId === null) return true;
    // Check if immediate parent is expanded
    if (!expandedIds[row.parentId]) return false;
    // Walk up the tree to make sure all ancestors are expanded
    let currentParentId = rawData.find(r => r.id === row.parentId)?.parentId;
    while (currentParentId !== null && currentParentId !== undefined) {
      if (!expandedIds[currentParentId]) return false;
      currentParentId = rawData.find(r => r.id === currentParentId)?.parentId;
    }
    return true;
  });

  return (
    <>
    <div className="w-full h-full max-w-[1600px] mx-auto flex flex-col min-h-0 bg-white dark:bg-slate-950 shadow-sm border border-slate-100 dark:border-slate-800 rounded-lg rounded-tl-none">
      
      {/* Search Header */}
      <div className="flex flex-col p-5 pb-0 shrink-0">
         <div className="flex items-center justify-between pb-5 border-b border-slate-100 dark:border-slate-800">
           <div className="flex items-center space-x-6">
              <div className="flex items-center">
                 <Label className="text-[13px] text-slate-700 dark:text-slate-300 mr-2 shrink-0 font-medium whitespace-nowrap">菜单名称:</Label>
                 <Input type="text" placeholder="请输入" className="h-8 w-48 text-[13px] border-slate-200 dark:border-slate-800" value={nameInput} onChange={(event) => setNameInput(event.target.value)} />
              </div>
              <div className="flex items-center">
                 <Label className="text-[13px] text-slate-700 dark:text-slate-300 mr-2 shrink-0 font-medium whitespace-nowrap">类型:</Label>
                  <Select value={menuType || undefined} onValueChange={(value: string | null) => setMenuType(value ?? '')}>
                    <SelectTrigger className="h-8 w-48 text-[13px] text-slate-500 dark:text-slate-400">
                       <SelectValue placeholder="请选择" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="目录">目录</SelectItem>
                        <SelectItem value="菜单">菜单</SelectItem>
                        <SelectItem value="按钮">按钮</SelectItem>
                    </SelectContent>
                 </Select>
              </div>
              <div className="flex items-center">
                 <Label className="text-[13px] text-slate-700 dark:text-slate-300 mr-3 shrink-0 font-medium whitespace-nowrap">状态:</Label>
                  <RadioGroup value={status === '可见' ? 'visible' : status === '不可见' ? 'invisible' : 'all'} onValueChange={(value: string) => setStatus(value === 'all' ? '' : value === 'visible' ? '可见' : '不可见')} className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1.5 cursor-pointer">
                      <RadioGroupItem value="all" id="m_r1" className="text-emerald-500 border-emerald-500 fill-emerald-500 w-[14px] h-[14px]" />
                      <Label htmlFor="m_r1" className="text-[13px] text-slate-600 dark:text-slate-400 cursor-pointer font-normal">全部</Label>
                    </div>
                    <div className="flex items-center space-x-1.5 cursor-pointer">
                      <RadioGroupItem value="invisible" id="m_r2" className="w-[14px] h-[14px]" />
                      <Label htmlFor="m_r2" className="text-[13px] text-slate-600 dark:text-slate-400 cursor-pointer font-normal">不可见</Label>
                    </div>
                    <div className="flex items-center space-x-1.5 cursor-pointer">
                      <RadioGroupItem value="visible" id="m_r3" className="w-[14px] h-[14px]" />
                      <Label htmlFor="m_r3" className="text-[13px] text-slate-600 dark:text-slate-400 cursor-pointer font-normal">可见</Label>
                    </div>
                 </RadioGroup>
              </div>
           </div>
           
           <div className="flex items-center space-x-3 shrink-0 ml-4">
               <Button variant="outline" className="h-8 px-5 text-[13px] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800" onClick={() => { setNameInput(''); setName(''); setMenuType(''); setStatus('') }}>重置</Button>
               <Button className="h-8 px-5 bg-[#10B981] text-[13px] text-white hover:bg-emerald-600" onClick={() => setName(nameInput.trim())}>查询</Button>
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
                 <Button onClick={toggleAll} className="h-8 px-4 bg-[#10B981] text-[13px] text-white hover:bg-emerald-600 font-medium">展开/折叠</Button>
                 <Button onClick={handleExport} className="h-8 px-4 bg-[#10B981] text-[13px] text-white hover:bg-emerald-600 font-medium">导出</Button>
                 <Button variant="outline" className="h-8 px-4 border-red-200 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 hover:border-red-300 text-[13px] font-medium" disabled={selectedIds.length === 0} onClick={handleBatchDelete}>删除</Button>
              </div>
          </div>
      </div>

      {/* Table Data (Tree Structure) */}
      <div className="flex-1 overflow-auto custom-scrollbar relative border-t border-slate-100 dark:border-slate-800">
        <Table className="w-full text-left text-[13px] text-slate-600 dark:text-slate-400 min-w-[1200px]">
          <TableHeader className="sticky top-0 z-10 border-b border-slate-100 bg-[#F8FAFC] text-slate-700 shadow-sm dark:border-slate-800/80 dark:bg-slate-900 dark:text-slate-300">
            <TableRow className="hover:bg-transparent border-[#E2E8F0] dark:border-slate-700">
              <TableHead className="w-12 pl-6 h-11"><input type="checkbox" className="ai-checkbox" checked={rawData.length > 0 && selectedIds.length === rawData.length} onChange={toggleSelectAll} /></TableHead>
              <TableHead className="font-bold pl-2 w-[18%] h-11">序号</TableHead>
              <TableHead className="font-bold w-[10%] h-11">层级</TableHead>
              <TableHead className="font-bold w-[8%] h-11">排序</TableHead>
              <TableHead className="font-bold w-[10%] h-11">类型</TableHead>
              <TableHead className="font-bold w-[10%] h-11">图标</TableHead>
              <TableHead className="font-bold w-[10%] h-11">状态</TableHead>
              <TableHead className="font-bold w-[15%] h-11">请求地址</TableHead>
              <TableHead className="font-bold w-[15%] h-11">权限标识</TableHead>
              <TableHead className="font-bold pr-5 h-11">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visibleData.map((row) => {
              const paddingLeft = `${(row.depth * 24) + 32}px`;

              return (
                <TableRow key={row.id} className="border-b border-slate-100 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900">
                  <TableCell className="pl-6 py-3.5"><input type="checkbox" className="ai-checkbox" checked={selectedIds.includes(row.id)} onChange={() => toggleSelected(row.id)} /></TableCell>
                  <TableCell className="py-3.5 font-medium text-slate-700 dark:text-slate-300 flex items-center h-[52px]" style={{ paddingLeft }}>
                     {row.hasSub ? (
                       <button onClick={() => toggleRow(row.id)} className="mr-1.5 p-0.5 rounded text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:bg-slate-800 transition-colors focus:outline-none flex-shrink-0">
                         {expandedIds[row.id] ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                       </button>
                     ) : (
                       <span className="w-[20px] inline-block shrink-0"></span> // Empty spacer to align items exactly where the arrow would be
                     )}
                     {row.name}
                  </TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-400 py-3.5">{row.level}</TableCell>
                  <TableCell className="font-mono text-slate-500 dark:text-slate-400 py-3.5">{row.order}</TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-400 py-3.5">{row.type}</TableCell>
                  <TableCell className="text-slate-400 dark:text-slate-500 py-3.5">
                     <div className="w-6 h-6 bg-slate-200/50 rounded flex items-center justify-center">
                        <Home className="w-3.5 h-3.5 fill-current text-slate-400 dark:text-slate-500" />
                     </div>
                  </TableCell>
                  <TableCell className="py-3.5">
                     <Badge 
                        variant="outline" 
                        className={cn(
                          "rounded font-medium px-2 py-0 border-[#E2E8F0] dark:border-slate-700 pointer-events-none",
                          row.status === '可见' 
                            ? "bg-emerald-50 text-[#10B981]" 
                            : "bg-red-50 text-red-500"
                        )}
                      >
                        {row.status}
                     </Badge>
                  </TableCell>
                  <TableCell className="text-slate-500 dark:text-slate-400 py-3.5">{row.path}</TableCell>
                  <TableCell className="font-mono text-slate-500 dark:text-slate-400 py-3.5">{row.perm}</TableCell>
                  <TableCell className="pr-5 py-3.5">
                     <div className="flex items-center space-x-2">
                         {row.level !== '3级' ? <button onClick={() => handleCreateChild(row)} className="px-2.5 py-[3px] bg-emerald-50 text-[#10B981] text-[12px] font-medium rounded hover:bg-emerald-100 transition-colors">新增子级</button> : null}
                         <button onClick={() => handleEdit(row)} className="px-2.5 py-[3px] bg-emerald-50 text-[#10B981] text-[12px] font-medium rounded hover:bg-emerald-100 transition-colors">修改</button>
                         <button onClick={() => handleDelete(row.id)} className="px-2.5 py-[3px] bg-red-50 text-red-500 text-[12px] font-medium rounded hover:bg-red-100 transition-colors">删除</button>
                      </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

    </div>

    <CrudDialog
      open={editingMenu !== null}
      title={editingMenu?.id ? '修改菜单' : '新增菜单'}
      onClose={() => setEditingMenu(null)}
      footer={(
        <>
          <Button variant="outline" onClick={() => setEditingMenu(null)}>取消</Button>
          <Button onClick={() => {
            if (!editingMenu?.name.trim()) { showActionError('请输入菜单名称'); return }
            if (!editingMenu?.path.trim()) { showActionError('请输入请求地址'); return }
            if (!editingMenu?.perm.trim()) { showActionError('请输入权限标识'); return }
            submitMenu()
          }}>保存</Button>
        </>
      )}
    >
      <div className="space-y-2">
        <Label>菜单名称</Label>
        <Input value={editingMenu?.name ?? ''} onChange={(event) => setEditingMenu((prev) => prev ? { ...prev, name: event.target.value } : prev)} placeholder="请输入菜单名称" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>层级</Label>
          <Select value={editingMenu?.level ?? '1级'} onValueChange={(value: string | null) => setEditingMenu((prev) => prev ? { ...prev, level: value ?? '1级' } : prev)}>
            <SelectTrigger className="w-full"><SelectValue placeholder="请选择层级" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="1级">1级</SelectItem>
              <SelectItem value="2级">2级</SelectItem>
              <SelectItem value="3级">3级</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>类型</Label>
          <Select value={editingMenu?.type ?? '目录'} onValueChange={(value: string | null) => setEditingMenu((prev) => prev ? { ...prev, type: value ?? '目录' } : prev)}>
            <SelectTrigger className="w-full"><SelectValue placeholder="请选择类型" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="目录">目录</SelectItem>
              <SelectItem value="菜单">菜单</SelectItem>
              <SelectItem value="按钮">按钮</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>状态</Label>
          <RadioGroup value={editingMenu?.status ?? '可见'} onValueChange={(value: string) => setEditingMenu((prev) => prev ? { ...prev, status: value } : prev)} className="flex items-center space-x-3 pt-2">
            <div className="flex items-center space-x-1.5"><RadioGroupItem value="可见" id="menu-status-visible" /><Label htmlFor="menu-status-visible">可见</Label></div>
            <div className="flex items-center space-x-1.5"><RadioGroupItem value="不可见" id="menu-status-hidden" /><Label htmlFor="menu-status-hidden">不可见</Label></div>
          </RadioGroup>
        </div>
        <div className="space-y-2">
          <Label>排序</Label>
          <Input value={String(editingMenu?.order ?? 1)} onChange={(event) => setEditingMenu((prev) => prev ? { ...prev, order: Number(event.target.value || 1) } : prev)} placeholder="请输入排序" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>请求地址</Label>
          <Input value={editingMenu?.path ?? ''} onChange={(event) => setEditingMenu((prev) => prev ? { ...prev, path: event.target.value } : prev)} placeholder="请输入请求地址" />
        </div>
        <div className="space-y-2">
          <Label>权限标识</Label>
          <Input value={editingMenu?.perm ?? ''} onChange={(event) => setEditingMenu((prev) => prev ? { ...prev, perm: event.target.value } : prev)} placeholder="请输入权限标识" />
        </div>
      </div>
    </CrudDialog>

    <ConfirmDialog
      open={deletingId !== null}
      title="删除菜单"
      description={deletingId === -1 ? `确认删除已选中的 ${selectedIds.length} 个菜单吗？` : '确认删除该菜单吗？'}
      confirmText="删除"
      onCancel={() => setDeletingId(null)}
      onConfirm={confirmDelete}
    />
    </>
  );
}

function buildInheritedMenuPath(parent: MenuNode, nextType: string) {
	if (nextType === '按钮') {
		return parent.path
	}

	if (parent.path === '/') {
		return '/child-menu'
	}

	return `${parent.path.replace(/\/$/, '')}/child-menu`
}

function buildInheritedMenuPerm(parent: MenuNode, nextType: string) {
	if (!parent.perm) {
		return nextType === '按钮' ? 'desktop:action' : 'desktop:child'
	}

	return nextType === '按钮' ? `${parent.perm}:action` : `${parent.perm}:child`
}

function inferPathFromCurrentMenu(menu: { parentId: number | null; type: string; path: string; name: string }) {
	if (menu.type === '按钮') {
		return menu.path
	}

	if (menu.path) {
		return menu.path
	}

	const normalizedName = menu.name
		.trim()
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^a-z0-9-]/g, '') || 'menu-item'

	return menu.parentId ? `/child/${normalizedName}` : `/${normalizedName}`
}

function inferPermFromCurrentMenu(menu: { perm: string; type: string; name: string }) {
	if (menu.perm) {
		return menu.perm
	}

	const normalizedName = menu.name
		.trim()
		.toLowerCase()
		.replace(/\s+/g, '_')
		.replace(/[^a-z0-9_]/g, '') || 'menu_item'

	return menu.type === '按钮' ? `desktop:${normalizedName}:action` : `desktop:${normalizedName}`
}
