import { useState } from 'react'

import { Pagination } from '../components/pagination'
import { useDesktopAnnouncementsQuery } from '../hooks/use-desktop-announcements-query'
import { createDesktopAnnouncement, deleteDesktopAnnouncement, publishDesktopAnnouncement, updateDesktopAnnouncement } from '../services/announcement-api'
import { ConfirmDialog, CrudDialog } from '../components/crud-dialog'
import { exportCsvFile, showActionError, showActionSuccess } from '../lib/action-feedback'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
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

type EditableAnnouncement = { id: number; title: string; type: string; status: string; publish: string; create: string }

export function AnnouncementsPage() {
  const [titleInput, setTitleInput] = useState('')
  const [title, setTitle] = useState('')
  const [type, setType] = useState('')
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)
  const pageSize = 10
  const query = useDesktopAnnouncementsQuery({ title, type, status, page, pageSize })
  const data = query.data?.items ?? []
  const total = query.data?.total ?? 0
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [editingAnnouncement, setEditingAnnouncement] = useState<EditableAnnouncement | null>(null)
  const [deletingIds, setDeletingIds] = useState<number[] | null>(null)

  const toggleSelected = (id: number) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const toggleSelectAll = () => {
    setSelectedIds((prev) => (prev.length === data.length ? [] : data.map((row) => row.id)))
  }

  const handleCreate = () => {
    setEditingAnnouncement({ id: 0, title: '', type: '通知', status: '草稿', publish: '', create: '' })
  }

  const handleEdit = (row: EditableAnnouncement) => {
    setEditingAnnouncement({ ...row })
  }

  const submitAnnouncement = async () => {
    if (!editingAnnouncement) return
    try {
      if (editingAnnouncement.id === 0) {
        await createDesktopAnnouncement(editingAnnouncement)
        showActionSuccess('公告新增成功')
      } else {
        await updateDesktopAnnouncement(editingAnnouncement)
        showActionSuccess('公告修改成功')
      }
      setEditingAnnouncement(null)
      await query.refetch()
    } catch {
      showActionError('公告保存失败')
    }
  }

  const handleDelete = (id: number) => {
    setDeletingIds([id])
  }

  const handleBatchDelete = () => {
    if (selectedIds.length === 0) return
    setDeletingIds(selectedIds)
  }

  const confirmDelete = async () => {
    if (!deletingIds?.length) return
    try {
      await Promise.all(deletingIds.map((id) => deleteDesktopAnnouncement(id)))
      showActionSuccess('公告删除成功')
      setSelectedIds((prev) => prev.filter((id) => !deletingIds.includes(id)))
      setDeletingIds(null)
      await query.refetch()
    } catch {
      showActionError('公告删除失败')
    }
  }

  const handlePublish = async (id: number) => {
    try {
      await publishDesktopAnnouncement(id)
      showActionSuccess('公告发布成功')
      await query.refetch()
    } catch {
      showActionError('公告发布失败')
    }
  }

  const handleExport = () => {
    if (data.length === 0) {
      showActionError('当前没有可导出的公告数据')
      return
    }
    exportCsvFile('announcements.csv', ['公告标题', '公告类型', '状态', '发布', '创建'], data.map((row) => [row.title, row.type, row.status, row.publish, row.create]))
    showActionSuccess('公告导出成功')
  }

  return (
    <>
      <div className="w-full h-full max-w-[1600px] mx-auto flex flex-col min-h-0 bg-white dark:bg-slate-950 shadow-sm border border-slate-100 dark:border-slate-800 rounded-lg rounded-tl-none">
        <div className="flex flex-col p-5 pb-0 shrink-0">
          <div className="flex items-center justify-between pb-5 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <Label className="text-[13px] text-slate-700 dark:text-slate-300 mr-2 shrink-0 font-medium whitespace-nowrap">公告标题:</Label>
                <Input type="text" placeholder="请输入" className="h-8 w-48 text-[13px]" value={titleInput} onChange={(event) => setTitleInput(event.target.value)} />
              </div>
              <div className="flex items-center">
                <Label className="text-[13px] text-slate-700 dark:text-slate-300 mr-2 shrink-0 font-medium whitespace-nowrap">公告类型:</Label>
                <Select value={type || undefined} onValueChange={(value: string | null) => setType(value ?? '')}>
                  <SelectTrigger className="h-8 w-48 text-[13px] text-slate-500 dark:text-slate-400"><SelectValue placeholder="请选择" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="通知">通知</SelectItem>
                    <SelectItem value="公告">公告</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center">
                <Label className="text-[13px] text-slate-700 dark:text-slate-300 mr-3 shrink-0 font-medium whitespace-nowrap">公告状态:</Label>
                <RadioGroup value={status || 'all'} onValueChange={(value: string) => setStatus(value === 'all' ? '' : value)} className="flex items-center space-x-3">
                  {['all', '草稿', '待发布', '已发布'].map((item, index) => (
                    <div key={item} className="flex items-center space-x-1.5 cursor-pointer">
                      <RadioGroupItem value={item} id={`a_r${index + 1}`} className={index === 0 ? 'text-emerald-500 border-emerald-500 fill-emerald-500 w-[14px] h-[14px]' : 'w-[14px] h-[14px]'} />
                      <Label htmlFor={`a_r${index + 1}`} className="text-[13px] text-slate-600 dark:text-slate-400 cursor-pointer font-normal">{item === 'all' ? '全部' : item}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>

            <div className="flex items-center space-x-3 shrink-0 ml-4">
              <Button variant="outline" className="h-8 px-5 text-[13px] text-slate-600 dark:text-slate-400" onClick={() => { setTitleInput(''); setTitle(''); setType(''); setStatus(''); setPage(1) }}>重置</Button>
              <Button className="h-8 px-5 bg-[#10B981] text-[13px] text-white hover:bg-emerald-600" onClick={() => { setTitle(titleInput.trim()); setPage(1) }}>查询</Button>
            </div>
          </div>

          <div className="flex items-center justify-between py-4">
            <div className="flex items-center text-[13px]">
              <span className="text-slate-700 dark:text-slate-300 mr-3">已选 <span className="font-bold">{selectedIds.length}</span> 项</span>
              <button className="text-[#10B981] disabled:cursor-not-allowed disabled:opacity-50" disabled={selectedIds.length === 0} onClick={() => setSelectedIds([])}>取消</button>
            </div>
            <div className="flex items-center space-x-3">
              <Button className="h-8 px-4 bg-[#10B981] text-[13px] text-white hover:bg-emerald-600" onClick={handleCreate}>新增</Button>
              <Button className="h-8 px-4 bg-[#10B981] text-[13px] text-white hover:bg-emerald-600" onClick={handleExport}>导出</Button>
              <Button variant="outline" className="h-8 px-4 border-red-200 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 hover:border-red-300 text-[13px]" disabled={selectedIds.length === 0} onClick={handleBatchDelete}>删除</Button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto custom-scrollbar relative border-t border-slate-100 dark:border-slate-800">
          <Table className="w-full text-left text-[13px] text-slate-600 dark:text-slate-400 min-w-[1100px]">
            <TableHeader className="bg-[#F8FAFC] text-slate-700 dark:text-slate-300 sticky top-0 z-10 shadow-sm border-b border-slate-100 dark:border-slate-800/80">
              <TableRow className="hover:bg-transparent border-[#E2E8F0] dark:border-slate-700">
                <TableHead className="w-12 pl-6 h-11 pt-1.5"><input type="checkbox" className="ai-checkbox" checked={data.length > 0 && selectedIds.length === data.length} onChange={toggleSelectAll} /></TableHead>
                <TableHead className="font-bold w-12 h-11">序号</TableHead>
                <TableHead className="font-bold h-11 w-[15%]">公告标题</TableHead>
                <TableHead className="font-bold h-11 w-24">公告类型</TableHead>
                <TableHead className="font-bold h-11 w-24">状态</TableHead>
                <TableHead className="font-bold h-11 w-[22%]">发布</TableHead>
                <TableHead className="font-bold h-11 w-[22%]">创建</TableHead>
                <TableHead className="font-bold h-11 pr-5">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id} className="hover:bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 transition-colors">
                  <TableCell className="pl-6 py-3.5"><input type="checkbox" className="ai-checkbox" checked={selectedIds.includes(row.id)} onChange={() => toggleSelected(row.id)} /></TableCell>
                  <TableCell className="font-mono text-slate-500 dark:text-slate-400 py-3.5">{row.id}</TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-400 py-3.5 font-medium">{row.title}</TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-400 py-3.5">{row.type}</TableCell>
                  <TableCell className="py-3.5">
                    <Badge variant="outline" className={cn('rounded font-medium px-2 py-0 border-[#E2E8F0] dark:border-slate-700 pointer-events-none', row.status === '已发布' ? 'bg-emerald-50 text-[#10B981]' : row.status === '待发布' ? 'bg-red-50 text-red-500' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400')}>
                      {row.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-slate-500 dark:text-slate-400 py-3.5">{row.publish}</TableCell>
                  <TableCell className="font-mono text-slate-500 dark:text-slate-400 py-3.5">{row.create}</TableCell>
                  <TableCell className="py-3.5 pr-5">
                    <div className="flex items-center space-x-2">
                      <button disabled={row.status === '已发布'} onClick={() => handlePublish(row.id)} className={cn('px-2.5 py-[3px] text-[12px] font-medium rounded transition-colors', row.status === '已发布' ? 'bg-slate-50 dark:bg-slate-900 text-slate-300 dark:text-slate-400 cursor-not-allowed' : 'bg-emerald-50 text-[#10B981] hover:bg-emerald-100')}>
                        发布
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

        <Pagination total={total} page={page} pageSize={pageSize} onPageChange={setPage} />
      </div>

      <CrudDialog
        open={editingAnnouncement !== null}
        title={editingAnnouncement?.id ? '修改公告' : '新增公告'}
        onClose={() => setEditingAnnouncement(null)}
        footer={(
          <>
            <Button variant="outline" onClick={() => setEditingAnnouncement(null)}>取消</Button>
            <Button onClick={() => {
              if (!editingAnnouncement?.title.trim()) { showActionError('请输入公告标题'); return }
              submitAnnouncement()
            }}>保存</Button>
          </>
        )}
      >
        <div className="space-y-2">
          <Label>公告标题</Label>
          <Input value={editingAnnouncement?.title ?? ''} onChange={(event) => setEditingAnnouncement((prev) => prev ? { ...prev, title: event.target.value } : prev)} placeholder="请输入公告标题" />
        </div>
        <div className="space-y-2">
          <Label>公告类型</Label>
          <Select value={editingAnnouncement?.type ?? '通知'} onValueChange={(value: string | null) => setEditingAnnouncement((prev) => prev ? { ...prev, type: value ?? '通知' } : prev)}>
            <SelectTrigger className="w-full"><SelectValue placeholder="请选择" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="通知">通知</SelectItem>
              <SelectItem value="公告">公告</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>状态</Label>
          <Select value={editingAnnouncement?.status ?? '草稿'} onValueChange={(value: string | null) => setEditingAnnouncement((prev) => prev ? { ...prev, status: value ?? '草稿' } : prev)}>
            <SelectTrigger className="w-full"><SelectValue placeholder="请选择" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="草稿">草稿</SelectItem>
              <SelectItem value="待发布">待发布</SelectItem>
              <SelectItem value="已发布">已发布</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CrudDialog>

      <ConfirmDialog
        open={deletingIds !== null}
        title="删除公告"
        description={`确认删除${deletingIds?.length === 1 ? '该公告' : `已选中的 ${deletingIds?.length ?? 0} 条公告`}吗？`}
        confirmText="删除"
        onCancel={() => setDeletingIds(null)}
        onConfirm={confirmDelete}
      />
    </>
  )
}
