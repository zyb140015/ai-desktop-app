import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as Icons from '../../icons';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { useDesktopAnnouncementsQuery } from '../hooks/use-desktop-announcements-query';
import { useDesktopMessagesQuery } from '../hooks/use-desktop-messages-query';
import { useDesktopMonitorQuery } from '../hooks/use-desktop-monitor-query';
import { useCurrentMenusQuery } from '../hooks/use-current-menus-query';
import { exportCsvFile, showActionSuccess } from '../lib/action-feedback';
import { filterMenusByVisibility } from '../lib/menu-visibility';
import { useAuthStore } from '../store/auth-store';

type DashboardIconName = keyof typeof Icons;

type TodoBannerItem = {
  name: string;
  count: number;
  icon: DashboardIconName;
};

type MessageRow = {
  id: number;
  title: string;
  creator: string;
  date: string;
  isAnn?: boolean;
};

type FavoriteRow = {
  id: number;
  name: string;
  sub: string;
  type: string;
  color: string;
};

type QuickActionItem = {
  title: string;
  icon: DashboardIconName;
  color: string;
  bg: string;
  path: string;
};

const bannerItems: TodoBannerItem[] = [
  { name: '请假审批', count: 2, icon: 'FileText' },
  { name: '会议审批', count: 6, icon: 'Users' },
  { name: '外出审批', count: 4, icon: 'Globe' },
  { name: '销假申请', count: 1, icon: 'Clock' },
  { name: '用章审批', count: 0, icon: 'Activity' },
  { name: '费用审批', count: 2, icon: 'Layers' },
];

const fallbackUnreadMessageRows: MessageRow[] = [
  { id: 1, title: '审批工单《服务器设备检测》', creator: '孙光洪', date: '2024-07-09 13:36:00' },
  { id: 2, title: '审批工单-用章打印申请', creator: '郑文铭', date: '2024-07-09 11:34:15' },
  { id: 3, title: '审批工单-出差申请', creator: '何家洪', date: '2024-07-09 01:59:36' },
  { id: 4, title: '审批工单-采购申请', creator: '钱浩然', date: '2024-07-08 21:48:34' },
  { id: 5, title: '审批工单-报销团建费用申请', creator: '吴振峰', date: '2024-07-06 14:49:11' },
  { id: 6, title: '审批工单-报销团建费用申请', creator: '吴振峰', date: '2024-07-06 14:49:11' },
];

const fallbackUnreadAnnouncementRows: MessageRow[] = [
  { id: 101, title: '集团办公系统维护通知', creator: '系统公告', date: '2024-07-09 09:00:00', isAnn: true },
  { id: 102, title: '关于提交季度安全检查结果的公告', creator: '行政部', date: '2024-07-08 16:20:00', isAnn: true },
  { id: 103, title: '营销中心周例会时间调整通知', creator: '运营中心', date: '2024-07-08 10:15:00', isAnn: true },
  { id: 104, title: '本月绩效填报截止时间提醒', creator: '人力资源部', date: '2024-07-07 18:30:00', isAnn: true },
  { id: 105, title: '关于机房巡检安排的补充说明', creator: '信息化办公室', date: '2024-07-07 14:10:00', isAnn: true },
  { id: 106, title: '员工培训报名入口已开放', creator: '培训中心', date: '2024-07-06 09:40:00', isAnn: true },
];

const favoriteColors = ['bg-[#F87171]', 'bg-[#A78BFA]', 'bg-blue-400', 'bg-[#10B981]'] as const;

function monitorBadge(level: string): string {
  return level.slice(0, 3) || '监控';
}


const quickActionFallback: QuickActionItem[] = [
  { title: '新建工单', icon: 'FileText', color: 'text-[#10B981]', bg: 'bg-white', path: '/' },
  { title: '新建考评', icon: 'FileText', color: 'text-[#10B981]', bg: 'bg-white', path: '/' },
  { title: '新建会议', icon: 'FileText', color: 'text-[#10B981]', bg: 'bg-white', path: '/' },
  { title: '新建项目', icon: 'FileText', color: 'text-[#10B981]', bg: 'bg-white', path: '/' },
];

