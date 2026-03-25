export type NavigationSubItem = {
  to: string
  label: string
}

export type NavigationItem = {
  to: string
  label: string
  icon: string
  hasSub: boolean
  subItems?: NavigationSubItem[]
}

export const staticNavigationItems: NavigationItem[] = [
  { to: '/', label: '工作台', icon: 'Home', hasSub: false },
  { 
    to: '/bi', 
    label: 'BI分析', 
    icon: 'Chart', 
    hasSub: true,
    subItems: [
      { to: '/bi/system', label: '系统统计' },
      { to: '/bi/usage', label: '使用统计' }
    ]
  },
  { to: '/profile', label: '个人中心', icon: 'UserIcon', hasSub: false },
  { 
    to: '/tenant', 
    label: '租户配置', 
    icon: 'Settings', 
    hasSub: true,
    subItems: [
      { to: '/tenant/menu-template', label: '菜单模板' },
      { to: '/tenant/management', label: '租户管理' }
    ]
  },
  { to: '/orgs', label: '组织管理', icon: 'Layers', hasSub: false },
  { to: '/users', label: '用户管理', icon: 'Users', hasSub: false },
  { to: '/roles', label: '角色管理', icon: 'Users', hasSub: false },
  { to: '/menus', label: '菜单管理', icon: 'Layers', hasSub: false },
  { to: '/dict', label: '字典管理', icon: 'FileText', hasSub: false },
  { to: '/announcements', label: '公告管理', icon: 'Bell', hasSub: false },
  { 
    to: '/logs', 
    label: '系统日志', 
    icon: 'CheckCircle', 
    hasSub: true,
    subItems: [
      { to: '/logs/login', label: '登录日志' },
      { to: '/logs/operation', label: '操作日志' }
    ]
  },
  { to: '/monitor', label: '系统监控', icon: 'Activity', hasSub: false },
  { to: '/messages', label: '消息中心', icon: 'Clock', hasSub: false },
  { to: '/sysconfig', label: '系统设置', icon: 'Settings', hasSub: false },
] 
