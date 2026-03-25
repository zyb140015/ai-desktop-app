import * as React from 'react';

import { cn } from "@/lib/utils"

import { useDesktopSystemStatsQuery } from '../hooks/use-desktop-system-stats-query'

const trendChartHeight = 140
const employeeBarChartHeight = 120
const tenantCircleRadius = 48
const employeeCircleRadius = 48

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

function buildDonutSegments(values: number[], radius: number) {
  const total = values.reduce((sum, value) => sum + value, 0)
  const circumference = 2 * Math.PI * radius
  let offset = 0

  return values.map((value) => {
    const segmentLength = total > 0 ? (value / total) * circumference : 0
    const segment = { dasharray: `${segmentLength} ${circumference}`, dashoffset: -offset }
    offset += segmentLength
    return segment
  })
}

export function SystemStatsPage() {
  const [dateRange, setDateRange] = React.useState('week');
  const query = useDesktopSystemStatsQuery(dateRange)
  const stats = query.data
  const alertCards = stats?.alertCards ?? []
  const trend = stats?.trend ?? []
  const normalTenants = stats?.tenantNormal.names ?? []
  const expiringTenants = stats?.tenantExpiring.names ?? []
  const expiredTenants = stats?.tenantExpired.names ?? []
  const deptStats = (stats?.departmentStats ?? []).slice(0, 5).map((item, index) => ({ rank: index + 1, name: item.name, count: item.count, rate: '0.00%' }))
  const roleStats = stats?.roleStats ?? []
  const trendMax = Math.max(...trend.map((item) => item.value), 1)
  const departmentMax = Math.max(...(stats?.departmentStats ?? []).map((item) => item.count), 1)
  const tenantStatusSegments = buildDonutSegments([stats?.tenantOpenCount ?? 0, stats?.tenantClosedCount ?? 0], tenantCircleRadius)
  const tenantExpirySegments = buildDonutSegments([stats?.tenantNormal.count ?? 0, stats?.tenantExpiring.count ?? 0, stats?.tenantExpired.count ?? 0], 38)
  const employeeSegments = buildDonutSegments(roleStats.map((item) => item.count), employeeCircleRadius)
  const roleColors = ['#3B82F6', '#F59E0B', '#10B981', '#EF4444', '#8B5CF6']
  const hasTenantList = normalTenants.length > 0 || expiringTenants.length > 0 || expiredTenants.length > 0
  const hasEmployeeStats = roleStats.length > 0 || (stats?.departmentStats.length ?? 0) > 0
  const rangeLabel = formatStatsDateRange(dateRange)

  return (
    <div className="w-full h-full max-w-[1600px] mx-auto flex flex-col min-h-[700px] bg-white dark:bg-slate-950 shadow-sm border border-slate-100 dark:border-slate-800 rounded-lg overflow-auto custom-scrollbar">

      {/* Row 1: Alert Cards + Alert Chart */}
      <div className="flex px-4 pt-4 pb-3 gap-4" style={{ flex: '0 0 32%' }}>
        {/* Left: Alert Summary Cards */}
        <div className="flex flex-col gap-2 w-[230px] shrink-0">
          {alertCards.map((card, cardIndex) => (
            <div key={card.label} className="bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-lg px-3 py-2.5 flex items-center justify-between flex-1">
              <div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">{card.label} <span className="text-[18px] font-bold text-slate-800 dark:text-slate-200 ml-1">{card.value}</span></div>
                <div className="flex items-center mt-0.5">
                  <span className="text-[11px] text-emerald-500 font-medium">{card.change}</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 ml-1">↑ {card.period}</span>
                </div>
              </div>
              <div className="flex items-end space-x-[2px]">
                {trend.slice(Math.max(0, trend.length - 7)).map((item, index) => (
                  <div key={`${cardIndex}-${item.label}-${index}`} className="w-1 rounded-t-sm bg-emerald-200" style={{ height: `${Math.max((item.value / trendMax) * 24, 2)}px` }}></div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right: Alert Trend Chart */}
        <div className="flex-1 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-lg p-4 flex flex-col min-h-0">
          <div className="flex items-center justify-between mb-2 shrink-0">
            <h3 className="text-[13px] font-bold text-slate-800 dark:text-slate-200">告警统计</h3>
            <div className="flex items-center space-x-2 text-[11px]">
              {['今日', '本周', '本月'].map((label, idx) => {
                const keys = ['today', 'week', 'month'];
                return (
                  <button key={keys[idx]} onClick={() => setDateRange(keys[idx])}
                    className={cn("px-2.5 py-0.5 rounded transition-colors font-medium",
                      dateRange === keys[idx] ? "bg-[#10B981] text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                    )}>{label}</button>
                );
              })}
              <span className="ml-1 text-[11px] text-slate-400 dark:text-slate-500">{rangeLabel} 📅</span>
            </div>
          </div>
          <div className="flex-1 relative min-h-0">
            {trend.length > 0 ? (
              <>
                <svg viewBox="0 0 600 160" className="w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#10B981" stopOpacity="0.02" />
                    </linearGradient>
                  </defs>
                  <path d={`M0,160 ${trend.map((item, index) => {
                    const x = trend.length === 1 ? 300 : (index / (trend.length - 1)) * 600
                    const y = 160 - (item.value / trendMax) * trendChartHeight
                    return `L${x},${y}`
                  }).join(' ')} L600,160 Z`} fill="url(#areaGrad)" />
                  <path d={trend.map((item, index) => {
                    const x = trend.length === 1 ? 300 : (index / (trend.length - 1)) * 600
                    const y = 160 - (item.value / trendMax) * trendChartHeight
                    return `${index === 0 ? 'M' : 'L'}${x},${y}`
                  }).join(' ')} fill="none" stroke="#10B981" strokeWidth="2" />
                  {trend.map((item, index) => {
                    const x = trend.length === 1 ? 300 : (index / (trend.length - 1)) * 600
                    const y = 160 - (item.value / trendMax) * trendChartHeight
                    return <circle key={item.label} cx={x} cy={y} r="3" fill="#10B981" stroke="white" strokeWidth="2" />
                  })}
                </svg>
                <div className="absolute text-[10px] text-slate-400 dark:text-slate-500 bottom-0 left-0 w-full flex justify-between px-1">
                  {trend.map((item) => <span key={item.label}>{item.label}</span>)}
                </div>
                <div className="absolute top-1 left-[48%] bg-slate-800 text-white text-[10px] px-2 py-0.5 rounded shadow-lg">{trend[trend.length - 1]?.value ?? 0}</div>
              </>
            ) : <div className="flex h-full items-center justify-center text-[12px] text-slate-400 dark:text-slate-500">暂无告警趋势数据</div>}
          </div>
        </div>
      </div>

      {/* Row 2: Tenant Statistics — 按图1横排：左侧两个环形图并排，右侧三组租户列表 */}
      <div className="px-4 pb-3" style={{ flex: '0 0 auto' }}>
        <div className="bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-lg px-5 py-3">
          <h3 className="text-[13px] font-bold text-slate-800 dark:text-slate-200 mb-3">租户统计</h3>
          <div className="flex gap-6 items-start">
            {/* Left: Two donuts side by side */}
            <div className="shrink-0 flex flex-col gap-2 w-[240px]">
              <div className="flex items-center gap-4">
                {/* Donut 1: 租户总数 */}
                <div className="relative w-[90px] h-[90px]">
                  <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                    <circle cx="60" cy="60" r="48" stroke="#E2E8F0" strokeWidth="14" fill="none" />
                    <circle cx="60" cy="60" r="48" stroke="#10B981" strokeWidth="14" fill="none" strokeDasharray={tenantStatusSegments[0]?.dasharray ?? '0 301'} strokeDashoffset={tenantStatusSegments[0]?.dashoffset ?? 0} strokeLinecap="round" />
                    <circle cx="60" cy="60" r="48" stroke="#F59E0B" strokeWidth="14" fill="none" strokeDasharray={tenantStatusSegments[1]?.dasharray ?? '0 301'} strokeDashoffset={tenantStatusSegments[1]?.dashoffset ?? 0} strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[9px] text-slate-400 dark:text-slate-500 leading-tight">租户总数</span>
                    <span className="text-[16px] font-bold text-slate-800 dark:text-slate-200 leading-tight">{stats?.tenantTotal ?? 0}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                  <span>■ 关闭状态 {stats?.tenantClosedCount ?? 0}个</span>
                  <span>● 开启状态 {stats?.tenantOpenCount ?? 0}个</span>
                  <span className="text-[10px] text-emerald-500 mt-0.5">实时统计</span>
                </div>
              </div>
              {/* Donut 2: 到期分布 */}
              <div className="flex items-center gap-4">
                <div className="relative w-[75px] h-[75px]">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r="38" stroke="#E2E8F0" strokeWidth="12" fill="none" />
                    <circle cx="50" cy="50" r="38" stroke="#10B981" strokeWidth="12" fill="none" strokeDasharray={tenantExpirySegments[0]?.dasharray ?? '0 239'} strokeDashoffset={tenantExpirySegments[0]?.dashoffset ?? 0} strokeLinecap="round" />
                    <circle cx="50" cy="50" r="38" stroke="#F59E0B" strokeWidth="12" fill="none" strokeDasharray={tenantExpirySegments[1]?.dasharray ?? '0 239'} strokeDashoffset={tenantExpirySegments[1]?.dashoffset ?? 0} strokeLinecap="round" />
                    <circle cx="50" cy="50" r="38" stroke="#EF4444" strokeWidth="12" fill="none" strokeDasharray={tenantExpirySegments[2]?.dasharray ?? '0 239'} strokeDashoffset={tenantExpirySegments[2]?.dashoffset ?? 0} strokeLinecap="round" />
                  </svg>
                </div>
                <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[10px] text-slate-500 dark:text-slate-400">
                  <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-emerald-500 mr-1"></span>正常 {stats?.tenantNormal.count ?? 0}个</span>
                  <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-amber-500 mr-1"></span>即将过期 {stats?.tenantExpiring.count ?? 0}个</span>
                  <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-red-500 mr-1"></span>已过期 {stats?.tenantExpired.count ?? 0}个</span>
                </div>
              </div>
            </div>

            {/* Right: 3 Tenant Lists - 横排铺满 */}
            <div className="flex-1 space-y-2.5 min-w-0">
              {!hasTenantList ? <div className="flex min-h-[120px] items-center justify-center text-[12px] text-slate-400 dark:text-slate-500">暂无租户统计数据</div> : null}
              <div>
                <div className="flex items-center mb-1.5">
                  <span className="text-emerald-500 mr-1.5 text-[14px]">🟢</span>
                  <span className="text-[12px] font-medium text-slate-700 dark:text-slate-300">正常租户</span>
                  <span className="ml-auto text-[13px] font-bold text-slate-800 dark:text-slate-200">{stats?.tenantNormal.count ?? 0}</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {normalTenants.map((t, i) => (
                    <span key={i} className="text-[11px] bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded border border-slate-100 dark:border-slate-800 truncate max-w-[150px]">{t}</span>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center mb-1.5">
                  <span className="text-amber-500 mr-1.5 text-[14px]">🟡</span>
                  <span className="text-[12px] font-medium text-slate-700 dark:text-slate-300">即将过期租户</span>
                  <span className="ml-auto text-[13px] font-bold text-slate-800 dark:text-slate-200">{stats?.tenantExpiring.count ?? 0}</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {expiringTenants.map((t, i) => (
                    <span key={i} className="text-[11px] bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded border border-slate-100 dark:border-slate-800 truncate max-w-[150px]">{t}</span>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center mb-1.5">
                  <span className="text-red-500 mr-1.5 text-[14px]">🔴</span>
                  <span className="text-[12px] font-medium text-slate-700 dark:text-slate-300">已过期租户</span>
                  <span className="ml-auto text-[13px] font-bold text-slate-800 dark:text-slate-200">{stats?.tenantExpired.count ?? 0}</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {expiredTenants.map((t, i) => (
                    <span key={i} className="text-[11px] bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded border border-slate-100 dark:border-slate-800 truncate max-w-[150px]">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Employee Statistics — flex-1 占满剩余 */}
      <div className="px-4 pb-4 flex-1 min-h-[180px]">
        <div className="bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-lg p-4 h-full flex flex-col">
          <h3 className="text-[13px] font-bold text-slate-800 dark:text-slate-200 mb-3 shrink-0">员工统计</h3>
          {!hasEmployeeStats ? <div className="flex flex-1 items-center justify-center text-[12px] text-slate-400 dark:text-slate-500">暂无员工统计数据</div> : null}
          {hasEmployeeStats ? (
            <div className="grid min-w-0 flex-1 grid-cols-1 gap-4 min-h-0 xl:grid-cols-3">
              {/* Donut: 职称统计 */}
              <div className="flex min-w-0 flex-col items-center justify-center overflow-hidden">
                <h4 className="text-[12px] font-medium text-slate-700 dark:text-slate-300 mb-2">员工角色统计</h4>
                <div className="relative w-24 h-24">
                  <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                    <circle cx="60" cy="60" r="48" stroke="#E2E8F0" strokeWidth="14" fill="none" />
                    {roleStats.map((item, index) => (
                      <circle key={item.label} cx="60" cy="60" r="48" stroke={roleColors[index % roleColors.length]} strokeWidth="14" fill="none" strokeDasharray={employeeSegments[index]?.dasharray ?? '0 301'} strokeDashoffset={employeeSegments[index]?.dashoffset ?? 0} strokeLinecap="round" />
                    ))}
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[16px] font-bold text-slate-800 dark:text-slate-200">{stats?.employeeTotal ?? 0}</span>
                    <span className="text-[9px] text-slate-400 dark:text-slate-500">员工总数</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap text-[10px] text-slate-500 dark:text-slate-400 mt-2 justify-center">
                  {roleStats.map((item, index) => (
                    <span key={item.label} className="flex items-center"><span className="w-1.5 h-1.5 rounded-full mr-1" style={{ backgroundColor: roleColors[index % roleColors.length] }}></span>{item.label}</span>
                  ))}
                </div>
              </div>

            {/* Bar: 各部门员工统计 */}
              <div className="flex min-w-0 flex-col min-h-0 overflow-hidden">
                <h4 className="text-[12px] font-medium text-slate-700 dark:text-slate-300 mb-2 shrink-0">各部门员工统计</h4>
                <div className="h-[140px] flex items-end justify-between gap-1 overflow-hidden border-b border-slate-100 pb-1 dark:border-slate-800">
                  {(stats?.departmentStats ?? []).map((dept) => {
                    return (
                      <div key={dept.name} className="flex min-w-0 flex-1 flex-col items-center">
                        <div className="w-3 rounded-t-sm bg-gradient-to-t from-emerald-400 to-emerald-500" style={{ height: `${Math.max((dept.count / departmentMax) * employeeBarChartHeight, 2)}px` }}></div>
                        <span className="mt-0.5 max-w-full truncate px-0.5 text-[7px] text-slate-400 dark:text-slate-500">{dept.name}</span>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Ranking Table */}
            <div className="flex min-w-0 flex-col overflow-y-auto custom-scrollbar">
              <h4 className="text-[12px] font-medium text-slate-700 dark:text-slate-300 mb-2 shrink-0">部门高职员工统计</h4>
              <div className="flex items-center text-[10px] text-slate-400 dark:text-slate-500 mb-1.5 px-1 shrink-0">
                <span className="w-7">排名</span><span className="flex-1">部门名称</span>
                <span className="w-14 text-right">人数</span><span className="w-14 text-right">周涨幅</span>
              </div>
              <div className="space-y-2 overflow-visible">
                {deptStats.map((item) => (
                  <div key={item.rank} className="flex min-w-0 items-center px-1 text-[11px]">
                    <span className={cn("w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold mr-2 shrink-0",
                      item.rank <= 3 ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-500 dark:text-slate-400"
                    )}>{item.rank}</span>
                    <span className="flex-1 truncate text-slate-700 dark:text-slate-300">{item.name}</span>
                    <span className="font-mono text-slate-600 dark:text-slate-400 w-14 text-right">{item.count.toLocaleString()}</span>
                    <span className="text-red-400 w-14 text-right">{item.rate}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          ) : null}
        </div>
        {query.isLoading ? <div className="px-4 pb-4 text-[13px] text-slate-500 dark:text-slate-400">加载中...</div> : null}
        {query.isError ? <div className="px-4 pb-4 text-[13px] text-red-500">系统统计加载失败</div> : null}
      </div>
    </div>
  );
}
