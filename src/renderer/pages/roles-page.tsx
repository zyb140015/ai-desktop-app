import * as React from 'react';
import { Pagination } from '../components/pagination';

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
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

export function RolesPage() {
  const tableData = [
    { id: 1, name: '超级管理员', key: 'admin', order: 1, status: true, date: '2023-05-26 12:12:00' },
    { id: 2, name: '高管', key: 'manager', order: 2, status: true, date: '2023-05-26 12:12:00' },
    { id: 3, name: '部门负责人', key: 'dept_leader', order: 3, status: true, date: '2023-05-26 12:12:00' },
    { id: 4, name: '普通员工', key: 'common', order: 4, status: true, date: '2023-05-26 12:12:00' },
    { id: 5, name: '财务人员', key: 'finance', order: 5, status: true, date: '2023-05-26 12:12:00' },
    { id: 6, name: '运维人员', key: 'ops', order: 6, status: true, date: '2023-05-26 12:12:00' },
    { id: 7, name: '闲置角色', key: 'idle', order: 7, status: false, date: '2023-05-26 12:12:00' },
  ];

  return (
    <div className="w-full h-full max-w-[1600px] mx-auto flex min-h-0 bg-white dark:bg-slate-950 shadow-sm border border-slate-100 dark:border-slate-800 rounded-lg">
      <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-slate-950 rounded-lg">
        {/* Search Header */}
        <div className="flex flex-col px-5 pt-5 pb-0 shrink-0">
          <div className="flex items-center justify-between pb-5 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <Label className="text-[13px] text-slate-700 dark:text-slate-300 mr-2 shrink-0 font-medium whitespace-nowrap">角色名称:</Label>
                  <Input type="text" placeholder="请输入角色名称" className="h-8 w-44 text-[13px] border-slate-200 dark:border-slate-800" />
                </div>
                <div className="flex items-center">
                  <Label className="text-[13px] text-slate-700 dark:text-slate-300 mr-2 shrink-0 font-medium whitespace-nowrap">权限字符:</Label>
                  <Input type="text" placeholder="请输入权限字符" className="h-8 w-44 text-[13px] border-slate-200 dark:border-slate-800" />
                </div>
                <div className="flex items-center">
                  <Label className="text-[13px] text-slate-700 dark:text-slate-300 mr-2 shrink-0 font-medium whitespace-nowrap">状态:</Label>
                  <Select>
                      <SelectTrigger className="h-8 w-44 text-[13px] text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800">
                        <SelectValue placeholder="角色状态" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">正常</SelectItem>
                        <SelectItem value="inactive">停用</SelectItem>
                      </SelectContent>
                  </Select>
                </div>
            </div>
            
            <div className="flex items-center space-x-3 shrink-0 ml-4">
                <Button variant="outline" className="h-8 px-5 text-[13px] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800">重置</Button>
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
                <Button className="h-8 px-4 bg-[#10B981] text-[13px] text-white hover:bg-emerald-600 font-medium">新增</Button>
                <Button className="h-8 px-4 bg-[#10B981] text-[13px] text-white hover:bg-emerald-600 font-medium">导出</Button>
                <Button variant="outline" className="h-8 px-4 border-red-200 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 hover:border-red-300 text-[13px] font-medium">删除</Button>
              </div>
          </div>
        </div>

        {/* Table Data */}
        <div className="flex-1 overflow-auto custom-scrollbar relative border-t border-slate-100 dark:border-slate-800">
          <Table className="w-full text-left text-[13px] text-slate-600 dark:text-slate-400 min-w-[900px]">
            <TableHeader className="bg-[#F8FAFC] text-slate-700 dark:text-slate-300 sticky top-0 z-10 shadow-sm border-b border-slate-100 dark:border-slate-800">
              <TableRow className="hover:bg-transparent border-[#E2E8F0] dark:border-slate-700">
                <TableHead className="w-12 pl-6 h-11"><input type="checkbox" className="ai-checkbox" /></TableHead>
                <TableHead className="font-bold w-20 h-11">角色编号</TableHead>
                <TableHead className="font-bold w-32 h-11">角色名称</TableHead>
                <TableHead className="font-bold w-32 h-11">权限字符</TableHead>
                <TableHead className="font-bold w-20 h-11">显示顺序</TableHead>
                <TableHead className="font-bold w-24 h-11">状态</TableHead>
                <TableHead className="font-bold w-48 h-11">创建时间</TableHead>
                <TableHead className="font-bold pr-5 h-11">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((row) => (
                <TableRow key={row.id} className="hover:bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 transition-colors">
                  <TableCell className="pl-6 h-11 py-2.5"><input type="checkbox" className="ai-checkbox" /></TableCell>
                  <TableCell className="font-mono text-slate-500 dark:text-slate-400 py-2.5">{row.id}</TableCell>
                  <TableCell className="text-slate-700 dark:text-slate-300 font-medium py-2.5">{row.name}</TableCell>
                  <TableCell className="py-2.5">
                    <span className="text-[#10B981] font-mono bg-emerald-50 px-2 py-[2px] rounded text-[12px] inline-flex items-center">
                       {row.key}
                    </span>
                  </TableCell>
                  <TableCell className="font-mono text-slate-500 dark:text-slate-400 py-2.5">{row.order}</TableCell>
                  <TableCell className="py-2.5">
                     <span className={cn(
                       "flex items-center px-2 py-0.5 rounded-full text-[12px] w-fit",
                       row.status ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                     )}>
                        <span className={cn("w-1.5 h-1.5 rounded-full mr-1.5", row.status ? "bg-emerald-500" : "bg-slate-400")}></span>
                        {row.status ? "正常" : "停用"}
                     </span>
                  </TableCell>
                  <TableCell className="font-mono text-slate-500 dark:text-slate-400 py-2.5">{row.date}</TableCell>
                  <TableCell className="pr-5 py-2.5">
                     <div className="flex items-center space-x-2">
                       <button className="px-2.5 py-[3px] bg-emerald-50 text-[#10B981] text-[12px] font-medium rounded hover:bg-emerald-100 transition-colors">修改</button>
                       <button className="px-2.5 py-[3px] bg-emerald-50 text-[#10B981] text-[12px] font-medium rounded hover:bg-emerald-100 transition-colors">数据权限</button>
                       <button className="px-2.5 py-[3px] bg-red-50 text-red-500 text-[12px] font-medium rounded hover:bg-red-100 transition-colors">删除</button>
                     </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Pagination total={tableData.length} />
      </div>

    </div>
  );
}
