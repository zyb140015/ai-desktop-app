import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { cn } from "@/lib/utils"

import * as Icons from '../components/icons';
import { useDesktopSystemStatsQuery } from '../hooks/use-desktop-system-stats-query'

const trendChartHeight = 120
const employeeBarChartHeight = 100
const tenantCircleRadius = 48
const employeeCircleRadius = 38

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
  const navigate = useNavigate();
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
    <div className="w-full h-full max-w-[1600px] mx-auto flex flex-col bg-white dark:bg-slate-950 shadow-sm border border-slate-100 dark:border-slate-800 rounded-lg overflow-hidden">

      {/* Row 1: Alert Cards + Alert Chart */}
      <div className="flex px-4 pt-4 pb-2 gap-4" style={{ flex: '0 0 29.5%' }}>
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
            <h3 className="text-[14px] font-bold text-slate-800 dark:text-slate-200 flex items-center">
              <span className="w-1 h-4 bg-emerald-500 rounded-full mr-2"></span>
              告警运行趋势
            </h3>
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
          <div className="flex-1 relative min-h-0 pt-4">
            {trend.length > 0 ? (
              <>
                <svg viewBox="0 0 600 160" className="w-full h-full overflow-visible relative z-10" preserveAspectRatio="none">
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
                    return (
                      <g key={item.label} className="group/point">
                        <circle cx={x} cy={y} r="3" fill="#10B981" stroke="white" strokeWidth="2" className="transition-all duration-300 group-hover/point:r-5 group-hover/point:fill-emerald-400 cursor-pointer" />
                        <g className="opacity-0 group-hover/point:opacity-100 transition-opacity duration-300 pointer-events-none">
                          <rect x={x - 14} y={y - 22} width="28" height="14" rx="4" fill="rgba(15, 23, 42, 0.9)" className="drop-shadow-md" />
                          <text x={x} y={y - 12} textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">{item.value}</text>
                        </g>
                      </g>
                    )
                  })}
                </svg>
                <div className="absolute text-[10px] text-slate-400 dark:text-slate-500 bottom-0 left-0 w-full flex justify-between px-1">
                  {trend.map((item) => <span key={item.label}>{item.label}</span>)}
                </div>
              </>
            ) : <div className="flex h-full items-center justify-center text-[12px] text-slate-400 dark:text-slate-500">暂无告警趋势数据</div>}
          </div>
        </div>
      </div>

      {/* Row 2: Tenant Statistics — 按图1横排：左侧两个环形图并排，右侧三组租户列表 */}
      <div className="px-4 pb-2" style={{ flex: '0 0 auto' }}>
        <div className="bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl px-5 py-2.5 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[14px] font-bold text-slate-800 dark:text-slate-200 flex items-center">
              <span className="w-1 h-4 bg-emerald-500 rounded-full mr-2"></span>
              租户运行统计
            </h3>
            <div className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">全平台租户生命周期实时监控</div>
          </div>
          <div className="flex gap-6 items-start">
            {/* Left Box: Two donuts with vertical separator */}
            <div className="shrink-0 flex items-center gap-8 bg-slate-50/50 dark:bg-slate-900/40 p-3.5 rounded-2xl border border-slate-100/50 dark:border-slate-800/50 shadow-inner">
              <div className="flex flex-col items-center gap-3">
                {/* Donut 1: 租户总数 (Status) */}
                <div className="relative w-[82px] h-[82px]">
                  <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90 filter drop-shadow-sm">
                    <circle cx="60" cy="60" r="48" stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="12" fill="none" />
                    <circle cx="60" cy="60" r="48" stroke="#10B981" strokeWidth="12" fill="none" strokeDasharray={tenantStatusSegments[0]?.dasharray ?? '0 301'} strokeDashoffset={tenantStatusSegments[0]?.dashoffset ?? 0} strokeLinecap="round" />
                    <circle cx="60" cy="60" r="48" stroke="#94A3B8" strokeWidth="12" fill="none" strokeDasharray={tenantStatusSegments[1]?.dasharray ?? '0 301'} strokeDashoffset={tenantStatusSegments[1]?.dashoffset ?? 0} strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[18px] font-bold text-slate-800 dark:text-slate-200 leading-none">{stats?.tenantTotal ?? 0}</span>
                    <span className="text-[8px] text-slate-400 dark:text-slate-500 mt-1 uppercase font-bold tracking-tighter">租户总计</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1 items-center px-1">
                   <div className="flex items-center text-[10px] text-emerald-600 font-bold">
                     <span className="w-2 h-0.5 rounded-full bg-emerald-500 mr-2"></span>开启 {stats?.tenantOpenCount ?? 0}
                   </div>
                   <div className="flex items-center text-[10px] text-slate-400 font-medium tracking-tight">
                     <span className="w-2 h-0.5 rounded-full bg-slate-400 mr-2"></span>关闭 {stats?.tenantClosedCount ?? 0}
                   </div>
                </div>
              </div>

              <div className="w-px h-16 bg-slate-200/60 dark:bg-slate-800 self-center shadow-sm"></div>

              {/* Donut 2: 到期分布 (Lifecycle) */}
              <div className="flex flex-col items-center gap-3">
                <div className="relative w-[82px] h-[82px]">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r="38" stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="10" fill="none" />
                    <circle cx="50" cy="50" r="38" stroke="#10B981" strokeWidth="10" fill="none" strokeDasharray={tenantExpirySegments[0]?.dasharray ?? '0 239'} strokeDashoffset={tenantExpirySegments[0]?.dashoffset ?? 0} strokeLinecap="round" />
                    <circle cx="50" cy="50" r="38" stroke="#F59E0B" strokeWidth="10" fill="none" strokeDasharray={tenantExpirySegments[1]?.dasharray ?? '0 239'} strokeDashoffset={tenantExpirySegments[1]?.dashoffset ?? 0} strokeLinecap="round" />
                    <circle cx="50" cy="50" r="38" stroke="#EF4444" strokeWidth="10" fill="none" strokeDasharray={tenantExpirySegments[2]?.dasharray ?? '0 239'} strokeDashoffset={tenantExpirySegments[2]?.dashoffset ?? 0} strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Icons.CheckCircle className="w-3.5 h-3.5 text-emerald-500/80 mb-0.5" />
                    <span className="text-[8px] text-slate-400 dark:text-slate-500 uppercase font-extrabold tracking-tighter">生命周期</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-1">
                   <div className="flex items-center text-[10px] text-emerald-600 font-bold">
                     <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 ring-2 ring-emerald-500/10"></span>运行 {stats?.tenantNormal.count ?? 0}
                   </div>
                   <div className="flex items-center text-[10px] text-amber-600 font-bold">
                     <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2 ring-2 ring-amber-500/10"></span>临期 {stats?.tenantExpiring.count ?? 0}
                   </div>
                   <div className="flex items-center text-[10px] text-rose-600 font-bold">
                     <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-2 ring-2 ring-rose-500/10"></span>过期 {stats?.tenantExpired.count ?? 0}
                   </div>
                </div>
              </div>
            </div>

            {/* Right: 3 Tenant Lists - 横排三列布局 */}
            <div className="flex-1 grid grid-cols-3 gap-4 min-w-0">
              {!hasTenantList ? <div className="col-span-3 flex min-h-[120px] items-center justify-center text-[12px] text-slate-400 dark:text-slate-500 bg-slate-50/50 dark:bg-slate-900 border border-dashed border-slate-200 rounded-lg">暂无租户统计数据</div> : null}
              {hasTenantList && (
                <>
                  {/* Categorized Card: Normal */}
                  <div className="flex flex-col bg-slate-50/30 dark:bg-slate-900/20 rounded-xl border border-slate-100/60 dark:border-slate-800/60 overflow-hidden">
                    <div className="flex items-center px-3 py-2 bg-emerald-50/50 dark:bg-emerald-500/5 border-b border-emerald-100/30 dark:border-emerald-500/10">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse mr-2"></div>
                      <span className="text-[12px] font-bold text-slate-700 dark:text-slate-200">运行正常</span>
                      <span className="ml-auto text-[10px] font-mono font-bold bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded shadow-sm text-emerald-600 mr-2">{stats?.tenantNormal.count ?? 0}</span>
                      <button className="text-slate-400 hover:text-emerald-500 transition-colors" onClick={() => navigate('/tenant')}>
                        <Icons.ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="p-2.5 flex flex-wrap gap-2 overflow-hidden h-full content-start">
                      {normalTenants.slice(0, 6).map((t, i) => (
                        <span key={i} className="text-[10px] font-medium bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-1 rounded-lg border border-slate-100 dark:border-slate-800 shadow-sm hover:border-emerald-200 hover:text-emerald-600 dark:hover:border-emerald-800 transition-all cursor-default truncate max-w-full">
                          {t}
                        </span>
                      ))}
                      {normalTenants.length === 0 && <span className="text-[10px] text-slate-400 italic">空</span>}
                    </div>
                  </div>

                  {/* Categorized Card: Expiring */}
                  <div className="flex flex-col bg-slate-50/30 dark:bg-slate-900/20 rounded-xl border border-slate-100/60 dark:border-slate-800/60 overflow-hidden">
                    <div className="flex items-center px-3 py-2 bg-amber-50/50 dark:bg-amber-500/5 border-b border-amber-100/30 dark:border-amber-500/10">
                      <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)] mr-2"></div>
                      <span className="text-[12px] font-bold text-slate-700 dark:text-slate-200">即将过期</span>
                      <span className="ml-auto text-[10px] font-mono font-bold bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded shadow-sm text-amber-600 mr-2">{stats?.tenantExpiring.count ?? 0}</span>
                      <button className="text-slate-400 hover:text-amber-500 transition-colors" onClick={() => navigate('/tenant')}>
                        <Icons.ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="p-2.5 flex flex-wrap gap-2 overflow-hidden h-full content-start">
                      {expiringTenants.slice(0, 6).map((t, i) => (
                        <span key={i} className="text-[10px] font-medium bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-1 rounded-lg border border-slate-100 dark:border-slate-800 shadow-sm hover:border-amber-200 hover:text-amber-600 dark:hover:border-amber-800 transition-all cursor-default truncate max-w-full">
                          {t}
                        </span>
                      ))}
                      {expiringTenants.length === 0 && <span className="text-[10px] text-slate-400 italic">无预警项目</span>}
                    </div>
                  </div>

                  {/* Categorized Card: Expired */}
                  <div className="flex flex-col bg-slate-50/30 dark:bg-slate-900/20 rounded-xl border border-slate-100/60 dark:border-slate-800/60 overflow-hidden">
                    <div className="flex items-center px-3 py-2 bg-rose-50/50 dark:bg-rose-500/5 border-b border-rose-100/30 dark:border-rose-500/10">
                      <div className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(239,68,68,0.5)] mr-2"></div>
                      <span className="text-[12px] font-bold text-slate-700 dark:text-slate-200">服务停止</span>
                      <span className="ml-auto text-[10px] font-mono font-bold bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded shadow-sm text-rose-600 mr-2">{stats?.tenantExpired.count ?? 0}</span>
                      <button className="text-slate-400 hover:text-rose-500 transition-colors" onClick={() => navigate('/tenant')}>
                        <Icons.ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="p-2.5 flex flex-wrap gap-2 overflow-hidden h-full content-start">
                      {expiredTenants.slice(0, 6).map((t, i) => (
                        <span key={i} className="text-[10px] font-medium bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-1 rounded-lg border border-slate-100 dark:border-slate-800 shadow-sm hover:border-rose-200 hover:text-rose-600 dark:hover:border-rose-800 transition-all cursor-default truncate max-w-full">
                          {t}
                        </span>
                      ))}
                      {expiredTenants.length === 0 && <span className="text-[10px] text-slate-400 italic">无</span>}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pb-4 flex-1 min-h-[160px] min-w-0">
        <div className="bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl p-3.5 h-full flex flex-col shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between mb-4 shrink-0">
            <h3 className="text-[14px] font-bold text-slate-800 dark:text-slate-200 flex items-center">
              <span className="w-1 h-4 bg-blue-500 rounded-full mr-2"></span>
              员工结构统计
            </h3>
            <div className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">企业人力资源分布与角色结构分析</div>
          </div>
          {!hasEmployeeStats ? <div className="flex flex-1 items-center justify-center text-[12px] text-slate-400 dark:text-slate-500">暂无员工统计数据</div> : null}
          {hasEmployeeStats ? (
            <div className="grid min-w-0 flex-1 grid-cols-1 gap-4 min-h-0 xl:grid-cols-3">
              {/* Donut: Role Statistics — 缩小尺寸 */}
              <div className="flex min-w-0 flex-col items-center justify-center overflow-hidden bg-slate-50/30 dark:bg-slate-900/40 rounded-xl border border-slate-100/50 dark:border-slate-800/50 p-3">
                <div className="relative w-24 h-24 mb-2">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 filter drop-shadow-sm">
                    <circle cx="50" cy="50" r="38" stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="10" fill="none" />
                    {roleStats.map((item, index) => (
                      <circle key={item.label} cx="50" cy="50" r="38" stroke={roleColors[index % roleColors.length]} strokeWidth="10" fill="none" strokeDasharray={employeeSegments[index]?.dasharray ?? '0 239'} strokeDashoffset={employeeSegments[index]?.dashoffset ?? 0} strokeLinecap="round" />
                    ))}
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[18px] font-bold text-slate-800 dark:text-slate-200 leading-none">{stats?.employeeTotal ?? 0}</span>
                    <span className="text-[7px] text-slate-400 dark:text-slate-500 mt-1 uppercase font-bold tracking-tighter">编制总数</span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2.5 gap-y-1 flex-wrap text-[9px] text-slate-500 dark:text-slate-400 justify-center">
                  {roleStats.map((item, index) => (
                    <span key={item.label} className="flex items-center font-medium"><span className="w-1.5 h-0.5 rounded-full mr-1" style={{ backgroundColor: roleColors[index % roleColors.length] }}></span>{item.label}</span>
                  ))}
                </div>
              </div>

            {/* Bar: 各部门员工统计 */}
              <div className="flex min-w-0 flex-col min-h-0 overflow-hidden">
                <h4 className="text-[12px] font-medium text-slate-700 dark:text-slate-300 mb-2 shrink-0">各部门员工统计</h4>
                <div className="flex items-end justify-between gap-1 overflow-hidden border-b border-slate-100 pb-1 dark:border-slate-800" style={{ height: `${employeeBarChartHeight}px` }}>
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

            {/* Ranking Table — 移除内滚动 */}
            <div className="flex min-w-0 flex-col overflow-hidden">
              <h4 className="text-[12px] font-medium text-slate-700 dark:text-slate-300 mb-2 shrink-0">部门高职员工统计</h4>
              <div className="flex items-center text-[10px] text-slate-400 dark:text-slate-500 mb-1.5 px-1 shrink-0">
                <span className="w-7">排名</span><span className="flex-1">部门名称</span>
                <span className="w-14 text-right">人数</span><span className="w-14 text-right">周涨幅</span>
              </div>
              <div className="space-y-0.5 overflow-hidden">
                {deptStats.slice(0, 4).map((item) => (
                  <div key={item.rank} className="flex min-w-0 items-center px-1 py-0.5 text-[10px] hover:bg-slate-50 dark:hover:bg-slate-900/40 rounded transition-colors group">
                    <span className={cn("w-3.5 h-3.5 rounded-full flex items-center justify-center text-[7px] font-bold mr-2 shrink-0 shadow-sm",
                      item.rank <= 3 ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                    )}>{item.rank}</span>
                    <span className="flex-1 truncate text-slate-700 dark:text-slate-300 font-medium">{item.name}</span>
                    <span className="font-mono text-slate-600 dark:text-slate-400 w-10 text-right">{item.count}</span>
                    <span className="text-emerald-500 font-bold w-10 text-right ml-1">{item.rate}</span>
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
