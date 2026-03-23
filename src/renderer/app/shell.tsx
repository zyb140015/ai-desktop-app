import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { navigationItems } from '../../shared/navigation';
import * as Icons from '../components/icons';

export function Shell() {
  const location = useLocation();

  return (
    <div className="flex h-screen w-full bg-[#F8FAFC] overflow-hidden font-sans text-sm text-slate-800">
      {/* Sidebar */}
      <aside className="bg-white border-r border-slate-100 flex flex-col z-20 w-[240px] flex-shrink-0 relative">
        <div className="h-14 flex items-center px-6 border-b border-transparent mt-1 shrink-0">
          <div className="w-8 h-8 rounded-md bg-[#10B981] flex items-center justify-center">
            {/* Hexagon icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><polygon points="12 2 22 8 22 16 12 22 2 16 2 8"/></svg>
          </div>
          <span className="ml-3 font-bold text-[16px] text-slate-800 tracking-wide">MTBM SYSTEM</span>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-3 px-4 space-y-0.5 custom-scrollbar">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.to || (item.to === '/' && location.pathname === '');
            const IconComponent = (Icons as any)[item.icon];
            
            return (
              <NavLink
                key={item.label}
                to={item.to}
                className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-[#10B981] text-white font-medium shadow-sm shadow-emerald-200/50' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center">
                  {IconComponent && <IconComponent className={`w-[18px] h-[18px] flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />}
                  <span className="ml-3 text-[13px]">{item.label}</span>
                </div>
                {item.hasSub && (
                  <Icons.ChevronDown className={`w-4 h-4 ${isActive ? 'text-emerald-100' : 'text-slate-400'}`} />
                )}
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative min-w-0">
        {/* Header */}
        <header className="h-12 lg:h-14 bg-white border-b border-slate-100 flex items-center justify-between px-6 z-10 shrink-0">
          <div className="flex items-center">
            <h1 className="text-[15px] font-bold text-slate-800 flex items-center">
              {location.pathname === '/sysconfig' && <Icons.Settings className="w-[18px] h-[18px] mr-2 text-slate-600" />}
              {location.pathname === '/monitor' && <Icons.Activity className="w-[18px] h-[18px] mr-2 text-slate-600" />}
              {navigationItems.find(i => i.to === location.pathname)?.label || '工作台'}
            </h1>
          </div>
          <div className="flex items-center space-x-2">
             <div className="flex items-center mr-2 cursor-pointer border border-transparent hover:border-slate-100 p-1 rounded-full transition-colors">
                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
                    <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix" alt="小兽" className="w-full h-full object-cover" />
                </div>
                <span className="ml-2 mr-1 font-medium text-slate-700 text-[13px]">小兽</span>
             </div>
             
             <button className="p-1.5 hover:bg-slate-50 text-slate-500 hover:text-slate-700 rounded-full transition-colors"><Icons.Search className="w-[16px] h-[16px]" /></button>
             <button className="p-1.5 hover:bg-slate-50 text-slate-500 hover:text-slate-700 rounded-full transition-colors relative">
               <Icons.Bell className="w-[16px] h-[16px]" />
               <span className="absolute -top-0 -right-0 bg-red-500 text-white text-[9px] font-bold px-1 rounded-full border border-white leading-tight min-w-[14px] text-center">24</span>
             </button>
             <button className="p-1.5 hover:bg-slate-50 text-slate-500 hover:text-slate-700 rounded-full transition-colors"><Icons.Globe className="w-[16px] h-[16px]" /></button>
             <button className="p-1.5 hover:bg-slate-50 text-slate-500 hover:text-slate-700 rounded-full transition-colors"><Icons.Moon className="w-[16px] h-[16px]" /></button>
          </div>
        </header>

        {/* Content (No scrolling here, forcing 1 screen fit) */}
        <main className="flex-1 overflow-hidden p-3 lg:p-4 pb-3 lg:pb-4 relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
