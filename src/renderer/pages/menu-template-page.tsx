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

export function MenuTemplatePage() {
  const tableData = [
    { id: 1, name: '试用版', tenants: 32, desc: '试用版', modified: '2023-05-26 12:12:00/张三', created: '2023-05-26 12:12:00/张三' },
    { id: 2, name: '基础版', tenants: 32, desc: '基础版', modified: '2023-05-26 12:12:00/张三', created: '2023-05-26 12:12:00/张三' },
    { id: 3, name: 'VIP版', tenants: 32, desc: 'VIP版', modified: '2023-05-26 12:12:00/张三', created: '2023-05-26 12:12:00/张三' },
    { id: 4, name: '基础版', tenants: 32, desc: '基础版', modified: '2023-05-26 12:12:00/杜三', created: '2023-05-26 12:12:00/杜三' },
    { id: 5, name: '基础版', tenants: 32, desc: '基础版', modified: '2023-05-26 12:12:00/张三', created: '2023-05-26 12:12:00/张三' },
    { id: 6, name: '基础版', tenants: 32, desc: '基础版', modified: '2023-05-26 12:12:00/张三', created: '2023-05-26 12:12:00/张三' },
    { id: 7, name: '基础版', tenants: 32, desc: '基础版', modified: '2023-05-26 12:12:00/张三', created: '2023-05-26 12:12:00/杜三' },
    { id: 8, name: '基础版', tenants: 32, desc: '基础版', modified: '2023-05-26 12:12:00/张三', created: '2023-05-26 12:12:00/张三' },
    { id: 9, name: '基础版', tenants: 32, desc: '基础版', modified: '2023-05-26 12:12:00/张三', created: '2023-05-26 12:12:00/张三' },
    { id: 10, name: '基础版', tenants: 32, desc: '基础版', modified: '2023-05-26 12:12:00/张三', created: '2023-05-26 12:12:00/张三' },
  ];

  return (
    <div className="w-full h-full max-w-[1600px] mx-auto flex flex-col min-h-0 bg-white dark:bg-slate-950 shadow-sm border border-slate-100 dark:border-slate-800 rounded-lg rounded-tl-none">
      
      {/* Search Header */}
      <div className="flex flex-col p-5 pb-0 shrink-0">
         <div className="flex items-center justify-between pb-5 border-b border-slate-100 dark:border-slate-800">
           <div className="flex items-center space-x-6">
              <div className="flex items-center">
                 <Label className="text-[13px] text-slate-700 dark:text-slate-300 mr-2 shrink-0 font-medium whitespace-nowrap">模板名称:</Label>
                 <Input type="text" placeholder="请输入模板名称" className="h-8 w-48 text-[13px] border-slate-200 dark:border-slate-800" />
              </div>
              <div className="flex items-center">
                 <Label className="text-[13px] text-slate-700 dark:text-slate-300 mr-2 shrink-0 font-medium whitespace-nowrap">模板描述:</Label>
                 <Input type="text" placeholder="请输入模板描述" className="h-8 w-48 text-[13px] border-slate-200 dark:border-slate-800" />
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
               <Button variant="outline" className="h-8 px-4 border-red-200 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 hover:border-red-300 text-[13px] font-medium">删除</Button>
            </div>
         </div>
      </div>

      {/* Table Data */}
      <div className="flex-1 overflow-auto custom-scrollbar relative border-t border-slate-100 dark:border-slate-800">
        <Table className="w-full text-left text-[13px] text-slate-600 dark:text-slate-400 min-w-[900px]">
          <TableHeader className="bg-[#F8FAFC] text-slate-700 dark:text-slate-300 sticky top-0 z-10 shadow-sm border-b border-slate-100 dark:border-slate-800/80">
            <TableRow className="hover:bg-transparent border-[#E2E8F0] dark:border-slate-700">
              <TableHead className="w-12 pl-6 h-11"><input type="checkbox" className="ai-checkbox" /></TableHead>
              <TableHead className="font-bold w-16 h-11">序号</TableHead>
              <TableHead className="font-bold w-[18%] h-11">模板名称</TableHead>
              <TableHead className="font-bold w-28 h-11">关联租户数</TableHead>
              <TableHead className="font-bold w-[18%] h-11">模板描述</TableHead>
              <TableHead className="font-bold w-[22%] h-11">最近修改</TableHead>
              <TableHead className="font-bold pr-5 h-11">创建</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((row) => (
              <TableRow key={row.id} className="hover:bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 transition-colors">
                <TableCell className="pl-6 py-3"><input type="checkbox" className="ai-checkbox" /></TableCell>
                <TableCell className="font-mono text-slate-500 dark:text-slate-400 py-3">{row.id}</TableCell>
                <TableCell className="text-slate-700 dark:text-slate-300 font-medium py-3">{row.name}</TableCell>
                <TableCell className="font-mono text-slate-600 dark:text-slate-400 py-3">{row.tenants}</TableCell>
                <TableCell className="text-slate-500 dark:text-slate-400 py-3">{row.desc}</TableCell>
                <TableCell className="font-mono text-slate-500 dark:text-slate-400 py-3">{row.modified}</TableCell>
                <TableCell className="font-mono text-slate-500 dark:text-slate-400 py-3 pr-5">{row.created}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <Pagination total={150} />
    </div>
  );
}
