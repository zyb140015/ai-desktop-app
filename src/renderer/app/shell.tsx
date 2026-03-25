import { useEffect, useMemo, useState, type KeyboardEvent, type MouseEvent } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { staticNavigationItems, type NavigationItem, type NavigationSubItem } from '../../shared/navigation'
import * as Icons from '../components/icons'
import { Input } from '../../components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover'
import { Toaster } from '../../components/ui/sonner'
import { toast } from 'sonner'
import { showActionSuccess } from '../lib/action-feedback'
import { filterMenusByVisibility } from '../lib/menu-visibility'
import { useAuthStore } from '../store/auth-store'
import { useCurrentMenusQuery } from '../hooks/use-current-menus-query'
import { useDesktopMessagesQuery } from '../hooks/use-desktop-messages-query'
import type { DesktopMenu } from '../services/menu-types'

const themeStorageKey = 'theme'
const defaultExpandedMenus = ['/logs']

type SearchRouteItem = {
  to: string
  label: string
}

function hasSubItems(item: NavigationItem): item is NavigationItem & { subItems: readonly NavigationSubItem[] } {
  return Array.isArray(item.subItems) && item.subItems.length > 0
}

function getHeaderTitle(pathname: string): string {
  if (pathname === '/logs/login') return '登录日志'
  if (pathname === '/logs/operation') return '操作日志'
  if (pathname === '/tenant/menu-template') return '菜单模板'
  if (pathname === '/tenant/management') return '租户管理'
  if (pathname === '/bi/system') return '系统统计'
  if (pathname === '/bi/usage') return '使用统计'
  if (pathname === '/messages') return '消息中心'

  return staticNavigationItems.find((item) => item.to === pathname)?.label ?? '工作台'
}

