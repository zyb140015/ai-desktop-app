import * as React from 'react';
import { Pagination } from '../components/pagination';

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
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

export function OrgsPage() {
  const [activeNode, setActiveNode] = React.useState('生产部');

  const treeData = [
    { name: '人力资源部', count: 12 },
    { name: '财务部', count: 23 },
    { name: '生产部', count: 32 },
    { name: '营销部', count: 23 },
    { name: '安全部', count: 23 },
    { name: '党群部', count: 23 },
    { name: '保卫部', count: 23 },
    { name: '后勤部', count: 23 },
    { name: '行政部', count: 23 },
  ];

  const tableData = [
    { id: 1, name: '生产一部', code: '32', parent1: '东方科技', order: 1, parent2: '部门', created: '2023-05-26 12:12:00/张三', modified: '2023-05-26 12:12:00/张三' },
    { id: 2, name: '生产一部', code: '32', parent1: '东方科技', order: 2, parent2: '部门', created: '2023-05-26 12:12:00/张三', modified: '2023-05-26 12:12:00/张三' },
    { id: 3, name: '生产一部', code: '32', parent1: '东方科技', order: 3, parent2: '部门', created: '2023-05-26 12:12:00/张三', modified: '2023-05-26 12:12:00/张三' },
    { id: 4, name: '生产一部', code: '32', parent1: '东方科技', order: 4, parent2: '部门', created: '2023-05-26 12:12:00/张三', modified: '2023-05-26 12:12:00/张三' },
    { id: 5, name: '生产一部', code: '32', parent1: '东方科技', order: 5, parent2: '部门', created: '2023-05-26 12:12:00/张三', modified: '2023-05-26 12:12:00/张三' },
    { id: 6, name: '生产一部', code: '32', parent1: '东方科技', order: 6, parent2: '部门', created: '2023-05-26 12:12:00/张三', modified: '2023-05-26 12:12:00/张三' },
    { id: 7, name: '生产一部', code: '32', parent1: '东方科技', order: 7, parent2: '部门', created: '2023-05-26 12:12:00/张三', modified: '2023-05-26 12:12:00/张三' },
    { id: 8, name: '生产一部', code: '32', parent1: '东方科技', order: 8, parent2: '部门', created: '2023-05-26 12:12:00/张三', modified: '2023-05-26 12:12:00/张三' },
    { id: 9, name: '生产一部', code: '32', parent1: '东方科技', order: 9, parent2: '部门', created: '2023-05-26 12:12:00/张三', modified: '2023-05-26 12:12:00/张三' },
    { id: 10, name: '生产一部', code: '32', parent1: '东方科技', order: 10, parent2: '部门', created: '2023-05-26 12:12:00/张三', modified: '2023-05-26 12:12:00/张三' },
  ];

  return (
    <div className="w-full h-full max-w-[1600px] mx-auto flex min-h-0 bg-white dark:bg-slate-950 shadow-sm border border-slate-100 dark:border-slate-800 rounded-lg">
      
      {/* Left Tree Panel */}
      <div className="w-[240px] flex flex-col shrink-0 border-r border-slate-100 dark:border-slate-800/80 bg-[#FAFAFA]/30 rounded-l-lg">
        <div className="p-4 shrink-0">
          <div className="relative">
            <Input 
              type="text" 
              placeholder="请输入关键字搜索" 
              className="h-8 pr-10 text-[12px] bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800"
            />
            <button className="absolute right-0 top-0 h-full w-8 bg-[#10B981] hover:bg-emerald-600 transition-colors flex items-center justify-center rounded-r-md text-white border border-[#10B981]">
              <Search className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto px-3 pb-4 custom-scrollbar">
           {/* Root Node */}
           <div className="flex items-center px-2 py-1.5 cursor-pointer text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:bg-slate-800/50 rounded transition-colors group mb-1">
             <ChevronDown className="w-3.5 h-3.5 mr-2 text-slate-500 dark:text-slate-400" />
             <span className="text-[13px] font-medium">东方科技 (56)</span>
           </div>
           
           {/* Child Nodes */}
           <div className="flex flex-col space-y-0.5">
             {treeData.map((node) => {
               const isActive = activeNode === node.name;
               return (
                 <div 
                   key={node.name}
                   onClick={() => setActiveNode(node.name)}
                   className={cn(
                     "flex items-center pl-8 pr-3 py-1.5 cursor-pointer rounded transition-colors text-[13px]",
                     isActive 
                       ? "bg-emerald-50 text-[#10B981] font-medium" 
                       : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:bg-slate-900 hover:text-slate-900 dark:hover:text-slate-100"
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
           </div>
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
                  <Input type="text" placeholder="请输入组织名称" className="h-8 w-44 text-[13px] border-slate-200 dark:border-slate-800" />
                </div>
                <div className="flex items-center">
                  <Label className="text-[13px] text-slate-700 dark:text-slate-300 mr-2 shrink-0 font-medium whitespace-nowrap">组织编码:</Label>
                  <Input type="text" placeholder="请输入组织编码" className="h-8 w-44 text-[13px] border-slate-200 dark:border-slate-800" />
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
                <Button className="h-8 px-4 bg-[#10B981] text-[13px] text-white hover:bg-emerald-600 font-medium">导入</Button>
                <Button variant="outline" className="h-8 px-4 border-red-200 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 hover:border-red-300 text-[13px] font-medium">删除</Button>
              </div>
          </div>
        </div>

        {/* Table Data */}
        <div className="flex-1 overflow-auto custom-scrollbar relative border-t border-slate-100 dark:border-slate-800">
          <Table className="w-full text-left text-[13px] text-slate-600 dark:text-slate-400 min-w-[1100px]">
            <TableHeader className="bg-[#F8FAFC] text-slate-700 dark:text-slate-300 sticky top-0 z-10 shadow-sm border-b border-slate-100 dark:border-slate-800">
              <TableRow className="hover:bg-transparent border-[#E2E8F0] dark:border-slate-700">
                <TableHead className="w-12 pl-6 h-11"><input type="checkbox" className="ai-checkbox" /></TableHead>
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
                <TableRow key={row.id} className="hover:bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 transition-colors">
                  <TableCell className="pl-6 h-11 py-2.5"><input type="checkbox" className="ai-checkbox" /></TableCell>
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

    </div>
  );
}
