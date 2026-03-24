import * as React from 'react';

import { cn } from "@/lib/utils"

export function SystemStatsPage() {
  const [dateRange, setDateRange] = React.useState('week');

  const alertCards = [
    { label: '本日告警总数', value: 567, change: '22.45%', period: '较昨日' },
    { label: '本周告警数量', value: 567, change: '22.45%', period: '较上周' },
    { label: '本月告警数量', value: 567, change: '22.45%', period: '较上月' },
  ];

  const normalTenants = ['北京博然思维咨询有限...', '中企国邦企业管理(北...', '山东智邦置业发展有限...', '北京博然思维咨询有限...', '中企国邦企业管理(北...', '山东智邦置业发展有限...'];
  const expiringTenants = ['怡东(北京)商务咨询有...', '正本中联(北京)商务咨...', '高诚美恒公司', '怡东(北京)商务咨询有...', '正本中联(北京)商务咨...', '高诚美恒公司'];
  const expiredTenants = ['怡东(北京)商务咨询有...', '正本中联(北京)商务咨...', '高诚美恒公司', '怡东(北京)商务咨询有...', '正本中联(北京)商务咨...', '高诚美恒公司'];

  const deptStats = [
    { rank: 1, name: '党委部', count: 35277, rate: '3' },
    { rank: 2, name: '企事部', count: 14820, rate: '3' },
    { rank: 3, name: '行政部', count: 24971, rate: '3' },
    { rank: 4, name: '综卫部', count: 23966, rate: '3' },
    { rank: 5, name: '财务部', count: 18870, rate: '3' },
  ];

  return (
    <div className="w-full h-full max-w-[1600px] mx-auto flex flex-col min-h-[700px] bg-white dark:bg-slate-950 shadow-sm border border-slate-100 dark:border-slate-800 rounded-lg overflow-auto custom-scrollbar">

      {/* Row 1: Alert Cards + Alert Chart */}
      <div className="flex px-4 pt-4 pb-3 gap-4" style={{ flex: '0 0 32%' }}>
        {/* Left: Alert Summary Cards */}
        <div className="flex flex-col gap-2 w-[230px] shrink-0">
          {alertCards.map((card) => (
            <div key={card.label} className="bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-lg px-3 py-2.5 flex items-center justify-between flex-1">
              <div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">{card.label} <span className="text-[18px] font-bold text-slate-800 dark:text-slate-200 ml-1">{card.value}</span></div>
                <div className="flex items-center mt-0.5">
                  <span className="text-[11px] text-emerald-500 font-medium">{card.change}</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 ml-1">↑ {card.period}</span>
                </div>
              </div>
              <div className="flex items-end space-x-[2px]">
                {[30, 45, 35, 50, 40, 55, 38].map((h, i) => (
                  <div key={i} className="w-1 rounded-t-sm bg-emerald-200" style={{ height: `${h * 0.45}px` }}></div>
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
              <span className="ml-1 text-[11px] text-slate-400 dark:text-slate-500">2020年11月16日 -2020年12月16日 📅</span>
            </div>
          </div>
          <div className="flex-1 relative min-h-0">
            <svg viewBox="0 0 600 160" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.02" />
                </linearGradient>
              </defs>
              <path d="M0,120 C60,110 100,100 150,80 C200,60 250,25 300,15 C350,30 400,55 450,65 C500,75 550,80 600,85 L600,160 L0,160 Z" fill="url(#areaGrad)" />
              <path d="M0,120 C60,110 100,100 150,80 C200,60 250,25 300,15 C350,30 400,55 450,65 C500,75 550,80 600,85" fill="none" stroke="#10B981" strokeWidth="2" />
              <circle cx="300" cy="15" r="4" fill="#10B981" stroke="white" strokeWidth="2" />
            </svg>
            <div className="absolute text-[10px] text-slate-400 dark:text-slate-500 bottom-0 left-0 w-full flex justify-between px-1">
              <span>12-05</span><span>13-05</span><span>14-05</span><span>15-05</span><span>16-05</span><span>17-05</span>
            </div>
            <div className="absolute top-1 left-[48%] bg-slate-800 text-white text-[10px] px-2 py-0.5 rounded shadow-lg">2478</div>
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
                    <circle cx="60" cy="60" r="48" stroke="#10B981" strokeWidth="14" fill="none" strokeDasharray="190 301" strokeLinecap="round" />
                    <circle cx="60" cy="60" r="48" stroke="#F59E0B" strokeWidth="14" fill="none" strokeDasharray="60 301" strokeDashoffset="-190" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[9px] text-slate-400 dark:text-slate-500 leading-tight">租户总数</span>
                    <span className="text-[16px] font-bold text-slate-800 dark:text-slate-200 leading-tight">16</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                  <span>■ 关闭状态 7个</span>
                  <span>● 开启状态 9个</span>
                  <span className="text-[10px] text-emerald-500 mt-0.5">7% · 较昨日</span>
                </div>
              </div>
              {/* Donut 2: 到期分布 */}
              <div className="flex items-center gap-4">
                <div className="relative w-[75px] h-[75px]">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r="38" stroke="#E2E8F0" strokeWidth="12" fill="none" />
                    <circle cx="50" cy="50" r="38" stroke="#10B981" strokeWidth="12" fill="none" strokeDasharray="52 239" strokeLinecap="round" />
                    <circle cx="50" cy="50" r="38" stroke="#F59E0B" strokeWidth="12" fill="none" strokeDasharray="67 239" strokeDashoffset="-52" strokeLinecap="round" />
                    <circle cx="50" cy="50" r="38" stroke="#EF4444" strokeWidth="12" fill="none" strokeDasharray="120 239" strokeDashoffset="-119" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[10px] text-slate-500 dark:text-slate-400">
                  <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-emerald-500 mr-1"></span>正常 22%</span>
                  <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-amber-500 mr-1"></span>即将过期 28%</span>
                  <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-red-500 mr-1"></span>已过期 50%</span>
                </div>
              </div>
            </div>

            {/* Right: 3 Tenant Lists - 横排铺满 */}
            <div className="flex-1 space-y-2.5 min-w-0">
              <div>
                <div className="flex items-center mb-1.5">
                  <span className="text-emerald-500 mr-1.5 text-[14px]">🟢</span>
                  <span className="text-[12px] font-medium text-slate-700 dark:text-slate-300">正常租户</span>
                  <span className="ml-auto text-[13px] font-bold text-slate-800 dark:text-slate-200">6</span>
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
                  <span className="ml-auto text-[13px] font-bold text-slate-800 dark:text-slate-200">5</span>
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
                  <span className="ml-auto text-[13px] font-bold text-slate-800 dark:text-slate-200">5</span>
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
          <div className="grid grid-cols-3 gap-4 flex-1 min-h-0">
            {/* Donut: 职称统计 */}
            <div className="flex flex-col items-center justify-center">
              <h4 className="text-[12px] font-medium text-slate-700 dark:text-slate-300 mb-2">员工职称统计</h4>
              <div className="relative w-24 h-24">
                <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                  <circle cx="60" cy="60" r="48" stroke="#E2E8F0" strokeWidth="14" fill="none" />
                  <circle cx="60" cy="60" r="48" stroke="#3B82F6" strokeWidth="14" fill="none" strokeDasharray="95 301" strokeLinecap="round" />
                  <circle cx="60" cy="60" r="48" stroke="#F59E0B" strokeWidth="14" fill="none" strokeDasharray="75 301" strokeDashoffset="-95" strokeLinecap="round" />
                  <circle cx="60" cy="60" r="48" stroke="#10B981" strokeWidth="14" fill="none" strokeDasharray="60 301" strokeDashoffset="-170" strokeLinecap="round" />
                  <circle cx="60" cy="60" r="48" stroke="#EF4444" strokeWidth="14" fill="none" strokeDasharray="71 301" strokeDashoffset="-230" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[16px] font-bold text-slate-800 dark:text-slate-200">237</span>
                  <span className="text-[9px] text-slate-400 dark:text-slate-500">员工总数</span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap text-[10px] text-slate-500 dark:text-slate-400 mt-2 justify-center">
                <span className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1"></span>高级职称</span>
                <span className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1"></span>中级职称</span>
                <span className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1"></span>初级职称</span>
                <span className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1"></span>其他</span>
              </div>
            </div>

            {/* Bar: 各部门员工统计 */}
            <div className="flex flex-col min-h-0">
              <h4 className="text-[12px] font-medium text-slate-700 dark:text-slate-300 mb-2 shrink-0">各部门员工统计</h4>
              <div className="h-[140px] flex items-end justify-between border-b border-slate-100 dark:border-slate-800 pb-1">
                {['保卫部', '行政部', '营销部', '人力资源部', '综合部', '后勤部', '党群部', '采购部', '后勤事', '后整部'].map((dept, i) => {
                  const heights = [200, 380, 450, 800, 600, 500, 700, 350, 280, 400];
                  return (
                    <div key={dept} className="flex flex-col items-center flex-1">
                      <div className="w-3 rounded-t-sm bg-gradient-to-t from-emerald-400 to-emerald-500" style={{ height: `${(heights[i] / 1000) * 120}px` }}></div>
                      <span className="text-[7px] text-slate-400 dark:text-slate-500 mt-0.5 truncate max-w-[30px]">{dept}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Ranking Table */}
            <div className="flex flex-col">
              <h4 className="text-[12px] font-medium text-slate-700 dark:text-slate-300 mb-2 shrink-0">部门高职员工统计</h4>
              <div className="flex items-center text-[10px] text-slate-400 dark:text-slate-500 mb-1.5 px-1">
                <span className="w-7">排名</span><span className="flex-1">部门名称</span>
                <span className="w-14 text-right">人数</span><span className="w-14 text-right">周涨幅</span>
              </div>
              <div className="space-y-2">
                {deptStats.map((item) => (
                  <div key={item.rank} className="flex items-center px-1 text-[11px]">
                    <span className={cn("w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold mr-2 shrink-0",
                      item.rank <= 3 ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-500 dark:text-slate-400"
                    )}>{item.rank}</span>
                    <span className="text-slate-700 dark:text-slate-300 flex-1">{item.name}</span>
                    <span className="font-mono text-slate-600 dark:text-slate-400 w-14 text-right">{item.count.toLocaleString()}</span>
                    <span className="text-red-400 w-14 text-right">{item.rate} ↑</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
