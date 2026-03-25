import * as React from 'react';

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

import { useDesktopUsageStatsQuery } from '../hooks/use-desktop-usage-stats-query'

const chartStepCount = 5

function formatStatsDateRange(range: string, now = new Date()) {
  const current = new Date(now)
  const end = new Date(current.getFullYear(), current.getMonth(), current.getDate())
  const start = new Date(end)

  if (range === 'month') {
    start.setDate(1)
  } else if (range === 'week') {
    const weekday = end.getDay() === 0 ? 7 : end.getDay()
    start.setDate(end.getDate() - weekday + 1)
  }

  const format = (value: Date) => `${value.getFullYear()}年${value.getMonth() + 1}月${value.getDate()}日`
  return `${format(start)} - ${format(end)}`
}

export function UsageStatsPage() {
  const [dateRange, setDateRange] = React.useState('week');
  const [tenantCode, setTenantCode] = React.useState('all')
  const query = useDesktopUsageStatsQuery(dateRange, tenantCode)
  const stats = query.data
  const barData = (stats?.trend ?? []).map((item) => ({ date: item.label, login: item.loginCount, usage: item.usageCount }))
  const topMost = stats?.topMost ?? []
  const topLeast = stats?.topLeast ?? []
  const maxVal = Math.max(...barData.flatMap((item) => [item.login, item.usage]), 1)
  const tickStep = Math.max(1, Math.ceil(maxVal / chartStepCount))
  const yTicks = Array.from({ length: chartStepCount + 1 }, (_, index) => index * tickStep)
  const maxRankCount = Math.max(...[...topMost, ...topLeast].map((item) => item.count), 1)
  const hasTrendData = barData.length > 0
  const rangeLabel = formatStatsDateRange(dateRange)

  return (
    <div className="w-full h-full max-w-[1600px] mx-auto flex flex-col min-h-[700px] bg-white dark:bg-slate-950 shadow-sm border border-slate-100 dark:border-slate-800 rounded-lg overflow-auto custom-scrollbar">

      {/* Top Filter Bar */}
      <div className="flex items-center justify-between px-5 pt-4 pb-2 shrink-0">
        <div className="flex items-center space-x-3">
          <Label className="text-[13px] text-slate-700 dark:text-slate-300 font-medium">租户名称</Label>
          <Select value={tenantCode} onValueChange={setTenantCode}>
            <SelectTrigger className="h-8 w-48 text-[13px] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800">
              <SelectValue placeholder="请选择" />
            </SelectTrigger>
            <SelectContent>
              {(stats?.tenants ?? [{ code: 'all', name: '全部租户' }]).map((tenant) => <SelectItem key={tenant.code} value={tenant.code}>{tenant.name}</SelectItem>)}
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
          <span className="ml-2 text-[12px] text-slate-500 dark:text-slate-400">{rangeLabel} 📅</span>
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
              {!hasTrendData ? <div className="absolute inset-0 flex items-center justify-center text-[12px] text-slate-400 dark:text-slate-500">暂无使用趋势数据</div> : null}
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
            {topMost.length === 0 ? <div className="flex flex-1 items-center justify-center text-[12px] text-slate-400 dark:text-slate-500">暂无模块统计数据</div> : null}
            {topMost.map((item) => (
              <div key={item.rank} className="flex items-center px-1">
                <span className={cn("w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold mr-3 shrink-0",
                  item.rank <= 3 ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-500 dark:text-slate-400"
                )}>{item.rank}</span>
                <span className="text-[13px] text-slate-700 dark:text-slate-300 w-16 shrink-0">{item.name}</span>
                <div className="flex-1 mx-3 flex items-center">
                  <div className="h-2.5 rounded-sm bg-gradient-to-r from-emerald-300 to-emerald-500 transition-all" style={{ width: `${(item.count / maxRankCount) * 100}%` }}></div>
                  <div className="h-2.5 rounded-r-sm bg-slate-100 dark:bg-slate-800 transition-all" style={{ width: `${100 - (item.count / maxRankCount) * 100}%` }}></div>
                </div>
                <span className="text-[13px] text-slate-800 dark:text-slate-200 font-mono w-16 text-right font-medium">{item.count.toLocaleString()}</span>
                <span className="text-[12px] font-medium text-emerald-500 w-16 text-right">{item.change}</span>
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
            {topLeast.length === 0 ? <div className="flex flex-1 items-center justify-center text-[12px] text-slate-400 dark:text-slate-500">暂无模块统计数据</div> : null}
            {topLeast.map((item) => (
              <div key={item.rank} className="flex items-center px-1">
                <span className={cn("w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold mr-3 shrink-0",
                  item.rank <= 3 ? "bg-blue-500 text-white" : "bg-slate-200 text-slate-500 dark:text-slate-400"
                )}>{item.rank}</span>
                <span className="text-[13px] text-slate-700 dark:text-slate-300 w-16 shrink-0">{item.name}</span>
                <div className="flex-1 mx-3 flex items-center">
                  <div className="h-2.5 rounded-sm bg-gradient-to-r from-blue-300 to-blue-500 transition-all" style={{ width: `${(item.count / maxRankCount) * 100}%` }}></div>
                  <div className="h-2.5 rounded-r-sm bg-slate-100 dark:bg-slate-800 transition-all" style={{ width: `${100 - (item.count / maxRankCount) * 100}%` }}></div>
                </div>
                <span className="text-[13px] text-slate-800 dark:text-slate-200 font-mono w-16 text-right font-medium">{item.count.toLocaleString()}</span>
                <span className="text-[12px] font-medium text-red-400 w-16 text-right">{item.change}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {query.isLoading ? <div className="px-5 pb-4 text-[13px] text-slate-500 dark:text-slate-400">加载中...</div> : null}
      {query.isError ? <div className="px-5 pb-4 text-[13px] text-red-500">使用统计加载失败</div> : null}
    </div>
  );
}
