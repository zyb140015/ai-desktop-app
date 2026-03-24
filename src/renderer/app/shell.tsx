import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { navigationItems } from '../../shared/navigation';
import * as Icons from '../components/icons';
import { Toaster } from '../../components/ui/sonner';
import { toast } from 'sonner';

export function Shell() {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['/logs']);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    if (nextMode) {
      toast.success('已切换至黑暗页面模式');
    } else {
      toast.success('已切换至白昼页面模式');
    }
  };

  const toggleMenu = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    setExpandedMenus(prev => 
      prev.includes(path) ? prev.filter(p => p !== path) : [...prev, path]
    );
  };

  return (
    <div className="flex h-screen w-full bg-[#F8FAFC] dark:bg-slate-900 overflow-hidden font-sans text-sm text-slate-800 dark:text-slate-200">
      {/* Sidebar */}
      <aside className="bg-white dark:bg-slate-950 border-r border-slate-100 dark:border-slate-800 flex flex-col z-20 w-[240px] flex-shrink-0 relative transition-colors">
        <div className="h-14 flex items-center px-6 border-b border-transparent mt-1 shrink-0">
          <div className="w-8 h-8 rounded-md bg-[#10B981] flex items-center justify-center">
            {/* Hexagon icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><polygon points="12 2 22 8 22 16 12 22 2 16 2 8"/></svg>
          </div>
          <span className="ml-3 font-bold text-[16px] text-slate-800 dark:text-slate-100 tracking-wide">MTBM SYSTEM</span>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-3 px-4 space-y-0.5 custom-scrollbar">
          {navigationItems.map((item) => {
            const isExactActive = location.pathname === item.to || (item.to === '/' && location.pathname === '');
            const isChildActive = item.hasSub && location.pathname.startsWith(item.to + '/');
            const isActive = isExactActive || isChildActive;
            const isExpanded = expandedMenus.includes(item.to);
            const IconComponent = (Icons as any)[item.icon];
            
            return (
              <div key={item.label} className="flex flex-col">
                <NavLink
                  to={item.hasSub && (item as any).subItems ? (item as any).subItems[0].to : item.to}
                  onClick={(e) => item.hasSub && toggleMenu(item.to, e)}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
                    (isActive && !item.hasSub) || (isExactActive && item.hasSub)
                      ? 'bg-[#10B981] text-white font-medium shadow-sm shadow-emerald-200/50 dark:shadow-emerald-900/50' 
                      : (isChildActive && item.hasSub) 
                        ? 'bg-emerald-50 dark:bg-emerald-900/20 text-[#10B981] font-medium'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center">
                    {IconComponent && <IconComponent className={`w-[18px] h-[18px] flex-shrink-0 ${((isActive && !item.hasSub) || (isExactActive && item.hasSub)) ? 'text-white' : (isChildActive && item.hasSub) ? 'text-[#10B981]' : 'text-slate-400'}`} />}
                    <span className="ml-3 text-[13px]">{item.label}</span>
                  </div>
                  {item.hasSub && (
                    <Icons.ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''} ${((isActive && !item.hasSub) || (isExactActive && item.hasSub)) ? 'text-emerald-100' : 'text-slate-400'}`} />
                  )}
                </NavLink>

                {/* Sub-menu rendering */}
                {item.hasSub && isExpanded && (item as any).subItems && (
                  <div className="flex flex-col mt-1 mb-1 pl-9 space-y-0.5">
                    {(item as any).subItems.map((sub: { to: string; label: string }) => {
                      const isSubActive = location.pathname === sub.to;
                      return (
                        <NavLink
                          key={sub.label}
                          to={sub.to}
                          className={`flex items-center px-3 py-2 rounded-lg transition-colors text-[13px] ${
                            isSubActive
                              ? 'bg-[#10B981]/10 text-[#10B981] font-medium'
                              : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200'
                          }`}
                        >
                          {sub.label}
                        </NavLink>
                      )
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative min-w-0">
        {/* Header */}
        <header className="h-12 lg:h-14 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between px-6 z-10 shrink-0 transition-colors">
          <div className="flex items-center">
            <h1 className="text-[15px] font-bold text-slate-800 dark:text-slate-100 flex items-center">
              {location.pathname === '/sysconfig' && <Icons.Settings className="w-[18px] h-[18px] mr-2 text-slate-600 dark:text-slate-400" />}
              {location.pathname === '/monitor' && <Icons.Activity className="w-[18px] h-[18px] mr-2 text-slate-600 dark:text-slate-400" />}
              {location.pathname === '/announcements' && <Icons.Bell className="w-[18px] h-[18px] mr-2 text-slate-600 dark:text-slate-400" />}
              {location.pathname === '/dict' && <Icons.FileText className="w-[18px] h-[18px] mr-2 text-slate-600 dark:text-slate-400" />}
              {location.pathname === '/menus' && <Icons.Layers className="w-[18px] h-[18px] mr-2 text-slate-600 dark:text-slate-400" />}
              {location.pathname === '/users' && <Icons.Users className="w-[18px] h-[18px] mr-2 text-slate-600 dark:text-slate-400" />}
              {location.pathname === '/orgs' && <Icons.Layers className="w-[18px] h-[18px] mr-2 text-slate-600 dark:text-slate-400" />}
              {location.pathname === '/profile' && <Icons.UserIcon className="w-[18px] h-[18px] mr-2 text-slate-600 dark:text-slate-400" />}
              {location.pathname.startsWith('/tenant') && <Icons.Settings className="w-[18px] h-[18px] mr-2 text-slate-600 dark:text-slate-400" />}
              {location.pathname.startsWith('/bi') && <Icons.Chart className="w-[18px] h-[18px] mr-2 text-slate-600 dark:text-slate-400" />}
              {location.pathname.startsWith('/logs') && <Icons.FileText className="w-[18px] h-[18px] mr-2 text-slate-600 dark:text-slate-400" />}
              {location.pathname === '/logs/login' ? '登录日志' : location.pathname === '/logs/operation' ? '操作日志' : location.pathname === '/tenant/menu-template' ? '菜单模板' : location.pathname === '/tenant/management' ? '租户管理' : location.pathname === '/bi/system' ? '系统统计' : location.pathname === '/bi/usage' ? '使用统计' : location.pathname === '/messages' ? '消息中心' : (navigationItems.find(i => i.to === location.pathname)?.label || '工作台')}
            </h1>
          </div>
          <div className="flex items-center space-x-2">
             <div className="flex items-center mr-2 cursor-pointer border border-transparent hover:border-slate-100 dark:hover:border-slate-700 p-1 rounded-full transition-colors">
                <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-700">
                    <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix" alt="小兽" className="w-full h-full object-cover" />
                </div>
                <span className="ml-2 mr-1 font-medium text-slate-700 dark:text-slate-300 text-[13px]">小兽</span>
             </div>
             
             <button className="p-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-full transition-colors"><Icons.Search className="w-[16px] h-[16px]" /></button>
             <button className="p-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-full transition-colors relative">
               <Icons.Bell className="w-[16px] h-[16px]" />
               <span className="absolute -top-0 -right-0 bg-red-500 text-white text-[9px] font-bold px-1 rounded-full border border-white dark:border-slate-900 leading-tight min-w-[14px] text-center">24</span>
             </button>
             <button className="p-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-full transition-colors"><Icons.Globe className="w-[16px] h-[16px]" /></button>
             <button onClick={toggleDarkMode} className="p-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-full transition-colors">
                {isDarkMode ? <Icons.Sun className="w-[16px] h-[16px]" /> : <Icons.Moon className="w-[16px] h-[16px]" />}
             </button>
          </div>
        </header>

        {/* Content (No scrolling here, forcing 1 screen fit) */}
        <main className="flex-1 overflow-hidden p-3 lg:p-4 pb-3 lg:pb-4 relative">
          <Outlet />
        </main>
      </div>
      <Toaster theme={isDarkMode ? 'dark' : 'light'} position="top-center" />
    </div>
  );
}
