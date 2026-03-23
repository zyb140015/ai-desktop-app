import * as Icons from '../components/icons';
import { Pagination } from '../components/pagination';

export function MonitorPage() {
  const tableData = [
    { id: 1, metric: 'CPU使用率', value: '19%', alarm: true, level: '一级告警', time: '2023-05-26 12:12:00', desc: '这是一段告警说明文字' },
    { id: 2, metric: 'CPU使用率', value: '19%', alarm: false, level: '一级告警', time: '2023-05-26 12:12:00', desc: '这是一段告警说明文字' },
    { id: 3, metric: 'CPU使用率', value: '19%', alarm: false, level: '二级告警', time: '2023-05-26 12:12:00', desc: '这是一段告警说明文字' },
    { id: 4, metric: 'CPU使用率', value: '19%', alarm: false, level: '二级告警', time: '2023-05-26 12:12:00', desc: '这是一段告警说明文字' },
    { id: 5, metric: 'GPU内存使用率', value: '19%', alarm: true, level: '二级告警', time: '2023-05-26 12:12:00', desc: '这是一段告警说明文字' },
    { id: 6, metric: 'GPU内存使用率', value: '19%', alarm: true, level: '二级告警', time: '2023-05-26 12:12:00', desc: '这是一段告警说明文字' },
    { id: 7, metric: 'GPU内存使用率', value: '19%', alarm: true, level: '三级告警', time: '2023-05-26 12:12:00', desc: '这是一段告警说明文字' },
    { id: 8, metric: 'GPU内存使用率', value: '19%', alarm: true, level: '三级告警', time: '2023-05-26 12:12:00', desc: '这是一段告警说明文字' },
    { id: 9, metric: 'GPU内存使用率', value: '19%', alarm: true, level: '三级告警', time: '2023-05-26 12:12:00', desc: '这是一段告警说明文字' },
    { id: 10, metric: 'GPU内存使用率', value: '19%', alarm: true, level: '三级告警', time: '2023-05-26 12:12:00', desc: '这是一段告警说明文字' },
  ];

  return (
    <div className="w-full h-full max-w-[1600px] mx-auto flex flex-col min-h-0 bg-white shadow-sm border border-slate-100 rounded-lg rounded-tl-none">
      
      {/* Search Header */}
      <div className="flex flex-col p-5 pb-5 shrink-0 border-b border-slate-100">
         <div className="flex items-center justify-between">
           <div className="flex items-center space-x-6">
              <div className="flex items-center">
                 <span className="text-[13px] text-slate-700 mr-2 shrink-0 font-medium whitespace-nowrap">监控指标:</span>
                 <input type="text" placeholder="请输入" className="border border-slate-200 rounded px-3 py-1.5 w-48 hover:border-emerald-400 focus:outline-none focus:border-emerald-500 text-[13px] placeholder-slate-300 transition-colors" />
              </div>
              <div className="flex items-center">
                 <span className="text-[13px] text-slate-700 mr-2 shrink-0 font-medium whitespace-nowrap">告警级别:</span>
                 <div className="relative border border-slate-200 rounded px-3 py-1.5 w-48 hover:border-emerald-400 cursor-pointer flex items-center justify-between text-[13px] text-slate-400 bg-white transition-colors">
                    请选择
                    <Icons.ChevronDown className="w-4 h-4 text-slate-300" />
                 </div>
              </div>
              <div className="flex items-center">
                 <span className="text-[13px] text-slate-700 mr-2 shrink-0 font-medium whitespace-nowrap">告警日期:</span>
                 <div className="relative border border-slate-200 rounded px-3 py-1.5 w-48 hover:border-emerald-400 cursor-pointer flex items-center justify-between text-[13px] text-slate-400 bg-white transition-colors">
                    请选择
                    <Icons.Clock className="w-[15px] h-[15px] text-slate-400" />
                 </div>
              </div>
           </div>
           
           <div className="flex items-center space-x-3 shrink-0 ml-4">
              <button className="px-5 py-1.5 border border-slate-200 rounded text-[13px] text-slate-600 hover:bg-slate-50 transition-colors">重置</button>
              <button className="px-5 py-1.5 bg-[#10B981] rounded text-[13px] text-white hover:bg-emerald-600 transition-colors font-medium">查询</button>
           </div>
         </div>
      </div>

      {/* Table Data */}
      <div className="flex-1 overflow-auto custom-scrollbar relative">
        <table className="w-full text-left text-[13px] text-slate-600 min-w-[1000px]">
          <thead className="bg-[#F8FAFC] text-slate-700 sticky top-0 z-10 shadow-sm border-b border-slate-100">
            <tr>
              <th className="py-3 px-6 font-bold w-16">序号</th>
              <th className="py-3 px-4 font-bold">监控指标</th>
              <th className="py-3 px-4 font-bold">指标值</th>
              <th className="py-3 px-4 font-bold">是否告警</th>
              <th className="py-3 px-4 font-bold">告警级别</th>
              <th className="py-3 px-4 font-bold">告警时间</th>
              <th className="py-3 px-4 font-bold">告警说明</th>
              <th className="py-3 px-4 font-bold text-center">操作</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50/50 border-b border-slate-100/60 last:border-0 transition-colors">
                <td className="py-3.5 px-6 font-mono text-slate-500">{row.id}</td>
                <td className="py-3.5 px-4 text-slate-600">{row.metric}</td>
                <td className="py-3.5 px-4 text-slate-600">{row.value}</td>
                <td className="py-3.5 px-4">
                   <span className={`inline-flex px-1.5 py-0.5 rounded text-[12px] font-medium border ${
                      row.alarm 
                        ? 'bg-emerald-50 text-[#10B981] border-emerald-100' 
                        : 'bg-red-50 text-red-500 border-red-100'
                   }`}>
                      {row.alarm ? '是' : '否'}
                   </span>
                </td>
                <td className="py-3.5 px-4 text-slate-600">{row.level}</td>
                <td className="py-3.5 px-4 font-mono text-slate-500">{row.time}</td>
                <td className="py-3.5 px-4 text-slate-500 truncate max-w-[200px]" title={row.desc}>{row.desc}</td>
                <td className="py-3.5 px-4 text-center space-x-2">
                  <button className="px-2.5 py-[3px] bg-emerald-50/60 border border-emerald-100/60 text-[#10B981] text-[12px] font-medium rounded hover:bg-emerald-100 hover:border-emerald-200 transition-colors">忽略</button>
                  <button className="px-2.5 py-[3px] bg-emerald-50/60 border border-emerald-100/60 text-[#10B981] text-[12px] font-medium rounded hover:bg-emerald-100 hover:border-emerald-200 transition-colors">处理</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Extracted Shared Pagination Component */}
      <Pagination total={150} />

    </div>
  );
}
