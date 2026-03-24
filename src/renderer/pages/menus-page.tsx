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
// @ts-ignore
import { ChevronRight, ChevronDown, Home } from "lucide-react";

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

  const rawData: MenuNode[] = [
    { id: 1, parentId: null, name: '首页', hasSub: true, depth: 0, level: '1级', order: 1, type: '目录', status: '可见', path: '/homepage.html', perm: 'sys:zuhu:moban:modify' },
    { id: 2, parentId: null, name: '租户配置', hasSub: true, depth: 0, level: '1级', order: 1, type: '目录', status: '不可见', path: '/homepage.html', perm: 'sys:zuhu:moban:modify' },
    { id: 3, parentId: 2, name: '租户管理', hasSub: true, depth: 1, level: '2级', order: 1, type: '菜单', status: '不可见', path: '/homepage.html', perm: 'sys:zuhu:moban:modify' },
    { id: 4, parentId: 2, name: '菜单模板', hasSub: true, depth: 1, level: '2级', order: 1, type: '菜单', status: '不可见', path: '/homepage.html', perm: 'sys:zuhu:moban:modify' },
    { id: 5, parentId: 2, name: '组织管理', hasSub: true, depth: 1, level: '2级', order: 1, type: '菜单', status: '不可见', path: '/homepage.html', perm: 'sys:zuhu:moban:modify' },
    { id: 6, parentId: 5, name: '查询/查看', hasSub: false, depth: 2, level: '3级', order: 1, type: '按钮', status: '不可见', path: '/homepage.html', perm: 'sys:zuhu:moban:modify' },
    { id: 7, parentId: 5, name: '新增', hasSub: false, depth: 2, level: '3级', order: 1, type: '按钮', status: '可见', path: '/homepage.html', perm: 'sys:zuhu:moban:modify' },
    { id: 8, parentId: 5, name: '修改', hasSub: false, depth: 2, level: '3级', order: 1, type: '按钮', status: '可见', path: '/homepage.html', perm: 'sys:zuhu:moban:modify' },
    { id: 9, parentId: 5, name: '删除', hasSub: false, depth: 2, level: '3级', order: 1, type: '按钮', status: '可见', path: '/homepage.html', perm: 'sys:zuhu:moban:modify' },
  ];

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
    <div className="w-full h-full max-w-[1600px] mx-auto flex flex-col min-h-0 bg-white dark:bg-slate-950 shadow-sm border border-slate-100 dark:border-slate-800 rounded-lg rounded-tl-none">
      
      {/* Search Header */}
      <div className="flex flex-col p-5 pb-0 shrink-0">
         <div className="flex items-center justify-between pb-5 border-b border-slate-100 dark:border-slate-800">
           <div className="flex items-center space-x-6">
              <div className="flex items-center">
                 <Label className="text-[13px] text-slate-700 dark:text-slate-300 mr-2 shrink-0 font-medium whitespace-nowrap">菜单名称:</Label>
                 <Input type="text" placeholder="请输入" className="h-8 w-48 text-[13px] border-slate-200 dark:border-slate-800" />
              </div>
              <div className="flex items-center">
                 <Label className="text-[13px] text-slate-700 dark:text-slate-300 mr-2 shrink-0 font-medium whitespace-nowrap">类型:</Label>
                 <Select>
                    <SelectTrigger className="h-8 w-48 text-[13px] text-slate-500 dark:text-slate-400">
                       <SelectValue placeholder="请选择" />
                    </SelectTrigger>
                    <SelectContent>
                       <SelectItem value="dir">目录</SelectItem>
                       <SelectItem value="menu">菜单</SelectItem>
                       <SelectItem value="btn">按钮</SelectItem>
                    </SelectContent>
                 </Select>
              </div>
              <div className="flex items-center">
                 <Label className="text-[13px] text-slate-700 dark:text-slate-300 mr-3 shrink-0 font-medium whitespace-nowrap">状态:</Label>
                 <RadioGroup defaultValue="all" className="flex items-center space-x-3">
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
               <Button onClick={toggleAll} className="h-8 px-4 bg-[#10B981] text-[13px] text-white hover:bg-emerald-600 font-medium">展开/折叠</Button>
            </div>
         </div>
      </div>

      {/* Table Data (Tree Structure) */}
      <div className="flex-1 overflow-auto custom-scrollbar relative border-t border-slate-100 dark:border-slate-800">
        <Table className="w-full text-left text-[13px] text-slate-600 dark:text-slate-400 min-w-[1200px]">
          <TableHeader className="bg-[#F8FAFC] text-slate-700 dark:text-slate-300 sticky top-0 z-10 shadow-sm border-b border-slate-100 dark:border-slate-800/80">
            <TableRow className="hover:bg-transparent border-[#E2E8F0] dark:border-slate-700">
              <TableHead className="font-bold pl-8 w-[18%] h-11">序号</TableHead>
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
                <TableRow key={row.id} className="hover:bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 transition-colors">
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
                       <button className="px-2.5 py-[3px] bg-emerald-50 text-[#10B981] text-[12px] font-medium rounded hover:bg-emerald-100 transition-colors">修改</button>
                       <button className="px-2.5 py-[3px] bg-red-50 text-red-500 text-[12px] font-medium rounded hover:bg-red-100 transition-colors">删除</button>
                     </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

    </div>
  );
}