function resolveQuickActionIcon(iconName: string): DashboardIconName {
  if (!iconName) return 'Plus';
  if (iconName in Icons) return iconName as DashboardIconName;
  const flatIconName = iconName.replace(/[-_]/g, '').toLowerCase();
  const iconKeys = Object.keys(Icons) as DashboardIconName[];
  const matchedKey = iconKeys.find(key => key.toLowerCase() === flatIconName);
  return matchedKey || 'Plus';
}

function resolveQuickActionStyle(name: string, fallbackIcon: DashboardIconName): { icon: DashboardIconName; color: string; bg: string } {
  if (name.includes('用户')) return { icon: fallbackIcon === 'Plus' ? 'Users' : fallbackIcon, color: 'text-blue-500', bg: 'bg-blue-50 border border-blue-100' };
  if (name.includes('角色') || name.includes('权限')) return { icon: fallbackIcon === 'Plus' ? 'UserIcon' : fallbackIcon, color: 'text-indigo-500', bg: 'bg-indigo-50 border border-indigo-100' };
  if (name.includes('组织') || name.includes('部门')) return { icon: fallbackIcon === 'Plus' ? 'Layers' : fallbackIcon, color: 'text-purple-500', bg: 'bg-purple-50 border border-purple-100' };
  if (name.includes('公告')) return { icon: fallbackIcon === 'Plus' ? 'Bell' : fallbackIcon, color: 'text-amber-500', bg: 'bg-amber-50 border border-amber-100' };
  if (name.includes('消息')) return { icon: fallbackIcon === 'Plus' ? 'Mail' : fallbackIcon, color: 'text-rose-500', bg: 'bg-rose-50 border border-rose-100' };
  if (name.includes('日志')) return { icon: fallbackIcon === 'Plus' ? 'FileText' : fallbackIcon, color: 'text-cyan-500', bg: 'bg-cyan-50 border border-cyan-100' };
  if (name.includes('监控')) return { icon: fallbackIcon === 'Plus' ? 'Activity' : fallbackIcon, color: 'text-red-500', bg: 'bg-red-50 border border-red-100' };
  if (name.includes('字典')) return { icon: fallbackIcon === 'Plus' ? 'Copy' : fallbackIcon, color: 'text-pink-500', bg: 'bg-pink-50 border border-pink-100' };
  if (name.includes('菜单')) return { icon: fallbackIcon === 'Plus' ? 'Grid' : fallbackIcon, color: 'text-emerald-500', bg: 'bg-emerald-50 border border-emerald-100' };
  return { icon: fallbackIcon, color: 'text-[#10B981]', bg: 'bg-emerald-50 border border-emerald-100' };
}

function resolveAvatarSrc(avatar: string | undefined): string {
  if (!avatar) return 'https://api.dicebear.com/7.x/notionists/svg?seed=Felix';
  if (avatar.startsWith('http://') || avatar.startsWith('https://') || avatar.startsWith('blob:') || avatar.startsWith('data:')) {
    return avatar;
  }
  const goAdminBaseURL = String(import.meta.env.VITE_GOADMIN_BASE_URL ?? 'http://127.0.0.1:8081').replace(/\/$/, '');
  if (avatar.startsWith('/')) {
    return `${goAdminBaseURL}${avatar}`;
  }
  return `${goAdminBaseURL}/${avatar.replace(/^\/+/, '')}`;
}


