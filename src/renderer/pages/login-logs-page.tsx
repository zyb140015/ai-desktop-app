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
// @ts-ignore
import { Calendar as CalendarIcon } from "lucide-react";

export function LoginLogsPage() {
  const [date, setDate] = React.useState<Date>()

  const logsData = [
    { id: 1, logId: '2345641204845120', category: '登录', userId: '100001', name: '张三', status: '成功', time: '2023-05-26 12:12:00', ip: '10.111.123.131', address: '广东省深圳市福田区', browser: 'Chrome 11', desc: '登陆成功' },
    { id: 2, logId: '2345641204845120', category: '登录', userId: '100001', name: '张三', status: '失败', time: '2023-05-26 12:12:00', ip: '10.111.123.131', address: '广东省深圳市福田区', browser: 'Chrome 11', desc: '密码错误，登录失败' },
    { id: 3, logId: '2345641204845120', category: '登录', userId: '100001', name: '张三', status: '失败', time: '2023-05-26 12:12:00', ip: '10.111.123.131', address: '广东省深圳市福田区', browser: 'Chrome 11', desc: '密码错误，登录失败' },
    { id: 4, logId: '2345641204845120', category: '登录', userId: '100001', name: '张三', status: '失败', time: '2023-05-26 12:12:00', ip: '10.111.123.131', address: '广东省深圳市福田区', browser: 'Chrome 11', desc: '密码错误，登录失败' },
    { id: 5, logId: '2345641204845120', category: '登录', userId: '100001', name: '张三', status: '成功', time: '2023-05-26 12:12:00', ip: '10.111.123.131', address: '广东省深圳市福田区', browser: 'Chrome 11', desc: '登陆成功' },
    { id: 6, logId: '2345641204845120', category: '登录', userId: '100001', name: '张三', status: '成功', time: '2023-05-26 12:12:00', ip: '10.111.123.131', address: '广东省深圳市福田区', browser: 'Chrome 11', desc: '登陆成功' },
    { id: 7, logId: '2345641204845120', category: '登录', userId: '100001', name: '张三', status: '成功', time: '2023-05-26 12:12:00', ip: '10.111.123.131', address: '广东省深圳市福田区', browser: 'Chrome 11', desc: '登陆成功' },
    { id: 8, logId: '2345641204845120', category: '登出', userId: '100001', name: '张三', status: '成功', time: '2023-05-26 12:12:00', ip: '10.111.123.131', address: '广东省深圳市福田区', browser: 'Chrome 11', desc: '登陆成功' },
    { id: 9, logId: '2345641204845120', category: '登出', userId: '100001', name: '张三', status: '成功', time: '2023-05-26 12:12:00', ip: '10.111.123.131', address: '广东省深圳市福田区', browser: 'Chrome 11', desc: '登陆成功' },
    { id: 10, logId: '2345641204845120', category: '登出', userId: '100001', name: '张三', status: '成功', time: '2023-05-26 12:12:00', ip: '10.111.123.131', address: '广东省深圳市福田区', browser: 'Chrome 11', desc: '登陆成功' },
  ];

  return (
    <div className="w-full h-full max-w-[1600px] mx-auto flex flex-col min-h-0 bg-white dark:bg-slate-950 shadow-sm border border-slate-100 dark:border-slate-800 rounded-lg rounded-tl-none">
      
      {/* Search Header - built with shadcn ui */}
      <div className="flex flex-col p-5 pb-5 shrink-0 border-b border-slate-100 dark:border-slate-800">
         <div className="flex items-center justify-between">
           <div className="flex items-center space-x-6">
              <div className="flex items-center">
                 <Label className="text-[13px] text-slate-700 dark:text-slate-300 mr-2 shrink-0 font-medium whitespace-nowrap">用户姓名:</Label>
                 <Input type="text" placeholder="请输入" className="h-8 w-48 text-[13px]" />
              </div>
              <div className="flex items-center">
                 <Label className="text-[13px] text-slate-700 dark:text-slate-300 mr-2 shrink-0 font-medium whitespace-nowrap">操作日期:</Label>
                 <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "h-8 w-48 justify-start text-left font-normal text-[13px] border-slate-200 dark:border-slate-800",
                          !date && "text-slate-400 dark:text-slate-500"
                        )}
                      >
                        {date ? format(date, "PPP") : <span>请选择</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                 </Popover>
              </div>
              <div className="flex items-center">
                 <Label className="text-[13px] text-slate-700 dark:text-slate-300 mr-3 shrink-0 font-medium whitespace-nowrap">日志状态:</Label>
                 <RadioGroup defaultValue="all" className="flex items-center space-x-3">
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
              <Button variant="outline" size="icon" className="h-8 w-8 pointer-events-none opacity-50">重置</Button>
              <Button className="h-8 px-5 bg-[#10B981] text-[13px] text-white hover:bg-emerald-600">查询</Button>
           </div>
         </div>
      </div>

      {/* Table Data - Built with shadcn ui */}
      <div className="flex-1 overflow-auto custom-scrollbar relative">
        <Table className="w-full text-left text-[13px] text-slate-600 dark:text-slate-400 min-w-[1250px]">
          <TableHeader className="bg-[#F8FAFC] text-slate-700 dark:text-slate-300 sticky top-0 z-10 shadow-sm border-b border-slate-100 dark:border-slate-800/80">
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-bold w-12 pl-5 h-11">序号</TableHead>
              <TableHead className="font-bold h-11">日志ID</TableHead>
              <TableHead className="font-bold h-11">操作分类</TableHead>
              <TableHead className="font-bold h-11">用户ID</TableHead>
              <TableHead className="font-bold h-11">姓名</TableHead>
              <TableHead className="font-bold h-11">状态</TableHead>
              <TableHead className="font-bold h-11">操作时间</TableHead>
              <TableHead className="font-bold h-11">登录IP</TableHead>
              <TableHead className="font-bold h-11">登录地址</TableHead>
              <TableHead className="font-bold h-11">浏览器</TableHead>
              <TableHead className="font-bold h-11 pr-5">日志说明</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logsData.map((row) => (
              <TableRow key={row.id} className="hover:bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 transition-colors">
                <TableCell className="font-mono text-slate-500 dark:text-slate-400 pl-5 py-3.5">{row.id}</TableCell>
                <TableCell className="font-mono text-slate-600 dark:text-slate-400 py-3.5">{row.logId}</TableCell>
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
                <TableCell className="text-slate-600 dark:text-slate-400 py-3.5 truncate max-w-[150px]">{row.address}</TableCell>
                <TableCell className="text-slate-500 dark:text-slate-400 py-3.5">{row.browser}</TableCell>
                <TableCell className="text-slate-500 dark:text-slate-400 truncate max-w-[180px] py-3.5 pr-5" title={row.desc}>{row.desc}</TableCell>
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