export function Shell() {
  const navigate = useNavigate()
  const location = useLocation()
  const currentUser = useAuthStore((state) => state.currentUser)
  const clearSession = useAuthStore((state) => state.clearSession)
  const { data: menuResponse, isSuccess: menusReady } = useCurrentMenusQuery()
  const messagesQuery = useDesktopMessagesQuery({ page: 1, pageSize: 100 })
  const [expandedMenus, setExpandedMenus] = useState<string[]>(defaultExpandedMenus)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem(themeStorageKey) === 'dark' ||
      (!localStorage.getItem(themeStorageKey) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  })

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem(themeStorageKey, 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem(themeStorageKey, 'light')
    }
  }, [isDarkMode])

  const toggleDarkMode = () => {
    const nextMode = !isDarkMode
    setIsDarkMode(nextMode)
    if (nextMode) {
      toast.success('已切换至黑暗页面模式')
    } else {
      toast.success('已切换至白昼页面模式')
    }
  }

  const toggleMenu = (path: string, event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    setExpandedMenus((prev) =>
      prev.includes(path) ? prev.filter(p => p !== path) : [...prev, path]
    )
  }

  const displayName = currentUser?.username?.trim() || '未登录'
  const avatarSrc = resolveAvatarSrc(currentUser?.avatar)
  const visibleMenus = filterMenusByVisibility(menuResponse?.list ?? [])
  const navigationItems = buildNavigationItems(visibleMenus)
  const headerTitle = getDynamicHeaderTitle(location.pathname, navigationItems)
  const firstAccessiblePath = getFirstAccessiblePath(navigationItems)
  const unreadMessageCount = (messagesQuery.data?.items ?? []).filter((item) => !item.read).length
  const searchableRoutes = useMemo(() => flattenNavigationRoutes(navigationItems), [navigationItems])
  const matchedRoutes = useMemo<SearchRouteItem[]>(() => {
    const keyword = searchKeyword.trim().toLowerCase()
    if (!keyword) {
      return searchableRoutes.slice(0, 8)
    }
    return searchableRoutes.filter((item) => item.label.toLowerCase().includes(keyword)).slice(0, 8)
  }, [searchKeyword, searchableRoutes])

  useEffect(() => {
    if (!menusReady) {
      return
    }

    if (isPathAllowed(location.pathname, navigationItems)) {
      return
    }

    navigate(firstAccessiblePath, { replace: true })
  }, [firstAccessiblePath, location.pathname, menusReady, navigate, navigationItems])

  useEffect(() => {
    setIsSearchOpen(false)
    setSearchKeyword('')
  }, [location.pathname])

  const handleLogout = () => {
    clearSession()
    navigate('/login', { replace: true })
  }

  const handleSearchNavigate = (path: string) => {
    navigate(path)
    setIsSearchOpen(false)
    setSearchKeyword('')
  }

  const handleSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') {
      return
    }

    const firstMatch = matchedRoutes[0]
    if (!firstMatch) {
      return
    }

    handleSearchNavigate(firstMatch.to)
  }

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
            const isExactActive = location.pathname === item.to || (item.to === '/' && location.pathname === '')
            const isChildActive = hasSubItems(item) && location.pathname.startsWith(`${item.to}/`)
            const isActive = isExactActive || isChildActive
            const isExpanded = expandedMenus.includes(item.to)
            const IconComponent = Icons[item.icon as keyof typeof Icons]
            const targetPath = hasSubItems(item) ? item.subItems[0]?.to ?? item.to : item.to
            
            return (
              <div key={item.label} className="flex flex-col">
                <NavLink
                  to={targetPath}
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
                {hasSubItems(item) && isExpanded && (
                  <div className="flex flex-col mt-1 mb-1 pl-9 space-y-0.5">
                    {item.subItems.map((sub) => {
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
                {headerTitle}
              </h1>
          </div>
          <div className="flex items-center space-x-2">
             <button type="button" onClick={() => navigate('/profile')} className="flex items-center mr-2 cursor-pointer border border-transparent hover:border-slate-100 dark:hover:border-slate-700 p-1 rounded-full transition-colors">
                 <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-700">
                    <img src={avatarSrc} alt={displayName} className="w-full h-full object-cover" />
                 </div>
                 <span className="ml-2 mr-1 font-medium text-slate-700 dark:text-slate-300 text-[13px]">{displayName}</span>
              </button>
              
             <Popover open={isSearchOpen} onOpenChange={setIsSearchOpen}>
                <PopoverTrigger>
                  <button type="button" className="p-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-full transition-colors" title="全局搜索">
                    <Icons.Search className="w-[16px] h-[16px]" />
                  </button>
                </PopoverTrigger>
               <PopoverContent align="end" className="w-80 p-3">
                 <div className="space-y-3">
                   <Input
                     autoFocus
                     value={searchKeyword}
                     onChange={(event) => setSearchKeyword(event.target.value)}
                     onKeyDown={handleSearchKeyDown}
                     placeholder="搜索左侧菜单，如：用户管理"
                   />
                   <div className="max-h-64 space-y-1 overflow-y-auto">
                     {matchedRoutes.length > 0 ? matchedRoutes.map((item) => (
                       <button
                         key={`${item.to}-${item.label}`}
                         type="button"
                         className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-[13px] text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                         onClick={() => handleSearchNavigate(item.to)}
                       >
                         <span>{item.label}</span>
                         <span className="ml-3 text-[11px] text-slate-400">{item.to}</span>
                       </button>
                     )) : <div className="px-3 py-2 text-[12px] text-slate-400">未找到匹配菜单</div>}
                   </div>
                 </div>
               </PopoverContent>
             </Popover>
             <button type="button" onClick={() => navigate('/messages')} className="p-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-full transition-colors relative" title="消息中心">
                <Icons.Bell className="w-[16px] h-[16px]" />
                {unreadMessageCount > 0 ? <span className="absolute -top-0 -right-0 bg-red-500 text-white text-[9px] font-bold px-1 rounded-full border border-white dark:border-slate-900 leading-tight min-w-[14px] text-center">{Math.min(unreadMessageCount, 99)}</span> : null}
              </button>
              <button type="button" onClick={() => showActionSuccess('国际化功能开发中')} className="p-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-full transition-colors" title="语言设置"><Icons.Globe className="w-[16px] h-[16px]" /></button>
              <button onClick={toggleDarkMode} className="p-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-full transition-colors">
                 {isDarkMode ? <Icons.Sun className="w-[16px] h-[16px]" /> : <Icons.Moon className="w-[16px] h-[16px]" />}
              </button>
              <button
                onClick={handleLogout}
                className="rounded-full p-1.5 text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                title="退出登录"
              >
                <Icons.LogOut className="w-[16px] h-[16px]" />
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
   )
}

function getDynamicHeaderTitle(pathname: string, navigationItems: NavigationItem[]): string {
  if (pathname === '/logs/login') return '登录日志'
  if (pathname === '/logs/operation') return '操作日志'
  if (pathname === '/tenant/menu-template') return '菜单模板'
  if (pathname === '/tenant/management') return '租户管理'
  if (pathname === '/bi/system') return '系统统计'
  if (pathname === '/bi/usage') return '使用统计'
  if (pathname === '/messages') return '消息中心'

  for (const item of navigationItems) {
    if (item.to === pathname) {
      return item.label
    }

    for (const subItem of item.subItems ?? []) {
      if (subItem.to === pathname) {
        return subItem.label
      }
    }
  }

  return getHeaderTitle(pathname)
}

function buildNavigationItems(menus: DesktopMenu[]): NavigationItem[] {
  if (menus.length === 0) {
    return staticNavigationItems
  }

  const topLevelMenus = menus
    .filter((menu) => menu.path !== '/sysconfig')
    .filter((menu) => menu.parentId === 0)
    .sort((left, right) => left.sort - right.sort || left.id - right.id)

  return topLevelMenus.map((menu) => {
    const childMenus = menus
      .filter((item) => item.parentId === menu.id)
      .sort((left, right) => left.sort - right.sort || left.id - right.id)

    return {
      to: menu.path,
      label: menu.name,
      icon: resolveNavIcon(menu),
      hasSub: childMenus.length > 0,
      subItems: childMenus.length > 0 ? childMenus.map(toNavigationSubItem) : undefined,
    }
  })
}

function toNavigationSubItem(menu: DesktopMenu): NavigationSubItem {
  return {
    to: menu.path,
    label: menu.name,
  }
}

function resolveNavIcon(menu: DesktopMenu): string {
  const iconMap: Record<string, string> = {
    HomeFilled: 'Home',
    DataAnalysis: 'Chart',
    Histogram: 'Chart',
    TrendCharts: 'Chart',
    User: 'UserIcon',
    UserFilled: 'Users',
    Avatar: 'Users',
    Setting: 'Settings',
    Menu: 'Layers',
    MenuIcon: 'Layers',
    CollectionTag: 'Layers',
    Tickets: 'FileText',
    Bell: 'Bell',
    Document: 'FileText',
    DocumentCopy: 'FileText',
    Monitor: 'Activity',
    Message: 'Clock',
    OfficeBuilding: 'Layers',
  }

  return iconMap[menu.icon] ?? resolveNavIconByPath(menu.path)
}

function resolveNavIconByPath(path: string): string {
  if (path === '/') return 'Home'
  if (path.startsWith('/bi')) return 'Chart'
  if (path.startsWith('/profile')) return 'UserIcon'
  if (path.startsWith('/tenant') || path.startsWith('/sysconfig')) return 'Settings'
  if (path.startsWith('/users') || path.startsWith('/roles')) return 'Users'
  if (path.startsWith('/orgs') || path.startsWith('/menus')) return 'Layers'
  if (path.startsWith('/dict') || path.startsWith('/logs')) return 'FileText'
  if (path.startsWith('/announcements')) return 'Bell'
  if (path.startsWith('/monitor')) return 'Activity'
  if (path.startsWith('/messages')) return 'Clock'
  return 'Home'
}

function resolveAvatarSrc(avatar: string | undefined): string {
  if (!avatar) {
    return 'https://api.dicebear.com/7.x/notionists/svg?seed=Felix'
  }

  if (avatar.startsWith('http://') || avatar.startsWith('https://') || avatar.startsWith('blob:') || avatar.startsWith('data:')) {
    return avatar
  }

  const goAdminBaseURL = String(import.meta.env.VITE_GOADMIN_BASE_URL ?? 'http://127.0.0.1:8081').replace(/\/$/, '')
  if (avatar.startsWith('/')) {
    return `${goAdminBaseURL}${avatar}`
  }

  return `${goAdminBaseURL}/${avatar.replace(/^\/+/, '')}`
}

function isPathAllowed(pathname: string, navigationItems: NavigationItem[]): boolean {
  return navigationItems.some((item) => {
    if (item.to === pathname) {
      return true
    }

    return (item.subItems ?? []).some((subItem) => subItem.to === pathname)
  })
}

function getFirstAccessiblePath(navigationItems: NavigationItem[]): string {
  for (const item of navigationItems) {
    const firstSubItem = item.subItems?.[0]
    if (firstSubItem) {
      return firstSubItem.to
    }

    if (item.to) {
      return item.to
    }
  }

  return '/'
}

function flattenNavigationRoutes(navigationItems: NavigationItem[]): SearchRouteItem[] {
  const routes: SearchRouteItem[] = []

  for (const item of navigationItems) {
    if (item.to) {
      routes.push({ to: item.to, label: item.label })
    }

    for (const subItem of item.subItems ?? []) {
      routes.push({ to: subItem.to, label: subItem.label })
    }
  }

  return routes
}
