import * as React from 'react';

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

export function UsageStatsPage() {
  const [dateRange, setDateRange] = React.useState('week');

  const barData = [
    { date: '20240101', login: 500, usage: 350 },
    { date: '20240102', login: 600, usage: 420 },
    { date: '20240103', login: 580, usage: 460 },
    { date: '20240104', login: 520, usage: 380 },
    { date: '20240105', login: 640, usage: 450 },
    { date: '20240106', login: 600, usage: 420 },
    { date: '20240107', login: 610, usage: 440 },
  ];

  const topMost = [
    { rank: 1, name: '用户管理', count: 94701, rate: '24%' },
    { rank: 2, name: '菜单管理', count: 75138, rate: '24%' },
    { rank: 3, name: '公告管理', count: 35388, rate: '24%' },
    { rank: 4, name: '系统日志', count: 33968, rate: '24%' },
    { rank: 5, name: '系统监控', count: 20274, rate: '24%' },
  ];

  const topLeast = [
    { rank: 1, name: '用户管理', count: 94701, rate: '24%' },
    { rank: 2, name: '菜单管理', count: 75138, rate: '24%' },
    { rank: 3, name: '公告管理', count: 35388, rate: '24%' },
    { rank: 4, name: '系统日志', count: 33968, rate: '24%' },
    { rank: 5, name: '系统监控', count: 20274, rate: '24%' },
  ];

  const maxVal = 1000;
  const yTicks = [0, 200, 400, 600, 800, 1000];

  return (
    <div className="w-full h-full max-w-[1600px] mx-auto flex flex-col min-h-[700px] bg-white dark:bg-slate-950 shadow-sm border border-slate-100 dark:border-slate-800 rounded-lg overflow-auto custom-scrollbar">

      {/* Top Filter Bar */}
      <div className="flex items-center justify-between px-5 pt-4 pb-2 shrink-0">
        <div className="flex items-center space-x-3">
          <Label className="text-[13px] text-slate-700 dark:text-slate-300 font-medium">租户名称</Label>
          <Select>
            <SelectTrigger className="h-8 w-48 text-[13px] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800">
              <SelectValue placeholder="请选择" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部租户</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2 text-[12px]">
          {['今日', '本周', '本月'].map((label, idx) => {
            const keys = ['today', 'week', 'month'];
            return (
              <button key={keys[idx]} onClick={() => setDateRange(keys[idx])}
                className={cn("px-3 py-1 rounded transition-colors font-medium",
                  dateRange === keys[idx] ? "bg-[#10B981] text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                )}>{label}</button>
            );
          })}
          <span className="ml-2 text-[12px] text-slate-500 dark:text-slate-400">2020年11月16日 -2020年12月16日 📅</span>
        </div>
      </div>

      {/* Bar Chart Section — 占满上半部分，约55% */}
      <div className="px-5 pb-3 flex-[55] min-h-0">
        <div className="bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl p-5 h-full flex flex-col">
          <div className="flex items-center justify-between mb-3 shrink-0">
            <h3 className="text-[14px] font-bold text-slate-800 dark:text-slate-200">员工统计</h3>
            <div className="flex items-center space-x-4 text-[12px] text-slate-500 dark:text-slate-400">
              <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 mr-1.5"></span>登录人数</span>
              <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-[#10B981] mr-1.5"></span>使用人数</span>
            </div>
          </div>

          {/* CSS Bar chart with Y axis */}
          <div className="flex-1 flex min-h-0">
            {/* Y Axis Labels */}
            <div className="flex flex-col justify-between pr-2 shrink-0 pb-5">
              {yTicks.slice().reverse().map((tick) => (
                <span key={tick} className="text-[10px] text-slate-400 dark:text-slate-500 leading-none text-right w-8">{tick.toLocaleString()}</span>
              ))}
            </div>
            {/* Bars */}
            <div className="flex-1 flex items-stretch justify-around border-l border-b border-slate-200 dark:border-slate-800 pb-0 relative min-h-0">
              {/* Horizontal grid lines */}
              {yTicks.slice(1).map((tick) => (
                <div key={tick} className="absolute left-0 right-0 border-t border-dashed border-slate-100 dark:border-slate-800" style={{ bottom: `${(tick / maxVal) * 100}%` }}></div>
              ))}
              {barData.map((d) => (
                <div key={d.date} className="flex flex-col items-center justify-end z-10 flex-1 mx-1 min-h-0">
                  <div className="flex flex-1 items-end space-x-1 w-full justify-center min-h-0">
                    <div className="w-[16%] max-w-[22px] rounded-t-sm transition-all duration-300" style={{ height: `${(d.login / maxVal) * 100}%`, backgroundColor: '#F6C94F' }}></div>
                    <div className="w-[16%] max-w-[22px] rounded-t-sm transition-all duration-300" style={{ height: `${(d.usage / maxVal) * 100}%`, backgroundColor: '#10B981' }}></div>
                  </div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1.5 shrink-0">{d.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top 5 Lists — 占满下半部分，约45% */}
      <div className="px-5 pb-4 flex-[45] min-h-0 grid grid-cols-2 gap-4">
        {/* Most Used */}
        <div className="bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl p-5 flex flex-col min-h-0">
          <h3 className="text-[14px] font-bold text-slate-800 dark:text-slate-200 mb-3 shrink-0">使用最多的模块Top5</h3>
          <div className="flex items-center text-[11px] text-slate-400 dark:text-slate-500 mb-2 px-1 shrink-0">
            <span className="w-8">排名</span>
            <span className="w-16">模块</span>
            <span className="flex-1"></span>
            <span className="w-24 text-right">使用用户数</span>
            <span className="w-16 text-right">周涨幅</span>
          </div>
          <div className="flex-1 flex flex-col justify-around min-h-0">
            {topMost.map((item) => (
              <div key={item.rank} className="flex items-center px-1">
                <span className={cn("w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold mr-3 shrink-0",
                  item.rank <= 3 ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-500 dark:text-slate-400"
                )}>{item.rank}</span>
                <span className="text-[13px] text-slate-700 dark:text-slate-300 w-16 shrink-0">{item.name}</span>
                <div className="flex-1 mx-3 flex items-center">
                  <div className="h-2.5 rounded-sm bg-gradient-to-r from-emerald-300 to-emerald-500 transition-all" style={{ width: `${(item.count / 100000) * 100}%` }}></div>
                  <div className="h-2.5 rounded-r-sm bg-slate-100 dark:bg-slate-800 transition-all" style={{ width: `${(1 - item.count / 100000) * 100}%` }}></div>
                </div>
                <span className="text-[13px] text-slate-800 dark:text-slate-200 font-mono w-16 text-right font-medium">{item.count.toLocaleString()}</span>
                <span className="text-[12px] font-medium text-emerald-500 w-16 text-right">{item.rate} ↑</span>
              </div>
            ))}
          </div>
        </div>

        {/* Least Used */}
        <div className="bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl p-5 flex flex-col min-h-0">
          <h3 className="text-[14px] font-bold text-slate-800 dark:text-slate-200 mb-3 shrink-0">使用最少的模块Top5</h3>
          <div className="flex items-center text-[11px] text-slate-400 dark:text-slate-500 mb-2 px-1 shrink-0">
            <span className="w-8">排名</span>
            <span className="w-16">模块</span>
            <span className="flex-1"></span>
            <span className="w-24 text-right">使用用户数</span>
            <span className="w-16 text-right">周涨幅</span>
          </div>
          <div className="flex-1 flex flex-col justify-around min-h-0">
            {topLeast.map((item) => (
              <div key={item.rank} className="flex items-center px-1">
                <span className={cn("w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold mr-3 shrink-0",
                  item.rank <= 3 ? "bg-blue-500 text-white" : "bg-slate-200 text-slate-500 dark:text-slate-400"
                )}>{item.rank}</span>
                <span className="text-[13px] text-slate-700 dark:text-slate-300 w-16 shrink-0">{item.name}</span>
                <div className="flex-1 mx-3 flex items-center">
                  <div className="h-2.5 rounded-sm bg-gradient-to-r from-blue-300 to-blue-500 transition-all" style={{ width: `${(item.count / 100000) * 30}%` }}></div>
                  <div className="h-2.5 rounded-r-sm bg-slate-100 dark:bg-slate-800 transition-all" style={{ width: `${100 - (item.count / 100000) * 30}%` }}></div>
                </div>
                <span className="text-[13px] text-slate-800 dark:text-slate-200 font-mono w-16 text-right font-medium">{item.count.toLocaleString()}</span>
                <span className="text-[12px] font-medium text-red-400 w-16 text-right">{item.rate} ↑</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
