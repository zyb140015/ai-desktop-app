import * as React from 'react';

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
// @ts-ignore
import { ChevronRight, ChevronDown } from "lucide-react";

export function DictPage() {
  const [expandedRows, setExpandedRows] = React.useState<Record<number, boolean>>({
    2: true // Auto expand row 2 ("职称") to match Figma
  });

  const toggleRow = (id: number) => {
    setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const parentData = [
    { id: 1, dictId: '001', name: '岗位', desc: '这是一个说明文字', modified: '2023-05-26 12:12:00/张三', created: '2023-05-26 12:12:00/张三' },
    { id: 2, dictId: '002', name: '职称', desc: '这是一个说明文字', modified: '2023-05-26 12:12:00/张三', created: '2023-05-26 12:12:00/张三' },
  ];

  const subDataMap: Record<number, any[]> = {
    2: [
      { id: 1, index: 1, label: '高级职称', keyVal: '1', styleType: '主要', modified: '2023-05-26 12:12:00/张三', created: '2023-05-26 12:12:00/张三', badgeColor: 'bg-orange-50 text-orange-500' },
      { id: 2, index: 2, label: '中级职称', keyVal: '2', styleType: '次要', modified: '2023-05-26 12:12:00/张三', created: '2023-05-26 12:12:00/张三', badgeColor: 'bg-emerald-50 text-emerald-500' },
      { id: 3, index: 3, label: '低级职称', keyVal: '3', styleType: '次要', modified: '2023-05-26 12:12:00/张三', created: '2023-05-26 12:12:00/张三', badgeColor: 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400' },
    ]
  };

  return (
    <div className="w-full h-full max-w-[1600px] mx-auto flex flex-col min-h-0 bg-white dark:bg-slate-950 shadow-sm border border-slate-100 dark:border-slate-800 rounded-lg">
      
      {/* Search Header */}
      <div className="flex flex-col p-5 pb-0 shrink-0">
         <div className="flex items-center justify-between pb-5 border-b border-slate-100 dark:border-slate-800">
           <div className="flex items-center space-x-6">
              <div className="flex items-center">
                 <Label className="text-[13px] text-slate-700 dark:text-slate-300 mr-2 shrink-0 font-medium whitespace-nowrap">字典名称:</Label>
                 <Input type="text" placeholder="请输入" className="h-8 w-48 text-[13px] border-slate-200 dark:border-slate-800" />
              </div>
              <div className="flex items-center">
                 <Label className="text-[13px] text-slate-700 dark:text-slate-300 mr-2 shrink-0 font-medium whitespace-nowrap">字典ID:</Label>
                 <Input type="text" placeholder="请输入" className="h-8 w-48 text-[13px] border-slate-200 dark:border-slate-800" />
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
        <Table className="w-full text-left text-[13px] text-slate-600 dark:text-slate-400 min-w-[1100px] border-collapse relative">
          <TableHeader className="bg-[#F8FAFC] text-slate-700 dark:text-slate-300 sticky top-0 z-20 shadow-sm border-b border-slate-100 dark:border-slate-800">
            <TableRow className="hover:bg-transparent border-[#E2E8F0] dark:border-slate-700 h-11">
              <TableHead className="w-12 pl-6 pt-1"><input type="checkbox" className="ai-checkbox" /></TableHead>
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
              const subItems = subDataMap[row.id];

              return (
                <React.Fragment key={row.id}>
                  {/* Parent Row */}
                  <TableRow className="hover:bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 transition-colors group">
                    <TableCell className="pl-6 h-12 w-12 align-middle"><input type="checkbox" className="ai-checkbox" /></TableCell>
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
                         <button className="px-2.5 py-[3px] bg-emerald-50 text-[#10B981] text-[12px] font-medium rounded hover:bg-emerald-100 transition-colors">新增枚举</button>
                         <button className="px-2.5 py-[3px] bg-emerald-50 text-[#10B981] text-[12px] font-medium rounded hover:bg-emerald-100 transition-colors">修改</button>
                         <button className="px-2.5 py-[3px] bg-red-50 text-red-500 text-[12px] font-medium rounded hover:bg-red-100 transition-colors">删除</button>
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
                                                 <button className="px-2.5 py-[3px] bg-emerald-50 text-[#10B981] text-[12px] font-medium rounded hover:bg-emerald-100 transition-colors">修改</button>
                                                 <button className="px-2.5 py-[3px] bg-red-50 text-red-500 text-[12px] font-medium rounded hover:bg-red-100 transition-colors">删除</button>
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
  );
}
