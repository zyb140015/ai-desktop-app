import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import * as Icons from './icons';

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const menuItems = [
    { name: '工作台', path: '/', icon: 'Home' },
    { name: 'BI分析', path: '/bi', icon: 'Chart', hasSub: true },
    { name: '个人中心', path: '/profile', icon: 'UserIcon' },
    { name: '租户配置', path: '/tenant', icon: 'Settings', hasSub: true },
    { name: '组织管理', path: '/org', icon: 'Layers' },
    { name: '用户管理', path: '/users', icon: 'Users' },
    { name: '角色管理', path: '/roles', icon: 'Users' }, // Using users icon as fallback
    { name: '菜单管理', path: '/menus', icon: 'Layers' }, // Fallback icon
    { name: '字典管理', path: '/dict', icon: 'FileText' },
    { name: '公告管理', path: '/announcements', icon: 'Bell' },
    { name: '系统日志', path: '/logs', icon: 'CheckCircle', hasSub: true },
    { name: '系统监控', path: '/monitor', icon: 'Activity' },
    { name: '消息中心', path: '/messages', icon: 'Clock' },
    { name: '系统设置', path: '/sysconfig', icon: 'Settings' },
  ];

  return (
    <div className="flex h-screen w-full bg-[#F8FAFC] overflow-hidden font-sans text-sm text-slate-800">
      {/* Sidebar */}
      <aside className="bg-white border-r border-slate-100 flex flex-col z-20 w-[240px] flex-shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-transparent mt-2">
          <div className="w-8 h-8 rounded-md bg-emerald-500 flex items-center justify-center">
            {/* Hexagon icon approx */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><polygon points="12 2 22 8 22 16 12 22 2 16 2 8"/></svg>
          </div>
          <span className="ml-3 font-bold text-[16px] text-slate-800 tracking-wide">MTBM SYSTEM</span>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 px-4 space-y-1 custom-scrollbar">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path === '/' && location.pathname === '');
            const IconComponent = Icons[item.icon as keyof typeof Icons];
            
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-[#10B981] text-white font-medium shadow-sm shadow-emerald-200/50' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center">
                  {IconComponent && <IconComponent className={`w-[18px] h-[18px] flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />}
                  <span className="ml-3 text-[14px]">{item.name}</span>
                </div>
                {item.hasSub && (
                  <Icons.ChevronDown className={`w-4 h-4 ${isActive ? 'text-emerald-100' : 'text-slate-400'}`} />
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 z-10 sticky top-0">
          <div className="flex items-center">
            <h1 className="text-[18px] font-bold text-slate-800">工作台</h1>
          </div>
          <div className="flex items-center space-x-3">
             <div className="flex items-center mr-2">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold overflow-hidden border border-slate-100">
                    {/* Placeholder Avatar */}
                    <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=e2e8f0" alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <span className="ml-2 font-medium text-slate-700 text-sm">小兽</span>
             </div>
             
             <button className="p-2 hover:bg-slate-50 text-slate-500 hover:text-slate-700 rounded-full transition-colors"><Icons.Search className="w-[18px] h-[18px]" /></button>
             <button className="p-2 hover:bg-slate-50 text-slate-500 hover:text-slate-700 rounded-full transition-colors relative">
               <Icons.Bell className="w-[18px] h-[18px]" />
               <span className="absolute top-1 right-1 bg-red-500 text-white text-[9px] font-bold px-1 rounded-full border border-white leading-tight min-w-[14px] text-center">24</span>
             </button>
             <button className="p-2 hover:bg-slate-50 text-slate-500 hover:text-slate-700 rounded-full transition-colors"><Icons.Globe className="w-[18px] h-[18px]" /></button>
             <button className="p-2 hover:bg-slate-50 text-slate-500 hover:text-slate-700 rounded-full transition-colors"><Icons.Moon className="w-[18px] h-[18px]" /></button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6 md:p-8 custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}

function Workbench() {
  const [activeTodoTab, setActiveTodoTab] = useState('todo');
  const [activeMsgTab, setActiveMsgTab] = useState('msg');

  return (
    <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 pb-10">
      
      {/* Left Column */}
      <div className="space-y-6 lg:col-span-1 flex flex-col">
        
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100/50 p-6 flex flex-col">
           <div className="flex items-center mb-6">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-white shadow-sm overflow-hidden flex-shrink-0">
                  <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Liz&backgroundColor=d1fae5" alt="李昭欣" className="w-full h-full object-cover" />
              </div>
              <div className="ml-4">
                 <h2 className="text-xl font-bold text-slate-800">李昭欣</h2>
                 <p className="text-[#10B981] bg-emerald-50 px-2 py-0.5 rounded text-[12px] font-medium mt-1 inline-block">信息化办公室助理</p>
              </div>
           </div>

           <div className="space-y-3">
              <div className="flex">
                 <span className="text-slate-400 w-20 text-[13px] flex-shrink-0">所属部门</span>
                 <span className="text-slate-700 text-[13px] break-all">明镜集团 / 桃花源分公司 / 营销部</span>
              </div>
              <div className="flex items-center">
                 <span className="text-slate-400 w-20 text-[13px] flex-shrink-0">用户ID</span>
                 <span className="text-slate-700 text-[13px]">100344</span>
                 <button className="ml-2 text-slate-400 hover:text-[#10B981]"><Icons.Copy className="w-3.5 h-3.5" /></button>
              </div>
              <div className="flex">
                 <span className="text-slate-400 w-20 text-[13px] flex-shrink-0">账号</span>
                 <span className="text-slate-700 text-[13px]">wangerxiao</span>
              </div>
              <div className="flex">
                 <span className="text-slate-400 w-20 text-[13px] flex-shrink-0">职称</span>
                 <span className="text-slate-700 text-[13px]">高级职称</span>
              </div>
              <div className="flex items-center mt-3 pt-3 border-t border-slate-50">
                 <Icons.Phone className="w-4 h-4 text-slate-400 mr-2" />
                 <span className="text-slate-700 text-[13px]">138 0013 8000</span>
              </div>
              <div className="flex items-center">
                 <Icons.Mail className="w-4 h-4 text-slate-400 mr-2" />
                 <span className="text-slate-700 text-[13px]">lizhaoxin@mingjing.com</span>
              </div>
           </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100/50 p-6">
            <h3 className="text-[15px] font-bold text-slate-800 mb-4">快捷菜单</h3>
            <div className="grid grid-cols-2 gap-3">
               {[
                 { title: "新建工单", icon: "FileText", color: "indigo" },
                 { title: "新建考评", icon: "CheckCircle", color: "emerald" },
                 { title: "新建会议", icon: "Clock", color: "blue" },
                 { title: "新建项目", icon: "Plus", color: "amber" },
               ].map((btn, i) => {
                 const IconC = Icons[btn.icon as keyof typeof Icons];
                 return (
                   <button key={i} className="flex flex-col items-center justify-center p-3 rounded-lg border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50 transition-colors group">
                       <div className={`w-8 h-8 rounded-full mb-2 flex items-center justify-center bg-slate-50 group-hover:bg-white`}>
                           {IconC && <IconC className="w-4 h-4 text-slate-600 group-hover:text-[#10B981]" />}
                       </div>
                       <span className="text-[13px] text-slate-700 group-hover:text-[#10B981] font-medium">{btn.title}</span>
                   </button>
                 );
               })}
            </div>
        </div>

        {/* My Schedule (Calendar) */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100/50 p-6 flex flex-col flex-1">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-[15px] font-bold text-slate-800">我的日程</h3>
                <span className="text-[13px] text-slate-500 font-medium">2024年 9月</span>
            </div>
            {/* Simple calendar rendering representation */}
            <div className="flex flex-col text-sm h-full">
               <div className="grid grid-cols-7 text-center mb-2">
                  {['日', '一', '二', '三', '四', '五', '六'].map(d => <div key={d} className="text-slate-400 text-[12px]">{d}</div>)}
               </div>
               <div className="grid grid-cols-7 gap-y-2 flex-1">
                   {Array.from({length: 35}).map((_, i) => {
                      const day = i - 3; // Shift to make 1st start on Wed usually
                      const isCurrentMonth = day > 0 && day <= 30;
                      const hasEvent = [4, 12, 18, 25].includes(day);
                      const isToday = day === 12;
                      
                      return (
                        <div key={i} className="flex flex-col items-center justify-center relative py-1 cursor-pointer group">
                           <span className={`w-7 h-7 flex items-center justify-center rounded-full text-[13px] ${
                             isToday ? 'bg-[#10B981] text-white shadow-md' : 
                             isCurrentMonth ? 'text-slate-700 hover:bg-slate-100' : 'text-slate-300'
                           }`}>{day > 0 && day <= 30 ? day : (day <= 0 ? 31 + day : day - 30)}</span>
                           
                           {hasEvent && isCurrentMonth && (
                              <div className="flex gap-0.5 mt-0.5 absolute bottom-0">
                                 <div className="w-1 h-1 rounded-full bg-[#10B981]"></div>
                                 {day % 2 === 0 && <div className="w-1 h-1 rounded-full bg-blue-400"></div>}
                              </div>
                           )}
                        </div>
                      )
                   })}
               </div>
            </div>
        </div>

      </div>

      {/* Right Column (Wider) */}
      <div className="space-y-6 lg:col-span-2 flex flex-col">
        
        {/* My To-do */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100/50 p-6">
            <div className="flex items-center mb-6">
                <div 
                  className={`text-[15px] font-bold cursor-pointer mr-6 relative ${activeTodoTab === 'todo' ? 'text-slate-800' : 'text-slate-400'}`}
                  onClick={() => setActiveTodoTab('todo')}
                >
                   我的待办
                   {activeTodoTab === 'todo' && <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#10B981] rounded-t"></div>}
                </div>
                <div 
                  className={`text-[15px] font-bold cursor-pointer relative ${activeTodoTab === 'init' ? 'text-slate-800' : 'text-slate-400'}`}
                  onClick={() => setActiveTodoTab('init')}
                >
                   我的发起
                   {activeTodoTab === 'init' && <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#10B981] rounded-t"></div>}
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {[
                  { name: "请假审批", count: 2 },
                  { name: "会议审批", count: 6 },
                  { name: "外出审批", count: 4 },
                  { name: "销假申请", count: 1 },
                  { name: "用章审批", count: 0 },
                  { name: "费用审批", count: 2 },
                ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center justify-center py-4 px-2 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer group">
                        <div className="w-12 h-12 rounded-full bg-[#E6F7F0] flex items-center justify-center mb-3 group-hover:bg-[#10B981] transition-colors">
                           <Icons.FileText className="w-5 h-5 text-[#10B981] group-hover:text-white" />
                        </div>
                        <span className="text-[13px] text-slate-700 font-medium mb-1">{item.name}</span>
                        <span className={`text-[16px] font-bold ${item.count > 0 ? 'text-slate-800' : 'text-slate-300'}`}>{item.count}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* Messages & Announcements */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100/50 p-6">
             <div className="flex items-center mb-4">
                <div 
                  className={`text-[15px] font-bold cursor-pointer mr-6 relative ${activeMsgTab === 'msg' ? 'text-slate-800' : 'text-slate-400'}`}
                  onClick={() => setActiveMsgTab('msg')}
                >
                   未读消息
                   {activeMsgTab === 'msg' && <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#10B981] rounded-t"></div>}
                </div>
                <div 
                  className={`text-[15px] font-bold cursor-pointer relative ${activeMsgTab === 'ann' ? 'text-slate-800' : 'text-slate-400'}`}
                  onClick={() => setActiveMsgTab('ann')}
                >
                   未读公告
                   {activeMsgTab === 'ann' && <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#10B981] rounded-t"></div>}
                </div>
                <button className="ml-auto text-[13px] text-slate-400 hover:text-[#10B981]">更多</button>
            </div>

            <div className="mt-6 space-y-0">
               {[
                 { type: "审批工单", title: "《服务器设备检测》", creator: "孙光洪", date: "2024-09-12 10:20" },
                 { type: "通知消息", title: "《关于中秋节放假通知》", creator: "行政部", date: "2024-09-11 16:00" },
                 { type: "审批工单", title: "《第三季度营销预算申请》", creator: "李浩", date: "2024-09-10 09:15" },
                 { type: "系统提醒", title: "《密码即将在7天后过期，请尽快修改》", creator: "系统", date: "2024-09-09 08:00" },
                 { type: "会议邀请", title: "《产品研发周会》", creator: "王立", date: "2024-09-08 14:30" },
                 { type: "审批工单", title: "《出差报销单-北京项目团队》", creator: "王五", date: "2024-09-07 11:20" },
               ].map((item, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 -mx-4 px-4 rounded-lg cursor-pointer">
                      <div className="flex items-center flex-1 min-w-0">
                         <span className="text-[12px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded flex-shrink-0 w-16 text-center">{item.type}</span>
                         <span className="text-[14px] text-slate-700 font-medium ml-3 truncate pr-4 hover:text-[#10B981]">{item.title}</span>
                      </div>
                      <div className="flex items-center text-[13px] text-slate-400 mt-2 sm:mt-0 flex-shrink-0">
                         <span className="w-16 sm:w-20 truncate">{item.creator}</span>
                         <span className="w-32 text-right">{item.date}</span>
                         <Icons.ChevronDown className="w-4 h-4 ml-4 -rotate-90 text-slate-300" />
                      </div>
                  </div>
               ))}
            </div>
        </div>

        {/* My Favorites (Files) */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100/50 p-6 flex-1">
             <div className="flex items-center justify-between mb-4">
                <h3 className="text-[15px] font-bold text-slate-800">我的收藏</h3>
                <button className="text-[13px] text-slate-400 hover:text-[#10B981]">更多</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {[
                  { name: "2024年度下半年营销计划与预算.pdf", type: "PDF" },
                  { name: "新入职员工通讯录明细_9月版.xls", type: "XLS" },
                  { name: "团队素拓大合影_原图.jpg", type: "JPG" },
                  { name: "内部员工管理规章制度手册.pdf", type: "PDF" },
                ].map((file, i) => (
                   <div key={i} className="border border-slate-100 rounded-lg p-4 flex items-center hover:border-emerald-200 transition-colors group cursor-pointer">
                      <div className={`w-10 h-10 rounded flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-white
                        ${file.type === 'PDF' ? 'bg-red-400' : file.type === 'XLS' ? 'bg-emerald-400' : 'bg-blue-400'}
                      `}>
                         {file.type}
                      </div>
                      <div className="ml-3 flex-1 min-w-0">
                         <div className="text-[13px] font-medium text-slate-700 truncate group-hover:text-[#10B981]" title={file.name}>{file.name}</div>
                         <div className="text-[11px] text-slate-400 mt-1">2.4 MB · 昨天 14:00</div>
                      </div>
                      <div className="flex items-center space-x-2 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button className="p-1.5 text-slate-400 hover:text-blue-500 bg-slate-50 hover:bg-blue-50 rounded"><Icons.Eye className="w-4 h-4" /></button>
                         <button className="p-1.5 text-slate-400 hover:text-[#10B981] bg-slate-50 hover:bg-emerald-50 rounded"><Icons.Download className="w-4 h-4" /></button>
                      </div>
                   </div>
                ))}
            </div>
        </div>

      </div>

    </div>
  );
}

function PagePlaceholder({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-120px)] bg-white rounded-xl border border-slate-100 shadow-sm border-dashed">
       <div className="text-slate-400 mb-4"><Icons.Layers className="w-12 h-12" /></div>
       <h2 className="text-[18px] font-bold text-slate-700 mb-2">{title}</h2>
       <p className="text-[13px] text-slate-500 mb-6 font-medium">功能开发中...</p>
       <Link to="/" className="px-5 py-2 text-[13px] bg-[#10B981] text-white rounded-lg hover:bg-[#059669] transition-colors font-medium">
            返回工作台
       </Link>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Workbench />} />
          <Route path="/:id" element={<PagePlaceholder title="功能开发中" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
