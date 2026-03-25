import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as Icons from '../components/icons';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { useDesktopAnnouncementsQuery } from '../hooks/use-desktop-announcements-query';
import { useDesktopMessagesQuery } from '../hooks/use-desktop-messages-query';
import { useDesktopMonitorQuery } from '../hooks/use-desktop-monitor-query';
import { useCurrentMenusQuery } from '../hooks/use-current-menus-query';
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

const bannerFallback: TodoBannerItem[] = [
  { name: '请假审批', count: 0, icon: 'FileText' },
  { name: '会议审批', count: 0, icon: 'Users' },
  { name: '外出审批', count: 0, icon: 'Globe' },
  { name: '销假申请', count: 0, icon: 'Clock' },
  { name: '用章审批', count: 0, icon: 'Activity' },
  { name: '费用审批', count: 0, icon: 'Layers' },
];

const quickActionFallback: QuickActionItem[] = [
  { title: '消息中心', icon: 'FileText', color: 'text-[#10B981]', bg: 'bg-emerald-50', path: '/messages' },
  { title: '公告管理', icon: 'CheckCircle', color: 'text-[#10B981]', bg: 'bg-emerald-50', path: '/announcements' },
  { title: '系统监控', icon: 'Clock', color: 'text-[#10B981]', bg: 'bg-emerald-50', path: '/monitor' },
  { title: '用户管理', icon: 'Plus', color: 'text-[#10B981]', bg: 'bg-emerald-50', path: '/users' },
];

const favoriteColors = ['bg-[#F87171]', 'bg-[#A78BFA]', 'bg-[#F87171]', 'bg-[#10B981]'] as const;

