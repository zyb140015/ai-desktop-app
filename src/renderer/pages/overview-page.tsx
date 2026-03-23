import { useState } from 'react';
import * as Icons from '../components/icons';

export function OverviewPage() {
  const [activeTodoTab, setActiveTodoTab] = useState('todo');
  const [activeMsgTab, setActiveMsgTab] = useState('msg');

  return (
    <div className="w-full h-full max-w-[1600px] mx-auto flex flex-col min-h-0">
      
      {/* 
        ========================================
        Top Row: Full Width Tabs & Todo Banner
        ========================================
      */}
      <div className="flex flex-col w-full mb-3 shrink-0">
          <div className="flex items-center mb-2">
              <div 
                className={`text-[14px] font-bold cursor-pointer mr-6 relative transition-colors ${activeTodoTab === 'todo' ? 'text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}
                onClick={() => setActiveTodoTab('todo')}
              >
                 我的待办
                 {activeTodoTab === 'todo' && <div className="absolute -bottom-1 left-0 right-0 h-[3px] bg-[#10B981] rounded-full"></div>}
              </div>
              <div 
                className={`text-[14px] font-bold cursor-pointer relative transition-colors ${activeTodoTab === 'init' ? 'text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}
                onClick={() => setActiveTodoTab('init')}
              >
                 我的发起
                 {activeTodoTab === 'init' && <div className="absolute -bottom-1 left-0 right-0 h-[3px] bg-[#10B981] rounded-full"></div>}
              </div>
          </div>

          <div className="bg-[#10B981] rounded-xl flex justify-between items-center text-white relative overflow-hidden h-[76px] shadow-sm">
              <div className="absolute top-0 right-0 w-[400px] h-full bg-white/10 skew-x-[30deg] translate-x-20"></div>
              
              {[
                { name: "请假审批", count: 2, icon: "FileText" },
                { name: "会议审批", count: 6, icon: "Users" },
                { name: "外出审批", count: 4, icon: "Globe" },
                { name: "销假申请", count: 1, icon: "Clock" },
                { name: "用章审批", count: 0, icon: "Activity" },
                { name: "费用审批", count: 2, icon: "Layers" },
              ].map((item, i) => {
                  const IconComp = (Icons as any)[item.icon] || Icons.FileText;
                  return (
                  <div key={i} className="flex items-center flex-1 justify-center border-r border-[#34D399]/30 last:border-0 h-full relative z-10 cursor-pointer hover:bg-white/5 transition-colors group">
                      <div className="w-[38px] h-[38px] rounded-full border border-emerald-300/40 flex items-center justify-center mr-2.5 bg-emerald-500/20 group-hover:bg-emerald-400/30 transition-colors shrink-0">
                         <IconComp className="w-5 h-5 opacity-90" />
                      </div>
                      <div className="flex flex-col items-start leading-tight min-w-0">
                          <span className="text-[13px] text-emerald-100 mb-0.5 truncate w-full">{item.name}</span>
                          <span className="text-[20px] font-bold">{item.count} <span className="text-[11px] font-normal opacity-80">个</span></span>
                      </div>
                  </div>
              )})}
          </div>
      </div>

      {/* 
        ========================================
        Bottom Grid: Left (Wider) & Right (Narrower)
        ========================================
      */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-3.5 min-h-0">
          
          {/* ----- Left Column (Wider, Col-span-2) ----- */}
          <div className="lg:col-span-2 flex flex-col gap-3.5 h-full min-h-0">
              
              {/* Messages & Announcements (Exact 6 items without extra bottom whitespace) */}
              <div className="bg-white rounded-xl shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)] p-4 pt-3 flex flex-col shrink-0 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-emerald-50/40 to-transparent pointer-events-none"></div>
                  
                  <div className="flex items-center mb-1 shrink-0 border-b border-emerald-100/60 pb-1.5 relative z-10">
                      <div 
                        className={`text-[14px] font-bold cursor-pointer mr-6 relative transition-colors ${activeMsgTab === 'msg' ? 'text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}
                        onClick={() => setActiveMsgTab('msg')}
                      >
                        未读消息
                        {activeMsgTab === 'msg' && <div className="absolute -bottom-[7px] left-0 right-0 h-[2px] bg-[#10B981] rounded-t"></div>}
                      </div>
                      <div 
                        className={`text-[14px] font-bold cursor-pointer relative transition-colors ${activeMsgTab === 'ann' ? 'text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}
                        onClick={() => setActiveMsgTab('ann')}
                      >
                        未读公告
                        {activeMsgTab === 'ann' && <div className="absolute -bottom-[7px] left-0 right-0 h-[2px] bg-[#10B981] rounded-t"></div>}
                      </div>
                      <button className="ml-auto text-[12px] text-slate-400 hover:text-[#10B981] flex items-center">
                          更多 <Icons.ArrowRight className="w-3 h-3 ml-1" />
                      </button>
                  </div>

                  <div className="relative z-10">
                    <div className="space-y-0 text-[13px]">
                    {[
                      { title: "审批工单《服务器设备检测》", creator: "孙光洪", date: "2024-07-09 13:36:00" },
                      { title: "审批工单-用章用印申请", creator: "郑文铭", date: "2024-07-09 11:34:15" },
                      { title: "审批工单-出差申请", creator: "何家洪", date: "2024-07-09 01:59:36" },
                      { title: "审批工单-采购申请", creator: "钱浩然", date: "2024-07-08 21:48:34" },
                      { title: "审批工单-报销团建费用申请", creator: "吴振峰", date: "2024-07-06 14:49:11" },
                      { title: "审批工单-报销团建费用申请", creator: "吴振峰", date: "2024-07-06 14:49:11" },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between py-[5px] border-b border-gray-50/70 last:border-0 hover:bg-emerald-50/30 -mx-1 px-1 rounded transition-colors group">
                            <div className="flex items-center flex-1 min-w-0">
                              <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mr-2 text-emerald-600 font-bold text-[10px] font-mono">
                                  {i + 1}
                              </div>
                              <span className="text-slate-600 group-hover:text-[#10B981] truncate">{item.title}</span>
                            </div>
                            <div className="flex items-center text-[12px] text-slate-400 flex-shrink-0">
                              <span className="w-16 text-center">{item.creator}</span>
                              <span className="w-32 text-right font-mono ml-3">{item.date}</span>
                              <Icons.ArrowRight className="w-3 h-3 ml-3 text-slate-300 group-hover:text-[#10B981] transition-colors" />
                            </div>
                        </div>
                    ))}
                    </div>
                  </div>
              </div>

              {/* My Favorites (Files) - flex-1 with grid 4x2 */}
              <div className="bg-white rounded-xl shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)] p-4 pt-3 flex flex-col flex-1 min-h-0">
                  <div className="flex items-center justify-between mb-2 shrink-0 border-b border-gray-50 pb-1.5">
                      <h3 className="text-[14px] font-bold text-slate-800">我的收藏</h3>
                      <button className="text-[12px] text-slate-400 hover:text-[#10B981] flex items-center">
                         <Icons.ArrowRight className="w-3 h-3 ml-1" />
                      </button>
                  </div>

                  <div className="flex-1 overflow-y-auto custom-scrollbar -mx-1 px-1 min-h-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-[1px] mt-0.5">
                        {[
                          // Column 1 equivalent layout 
                          { name: "2024年营销部年度规划方案.pdf", sub: "5.6 MB / 2024-07-03 15:52:40 / 郑依晨", type: "PDF", color: "bg-[#F87171]" },
                          { name: "2024年团队管理培训计划.pdf", sub: "5.6 MB / 2024-07-08 05:49:42 / 孙书星", type: "PDF", color: "bg-[#F87171]" },
                          
                          { name: "2024年十佳员工名单.jpg", sub: "5.6 MB / 2024-07-04 18:18:16 / 冯旭", type: "JPG", color: "bg-[#A78BFA]" },
                          { name: "2024年最新版公司架构图.jpg", sub: "5.6 MB / 2024-07-05 19:44:32 / 冯杰", type: "JPG", color: "bg-[#A78BFA]" },
                          
                          { name: "2024年最新版《员工手册》.pdf", sub: "5.6 MB / 2024-07-05 15:30:07 / 孙子茹", type: "PDF", color: "bg-[#F87171]" },
                          { name: "2024年冬季员工旅游活动安排.pdf", sub: "5.6 MB / 2024-07-09 03:11:34 / 吴振峰", type: "PDF", color: "bg-[#F87171]" },
                          
                          { name: "2024年营销部年度规划方案.xls", sub: "5.6 MB / 2024-07-08 08:55:02 / 王琦逸", type: "XLS", color: "bg-[#10B981]" },
                          { name: "2024年全年活动安排.xls", sub: "5.6 MB / 2024-07-08 11:10:56 / 吴晨豪", type: "XLS", color: "bg-[#10B981]" },
                        ].map((file, i) => (
                           <div key={i} className="flex justify-between items-center group cursor-pointer hover:bg-slate-50/80 p-1.5 -mx-1.5 rounded transition-all">
                              <div className="flex items-start overflow-hidden flex-1">
                                <div className={`w-[20px] h-[20px] rounded flex items-center justify-center text-[7.5px] font-bold text-white mr-2 mt-0.5 flex-shrink-0 leading-none shadow-sm ${file.color}`}>{file.type}</div>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-[12.5px] text-slate-700 font-medium truncate group-hover:text-[#10B981] transition-colors leading-tight">{file.name}</span>
                                    <span className="text-[10.5px] text-slate-400 mt-[1px] truncate">{file.sub}</span>
                                </div>
                              </div>
                              <div className="flex space-x-2.5 ml-2 flex-shrink-0 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Icons.Download className="w-[14px] h-[14px] hover:text-[#10B981]" />
                                <Icons.FileText className="w-[14px] h-[14px] hover:text-[#10B981]" />
                              </div>
                           </div>
                        ))}
                    </div>
                  </div>
              </div>
          </div>

          {/* ----- Right Column (Narrower, Col-span-1) ----- */}
          <div className="lg:col-span-1 flex flex-col gap-3.5 h-full min-h-0">
              
              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)] p-3 lg:p-4 pt-3 shrink-0">
                  <h3 className="text-[14px] font-bold text-slate-800 mb-2 bg-gradient-to-r from-[#10B981] to-emerald-400 bg-clip-text text-transparent inline-block">快捷菜单</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { title: "新建工单", icon: "FileText", color: "text-[#10B981]", bg: "bg-emerald-50" },
                      { title: "新建考评", icon: "CheckCircle", color: "text-[#10B981]", bg: "bg-emerald-50" },
                      { title: "新建会议", icon: "Clock", color: "text-[#10B981]", bg: "bg-emerald-50" },
                      { title: "新建项目", icon: "Plus", color: "text-[#10B981]", bg: "bg-emerald-50" },
                    ].map((btn, i) => {
                      const IconC = (Icons as any)[btn.icon];
                      return (
                        <button key={i} className="flex flex-col items-center justify-center p-1.5 rounded-lg hover:bg-slate-50 transition-colors group">
                            <div className={`w-8 h-8 rounded-xl mb-1.5 flex items-center justify-center ${btn.bg} shadow-sm group-hover:shadow transition-all`}>
                                {IconC && <IconC className={`w-[15px] h-[15px] ${btn.color}`} />}
                            </div>
                            <span className="text-[11.5px] text-slate-600 group-hover:text-[#10B981] font-medium whitespace-nowrap">{btn.title}</span>
                        </button>
                      );
                    })}
                  </div>
              </div>

              {/* Profile Card */}
              <div className="bg-white rounded-xl shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)] p-4 pt-3 flex flex-col shrink-0 min-h-0 relative">
                <div className="flex items-center mb-3 pb-3 border-b border-gray-50 relative cursor-pointer group">
                    <div className="w-[42px] h-[42px] rounded-full bg-emerald-50 overflow-hidden flex-shrink-0 ring-[1.5px] ring-emerald-50 ring-offset-1">
                        <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Liz&backgroundColor=d1fae5" alt="李昭欣" className="w-full h-full object-cover" />
                    </div>
                    <div className="ml-3 min-w-0 flex-1 pr-4">
                      <div className="flex items-center">
                         <h2 className="text-[15px] font-bold text-slate-800 leading-tight truncate">李昭欣</h2>
                         <p className="text-[11px] text-slate-500 ml-2 truncate">信息化办公室主任</p>
                      </div>
                    </div>
                    <Icons.ChevronDown className="w-3.5 h-3.5 text-slate-300 absolute right-0 -rotate-90 group-hover:text-[#10B981]" />
                </div>

                <div className="grid grid-cols-2 gap-y-[7px] gap-x-3">
                    <div className="flex flex-col">
                      <span className="text-slate-400 text-[10.5px] mb-0.5">所属部门</span>
                      <span className="text-slate-700 text-[11.5px] truncate" title="明镜集团/桃花源分公司/营销部">明镜集团/桃花源分公司...</span>
                    </div>
                    <div className="flex flex-col relative w-full overflow-hidden">
                      <span className="text-slate-400 text-[10.5px] mb-0.5">用户ID</span>
                      <div className="flex items-center w-full">
                         <span className="text-slate-700 text-[11.5px] font-mono truncate">25524934542848</span>
                         <Icons.Copy className="w-3 h-3 text-[#10B981] ml-1.5 cursor-pointer flex-shrink-0" />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-slate-400 text-[10.5px] mb-0.5">账号</span>
                      <span className="text-slate-700 text-[11.5px] truncate">wangerxiao</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-slate-400 text-[10.5px] mb-0.5">职称</span>
                      <span className="text-slate-700 text-[11.5px] truncate">高级职称</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-slate-400 text-[10.5px] mb-0.5">手机号</span>
                      <span className="text-slate-700 text-[11.5px] font-mono truncate">123 1234 1234</span>
                    </div>
                    <div className="flex flex-col w-full overflow-hidden">
                      <span className="text-slate-400 text-[10.5px] mb-0.5">邮箱</span>
                      <span className="text-slate-700 text-[11.5px] truncate" title="wangerxiao@163.com">wangerxiao@163.com</span>
                    </div>
                </div>
              </div>

              {/* My Schedule (Calendar) */}
              <div className="bg-white rounded-xl shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)] p-4 pt-3 flex flex-col flex-1 min-h-[200px] relative">
                  <div className="flex items-center justify-between mb-1.5 shrink-0">
                      <h3 className="text-[14px] font-bold text-slate-800">我的日程</h3>
                  </div>
                  
                  {/* Calendar Header */}
                  <div className="flex items-center justify-center mb-1.5">
                      <button className="text-[#10B981] p-0.5"><Icons.ArrowRight className="w-[14px] h-[14px] rotate-180" /></button>
                      <span className="text-[13px] font-medium text-slate-700 mx-5 text-center w-20">2020年9月</span>
                      <button className="text-[#10B981] p-0.5"><Icons.ArrowRight className="w-[14px] h-[14px]" /></button>
                  </div>

                  {/* Calendar Matrix */}
                  <div className="flex flex-col text-[12px] h-full w-full">
                    <div className="grid grid-cols-7 text-center shrink-0 mb-1">
                        {['周一', '周二', '周三', '周四', '周五', '周六', '周日'].map(d => <div key={d} className="text-slate-500 text-[11.5px]">{d}</div>)}
                    </div>
                    <div className="grid grid-cols-7 gap-y-0.5 flex-1 h-full min-h-0">
                        {Array.from({length: 35}).map((_, i) => {
                            const day = i - 0;
                            let displayDay = day;
                            let isCurrentMonth = true;
                            if (day <= 0) { displayDay = 30 + day; isCurrentMonth = false; }
                            if (day > 30) { displayDay = day - 30; isCurrentMonth = false; }
                            
                            const isToday = i === 18;
                            const hasEvent1 = i === 1;
                            const hasEvent2 = i === 3;
                            const hasEvent3 = i === 15;
                            
                            return (
                              <div key={i} className="flex flex-col items-center justify-center relative py-[2px] cursor-pointer group rounded hover:bg-slate-50 transition-colors">
                                <span className={`w-[26px] h-[26px] flex items-center justify-center rounded text-[13px] ${
                                  isToday ? 'bg-[#10B981] text-white font-bold shadow-sm' : 
                                  isCurrentMonth ? 'text-slate-800' : 'text-slate-300'
                                }`}>{displayDay}</span>
                                
                                {/* Status dots */}
                                {(hasEvent1 || hasEvent2 || hasEvent3 || isToday) && isCurrentMonth && (
                                    <div className="flex gap-[2px] absolute bottom-1">
                                      <div className="w-1 h-1 rounded-full bg-[#10B981]"></div>
                                      {(hasEvent1 || hasEvent3) && <div className="w-1 h-1 rounded-full bg-[#EF4444]"></div>}
                                      {hasEvent3 && <div className="w-1 h-1 rounded-full bg-[#F59E0B]"></div>}
                                    </div>
                                )}
                              </div>
                            )
                        })}
                    </div>
                  </div>
              </div>

          </div>
      </div>

    </div>
  );
}
