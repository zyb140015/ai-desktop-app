import * as React from 'react';
import * as Icons from '../components/icons';

export function MessagesPage() {
  const tableData = [
    { id: 1, type: '通知消息', title: '这是一个消息标题', desc: '这是一条消息描述', time: '2023-05-26 12:12:00', author: '张三' },
    { id: 2, type: '通知消息', title: '这是一个消息标题', desc: '这是一条消息描述', time: '2023-05-26 12:12:00', author: '张三' },
    { id: 3, type: '通知消息', title: '这是一个消息标题', desc: '这是一条消息描述', time: '2023-05-26 12:12:00', author: '张三' },
    { id: 4, type: '通知消息', title: '这是一个消息标题', desc: '这是一条消息描述', time: '2023-05-26 12:12:00', author: '张三' },
    { id: 5, type: '培训消息', title: '这是一个消息标题', desc: '这是一条消息描述', time: '2023-05-26 12:12:00', author: '张三' },
    { id: 6, type: '培训消息', title: '这是一个消息标题', desc: '这是一条消息描述', time: '2023-05-26 12:12:00', author: '张三' },
    { id: 7, type: '培训消息', title: '这是一个消息标题', desc: '这是一条消息描述', time: '2023-05-26 12:12:00', author: '张三' },
    { id: 8, type: '培训消息', title: '这是一个消息标题', desc: '这是一条消息描述', time: '2023-05-26 12:12:00', author: '张三' },
    { id: 9, type: '培训消息', title: '这是一个消息标题', desc: '这是一条消息描述', time: '2023-05-26 12:12:00', author: '张三' },
    { id: 10, type: '培训消息', title: '这是一个消息标题', desc: '这是一条消息描述', time: '2023-05-26 12:12:00', author: '张三' },
  ];

  return (
    <div className="w-full h-full max-w-[1600px] mx-auto flex flex-col min-h-0 bg-white dark:bg-slate-950 shadow-sm border border-slate-100 dark:border-slate-800 rounded-lg rounded-tl-none">
      
      {/* Search Header */}
      <div className="flex flex-col p-5 pb-3 shrink-0">
         <div className="flex items-center justify-between">
           <div className="flex items-center space-x-6">
              <div className="flex items-center">
                 <span className="text-[13px] text-slate-700 dark:text-slate-300 mr-2 shrink-0 font-medium">消息类型:</span>
                 <div className="relative border border-slate-200 dark:border-slate-800 rounded px-3 py-1.5 w-48 hover:border-emerald-400 dark:hover:border-emerald-600 cursor-pointer flex items-center justify-between text-[13px] text-slate-400 dark:text-slate-500">
                    请选择
                    <Icons.ChevronDown className="w-4 h-4 text-slate-300 dark:text-slate-600 dark:text-slate-400" />
                 </div>
              </div>
              <div className="flex items-center">
                 <span className="text-[13px] text-slate-700 dark:text-slate-300 mr-2 shrink-0 font-medium">消息标题:</span>
                 <input type="text" placeholder="请输入" className="border border-slate-200 dark:border-slate-800 rounded px-3 py-1.5 w-48 hover:border-emerald-400 dark:hover:border-emerald-600 focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500 dark:focus:border-emerald-500/80/80 text-[13px] placeholder-slate-300 dark:placeholder-slate-600" />
              </div>
              <div className="flex items-center">
                 <span className="text-[13px] text-slate-700 dark:text-slate-300 mr-2 shrink-0 font-medium">消息描述:</span>
                 <input type="text" placeholder="请输入" className="border border-slate-200 dark:border-slate-800 rounded px-3 py-1.5 w-48 hover:border-emerald-400 dark:hover:border-emerald-600 focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500 dark:focus:border-emerald-500/80/80 text-[13px] placeholder-slate-300 dark:placeholder-slate-600" />
              </div>
           </div>
           
           <div className="flex items-center space-x-3">
              <button className="px-5 py-1.5 border border-slate-200 dark:border-slate-800 rounded text-[13px] text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:bg-slate-900 transition-colors">重置</button>
              <button className="px-5 py-1.5 bg-[#10B981] rounded text-[13px] text-white hover:bg-emerald-600 transition-colors font-medium">查询</button>
           </div>
         </div>
         
         {/* Batch Actions row */}
         <div className="flex items-center justify-between mt-5">
            <div className="flex items-center text-[13px]">
               <span className="text-slate-700 dark:text-slate-300 mr-3">已选 <span className="font-bold">0</span> 项</span>
               <span className="text-[#10B981] cursor-pointer hover:underline cursor-not-allowed opacity-50">取消</span>
            </div>
            <button className="px-5 py-1.5 bg-[#10B981] rounded text-[13px] text-white hover:bg-emerald-600 transition-colors font-medium">已读</button>
         </div>
      </div>

      {/* Table Data */}
      <div className="flex-1 overflow-auto custom-scrollbar relative px-5 pb-5">
        <table className="w-full text-left text-[13px] text-slate-600 dark:text-slate-400 min-w-[900px]">
          <thead className="bg-[#F8FAFC] text-slate-700 dark:text-slate-300 sticky top-0 z-10">
            <tr>
              <th className="py-3 px-4 font-bold border-b border-slate-100 dark:border-slate-800 rounded-tl w-12 text-center">
                <input type="checkbox" className="ai-checkbox" />
              </th>
              <th className="py-3 px-4 font-bold border-b border-slate-100 dark:border-slate-800">序号</th>
              <th className="py-3 px-4 font-bold border-b border-slate-100 dark:border-slate-800">消息类型</th>
              <th className="py-3 px-4 font-bold border-b border-slate-100 dark:border-slate-800">消息标题</th>
              <th className="py-3 px-4 font-bold border-b border-slate-100 dark:border-slate-800">消息描述</th>
              <th className="py-3 px-4 font-bold border-b border-slate-100 dark:border-slate-800">发布时间</th>
              <th className="py-3 px-4 font-bold border-b border-slate-100 dark:border-slate-800">发布人</th>
              <th className="py-3 px-4 font-bold border-b border-slate-100 dark:border-slate-800 rounded-tr text-center">操作</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={row.id} className="hover:bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 last:border-[#E2E8F0] dark:border-slate-700 transition-colors">
                <td className="py-3 px-4 text-center">
                  <input type="checkbox" className="ai-checkbox" />
                </td>
                <td className="py-3 px-4 font-mono text-slate-500 dark:text-slate-400">{row.id}</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{row.type}</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{row.title}</td>
                <td className="py-3 px-4 text-slate-500 dark:text-slate-400">{row.desc}</td>
                <td className="py-3 px-4 font-mono text-slate-500 dark:text-slate-400">{row.time}</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{row.author}</td>
                <td className="py-3 px-4 text-center">
                  <button className="px-3 py-1 bg-emerald-50 text-[#10B981] text-[12px] font-medium rounded hover:bg-emerald-100 transition-colors">已读</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-end px-5 py-4 border-t border-slate-100 dark:border-slate-800/70 shrink-0 text-[13px] text-slate-500 dark:text-slate-400">
         <span className="mr-5 text-slate-600 dark:text-slate-400">共有150条</span>
         
         <div className="relative border border-slate-200 dark:border-slate-800 rounded px-3 py-1 w-24 flex items-center justify-between cursor-pointer hover:border-emerald-400 dark:hover:border-emerald-600 mr-5">
            10条/页
            <Icons.ChevronDown className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
         </div>

         <div className="flex items-center space-x-1 border-r border-slate-200 dark:border-slate-800 pr-5 mr-5">
            <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 hover:border-emerald-400 dark:hover:border-emerald-600 hover:text-emerald-500 transition-colors"><Icons.ChevronDown className="w-3.5 h-3.5 rotate-90" /></button>
            <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-emerald-400 dark:hover:border-emerald-600 hover:text-emerald-500 transition-colors">1</button>
            <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-emerald-400 dark:hover:border-emerald-600 hover:text-emerald-500 transition-colors">2</button>
            <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-emerald-400 dark:hover:border-emerald-600 hover:text-emerald-500 transition-colors">3</button>
            <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-emerald-400 dark:hover:border-emerald-600 hover:text-emerald-500 transition-colors">4</button>
            
            <button className="w-7 h-7 flex items-center justify-center rounded bg-[#10B981] font-bold text-white leading-none shadow-sm">5</button>
            
            <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-emerald-400 dark:hover:border-emerald-600 hover:text-emerald-500 transition-colors">6</button>
            <span className="mx-1 mt-1 font-serif text-slate-400 dark:text-slate-500">...</span>
            <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-emerald-400 dark:hover:border-emerald-600 hover:text-emerald-500 transition-colors">50</button>
            <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 hover:border-emerald-400 dark:hover:border-emerald-600 hover:text-emerald-500 transition-colors"><Icons.ChevronDown className="w-3.5 h-3.5 -rotate-90" /></button>
         </div>

         <div className="flex items-center">
            <span>跳至</span>
            <input type="text" className="w-10 border border-slate-200 dark:border-slate-800 rounded mx-2 py-0.5 text-center focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500 dark:focus:border-emerald-500/80/80" defaultValue="1" />
            <span>页</span>
         </div>
      </div>

    </div>
  );
}
