import { useState } from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import * as Icons from '../components/icons'
import { Pagination } from '../components/pagination'
import { useDesktopMonitorQuery } from '../hooks/use-desktop-monitor-query'
import { showActionError, showActionSuccess } from '../lib/action-feedback'
import { collectDesktopMonitor, updateDesktopMonitorStatus } from '../services/monitor-api'

const allLevel = '__all__'

export function MonitorPage() {
  const location = useLocation()
  const presetMetric = (location.state as { metric?: string } | null)?.metric ?? ''
  const [metricInput, setMetricInput] = useState('')
  const [metric, setMetric] = useState('')
  const [level, setLevel] = useState(allLevel)
  const [page, setPage] = useState(1)
  const pageSize = 10

  const query = useDesktopMonitorQuery({
    metric,
    level: level === allLevel ? '' : level,
    page,
    pageSize,
  })

  const tableData = query.data?.items ?? []
  const [activeMonitorId, setActiveMonitorId] = useState<number | null>(null)
  const [actionError, setActionError] = useState<string | null>(null)
  const [isCollecting, setIsCollecting] = useState(false)
  const pagedData = tableData

  useEffect(() => {
    if (!presetMetric) {
      return
    }
    setMetricInput(presetMetric)
    setMetric(presetMetric)
    setPage(1)
  }, [presetMetric])

  const statusLabelMap: Record<string, string> = {
    pending: '待处理',
    processing: '处理中',
    ignored: '已忽略',
    resolved: '已处理',
  }

  const handleMonitorAction = async (id: number, status: 'ignored' | 'processing') => {
    setActiveMonitorId(id)
    setActionError(null)
    try {
      await updateDesktopMonitorStatus(id, status)
      await query.refetch()
    } catch {
      setActionError('监控状态更新失败，请稍后重试')
    } finally {
      setActiveMonitorId(null)
    }
  }

  const handleCollectMonitor = async () => {
    setIsCollecting(true)
    try {
      await collectDesktopMonitor()
      await query.refetch()
      showActionSuccess('监控采集成功')
    } catch {
      showActionError('监控采集失败，请稍后重试')
    } finally {
      setIsCollecting(false)
    }
  }

  return (
    <div className="w-full h-full max-w-[1600px] mx-auto flex flex-col min-h-0 bg-white dark:bg-slate-950 shadow-sm border border-slate-100 dark:border-slate-800 rounded-lg rounded-tl-none">
      <div className="flex flex-col p-5 pb-5 shrink-0 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <span className="text-[13px] text-slate-700 dark:text-slate-300 mr-2 shrink-0 font-medium whitespace-nowrap">监控指标:</span>
              <input
                type="text"
                value={metricInput}
                onChange={(event) => setMetricInput(event.target.value)}
                placeholder="请输入"
                className="w-48 rounded border border-slate-200 bg-white px-3 py-1.5 text-[13px] text-slate-700 transition-colors hover:border-emerald-400 focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:hover:border-emerald-600 dark:focus:border-emerald-500"
              />
            </div>
            <div className="flex items-center">
              <span className="text-[13px] text-slate-700 dark:text-slate-300 mr-2 shrink-0 font-medium whitespace-nowrap">告警级别:</span>
              <div className="relative flex w-48 items-center justify-between rounded border border-slate-200 bg-white px-3 py-1.5 text-[13px] text-slate-700 transition-colors hover:border-emerald-400 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-emerald-600">
                <select
                  value={level}
                  onChange={(event) => setLevel(event.target.value)}
                  className="absolute inset-0 cursor-pointer appearance-none bg-transparent px-3 py-1.5 text-[13px] text-transparent outline-none"
                >
                  <option value={allLevel}>全部级别</option>
                  <option value="一级告警">一级告警</option>
                  <option value="二级告警">二级告警</option>
                  <option value="三级告警">三级告警</option>
                </select>
                <span className="truncate pr-4">{level === allLevel ? '全部级别' : level}</span>
                <Icons.ChevronDown className="w-4 h-4 text-slate-300 dark:text-slate-400" />
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-[13px] text-slate-700 dark:text-slate-300 mr-2 shrink-0 font-medium whitespace-nowrap">最近采集:</span>
              <div className="flex items-center gap-2">
                <div className="relative flex w-48 items-center justify-between rounded border border-slate-200 bg-white px-3 py-1.5 text-[13px] text-slate-500 transition-colors dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
                  {query.data?.summary.lastCollectedAt || '暂无数据'}
                  <Icons.Clock className="w-[15px] h-[15px] text-slate-400 dark:text-slate-500" />
                </div>
                <button
                  type="button"
                  className="px-4 py-1.5 bg-[#10B981] rounded text-[13px] text-white hover:bg-emerald-600 transition-colors font-medium disabled:cursor-not-allowed disabled:opacity-60"
                  onClick={handleCollectMonitor}
                  disabled={isCollecting}
                >
                  {isCollecting ? '采集中...' : '立即采集'}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3 shrink-0 ml-4">
            <button
              className="rounded border border-slate-200 px-5 py-1.5 text-[13px] text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              onClick={() => {
                setMetricInput('')
                setMetric('')
                setLevel(allLevel)
                setPage(1)
              }}
            >
              重置
            </button>
            <button
              className="px-5 py-1.5 bg-[#10B981] rounded text-[13px] text-white hover:bg-emerald-600 transition-colors font-medium"
              onClick={() => setMetric(metricInput.trim())}
            >
              查询
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto custom-scrollbar relative">
        <table className="w-full text-left text-[13px] text-slate-600 dark:text-slate-400 min-w-[1000px]">
          <thead className="sticky top-0 z-10 border-b border-slate-100 bg-[#F8FAFC] text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
            <tr>
              <th className="py-3 px-6 font-bold w-16">序号</th>
              <th className="py-3 px-4 font-bold">监控指标</th>
              <th className="py-3 px-4 font-bold">指标值</th>
              <th className="py-3 px-4 font-bold">是否告警</th>
              <th className="py-3 px-4 font-bold">告警级别</th>
              <th className="py-3 px-4 font-bold">告警时间</th>
              <th className="py-3 px-4 font-bold">处理状态</th>
              <th className="py-3 px-4 font-bold">告警说明</th>
              <th className="py-3 px-4 font-bold text-center">操作</th>
            </tr>
          </thead>
          <tbody>
            {pagedData.map((row, index) => (
              <tr key={row.id} className="border-b border-slate-100 transition-colors hover:bg-slate-50 last:border-[#E2E8F0] dark:border-slate-700 dark:hover:bg-slate-900">
                <td className="py-3.5 px-6 font-mono text-slate-500 dark:text-slate-400">{(page - 1) * pageSize + index + 1}</td>
                <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">{row.metric}</td>
                <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">{row.value}</td>
                <td className="py-3.5 px-4">
                  <span className={`inline-flex px-1.5 py-0.5 rounded text-[12px] font-medium border ${
                    row.alarm
                      ? 'bg-emerald-50 text-[#10B981] border-emerald-100'
                      : 'bg-red-50 text-red-500 border-red-100'
                  }`}>
                    {row.alarm ? '是' : '否'}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">{row.level}</td>
                <td className="py-3.5 px-4 font-mono text-slate-500 dark:text-slate-400">{row.occurredAt}</td>
                <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">{statusLabelMap[row.status] ?? row.status}</td>
                <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400 truncate max-w-[200px]" title={row.description}>{row.description}</td>
                <td className="py-3.5 px-4 text-center space-x-2">
                  <button
                    className="px-2.5 py-[3px] bg-emerald-50/60 border border-emerald-100/60 text-[#10B981] text-[12px] font-medium rounded hover:bg-emerald-100 hover:border-emerald-200 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={activeMonitorId === row.id || row.status === 'ignored'}
                    onClick={() => handleMonitorAction(row.id, 'ignored')}
                  >
                    {activeMonitorId === row.id ? '处理中...' : row.status === 'ignored' ? '已忽略' : '忽略'}
                  </button>
                  <button
                    className="px-2.5 py-[3px] bg-emerald-50/60 border border-emerald-100/60 text-[#10B981] text-[12px] font-medium rounded hover:bg-emerald-100 hover:border-emerald-200 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={activeMonitorId === row.id || row.status === 'processing' || row.status === 'resolved'}
                    onClick={() => handleMonitorAction(row.id, 'processing')}
                  >
                    {activeMonitorId === row.id ? '处理中...' : row.status === 'resolved' ? '已处理' : row.status === 'processing' ? '处理中' : '处理'}
                  </button>
                </td>
              </tr>
            ))}
            {!query.isLoading && tableData.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-10 px-4 text-center text-slate-500 dark:text-slate-400">暂无监控数据</td>
              </tr>
            ) : null}
          </tbody>
        </table>
        {actionError ? <div className="px-6 pt-4 text-[13px] text-red-500">{actionError}</div> : null}
        {query.isLoading ? <div className="px-6 py-6 text-[13px] text-slate-500 dark:text-slate-400">加载中...</div> : null}
      </div>

      <Pagination total={query.data?.total ?? 0} page={page} pageSize={pageSize} onPageChange={setPage} />
    </div>
  )
}
