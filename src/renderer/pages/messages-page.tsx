import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import * as Icons from '../components/icons'
import { useDesktopMessagesQuery } from '../hooks/use-desktop-messages-query'
import { markDesktopMessageRead, markDesktopMessagesRead } from '../services/message-api'
import { Pagination } from '../components/pagination'

const allMessageType = '__all__'

export function MessagesPage() {
  const [searchParams] = useSearchParams()
  const initialKeyword = searchParams.get('q') ?? ''
  const [messageType, setMessageType] = useState(allMessageType)
  const [keywordInput, setKeywordInput] = useState(initialKeyword)
  const [keyword, setKeyword] = useState(initialKeyword)
  const [page, setPage] = useState(1)
  const pageSize = 10

  const query = useDesktopMessagesQuery({
    type: messageType === allMessageType ? '' : messageType,
    q: keyword,
    page,
    pageSize,
  })

  const tableData = query.data?.items ?? []
  const total = query.data?.total ?? 0
  const messageTypes = useMemo(() => Array.from(new Set(tableData.map((item) => item.type))), [tableData])
  const [activeMessageId, setActiveMessageId] = useState<number | null>(null)
  const [batchReading, setBatchReading] = useState(false)
  const pagedData = tableData

  const handleMarkRead = async (id: number) => {
    setActiveMessageId(id)
    try {
      await markDesktopMessageRead(id)
      await query.refetch()
    } finally {
      setActiveMessageId(null)
    }
  }

  const handleMarkAllRead = async () => {
    const unreadIds = tableData.filter((item) => !item.read).map((item) => item.id)
    if (unreadIds.length === 0) {
      return
    }

    setBatchReading(true)
    try {
      await markDesktopMessagesRead(unreadIds)
      await query.refetch()
    } finally {
      setBatchReading(false)
    }
  }

  return (
    <div className="w-full h-full max-w-[1600px] mx-auto flex flex-col min-h-0 bg-white dark:bg-slate-950 shadow-sm border border-slate-100 dark:border-slate-800 rounded-lg rounded-tl-none">
      <div className="flex flex-col p-5 pb-3 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <span className="text-[13px] text-slate-700 dark:text-slate-300 mr-2 shrink-0 font-medium">消息类型:</span>
              <div className="relative flex w-48 items-center justify-between rounded border border-slate-200 bg-white px-3 py-1.5 text-[13px] text-slate-700 transition-colors hover:border-emerald-400 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-emerald-600">
                <select
                  value={messageType}
                  onChange={(event) => setMessageType(event.target.value)}
                  className="absolute inset-0 cursor-pointer appearance-none bg-transparent px-3 py-1.5 text-[13px] text-transparent outline-none"
                >
                  <option value={allMessageType}>全部类型</option>
                  {messageTypes.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
                <span className="truncate pr-4">{messageType === allMessageType ? '全部类型' : messageType}</span>
                <Icons.ChevronDown className="w-4 h-4 text-slate-300 dark:text-slate-400" />
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-[13px] text-slate-700 dark:text-slate-300 mr-2 shrink-0 font-medium">消息标题:</span>
              <input
                type="text"
                value={keywordInput}
                onChange={(event) => setKeywordInput(event.target.value)}
                placeholder="请输入"
                className="w-48 rounded border border-slate-200 bg-white px-3 py-1.5 text-[13px] text-slate-700 transition-colors hover:border-emerald-400 focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:hover:border-emerald-600 dark:focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              className="rounded border border-slate-200 px-5 py-1.5 text-[13px] text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              onClick={() => {
                setMessageType(allMessageType)
                setKeywordInput('')
                setKeyword('')
                setPage(1)
              }}
            >
              重置
            </button>
            <button
              className="px-5 py-1.5 bg-[#10B981] rounded text-[13px] text-white hover:bg-emerald-600 transition-colors font-medium"
              onClick={() => setKeyword(keywordInput.trim())}
            >
              查询
            </button>
            <button
              className="px-5 py-1.5 bg-emerald-50 text-[#10B981] rounded text-[13px] hover:bg-emerald-100 transition-colors font-medium disabled:cursor-not-allowed disabled:opacity-60"
              disabled={batchReading || tableData.every((item) => item.read)}
              onClick={handleMarkAllRead}
            >
              {batchReading ? '处理中...' : '全部已读'}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mt-5">
          <div className="flex items-center text-[13px]">
            <span className="text-slate-700 dark:text-slate-300 mr-3">共有 <span className="font-bold">{total}</span> 项</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto custom-scrollbar relative px-5 pb-5">
        <table className="w-full text-left text-[13px] text-slate-600 dark:text-slate-400 min-w-[900px]">
          <thead className="sticky top-0 z-10 bg-[#F8FAFC] text-slate-700 dark:bg-slate-900 dark:text-slate-300">
            <tr>
              <th className="py-3 px-4 font-bold border-b border-slate-100 dark:border-slate-800">序号</th>
              <th className="py-3 px-4 font-bold border-b border-slate-100 dark:border-slate-800">消息类型</th>
              <th className="py-3 px-4 font-bold border-b border-slate-100 dark:border-slate-800">消息标题</th>
              <th className="py-3 px-4 font-bold border-b border-slate-100 dark:border-slate-800">消息描述</th>
              <th className="py-3 px-4 font-bold border-b border-slate-100 dark:border-slate-800">发布时间</th>
              <th className="py-3 px-4 font-bold border-b border-slate-100 dark:border-slate-800">发布人</th>
              <th className="py-3 px-4 font-bold border-b border-slate-100 dark:border-slate-800 rounded-tr text-center">状态</th>
            </tr>
          </thead>
          <tbody>
            {pagedData.map((row, index) => (
              <tr key={row.id} className="border-b border-slate-100 transition-colors hover:bg-slate-50 last:border-[#E2E8F0] dark:border-slate-700 dark:hover:bg-slate-900">
                <td className="py-3 px-4 font-mono text-slate-500 dark:text-slate-400">{(page - 1) * pageSize + index + 1}</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{row.type}</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{row.title}</td>
                <td className="py-3 px-4 text-slate-500 dark:text-slate-400 max-w-[320px] whitespace-normal">{row.description}</td>
                <td className="py-3 px-4 font-mono text-slate-500 dark:text-slate-400">{row.publishedAt}</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{row.author}</td>
                <td className="py-3 px-4 text-center">
                  <button
                    className="px-3 py-1 bg-emerald-50 text-[#10B981] text-[12px] font-medium rounded hover:bg-emerald-100 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={row.read || activeMessageId === row.id}
                    onClick={() => handleMarkRead(row.id)}
                  >
                    {row.read ? '已读' : activeMessageId === row.id ? '处理中...' : '标记已读'}
                  </button>
                </td>
              </tr>
            ))}
            {!query.isLoading && tableData.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-10 px-4 text-center text-slate-500 dark:text-slate-400">暂无消息数据</td>
              </tr>
            ) : null}
          </tbody>
        </table>
        {query.isLoading ? <div className="py-6 text-[13px] text-slate-500 dark:text-slate-400">加载中...</div> : null}
      </div>

      <div className="flex items-center justify-end px-5 py-4 border-t border-slate-100 dark:border-slate-800/70 shrink-0 text-[13px] text-slate-500 dark:text-slate-400">
        <Pagination total={total} page={page} pageSize={pageSize} onPageChange={setPage} />
      </div>
    </div>
  )
}
