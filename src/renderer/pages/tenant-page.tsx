import { Pagination } from '../components/pagination';

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
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

export function TenantPage() {
  const tableData = [
    { id: 1, code: 'FQJT', name: '智迪互动(北京)广告有限公司', status: '开启', period: '2023-01-01 - 2023-12-31', admin: '张三', phone: '131 1242 1320' },
    { id: 2, code: 'HIMGJT', name: '北京长友物业管理有限公司', status: '关闭', period: '2023-01-01 - 2023-12-31', admin: '张三', phone: '131 1242 1320' },
    { id: 3, code: 'HLGJT', name: '陕西沙龙传媒有限公司', status: '关闭', period: '2023-01-01 - 2023-12-31', admin: '张三', phone: '131 1242 1320' },
    { id: 4, code: 'YLJT', name: '北京尚策互动科技有限公司', status: '关闭', period: '2023-01-01 - 2023-12-31', admin: '张三', phone: '131 1242 1320' },
    { id: 5, code: 'LZJT', name: '北京畅晟宏达科技有限公司', status: '关闭', period: '2023-01-01 - 2023-12-31', admin: '张三', phone: '131 1242 1320' },
    { id: 6, code: 'LZJT', name: '万为文化传媒(北京)有限公司', status: '关闭', period: '2023-01-01 - 2023-12-31', admin: '张三', phone: '131 1242 1320' },
    { id: 7, code: 'LZJT', name: '北京意生信科技有限公司', status: '开启', period: '2023-01-01 - 2023-12-31', admin: '张三', phone: '131 1242 1320' },
    { id: 8, code: 'LZJT', name: '爱度(北京)营销有限责任公司', status: '开启', period: '2023-01-01 - 2023-12-31', admin: '张三', phone: '131 1242 1320' },
    { id: 9, code: 'LZJT', name: '东管电力科技集团有限公司', status: '开启', period: '2023-01-01 - 2023-12-31', admin: '张三', phone: '131 1242 1320' },
    { id: 10, code: 'LZJT', name: '北京嘉铭印象科技有限公司', status: '开启', period: '2023-01-01 - 2023-12-31', admin: '张三', phone: '131 1242 1320' },
  ];

  return (
    <div className="w-full h-full max-w-[1600px] mx-auto flex flex-col min-h-0 bg-white dark:bg-slate-950 shadow-sm border border-slate-100 dark:border-slate-800 rounded-lg rounded-tl-none">
      
      {/* Search Header */}
      <div className="flex flex-col p-5 pb-0 shrink-0">
         <div className="flex items-center justify-between pb-5 border-b border-slate-100 dark:border-slate-800">
           <div className="flex items-center space-x-6">
              <div className="flex items-center">
                 <Label className="text-[13px] text-slate-700 dark:text-slate-300 mr-2 shrink-0 font-medium whitespace-nowrap">租户名称:</Label>
                 <Input type="text" placeholder="请输入租户名称" className="h-8 w-48 text-[13px] border-slate-200 dark:border-slate-800" />
              </div>
              <div className="flex items-center">
                 <Label className="text-[13px] text-slate-700 dark:text-slate-300 mr-2 shrink-0 font-medium whitespace-nowrap">租户编码:</Label>
                 <Input type="text" placeholder="请输入租户编码" className="h-8 w-48 text-[13px] border-slate-200 dark:border-slate-800" />
              </div>
              <div className="flex items-center">
                 <Label className="text-[13px] text-slate-700 dark:text-slate-300 mr-3 shrink-0 font-medium whitespace-nowrap">租户状态:</Label>
                 <RadioGroup defaultValue="all" className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1.5 cursor-pointer">
                      <RadioGroupItem value="all" id="t_r1" className="text-emerald-500 border-emerald-500 fill-emerald-500 w-[14px] h-[14px]" />
                      <Label htmlFor="t_r1" className="text-[13px] text-slate-600 dark:text-slate-400 cursor-pointer font-normal">全部</Label>
                    </div>
                    <div className="flex items-center space-x-1.5 cursor-pointer">
                      <RadioGroupItem value="open" id="t_r2" className="w-[14px] h-[14px]" />
                      <Label htmlFor="t_r2" className="text-[13px] text-slate-600 dark:text-slate-400 cursor-pointer font-normal">开启</Label>
                    </div>
                    <div className="flex items-center space-x-1.5 cursor-pointer">
                      <RadioGroupItem value="closed" id="t_r3" className="w-[14px] h-[14px]" />
                      <Label htmlFor="t_r3" className="text-[13px] text-slate-600 dark:text-slate-400 cursor-pointer font-normal">关闭</Label>
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
               <Button variant="outline" className="h-8 px-4 border-red-200 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 hover:border-red-300 text-[13px] font-medium">删除</Button>
            </div>
         </div>
      </div>

      {/* Table Data */}
      <div className="flex-1 overflow-auto custom-scrollbar relative border-t border-slate-100 dark:border-slate-800">
        <Table className="w-full text-left text-[13px] text-slate-600 dark:text-slate-400 min-w-[1200px]">
          <TableHeader className="bg-[#F8FAFC] text-slate-700 dark:text-slate-300 sticky top-0 z-10 shadow-sm border-b border-slate-100 dark:border-slate-800/80">
            <TableRow className="hover:bg-transparent border-[#E2E8F0] dark:border-slate-700">
              <TableHead className="w-12 pl-6 h-11"><input type="checkbox" className="ai-checkbox" /></TableHead>
              <TableHead className="font-bold w-14 h-11">序号</TableHead>
              <TableHead className="font-bold w-24 h-11">租户编码</TableHead>
              <TableHead className="font-bold w-[20%] h-11">租户名称</TableHead>
              <TableHead className="font-bold w-20 h-11">租户状态</TableHead>
              <TableHead className="font-bold w-[18%] h-11">有效期</TableHead>
              <TableHead className="font-bold w-24 h-11">租户管理员</TableHead>
              <TableHead className="font-bold w-32 h-11">管理员电话</TableHead>
              <TableHead className="font-bold pr-5 h-11">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((row) => (
              <TableRow key={row.id} className="hover:bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 transition-colors">
                <TableCell className="pl-6 py-3"><input type="checkbox" className="ai-checkbox" /></TableCell>
                <TableCell className="font-mono text-slate-500 dark:text-slate-400 py-3">{row.id}</TableCell>
                <TableCell className="font-mono text-slate-600 dark:text-slate-400 py-3">{row.code}</TableCell>
                <TableCell className="text-slate-700 dark:text-slate-300 font-medium py-3">{row.name}</TableCell>
                <TableCell className="py-3">
                   <Badge 
                      variant="outline" 
                      className={cn(
                        "rounded font-medium px-2 py-0 border-[#E2E8F0] dark:border-slate-700 pointer-events-none",
                        row.status === '开启' 
                          ? "bg-emerald-50 text-[#10B981]" 
                          : "bg-red-50 text-red-500"
                      )}
                    >
                      {row.status}
                   </Badge>
                </TableCell>
                <TableCell className="font-mono text-slate-500 dark:text-slate-400 py-3">{row.period}</TableCell>
                <TableCell className="text-slate-600 dark:text-slate-400 py-3">{row.admin}</TableCell>
                <TableCell className="font-mono text-slate-500 dark:text-slate-400 py-3">{row.phone}</TableCell>
                <TableCell className="pr-5 py-3">
                   <div className="flex items-center space-x-2">
                     <button className="px-2.5 py-[3px] bg-emerald-50 text-[#10B981] text-[12px] font-medium rounded hover:bg-emerald-100 transition-colors">分配菜单</button>
                     <button className="px-2.5 py-[3px] bg-emerald-50 text-[#10B981] text-[12px] font-medium rounded hover:bg-emerald-100 transition-colors">
                       {row.status === '开启' ? '关闭' : '开启'}
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

      {/* Pagination */}
      <Pagination total={150} />
    </div>
  );
}
