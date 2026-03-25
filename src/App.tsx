import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import * as Icons from './icons';
import { OverviewPage } from './renderer/pages/overview-page';
import { SystemStatsPage } from './renderer/pages/system-stats-page';
import { LoginPage } from './renderer/pages/login-page';
import { TenantPage } from './renderer/pages/tenant-page';
import { UsersPage } from './renderer/pages/users-page';
import { RolesPage } from './renderer/pages/roles-page';
import { MenusPage } from './renderer/pages/menus-page';
import { AnnouncementsPage } from './renderer/pages/announcements-page';
import { MonitorPage } from './renderer/pages/monitor-page';
import { MessagesPage } from './renderer/pages/messages-page';
import { SysconfigPage } from './renderer/pages/sysconfig-page';
import { ProfilePage } from './renderer/pages/profile-page';

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const menuItems = [
    { name: '工作台', path: '/', icon: 'Home' },
    { name: 'BI分析', path: '/bi', icon: 'Chart', hasSub: true },
    { name: '个人中心', path: '/profile', icon: 'UserIcon' },
    { name: '租户配置', path: '/tenant', icon: 'Settings', hasSub: true },
    { name: '组织管理', path: '/org', icon: 'Layers' },
    { name: '用户管理', path: '/users', icon: 'Users' },
    { name: '角色管理', path: '/roles', icon: 'Shield' },
    { name: '菜单管理', path: '/menus', icon: 'Grid' },
    { name: '字典管理', path: '/dict', icon: 'FileText' },
    { name: '公告管理', path: '/announcements', icon: 'Bell' },
    { name: '系统日志', path: '/logs', icon: 'CheckCircle', hasSub: true },
    { name: '系统监控', path: '/monitor', icon: 'Activity' },
    { name: '消息中心', path: '/messages', icon: 'Mail' },
    { name: '系统设置', path: '/sysconfig', icon: 'Settings' },
  ];

  const currentTitle = menuItems.find(item => item.path === location.pathname)?.name || '工作台';

  return (
    <div className="flex h-screen w-full bg-[#F0F2F5] overflow-hidden font-sans text-sm text-slate-800">
      {/* Sidebar */}
      <aside className="bg-white border-r border-slate-100 flex flex-col z-20 w-[240px] flex-shrink-0">
        <div className="h-16 flex items-center px-4 mt-1 border-b border-transparent">
          {/* Logo Hex Pattern as per screenshot */}
          <div className="relative w-8 h-8 ml-2 flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" className="text-[#10B981]">
               <path d="M16 2L4 9v14l12 7 12-7V9L16 2z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" fill="white" />
               <circle cx="16" cy="16" r="3" fill="currentColor" />
               <circle cx="10" cy="12" r="2" fill="currentColor" />
               <circle cx="22" cy="12" r="2" fill="currentColor" />
               <circle cx="10" cy="20" r="2" fill="currentColor" />
               <circle cx="22" cy="20" r="2" fill="currentColor" />
               <circle cx="16" cy="24" r="2" fill="currentColor" />
               <circle cx="16" cy="8" r="2" fill="currentColor" />
               <path d="M10 12l6-4 M22 12l-6-4 M10 20l6 4 M22 20l-6 4 M16 16v-8 M16 16v8 M16 16l-6-4 M16 16l6-4 M16 16l-6 4 M16 16l6 4" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2"/>
            </svg>
          </div>
          <span className="ml-3 font-bold text-[18px] text-[#10B981] tracking-tight">MTBM SYSTEM</span>
        </div>
        
        <nav className="flex-1 overflow-y-auto pt-6 pb-4 px-4 space-y-[6px] custom-scrollbar">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path === '/' && (location.pathname === '' || location.pathname === '/'));
            const IconComponent = (Icons as any)[item.icon] || Icons.Plus;
            
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center justify-between px-4 py-[12px] rounded-lg transition-all duration-200 group ${
                  isActive 
                    ? 'bg-[#E6F7F0] text-[#10B981] font-bold' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center">
                  <IconComponent className={`w-[19px] h-[19px] flex-shrink-0 ${isActive ? 'text-[#10B981]' : 'text-slate-400 group-hover:text-slate-600'} transition-colors`} />
                  <span className={`ml-4 text-[14px] ${isActive ? 'tracking-normal' : 'tracking-tight'}`}>{item.name}</span>
                </div>
                {item.hasSub && (
                  <Icons.ChevronDown className={`w-[14px] h-[14px] opacity-80 ${isActive ? 'text-[#10B981]' : 'text-slate-400'}`} />
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="h-14 bg-white border-b border-slate-100 flex items-center justify-between px-6 z-10 sticky top-0 shrink-0">
          <div className="flex items-center">
             <Icons.Layers className="w-[18px] h-[18px] text-slate-400 mr-2" />
             <h1 className="text-[16px] font-bold text-slate-800 tracking-tight">{currentTitle}</h1>
          </div>
          {/* Top Right Icons matching screenshot */}
          <div className="flex items-center space-x-2 text-slate-500">
               <button className="w-9 h-9 flex items-center justify-center hover:bg-slate-100 rounded-full transition-all group">
                 <Icons.UserIcon className="w-[18px] h-[18px] text-slate-800" />
               </button>
               <div className="w-[1px] h-4 bg-slate-200 mx-1"></div>
               <button className="w-9 h-9 flex items-center justify-center hover:bg-slate-100 rounded-full transition-all group">
                 <Icons.Search className="w-[18px] h-[18px] text-slate-600" />
               </button>
               <button className="w-9 h-9 flex items-center justify-center hover:bg-slate-100 rounded-full transition-all relative group">
                 <Icons.Bell className="w-[18px] h-[18px] text-slate-600" />
                 <span className="absolute top-1.5 right-1.5 bg-[#10B981] text-white text-[9px] font-bold px-1 rounded-full border border-white leading-tight min-w-[14px] text-center shadow-sm">24</span>
               </button>
               <button className="w-9 h-9 flex items-center justify-center hover:bg-slate-100 rounded-full transition-all group">
                 <Icons.Globe className="w-[18px] h-[18px] text-slate-600" />
               </button>
               <button className="w-9 h-9 flex items-center justify-center hover:bg-slate-100 rounded-full transition-all group">
                 <Icons.Moon className="w-[18px] h-[18px] text-slate-600" />
               </button>
          </div>
        </header>

        {/* Content Viewport */}
        <main className="flex-1 overflow-hidden relative min-h-0 bg-[#F0F2F5]">
          {children}
        </main>
      </div>
    </div>
  );
}

function PagePlaceholder({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-20 bg-white rounded-2xl border border-slate-100 shadow-sm border-dashed m-8 mt-4">
       <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-200 mb-6">
          <Icons.Layers className="w-8 h-8" />
       </div>
       <h2 className="text-[18px] font-bold text-slate-800 mb-2">{title}</h2>
       <p className="text-[14px] text-slate-400 mb-8 font-medium max-w-[200px] text-center">该功能正在全力开发中，敬请期待新版本发布</p>
       <Link to="/" className="px-6 py-2.5 text-[14px] bg-[#10B981] text-white rounded-xl hover:bg-[#059669] transition-all font-bold shadow-lg shadow-emerald-500/20 active:scale-95">
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
          <Route path="/" element={<OverviewPage />} />
          <Route path="/bi" element={<SystemStatsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/tenant" element={<TenantPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/roles" element={<RolesPage />} />
          <Route path="/menus" element={<MenusPage />} />
          <Route path="/announcements" element={<AnnouncementsPage />} />
          <Route path="/monitor" element={<MonitorPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/sysconfig" element={<SysconfigPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/org" element={<PagePlaceholder title="组织管理" />} />
          <Route path="/dict" element={<PagePlaceholder title="字典管理" />} />
          <Route path="/logs" element={<PagePlaceholder title="系统日志" />} />
          <Route path="*" element={<PagePlaceholder title="页面不存在" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