export function OverviewPage() {
  const navigate = useNavigate();
  const currentUser = useAuthStore((state) => state.currentUser);
  const [activeTodoTab, setActiveTodoTab] = useState('todo');
  const [activeMsgTab, setActiveMsgTab] = useState('msg');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const messagesQuery = useDesktopMessagesQuery({ page: 1, pageSize: 6 });
  const announcementsQuery = useDesktopAnnouncementsQuery({ page: 1, pageSize: 6 });
  const monitorQuery = useDesktopMonitorQuery({ page: 1, pageSize: 8 });
  const menusQuery = useCurrentMenusQuery();

  const unreadMessages = useMemo(() => (messagesQuery.data?.items ?? []).filter((item) => !item.read), [messagesQuery.data?.items]);

  const todoBannerItems = useMemo<TodoBannerItem[]>(() => {
    const items: TodoBannerItem[] = [
      { name: '请假审批', count: unreadMessages.length, icon: 'FileText' },
      { name: '会议审批', count: announcementsQuery.data?.total ?? 0, icon: 'Users' },
      { name: '外出审批', count: Number(monitorQuery.data?.summary.activeAlarmCount ?? 0), icon: 'Globe' },
      { name: '销假申请', count: Number(monitorQuery.data?.summary.total ?? 0), icon: 'Clock' },
      { name: '用章审批', count: monitorQuery.data?.summary.highestLevel ? 1 : 0, icon: 'Activity' },
      { name: '费用审批', count: Math.min((menusQuery.data?.list ?? []).filter((item) => item.path && item.path !== '/').length, 9), icon: 'Layers' },
    ];

    return items.length > 0 ? items : bannerFallback;
  }, [announcementsQuery.data?.total, menusQuery.data?.list, monitorQuery.data?.summary.activeAlarmCount, monitorQuery.data?.summary.highestLevel, monitorQuery.data?.summary.total, unreadMessages.length]);

  const messageRows = useMemo<MessageRow[]>(() => {
    if (activeMsgTab === 'msg') {
      return unreadMessages.map((item) => ({
        id: item.id,
        title: item.title,
        creator: item.author,
        date: item.publishedAt,
      }));
    }

    return (announcementsQuery.data?.items ?? []).map((item) => ({
      id: item.id,
      title: item.title,
      creator: item.type,
      date: extractTimestamp(item.publish),
    }));
  }, [activeMsgTab, announcementsQuery.data?.items, unreadMessages]);

  const favoriteRows = useMemo<FavoriteRow[]>(() => {
    return (monitorQuery.data?.items ?? []).map((item, index) => ({
      id: item.id,
      name: item.metric,
      sub: `${item.value} / ${item.occurredAt} / ${item.status}`,
      type: monitorBadge(item.level),
      color: item.alarm ? 'bg-[#F87171]' : favoriteColors[index % favoriteColors.length],
    }));
  }, [monitorQuery.data?.items]);

  const quickActions = useMemo<QuickActionItem[]>(() => {
    const items = (menusQuery.data?.list ?? [])
      .filter((item) => item.path && item.path !== '/')
      .sort((left, right) => left.sort - right.sort)
      .slice(0, 4)
      .map((item) => {
        const fallback = resolveQuickActionIcon(item.icon);
        let icon = fallback;
        let color = 'text-[#10B981]';
        let bg = 'bg-emerald-50 dark:bg-emerald-500/10 border border-transparent dark:border-emerald-500/20';

        if (item.name.includes('用户')) {
          icon = fallback === 'Plus' ? 'Users' : fallback;
          color = 'text-blue-500 dark:text-blue-400'; bg = 'bg-blue-50 dark:bg-blue-500/10 border border-transparent dark:border-blue-500/20';
        } else if (item.name.includes('角色') || item.name.includes('权限')) {
          icon = fallback === 'Plus' ? 'UserIcon' : fallback;
          color = 'text-indigo-500 dark:text-indigo-400'; bg = 'bg-indigo-50 dark:bg-indigo-500/10 border border-transparent dark:border-indigo-500/20';
        } else if (item.name.includes('组织') || item.name.includes('部门')) {
          icon = fallback === 'Plus' ? 'Layers' : fallback;
          color = 'text-purple-500 dark:text-purple-400'; bg = 'bg-purple-50 dark:bg-purple-500/10 border border-transparent dark:border-purple-500/20';
        } else if (item.name.includes('系统') || item.name.includes('配置')) {
          icon = fallback === 'Plus' ? 'Settings' : fallback;
          color = 'text-slate-500 dark:text-slate-400'; bg = 'bg-slate-100 dark:bg-slate-500/10 border border-transparent dark:border-slate-500/20';
        } else if (item.name.includes('消息')) {
          icon = fallback === 'Plus' ? 'Mail' : fallback;
          color = 'text-rose-500 dark:text-rose-400'; bg = 'bg-rose-50 dark:bg-rose-500/10 border border-transparent dark:border-rose-500/20';
        } else if (item.name.includes('公告')) {
          icon = fallback === 'Plus' ? 'Bell' : fallback;
          color = 'text-amber-500 dark:text-amber-400'; bg = 'bg-amber-50 dark:bg-amber-500/10 border border-transparent dark:border-amber-500/20';
        } else if (item.name.includes('日志')) {
          icon = fallback === 'Plus' ? 'FileText' : fallback;
          color = 'text-cyan-500 dark:text-cyan-400'; bg = 'bg-cyan-50 dark:bg-cyan-500/10 border border-transparent dark:border-cyan-500/20';
        } else if (item.name.includes('监控')) {
          icon = fallback === 'Plus' ? 'Activity' : fallback;
          color = 'text-red-500 dark:text-red-400'; bg = 'bg-red-50 dark:bg-red-500/10 border border-transparent dark:border-red-500/20';
        } else if (item.name.includes('字典')) {
          icon = fallback === 'Plus' ? 'Copy' : fallback;
          color = 'text-pink-500 dark:text-pink-400'; bg = 'bg-pink-50 dark:bg-pink-500/10 border border-transparent dark:border-pink-500/20';
        }

        return {
          title: item.name,
          icon,
          color,
          bg,
          path: item.path,
        };
      });

    return items.length > 0 ? items : quickActionFallback;
  }, [menusQuery.data?.list]);

  const profileAvatar = currentUser?.avatar || 'https://api.dicebear.com/7.x/notionists/svg?seed=Liz&backgroundColor=d1fae5';
  const profileName = currentUser?.username || '暂无数据';
  const profileTitle = currentUser?.remark || '当前登录用户';
  const profileDepartment = currentUser?.remark || '暂无数据';
  const profileID = currentUser ? String(currentUser.id) : '暂无数据';
  const profilePhone = currentUser?.phone || '暂无数据';
  const profileEmail = currentUser?.email || '暂无数据';

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
                className={`text-[14px] font-bold cursor-pointer mr-6 relative transition-colors ${activeTodoTab === 'todo' ? 'text-slate-800 dark:text-slate-200' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:text-slate-400'}`}
                onClick={() => setActiveTodoTab('todo')}
              >
                 我的待办
                 {activeTodoTab === 'todo' && <div className="absolute -bottom-1 left-0 right-0 h-[3px] bg-[#10B981] rounded-full"></div>}
              </div>
              {/* <div 
                className={`text-[14px] font-bold cursor-pointer relative transition-colors ${activeTodoTab === 'init' ? 'text-slate-800 dark:text-slate-200' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:text-slate-400'}`}
                onClick={() => setActiveTodoTab('init')}
              >
                 我的发起
                 {activeTodoTab === 'init' && <div className="absolute -bottom-1 left-0 right-0 h-[3px] bg-[#10B981] rounded-full"></div>}
              </div> */}
          </div>

          <div className="bg-gradient-to-br from-[#10B981] via-[#059669] to-[#047857] rounded-xl flex justify-between items-center text-white relative overflow-hidden h-[80px] shadow-lg shadow-emerald-500/10 group">
              <div className="absolute top-0 right-0 w-[500px] h-full bg-white/5 skew-x-[35deg] translate-x-32 group-hover:translate-x-28 transition-transform duration-700 ease-out"></div>
              
              {todoBannerItems.map((item, i) => {
                  const IconComp = Icons[item.icon] || Icons.FileText;
                  return (
                  <div key={i} className="flex items-center flex-1 justify-center border-r border-white/10 last:border-transparent h-full relative z-10 cursor-pointer hover:bg-white/5 transition-all group/item">
                      <div className="w-[42px] h-[42px] rounded-xl border border-white/20 flex items-center justify-center mr-3 bg-white/10 group-hover/item:scale-110 group-hover/item:bg-white/20 transition-all duration-300 shrink-0 shadow-inner">
                         <IconComp className="w-5 h-5 text-emerald-50" />
                      </div>
                      <div className="flex flex-col items-start leading-tight min-w-0">
                          <span className="text-[12px] text-emerald-100/80 mb-0.5 truncate w-full font-medium">{item.name}</span>
                          <span className="text-[22px] font-bold tracking-tight">{item.count} <span className="text-[11px] font-normal opacity-70">个</span></span>
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
              
              {/* Messages & Announcements */}
              <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-100/60 dark:border-slate-800/50 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] p-4 pt-3 flex flex-col shrink-0 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-emerald-50/20 to-transparent pointer-events-none transition-opacity group-hover:opacity-40"></div>
                  
                  <div className="flex items-center mb-1 shrink-0 border-b border-emerald-100/60 pb-1.5 relative z-10">
                      <div 
                        className={`text-[14px] font-bold cursor-pointer mr-6 relative transition-colors ${activeMsgTab === 'msg' ? 'text-slate-800 dark:text-slate-200' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:text-slate-400'}`}
                        onClick={() => setActiveMsgTab('msg')}
                      >
                        未读消息
                        {activeMsgTab === 'msg' && <div className="absolute -bottom-[7px] left-0 right-0 h-[2px] bg-[#10B981] rounded-t"></div>}
                      </div>
                      <div 
                        className={`text-[14px] font-bold cursor-pointer relative transition-colors ${activeMsgTab === 'ann' ? 'text-slate-800 dark:text-slate-200' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:text-slate-400'}`}
                        onClick={() => setActiveMsgTab('ann')}
                      >
                        未读公告
                        {activeMsgTab === 'ann' && <div className="absolute -bottom-[7px] left-0 right-0 h-[2px] bg-[#10B981] rounded-t"></div>}
                      </div>
                      <button className="ml-auto text-[12px] text-slate-400 dark:text-slate-500 hover:text-[#10B981] flex items-center" onClick={() => navigate(activeMsgTab === 'msg' ? '/messages' : '/announcements')}>
                          更多 <Icons.ArrowRight className="w-3 h-3 ml-1" />
                      </button>
                  </div>

                  <div className="relative z-10 h-[224px] overflow-y-auto custom-scrollbar pr-1">
                    {messageRows.length === 0 ? (
                      <div className="flex h-full flex-col items-center justify-center text-slate-400 opacity-80 space-y-3">
                        <Icons.FileText className="w-10 h-10 stroke-1" />
                        <span className="text-[13px]">暂无数据</span>
                      </div>
                    ) : (
                      <div className="space-y-0 text-[13px]">
                      {messageRows.map((item, i) => (
                          <div key={item.id} className="flex items-center justify-between py-[5px] border-b border-gray-50/70 last:border-[#E2E8F0] dark:border-slate-700 hover:bg-emerald-50/30 -mx-1 px-1 rounded transition-colors group">
                              <div className="flex items-center flex-1 min-w-0">
                                <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mr-2 text-emerald-600 font-bold text-[10px] font-mono">
                                    {i + 1}
                                </div>
                                <span className="text-slate-600 dark:text-slate-400 group-hover:text-[#10B981] truncate">{item.title}</span>
                              </div>
                              <div className="flex items-center text-[12px] text-slate-400 dark:text-slate-500 flex-shrink-0">
                                <span className="w-16 text-center truncate">{item.creator}</span>
                                <span className="w-32 text-right font-mono ml-3">{item.date}</span>
                                <Icons.ArrowRight className="w-3 h-3 ml-3 text-slate-300 dark:text-slate-600 group-hover:text-[#10B981] transition-colors" />
                              </div>
                          </div>
                      ))}
                      </div>
                    )}
                  </div>
              </div>

              {/* My Favorites (Files) */}
              <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-100/60 dark:border-slate-800/50 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] p-4 pt-3 flex flex-col flex-1 min-h-0">
                  <div className="flex items-center justify-between mb-3 shrink-0 border-b border-slate-50/80 dark:border-slate-800/80 pb-2">
                       <h3 className="text-[14px] font-bold text-slate-800 dark:text-slate-200">应用资源与收藏</h3>                      <button className="text-[12px] text-slate-400 dark:text-slate-500 hover:text-[#10B981] flex items-center" onClick={() => navigate('/monitor')}>
                         <Icons.ArrowRight className="w-3 h-3 ml-1" />
                      </button>
                  </div>

                  <div className="flex-1 overflow-hidden -mx-1 px-1 min-h-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-[1px] mt-0.5">
                        {favoriteRows.map((file) => (
                           <div key={file.id} className="flex justify-between items-center group cursor-pointer hover:bg-slate-50 dark:bg-slate-900/80 p-1.5 -mx-1.5 rounded transition-all">
                              <div className="flex items-start overflow-hidden flex-1">
                                <div className={`w-[20px] h-[20px] rounded flex items-center justify-center text-[7.5px] font-bold text-white mr-2 mt-0.5 flex-shrink-0 leading-none shadow-sm ${file.color}`}>{file.type}</div>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-[12.5px] text-slate-700 dark:text-slate-300 font-medium truncate group-hover:text-[#10B981] transition-colors leading-tight">{file.name}</span>
                                    <span className="text-[10.5px] text-slate-400 dark:text-slate-500 mt-[1px] truncate">{file.sub}</span>
                                </div>
                              </div>
                              <div className="flex space-x-2.5 ml-2 flex-shrink-0 text-slate-400 dark:text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
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
              
              <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-100/60 dark:border-slate-800/50 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] p-3 shrink-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-[14px] font-bold text-slate-800 dark:text-slate-200 bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent inline-block">快速导航</h3>
                    <div className="flex gap-1">
                      <div className="w-1 h-1 rounded-full bg-emerald-400/50"></div>
                      <div className="w-1 h-1 rounded-full bg-emerald-400"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-2.5">
                    {quickActions.map((btn, i) => {
                      const IconC = Icons[btn.icon];
                      return (
                        <button key={i} className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all duration-300 group relative overflow-hidden" onClick={() => navigate(btn.path)}>
                            <div className={`w-9 h-9 rounded-xl mb-2 flex items-center justify-center ${btn.bg} shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                                {IconC && <IconC className={`w-[18px] h-[18px] ${btn.color}`} />}
                            </div>
                            <span className="text-[11px] text-slate-600 dark:text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 font-semibold tracking-tight whitespace-nowrap">{btn.title}</span>
                        </button>
                      );
                    })}
                  </div>
              </div>

              {/* Profile Card (Premium Compact) */}
              <div className="bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-950 dark:to-slate-900/50 rounded-xl border border-slate-100/60 dark:border-slate-800/50 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] p-2.5 flex flex-col shrink-0 relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-16 h-16 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-all duration-500"></div>
                
                <div className="flex items-center mb-2 pb-2 border-b border-slate-100/80 dark:border-slate-800/80 relative cursor-pointer">
                    <div className="relative">
                      <div className="w-[40px] h-[40px] rounded-full bg-emerald-50 dark:bg-emerald-900/20 overflow-hidden flex-shrink-0 ring-2 ring-emerald-500/10 ring-offset-2 dark:ring-offset-slate-950 shadow-sm transition-transform group-hover:scale-105 duration-300">
                          <img src={profileAvatar} alt={profileName} className="w-full h-full object-cover" />
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-950 rounded-full shadow-sm"></div>
                    </div>
                    <div className="ml-3 min-w-0 flex-1 pr-2">
                       <h2 className="text-[15px] font-bold text-slate-800 dark:text-slate-200 leading-tight truncate group-hover:text-emerald-600 transition-colors">{profileName}</h2>
                       <div className="flex items-center mt-0.5">
                         <span className="inline-block px-1.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[9px] font-bold uppercase tracking-wider">{profileTitle}</span>
                       </div>
                    </div>
                    <Icons.Settings className="w-4 h-4 text-slate-300 dark:text-slate-600 hover:text-emerald-500 transition-colors" />
                </div>

                <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                    <div className="flex items-center min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center mr-2 shrink-0">
                         <Icons.Layers className="w-3.5 h-3.5 text-blue-500" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-slate-400 dark:text-slate-500 text-[9px] uppercase font-bold tracking-tighter">所属部门</span>
                        <span className="text-slate-700 dark:text-slate-200 text-[10.5px] font-medium truncate leading-tight" title={profileDepartment}>{profileDepartment}</span>
                      </div>
                    </div>
                    <div className="flex items-center min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center mr-2 shrink-0">
                         <Icons.Globe className="w-3.5 h-3.5 text-purple-500" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-slate-400 dark:text-slate-500 text-[9px] uppercase font-bold tracking-tighter">用户 ID</span>
                        <span className="text-slate-700 dark:text-slate-200 text-[10.5px] font-mono font-medium truncate leading-tight">{profileID}</span>
                      </div>
                    </div>
                    <div className="flex items-center min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center mr-2 shrink-0">
                         <Icons.Phone className="w-3.5 h-3.5 text-amber-500" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-slate-400 dark:text-slate-500 text-[9px] uppercase font-bold tracking-tighter">联系电话</span>
                        <span className="text-slate-700 dark:text-slate-200 text-[10.5px] font-mono font-medium truncate leading-tight">{profilePhone}</span>
                      </div>
                    </div>
                    <div className="flex items-center min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center mr-2 shrink-0">
                         <Icons.Mail className="w-3.5 h-3.5 text-rose-500" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-slate-400 dark:text-slate-500 text-[9px] uppercase font-bold tracking-tighter">电子邮箱</span>
                        <span className="text-slate-700 dark:text-slate-200 text-[10.5px] font-medium truncate leading-tight" title={profileEmail}>{profileEmail}</span>
                      </div>
                    </div>
                </div>
              </div>

              {/* My Schedule (Premium Calendar) */}
              <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-100/60 dark:border-slate-800/50 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] p-4 flex flex-col flex-1 min-h-0 relative overflow-hidden group">
                  <div className="flex items-center justify-between mb-3 shrink-0">
                      <div className="flex flex-col">
                        <h3 className="text-[14px] font-bold text-slate-800 dark:text-slate-200 leading-tight">日程历程</h3>
                        <p className="text-[10px] text-slate-400 font-medium">查看今日事项与规划</p>
                      </div>
                      <button className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/10 hover:bg-emerald-500 hover:text-white transition-all duration-300 shadow-sm" onClick={() => setSelectedDate(new Date())}>今天</button>
                  </div>

                  <div className="flex-1 flex items-start justify-center overflow-hidden">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="p-0 pointer-events-auto"
                      classNames={{
                        months: "flex flex-col w-full",
                        month: "w-full space-y-2",
                        month_caption: "hidden",
                        nav: "hidden",
                        table: "w-full border-collapse",
                        head_row: "flex w-full justify-between mb-2",
                        head_cell: "text-slate-400 dark:text-slate-500 w-full font-bold text-[10px] uppercase tracking-widest text-center",
                        row: "flex w-full justify-between mt-0.5",
                        cell: "relative w-full aspect-square p-0 flex items-center justify-center",
                        day: cn(
                          "w-7 h-7 md:w-8 md:h-8 p-0 font-semibold flex items-center justify-center rounded-lg transition-all duration-200 text-[12px] hover:bg-emerald-50 dark:hover:bg-emerald-500/10 hover:text-emerald-600",
                          "aria-selected:bg-emerald-500 aria-selected:text-white aria-selected:shadow-lg aria-selected:shadow-emerald-500/30 aria-selected:scale-110"
                        ),
                        today: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/20",
                        outside: "opacity-20 pointer-events-none",
                      }}
                    />
                  </div>
              </div>

          </div>
      </div>

    </div>
  );
}

function resolveQuickActionIcon(iconName: string): DashboardIconName {
  if (!iconName) return 'Plus';
  
  if (iconName in Icons) {
    return iconName as DashboardIconName;
  }

  const normalized = iconName
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');

  if (normalized in Icons) {
    return normalized as DashboardIconName;
  }

  const flatIconName = iconName.replace(/[-_]/g, '').toLowerCase();
  const iconKeys = Object.keys(Icons) as DashboardIconName[];
  
  const matchedKey = iconKeys.find(key => key.toLowerCase() === flatIconName);
  
  if (matchedKey) {
    return matchedKey;
  }

  return 'Plus';
}

function extractTimestamp(value: string): string {
  return value.split('/')[0] || value;
}

function monitorBadge(level: string): string {
  return level.slice(0, 3) || '监控';
}
