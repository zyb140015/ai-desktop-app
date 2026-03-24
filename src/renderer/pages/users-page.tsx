import * as React from 'react';
import { Pagination } from '../components/pagination';

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
// @ts-ignore
import { ChevronRight, ChevronDown, Search } from "lucide-react";

export function UsersPage() {
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
    { id: 1, uid: '1001', name: '冯政', dept: '生产部', phone: '13386911277', role: '超管', status: '开启', date: '2023-05-26 12:12:00/张三' },
    { id: 2, uid: '1001', name: '孙子面', dept: '生产部', phone: '15366978328', role: '超管', status: '关闭', date: '2023-05-26 12:12:00/张三' },
    { id: 3, uid: '1001', name: '钱继初', dept: '生产部', phone: '18555418491', role: '超管', status: '关闭', date: '2023-05-26 12:12:00/张三' },
    { id: 4, uid: '1001', name: '李建华', dept: '生产部', phone: '18716223293', role: '超管', status: '关闭', date: '2023-05-26 12:12:00/张三' },
    { id: 5, uid: '1001', name: '何芳', dept: '生产部', phone: '18827138937', role: '超管', status: '关闭', date: '2023-05-26 12:12:00/张三' },
    { id: 6, uid: '1001', name: '钱虹君', dept: '生产部', phone: '13564830157', role: '超管', status: '关闭', date: '2023-05-26 12:12:00/张三' },
    { id: 7, uid: '1001', name: '王海英', dept: '生产部', phone: '15741186336', role: '超管', status: '开启', date: '2023-05-26 12:12:00/张三' },
    { id: 8, uid: '1001', name: '钱妙霞', dept: '生产部', phone: '15394386576', role: '超管', status: '开启', date: '2023-05-26 12:12:00/张三' },
    { id: 9, uid: '1001', name: '孙御宾', dept: '生产部', phone: '13661937111', role: '超管', status: '开启', date: '2023-05-26 12:12:00/张三' },
    { id: 10, uid: '1001', name: '李林峻', dept: '生产部', phone: '17642522758', role: '超管', status: '开启', date: '2023-05-26 12:12:00/张三' },
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
                  <Label className="text-[13px] text-slate-700 dark:text-slate-300 mr-2 shrink-0 font-medium whitespace-nowrap">用户ID:</Label>
                  <Input type="text" placeholder="请输入" className="h-8 w-44 text-[13px] border-slate-200 dark:border-slate-800" />
                </div>
                <div className="flex items-center">
                  <Label className="text-[13px] text-slate-700 dark:text-slate-300 mr-2 shrink-0 font-medium whitespace-nowrap">姓名:</Label>
                  <Input type="text" placeholder="请输入" className="h-8 w-44 text-[13px] border-slate-200 dark:border-slate-800" />
                </div>
                <div className="flex items-center">
                  <Label className="text-[13px] text-slate-700 dark:text-slate-300 mr-2 shrink-0 font-medium whitespace-nowrap">角色:</Label>
                  <Select>
                      <SelectTrigger className="h-8 w-44 text-[13px] text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800">
                        <SelectValue placeholder="请选择" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="super">超管</SelectItem>
                        <SelectItem value="admin">管理员</SelectItem>
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
                <Button className="h-8 px-4 bg-[#10B981] text-[13px] text-white hover:bg-emerald-600 font-medium">导入</Button>
                <Button className="h-8 px-4 bg-[#10B981] text-[13px] text-white hover:bg-emerald-600 font-medium">导出</Button>
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
                <TableHead className="font-bold w-20 h-11">用户ID</TableHead>
                <TableHead className="font-bold w-24 h-11">姓名</TableHead>
                <TableHead className="font-bold w-28 h-11">所属组织</TableHead>
                <TableHead className="font-bold w-32 h-11">手机号码</TableHead>
                <TableHead className="font-bold w-20 h-11">角色</TableHead>
                <TableHead className="font-bold w-20 h-11">状态</TableHead>
                <TableHead className="font-bold w-48 h-11">最近修改</TableHead>
                <TableHead className="font-bold pr-5 h-11">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((row) => (
                <TableRow key={row.id} className="hover:bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 transition-colors">
                  <TableCell className="pl-6 h-11 py-2.5"><input type="checkbox" className="ai-checkbox" /></TableCell>
                  <TableCell className="font-mono text-slate-500 dark:text-slate-400 py-2.5">{row.id}</TableCell>
                  <TableCell className="font-mono text-slate-600 dark:text-slate-400 py-2.5">{row.uid}</TableCell>
                  <TableCell className="text-slate-700 dark:text-slate-300 font-medium py-2.5">{row.name}</TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-400 py-2.5">{row.dept}</TableCell>
                  <TableCell className="font-mono text-slate-500 dark:text-slate-400 py-2.5">{row.phone}</TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-400 py-2.5">{row.role}</TableCell>
                  <TableCell className="py-2.5">
                     <Badge 
                        variant="outline" 
                        className={cn(
                          "rounded font-medium px-2 py-0 border-[#E2E8F0] dark:border-slate-700 pointer-events-none",
                          row.status === '开启' 
                            ? "text-[#10B981]" // Not bg-emerald-50, Figma shows just green text on transparent bg for "开启", or maybe light green? looks like outline style. Wait, Figma shows green text for 开启, no bg. But 闭关 shows red text pink bg. 
                            // Ah! Let's keep it consistent:
                            : "bg-red-50 text-red-500"
                        )}
                      >
                        {row.status}
                     </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-slate-500 dark:text-slate-400 py-2.5">{row.date}</TableCell>
                  <TableCell className="pr-5 py-2.5">
                     <div className="flex items-center space-x-2">
                       <button className="px-2.5 py-[3px] bg-emerald-50 text-[#10B981] text-[12px] font-medium rounded hover:bg-emerald-100 transition-colors">重置密码</button>
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
