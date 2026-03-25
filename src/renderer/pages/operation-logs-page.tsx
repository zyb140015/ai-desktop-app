import * as React from 'react';
import { Pagination } from '../components/pagination';

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar as CalendarIcon } from "lucide-react";
import { useDesktopOperationLogsQuery } from '../hooks/use-desktop-log-query'
import { exportCsvFile, showActionError, showActionSuccess } from '../lib/action-feedback'

export function OperationLogsPage() {
  const [operationDate, setOperationDate] = React.useState<Date>()
  const [nameInput, setNameInput] = React.useState('')
  const [name, setName] = React.useState('')
  const [status, setStatus] = React.useState('')
  const [selectedOperationDate, setSelectedOperationDate] = React.useState('')
  const [page, setPage] = React.useState(1)
  const pageSize = 10
  const query = useDesktopOperationLogsQuery({ name, status, operationDate: selectedOperationDate, page, pageSize })
  const logsData = query.data?.items ?? []
  const total = query.data?.total ?? 0

  const handleExport = () => {
	if (logsData.length === 0) {
		showActionError('当前没有可导出的操作日志')
		return
	}
	exportCsvFile('operation-logs.csv', ['日志ID', '操作模块', '操作分类', '用户ID', '姓名', '状态', '操作时间', '登录IP', '浏览器', '日志说明'], logsData.map((row) => [row.logId, row.module, row.category, row.userId, row.name, row.status, row.time, row.ip, row.browser, row.desc]))
	showActionSuccess('操作日志导出成功')
  }

  return (
    <div className="w-full h-full max-w-[1600px] mx-auto flex flex-col min-h-0 bg-white dark:bg-slate-950 shadow-sm border border-slate-100 dark:border-slate-800 rounded-lg rounded-tl-none">
      
      {/* Search Header - built with shadcn ui */}
      <div className="flex flex-col p-5 pb-5 shrink-0 border-b border-slate-100 dark:border-slate-800">
         <div className="flex items-center justify-between">
           <div className="flex items-center space-x-6">
              <div className="flex items-center">
                 <Label className="text-[13px] text-slate-700 dark:text-slate-300 mr-2 shrink-0 font-medium whitespace-nowrap">用户姓名:</Label>
                 <Input type="text" placeholder="请输入" className="h-8 w-48 text-[13px]" value={nameInput} onChange={(event) => setNameInput(event.target.value)} />
              </div>
              <div className="flex items-center">
                 <Label className="text-[13px] text-slate-700 dark:text-slate-300 mr-2 shrink-0 font-medium whitespace-nowrap">操作时间:</Label>
                  <Popover>
                     <PopoverTrigger
                        className={cn(
                          "inline-flex h-8 w-48 items-center justify-start rounded-lg border border-slate-200 bg-background px-2.5 text-left text-[13px] font-normal outline-none transition-all hover:bg-muted hover:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
                           !operationDate && "text-slate-400 dark:text-slate-500"
                         )}
                       >
                         {operationDate ? format(operationDate, "PPP") : <span>请选择</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                     </PopoverTrigger>
                     <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                         mode="single"
                          selected={operationDate}
                           onSelect={(value) => {
                             setOperationDate(value)
                             setSelectedOperationDate(value ? format(value, 'yyyy-MM-dd') : '')
                             setPage(1)
                           }}
                          initialFocus
                       />
                     </PopoverContent>
                   </Popover>
                </div>
              <div className="flex items-center">
                 <Label className="text-[13px] text-slate-700 dark:text-slate-300 mr-3 shrink-0 font-medium whitespace-nowrap">日志状态:</Label>
                  <RadioGroup value={status || 'all'} onValueChange={(value: string) => setStatus(value === 'all' ? '' : value)} className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1.5 cursor-pointer">
                      <RadioGroupItem value="all" id="r1" className="text-emerald-500 border-emerald-500 fill-emerald-500" />
                      <Label htmlFor="r1" className="text-[13px] text-slate-600 dark:text-slate-400 cursor-pointer font-normal">全部</Label>
                    </div>
                    <div className="flex items-center space-x-1.5 cursor-pointer">
                      <RadioGroupItem value="success" id="r2" />
                      <Label htmlFor="r2" className="text-[13px] text-slate-600 dark:text-slate-400 cursor-pointer font-normal">成功</Label>
                    </div>
                    <div className="flex items-center space-x-1.5 cursor-pointer">
                      <RadioGroupItem value="fail" id="r3" />
                      <Label htmlFor="r3" className="text-[13px] text-slate-600 dark:text-slate-400 cursor-pointer font-normal">失败</Label>
                    </div>
                 </RadioGroup>
              </div>
           </div>
           
           <div className="flex items-center space-x-3 shrink-0 ml-4">
                 <Button variant="outline" className="h-8 px-5 text-[13px] text-slate-600 dark:text-slate-400" onClick={() => { setNameInput(''); setName(''); setStatus(''); setOperationDate(undefined); setSelectedOperationDate(''); setPage(1) }}>重置</Button>
               <Button className="h-8 px-5 bg-[#10B981] text-[13px] text-white hover:bg-emerald-600" onClick={() => { setName(nameInput.trim()); setPage(1) }}>查询</Button>
               <Button className="h-8 px-5 bg-[#10B981] text-[13px] text-white hover:bg-emerald-600" onClick={handleExport}>导出</Button>
           </div>
         </div>
      </div>

      {/* Table Data - Built with shadcn ui */}
      <div className="flex-1 overflow-auto custom-scrollbar relative">
        <Table className="w-full text-left text-[13px] text-slate-600 dark:text-slate-400 min-w-[1200px]">
          <TableHeader className="sticky top-0 z-10 border-b border-slate-100 bg-[#F8FAFC] text-slate-700 shadow-sm dark:border-slate-800/80 dark:bg-slate-900 dark:text-slate-300">
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-bold w-12 pl-5 h-11">序号</TableHead>
              <TableHead className="font-bold h-11">日志ID</TableHead>
              <TableHead className="font-bold h-11">操作模块</TableHead>
              <TableHead className="font-bold h-11">操作分类</TableHead>
              <TableHead className="font-bold h-11">用户ID</TableHead>
              <TableHead className="font-bold h-11">姓名</TableHead>
              <TableHead className="font-bold h-11">状态</TableHead>
              <TableHead className="font-bold h-11">操作时间</TableHead>
              <TableHead className="font-bold h-11">登录IP</TableHead>
              <TableHead className="font-bold h-11">浏览器</TableHead>
              <TableHead className="font-bold h-11 pr-5">日志说明</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logsData.map((row) => (
              <TableRow key={row.id} className="border-b border-slate-100 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900">
                <TableCell className="font-mono text-slate-500 dark:text-slate-400 pl-5 py-3.5">{row.id}</TableCell>
                <TableCell className="font-mono text-slate-600 dark:text-slate-400 py-3.5">{row.logId}</TableCell>
                <TableCell className="text-slate-600 dark:text-slate-400 py-3.5">{row.module}</TableCell>
                <TableCell className="text-slate-600 dark:text-slate-400 py-3.5">{row.category}</TableCell>
                <TableCell className="font-mono text-slate-500 dark:text-slate-400 py-3.5">{row.userId}</TableCell>
                <TableCell className="text-slate-600 dark:text-slate-400 py-3.5">{row.name}</TableCell>
                <TableCell className="py-3.5">
                   <Badge 
                      variant="outline" 
                      className={cn(
                        "rounded font-medium px-2 py-0 border-[#E2E8F0] dark:border-slate-700 pointer-events-none",
                        row.status === '成功' 
                          ? "bg-emerald-50 text-[#10B981]" 
                          : "bg-red-50 text-red-500"
                      )}
                    >
                      {row.status}
                   </Badge>
                </TableCell>
                <TableCell className="font-mono text-slate-500 dark:text-slate-400 py-3.5">{row.time}</TableCell>
                <TableCell className="font-mono text-slate-500 dark:text-slate-400 py-3.5">{row.ip}</TableCell>
                <TableCell className="text-slate-500 dark:text-slate-400 py-3.5">{row.browser}</TableCell>
                <TableCell className="text-slate-500 dark:text-slate-400 truncate max-w-[200px] py-3.5 pr-5" title={row.desc}>{row.desc}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Extracted Shared Pagination Component */}
       <Pagination total={total} page={page} pageSize={pageSize} onPageChange={setPage} />

    </div>
  );
}