export function OverviewPage() {
  const navigate = useNavigate();
  const currentUser = useAuthStore((state) => state.currentUser);
  const messagesQuery = useDesktopMessagesQuery({ page: 1, pageSize: 6 });
  const announcementsQuery = useDesktopAnnouncementsQuery({ status: '已发布', page: 1, pageSize: 6 });
  const monitorQuery = useDesktopMonitorQuery({ page: 1, pageSize: 8 });
  const menusQuery = useCurrentMenusQuery();
  
  const visibleMenus = useMemo(() => filterMenusByVisibility(menusQuery.data?.list ?? []), [menusQuery.data?.list]);
  const unreadMessages = useMemo(() => (messagesQuery.data?.items ?? []).filter((item) => !item.read), [messagesQuery.data?.items]);

  const [activeTodoTab, setActiveTodoTab] = useState('todo');
  const [activeMsgTab, setActiveMsgTab] = useState('msg');
  const now = new Date();
  const defaultDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(defaultDate);
  const [calendarMonth, setCalendarMonth] = useState<Date>(defaultDate);

  const profileAvatar = resolveAvatarSrc(currentUser?.avatar);
  const profileName = currentUser?.username?.trim() || '未登录';
  const profileTitle = currentUser?.remark?.trim() || '桌面端用户';
  const profileDepartment = currentUser?.remark?.trim() || '未设置';
  const profileUserId = currentUser?.id ? String(currentUser.id) : '未设置';
  const profilePhone = currentUser?.phone?.trim() || '未设置';
  const profileEmail = currentUser?.email?.trim() || '未设置';
  
  const displayBannerItems = useMemo<TodoBannerItem[]>(() => {
    const items: TodoBannerItem[] = [
      { name: '请假审批', count: unreadMessages.length, icon: 'FileText' },
      { name: '会议审批', count: announcementsQuery.data?.total ?? 0, icon: 'Users' },
      { name: '外出审批', count: Number(monitorQuery.data?.summary?.activeAlarmCount ?? 0), icon: 'Globe' },
      { name: '销假申请', count: Number(monitorQuery.data?.summary?.total ?? 0), icon: 'Clock' },
      { name: '用章审批', count: monitorQuery.data?.summary?.highestLevel ? 1 : 0, icon: 'Activity' },
      { name: '费用审批', count: Math.min(visibleMenus.filter((item) => item.path && item.path !== '/').length, 9), icon: 'Layers' },
    ];
    return items.some(i => i.count > 0) ? items : bannerItems;
  }, [announcementsQuery.data?.total, monitorQuery.data?.summary?.activeAlarmCount, monitorQuery.data?.summary?.highestLevel, monitorQuery.data?.summary?.total, unreadMessages.length, visibleMenus]);

  const unreadMessageRows = useMemo<MessageRow[]>(() => {
    if (unreadMessages.length === 0) return fallbackUnreadMessageRows;
    return unreadMessages.slice(0, 6).map((item) => ({
      id: item.id, title: item.title, creator: item.author, date: item.publishedAt,
    }));
  }, [unreadMessages]);

  const unreadAnnouncementRows = useMemo<MessageRow[]>(() => {
    const items = announcementsQuery.data?.items ?? [];
    if (items.length === 0) return fallbackUnreadAnnouncementRows;
    return items.slice(0, 6).map((item) => ({
      id: item.id, title: item.title, creator: item.type, date: item.publish?.split('/')[0] ?? item.publish, isAnn: true,
    }));
  }, [announcementsQuery.data?.items]);

  const currentRows = activeMsgTab === 'msg' ? unreadMessageRows : unreadAnnouncementRows;

  const favoriteRows = useMemo<FavoriteRow[]>(() => {
    const items = monitorQuery.data?.items ?? [];
    if (items.length === 0) return [];
    return items.slice(0, 8).map((item, index) => ({
      id: item.id,
      name: item.metric,
      sub: `${item.value}`,
      type: monitorBadge(item.level),
      color: item.alarm ? 'bg-[#F87171]' : favoriteColors[index % favoriteColors.length],
    }));
  }, [monitorQuery.data?.items]);

  const quickActions = useMemo<QuickActionItem[]>(() => {
    const items = visibleMenus
      .filter((item) => item.path && item.path !== '/')
      .sort((left, right) => left.sort - right.sort)
      .slice(0, 4)
      .map((item) => {
        const icon = resolveQuickActionIcon(item.icon);
        return {
          title: item.name,
          icon: resolveQuickActionStyle(item.name, icon).icon,
          color: resolveQuickActionStyle(item.name, icon).color,
          bg: resolveQuickActionStyle(item.name, icon).bg,
          path: item.path,
        };
      });
    return items.length > 0 ? items : quickActionFallback;
  }, [visibleMenus]);

  const handleFavoriteExport = (item: FavoriteRow) => {
    exportCsvFile(`monitor-resource-${item.id}.csv`, ['名称', '摘要', '级别'], [[item.name, item.sub, item.type]]);
    showActionSuccess('资源导出成功');
  };

  const handleFavoriteDetail = (item: FavoriteRow) => {
    navigate('/monitor', { state: { metric: item.name } });
  };

  const handleCopyUserId = async () => {
    if (!profileUserId || profileUserId === '未设置') {
      return;
    }

    await navigator.clipboard.writeText(profileUserId);
    showActionSuccess('用户ID已复制');
  };

  const handleUnreadRowNavigate = (item: MessageRow) => {
    const keyword = encodeURIComponent(item.title);
    navigate(item.isAnn ? `/announcements?title=${keyword}` : `/messages?q=${keyword}`);
  };

  return (
    <div className="w-full h-full flex flex-col min-h-0">
      
      {/* 1. Header Row (Tabs) */}
      <div className="flex items-end mb-2 shrink-0 px-1 gap-6">
          <div 
            className={`text-[16px] cursor-pointer transition-colors ${activeTodoTab === 'todo' ? 'text-slate-800 font-bold' : 'text-slate-400 hover:text-slate-600'}`}
            onClick={() => setActiveTodoTab('todo')}
          >
             我的待办
          </div>
          <div 
            className={`text-[13px] cursor-pointer transition-colors ${activeTodoTab === 'init' ? 'text-slate-800 font-bold' : 'text-slate-400 hover:text-slate-600'} pb-[1px]`}
            onClick={() => setActiveTodoTab('init')}
          >
             我的发起
          </div>
      </div>

      {/* 2. Todo Banner */}
      <div className="bg-[#10B981] rounded-xl flex justify-between items-center text-white relative h-[90px] shadow-sm overflow-hidden shrink-0 mb-4">
          <div className="absolute top-0 right-0 w-[500px] h-full bg-white/5 skew-x-[35deg] translate-x-32 pointer-events-none"></div>
          
          {displayBannerItems.map((item, i) => {
              const IconComp = Icons[item.icon] || Icons.FileText;
              return (
              <div key={i} className="flex flex-col items-center justify-center flex-1 h-full relative z-10 cursor-pointer hover:bg-white/5 transition-all border-r border-white/10 last:border-0 py-3 group">
                  <div className="flex items-center space-x-3">
                      <div className="w-[42px] h-[42px] rounded-full border border-white/20 flex items-center justify-center bg-white/5 transition-transform group-hover:scale-105 group-hover:bg-white/10">
                         <IconComp className="w-5 h-5 text-white stroke-[1.5]" />
                      </div>
                      <div className="flex flex-col">
                          <span className="text-[13px] text-white font-medium leading-none mb-2">{item.name}</span>
                          <span className="text-[22px] font-bold leading-none">{item.count} <span className="text-[13px] font-normal opacity-90 inline-block ml-0.5">个</span></span>
                      </div>
                  </div>
              </div>
          )})}
      </div>

      {/* 3. Main Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-0">
          
          {/* Left Column (Wider, Col-span-8 approx) */}
          <div className="lg:col-span-8 flex flex-col gap-4 h-full min-h-0">
              
              {/* Messages & Announcements */}
              <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 pt-4 flex flex-col min-h-0 flex-[1.2]">
                  <div className="flex items-center mb-4 shrink-0 relative gap-6">
                      <div 
                        className={`text-[15px] cursor-pointer transition-colors ${activeMsgTab === 'msg' ? 'text-slate-800 font-bold' : 'text-slate-400 hover:text-slate-600'}`}
                        onClick={() => setActiveMsgTab('msg')}
                      >
                        未读消息
                      </div>
                      <div 
                        className={`text-[14px] cursor-pointer transition-colors ${activeMsgTab === 'ann' ? 'text-slate-800 font-bold' : 'text-slate-400 hover:text-slate-600'} pb-[-1px]`}
                        onClick={() => setActiveMsgTab('ann')}
                      >
                        未读公告
                      </div>
                      <button className="ml-auto text-[13px] text-slate-300 hover:text-[#10B981] flex items-center pr-2" onClick={() => navigate(activeMsgTab === 'msg' ? '/messages' : '/announcements')}>
                          <Icons.ChevronDown className="w-4 h-4 -rotate-90" />
                      </button>
                  </div>

                  <div className="flex flex-col flex-1 overflow-hidden pr-1 space-y-[2px]">
                      {currentRows.map((item, i) => (
                          <div key={item.id} className="flex items-center justify-between py-2.5 group cursor-pointer hover:bg-[#F2FAF6] transition-colors rounded" onClick={() => handleUnreadRowNavigate(item)}>
                              <div className="flex items-center flex-1 min-w-0 pr-4">
                                <div className="w-6 h-6 rounded-full bg-[#E6F7F0] flex items-center justify-center flex-shrink-0 mr-3 text-[#10B981] font-bold text-[12px] group-hover:bg-[#10B981] group-hover:text-white transition-colors">
                                    {i + 1}
                                </div>
                                <span className="text-[14px] text-slate-600 font-medium truncate group-hover:text-[#10B981] transition-colors">
                                  {item.title}
                                </span>
                              </div>
                              <div className="flex items-center text-[13px] text-slate-400 flex-shrink-0 gap-6 md:gap-8 pr-2 pl-4">
                                <span className="text-right whitespace-nowrap text-slate-500 font-medium">{item.creator}</span>
                                <span className="w-[130px] md:w-[140px] text-right font-mono text-[13px] text-slate-400 whitespace-nowrap shrink-0">{item.date}</span>
                                <Icons.ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#10B981] transition-colors shrink-0" />
                              </div>
                           </div>
                       ))}
                  </div>
              </div>

              {/* My Favorites (Files) */}
              <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 pt-4 flex flex-col flex-1 min-h-0">
                  <div className="flex items-center justify-between mb-4 shrink-0 relative">
                       <h3 className="text-[16px] font-bold text-slate-800">我的收藏</h3>
                       <button className="text-[13px] text-slate-300 hover:text-[#10B981] flex items-center pr-2">
                          <Icons.ChevronDown className="w-4 h-4 -rotate-90" />
                       </button>
                  </div>

                  <div className="flex-1 overflow-hidden pr-1 pb-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-[13px]">
                        {favoriteRows.map((file) => (
                           <div key={file.id} className="flex justify-between items-start group cursor-pointer relative py-[2px] rounded hover:bg-slate-50 transition-colors -mx-2 px-2">
                              <div className="flex items-start overflow-hidden flex-1 pt-1">
                                <div className={`w-[24px] h-[28px] rounded-[3px] flex items-center justify-center text-[9px] font-bold text-white mr-3 shadow-sm flex-shrink-0 mt-0.5 ${file.color}`}>
                                    {file.type}
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-[14px] text-slate-800 font-bold truncate group-hover:text-[#10B981] transition-colors leading-tight mb-1">{file.name}</span>
                                    <div className="flex items-center text-[11px] text-[#9CA3AF]">
                                      {file.sub}
                                    </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3 ml-4 flex-shrink-0 opacity-100 pt-2 text-slate-300">
                                <button className="hover:text-emerald-500 transition-colors group-hover:text-slate-400" onClick={(e) => { e.stopPropagation(); handleFavoriteExport(file); }}><Icons.Download className="w-[18px] h-[18px]" /></button>
                                <button className="hover:text-emerald-500 transition-colors group-hover:text-slate-400" onClick={(e) => { e.stopPropagation(); handleFavoriteDetail(file); }}><Icons.FileText className="w-[18px] h-[18px]" /></button>
                              </div>
                           </div>
                        ))}
                    </div>
                  </div>
              </div>
          </div>

          {/* Right Column (Narrower, Col-span-4 approx) */}
          <div className="lg:col-span-4 flex flex-col gap-4 h-full min-h-0 flex-shrink-0">
              
              {/* Quick Actions */}
              <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 pt-3 shrink-0">
                  <div className="flex items-center mb-3">
                    <h3 className="text-[15px] font-bold text-slate-800">快捷菜单</h3>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {quickActions.map((btn, i) => {
                      const IconC = Icons[btn.icon] || Icons.FileText;
                      return (
                        <button key={i} className="flex flex-col items-center justify-center group" onClick={() => navigate(btn.path)}>
                            <div className={cn("w-[42px] h-[42px] rounded-xl mb-2 flex items-center justify-center shadow-sm transition-all duration-300 relative", btn.bg, btn.color, "group-hover:opacity-80")}>
                                <IconC className="w-[20px] h-[20px] transition-colors stroke-[1.5]" />
                            </div>
                            <span className="text-[12px] text-slate-700 group-hover:text-emerald-600 font-medium whitespace-nowrap">{btn.title}</span>
                        </button>
                      );
                    })}
                  </div>
              </div>

              {/* Profile Card */}
              <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-3 pt-3 flex flex-col shrink-0 relative">
                <div className="flex items-center w-full relative mb-2">
                    <div className="w-[36px] h-[36px] rounded-full overflow-hidden flex-shrink-0 bg-emerald-50 border shadow-sm">
                        {/* Using custom image since user has a specific scenic avatar in screenshot */}
                        <img src={profileAvatar} alt={profileName} className="w-full h-full object-cover" />
                    </div>
                    <div className="ml-3 flex items-end">
                       <h2 className="text-[15px] font-bold text-slate-800 leading-none">{profileName}</h2>
                       <span className="text-slate-500 text-[11px] ml-2 font-medium leading-none pb-0.5">{profileTitle}</span>
                    </div>
                    <button type="button" className="ml-auto text-slate-300 hover:text-emerald-500 pb-2" onClick={() => navigate('/profile')}>
                       <Icons.ChevronDown className="w-4 h-4 -rotate-90" />
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-y-1.5 gap-x-2 border-t border-slate-50 pt-2.5">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 mb-[1px]">所属部门</span>
                        <span className="text-[12px] text-slate-800 font-medium leading-tight truncate mr-1" title={profileDepartment}>{profileDepartment}</span>
                    </div>
                    <div className="flex flex-col pl-2">
                        <span className="text-[10px] text-slate-400 mb-[1px]">用户ID</span>
                        <div className="flex items-center text-[12px] text-slate-800 font-mono leading-tight whitespace-nowrap">
                            {profileUserId} <Icons.Copy className="w-[12px] h-[12px] text-[#10B981] ml-1.5 cursor-pointer opacity-90" onClick={handleCopyUserId} />
                        </div>
                    </div>

                    <div className="flex flex-col mt-0.5">
                        <span className="text-[10px] text-slate-400 mb-[1px]">账号</span>
                        <span className="text-[12px] text-slate-800 font-medium leading-tight">{profileName}</span>
                    </div>
                    <div className="flex flex-col pl-2 mt-0.5">
                        <span className="text-[10px] text-slate-400 mb-[1px]">职称</span>
                        <span className="text-[12px] text-slate-800 font-medium leading-tight">{profileTitle}</span>
                    </div>

                    <div className="flex flex-col mt-0.5">
                        <span className="text-[10px] text-slate-400 mb-[1px]">手机号</span>
                        <span className="text-[12px] text-slate-800 font-mono leading-tight">{profilePhone}</span>
                    </div>
                    <div className="flex flex-col pl-2 mt-0.5">
                        <span className="text-[10px] text-slate-400 mb-[1px]">邮箱</span>
                        <span className="text-[12px] text-slate-800 font-mono leading-tight truncate mr-2" title={profileEmail}>{profileEmail}</span>
                    </div>
                </div>
              </div>

              {/* Calendar */}
              <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-3 pt-2.5 flex flex-col flex-1 min-h-0 relative">
                  <div className="flex-1 flex flex-col items-center justify-start overflow-visible min-h-0 w-full">
                    {/* Custom Header replacing Calendar Nav */}
                    <div className="flex items-center justify-between w-full px-0.5 mb-1 shrink-0 z-20">
                      <div className="flex items-center">
                        <button 
                          type="button"
                          className="w-7 h-7 flex items-center justify-center text-[#1e293b] hover:text-[#10B981] transition-colors ml-[-4px]"
                          onClick={() => setCalendarMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}
                        >
                          <Icons.ArrowRight className="w-[20px] h-[20px] rotate-180 stroke-[2]" />
                        </button>
                        <h3 className="text-[15px] font-bold text-[#1e293b] tracking-wide ml-1">我的日程</h3>
                      </div>
                      <button 
                        type="button"
                        className="w-7 h-7 flex items-center justify-center text-[#1e293b] hover:text-[#10B981] transition-colors mr-[-4px]"
                        onClick={() => setCalendarMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}
                      >
                        <Icons.ArrowRight className="w-[20px] h-[20px] stroke-[2]" />
                      </button>
                    </div>

                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      month={calendarMonth}
                      onMonthChange={setCalendarMonth}
                      disableNavigation={true}
                      weekStartsOn={1} 
                      className="pointer-events-auto flex w-full max-w-[360px] flex-col p-0 items-center justify-center"
                      formatters={{
                        formatWeekdayName: (day) => ['周日','周一','周二','周三','周四','周五','周六'][day.getDay()]
                      }}
                      classNames={{
                        months: "flex w-full flex-col items-center space-y-0",
                        month: "mx-auto w-auto space-y-0 relative",
                        caption: "flex justify-center relative mb-1 shrink-0",
                        caption_label: "text-[18px] font-bold text-[#1e293b] tracking-wider",
                        nav: "hidden", // Nav is completely hidden as we use our own block above
                        table: "mx-auto border-separate border-spacing-x-0 border-spacing-y-0.5",
                        head_row: "flex justify-between mb-0.5 px-1 gap-1",
                        head_cell: "text-slate-500 font-normal text-[12px] w-10 text-center font-sans tracking-wide",
                        row: "flex justify-between px-1 gap-1",
                        cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 h-[32px] w-10 flex flex-col items-center justify-start",
                        day: cn(
                          "h-[30px] w-[30px] p-0 font-medium rounded-md transition-all duration-200 flex flex-col items-center justify-center text-[13px] text-slate-700 font-sans tracking-tight",
                          "aria-selected:bg-[#10B981] aria-selected:text-white"
                        ),
                        today: "text-slate-700",
                        outside: "text-slate-200 font-normal opacity-70",
                        day_disabled: "text-slate-300 opacity-50",
                        day_hidden: "invisible",
                      }}
                      components={{
                        Day: (props) => {
                          const buttonProps: any = { ...props };
                          delete buttonProps.day;
                          delete buttonProps.modifiers;

                          return (
                             <div className="flex flex-col items-center justify-start w-full h-full relative group pt-0">
                               <button {...buttonProps} className={cn(props.className, "relative z-10 hover:bg-slate-50 dark:hover:bg-slate-800")} />
                            </div>
                          );
                        }
                      }}
                    />
                  </div>
              </div>

          </div>
      </div>

    </div>
  );
}
