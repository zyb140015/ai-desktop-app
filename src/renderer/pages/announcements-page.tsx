import * as React from 'react';
import { Pagination } from '../components/pagination';

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

export function AnnouncementsPage() {
  const data = [
    { id: 1, title: 'xxxxxxx通知', type: '通知', status: '已发布', publish: '2023-05-26 12:12:00/张三', create: '2023-05-26 12:12:00/张三' },
    { id: 2, title: 'xxxxxxx通知', type: '公告', status: '待发布', publish: '2023-05-26 12:12:00/张三', create: '2023-05-26 12:12:00/张三' },
    { id: 3, title: 'xxxxxxx通知', type: '通知', status: '待发布', publish: '2023-05-26 12:12:00/张三', create: '2023-05-26 12:12:00/张三' },
    { id: 4, title: 'xxxxxxx通知', type: '通知', status: '待发布', publish: '2023-05-26 12:12:00/张三', create: '2023-05-26 12:12:00/张三' },
    { id: 5, title: 'xxxxxxx通知', type: '通知', status: '草稿', publish: '2023-05-26 12:12:00/张三', create: '2023-05-26 12:12:00/张三' },
    { id: 6, title: 'xxxxxxx通知', type: '通知', status: '草稿', publish: '2023-05-26 12:12:00/张三', create: '2023-05-26 12:12:00/张三' },
    { id: 7, title: 'xxxxxxx通知', type: '通知', status: '已发布', publish: '2023-05-26 12:12:00/张三', create: '2023-05-26 12:12:00/张三' },
    { id: 8, title: 'xxxxxxx通知', type: '通知', status: '已发布', publish: '2023-05-26 12:12:00/张三', create: '2023-05-26 12:12:00/张三' },
    { id: 9, title: 'xxxxxxx通知', type: '通知', status: '已发布', publish: '2023-05-26 12:12:00/张三', create: '2023-05-26 12:12:00/张三' },
    { id: 10, title: 'xxxxxxx通知', type: '通知', status: '已发布', publish: '2023-05-26 12:12:00/张三', create: '2023-05-26 12:12:00/张三' },
  ];

  return (
    <div className="w-full h-full max-w-[1600px] mx-auto flex flex-col min-h-0 bg-white dark:bg-slate-950 shadow-sm border border-slate-100 dark:border-slate-800 rounded-lg rounded-tl-none">
      
      {/* Search Header */}
      <div className="flex flex-col p-5 pb-0 shrink-0">
         <div className="flex items-center justify-between pb-5 border-b border-slate-100 dark:border-slate-800">
           <div className="flex items-center space-x-6">
              <div className="flex items-center">
                 <Label className="text-[13px] text-slate-700 dark:text-slate-300 mr-2 shrink-0 font-medium whitespace-nowrap">公告标题:</Label>
                 <Input type="text" placeholder="请输入" className="h-8 w-48 text-[13px]" />
              </div>
              <div className="flex items-center">
                 <Label className="text-[13px] text-slate-700 dark:text-slate-300 mr-2 shrink-0 font-medium whitespace-nowrap">公告类型:</Label>
                 <Select>
                    <SelectTrigger className="h-8 w-48 text-[13px] text-slate-500 dark:text-slate-400">
                       <SelectValue placeholder="请选择" />
                    </SelectTrigger>
                    <SelectContent>
                       <SelectItem value="notice">通知</SelectItem>
                       <SelectItem value="announcement">公告</SelectItem>
                    </SelectContent>
                 </Select>
              </div>
              <div className="flex items-center">
                 <Label className="text-[13px] text-slate-700 dark:text-slate-300 mr-3 shrink-0 font-medium whitespace-nowrap">公告状态:</Label>
                 <RadioGroup defaultValue="all" className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1.5 cursor-pointer">
                      <RadioGroupItem value="all" id="a_r1" className="text-emerald-500 border-emerald-500 fill-emerald-500 w-[14px] h-[14px]" />
                      <Label htmlFor="a_r1" className="text-[13px] text-slate-600 dark:text-slate-400 cursor-pointer font-normal">全部</Label>
                    </div>
                    <div className="flex items-center space-x-1.5 cursor-pointer">
                      <RadioGroupItem value="draft" id="a_r2" className="w-[14px] h-[14px]" />
                      <Label htmlFor="a_r2" className="text-[13px] text-slate-600 dark:text-slate-400 cursor-pointer font-normal">草稿</Label>
                    </div>
                    <div className="flex items-center space-x-1.5 cursor-pointer">
                      <RadioGroupItem value="pending" id="a_r3" className="w-[14px] h-[14px]" />
                      <Label htmlFor="a_r3" className="text-[13px] text-slate-600 dark:text-slate-400 cursor-pointer font-normal">待发布</Label>
                    </div>
                    <div className="flex items-center space-x-1.5 cursor-pointer">
                      <RadioGroupItem value="published" id="a_r4" className="w-[14px] h-[14px]" />
                      <Label htmlFor="a_r4" className="text-[13px] text-slate-600 dark:text-slate-400 cursor-pointer font-normal">已发布</Label>
                    </div>
                 </RadioGroup>
              </div>
           </div>
           
           <div className="flex items-center space-x-3 shrink-0 ml-4">
              <Button variant="outline" className="h-8 px-5 text-[13px] text-slate-600 dark:text-slate-400">重置</Button>
              <Button className="h-8 px-5 bg-[#10B981] text-[13px] text-white hover:bg-emerald-600">查询</Button>
           </div>
         </div>
         
         {/* Batch Actions Row */}
         <div className="flex items-center justify-between py-4">
            <div className="flex items-center text-[13px]">
               <span className="text-slate-700 dark:text-slate-300 mr-3">已选 <span className="font-bold">0</span> 项</span>
               <span className="text-[#10B981] cursor-pointer hover:underline cursor-not-allowed opacity-50">取消</span>
            </div>
            <div className="flex items-center space-x-3">
               <Button className="h-8 px-4 bg-[#10B981] text-[13px] text-white hover:bg-emerald-600">新增</Button>
               <Button variant="outline" className="h-8 px-4 border-red-200 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 hover:border-red-300 text-[13px]">删除</Button>
            </div>
         </div>
      </div>

      {/* Table Data */}
      <div className="flex-1 overflow-auto custom-scrollbar relative border-t border-slate-100 dark:border-slate-800">
        <Table className="w-full text-left text-[13px] text-slate-600 dark:text-slate-400 min-w-[1100px]">
          <TableHeader className="bg-[#F8FAFC] text-slate-700 dark:text-slate-300 sticky top-0 z-10 shadow-sm border-b border-slate-100 dark:border-slate-800/80">
            <TableRow className="hover:bg-transparent border-[#E2E8F0] dark:border-slate-700">
              <TableHead className="w-12 pl-6 h-11 pt-1.5"><input type="checkbox" className="ai-checkbox" /></TableHead>
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
                <TableCell className="pl-6 py-3.5"><input type="checkbox" className="ai-checkbox" /></TableCell>
                <TableCell className="font-mono text-slate-500 dark:text-slate-400 py-3.5">{row.id}</TableCell>
                <TableCell className="text-slate-600 dark:text-slate-400 py-3.5 font-medium">{row.title}</TableCell>
                <TableCell className="text-slate-600 dark:text-slate-400 py-3.5">{row.type}</TableCell>
                <TableCell className="py-3.5">
                   <Badge 
                      variant="outline" 
                      className={cn(
                        "rounded font-medium px-2 py-0 border-[#E2E8F0] dark:border-slate-700 pointer-events-none",
                        row.status === '已发布' ? "bg-emerald-50 text-[#10B981]" : 
                        row.status === '待发布' ? "bg-red-50 text-red-500" : 
                        "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                      )}
                    >
                      {row.status}
                   </Badge>
                </TableCell>
                <TableCell className="font-mono text-slate-500 dark:text-slate-400 py-3.5">{row.publish}</TableCell>
                <TableCell className="font-mono text-slate-500 dark:text-slate-400 py-3.5">{row.create}</TableCell>
                <TableCell className="py-3.5 pr-5">
                   <div className="flex items-center space-x-2">
                     <button disabled={row.status === "已发布"} className={cn("px-2.5 py-[3px] text-[12px] font-medium rounded transition-colors", row.status === "已发布" ? "bg-slate-50 dark:bg-slate-900 text-slate-300 dark:text-slate-600 dark:text-slate-400 cursor-not-allowed" : "bg-emerald-50 text-[#10B981] hover:bg-emerald-100")}>
                        发布
                     </button>
                     <button className="px-2.5 py-[3px] bg-emerald-50 text-[#10B981] text-[12px] font-medium rounded hover:bg-emerald-100 transition-colors">修改</button>
                     <button className="px-2.5 py-[3px] bg-red-50 text-red-500 text-[12px] font-medium rounded hover:bg-red-100 transition-colors">删除</button>
                   </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Extracted Shared Pagination Component */}
      <Pagination total={150} />

    </div>
  );
}
