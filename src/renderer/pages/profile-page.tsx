import * as React from 'react';

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
// @ts-ignore
import { User, KeyRound, Shield, Link2, Fingerprint, Monitor, LogOut } from "lucide-react";

export function ProfilePage() {
  const [activeTab, setActiveTab] = React.useState('basic');

  const menuItems = [
    { key: 'basic', label: '基本信息', icon: User },
    { key: 'account', label: '账号信息', icon: User },
    { key: 'permission', label: '权限信息', icon: Shield },
    { key: 'bindAuth', label: '绑定授权', icon: Link2 },
    { key: 'realName', label: '实名认证', icon: Fingerprint },
    { key: 'device', label: '我的设备', icon: Monitor },
    { key: 'logout', label: '注销账号', icon: LogOut },
  ];

  return (
    <div className="w-full h-full max-w-[1600px] mx-auto flex min-h-0">
      
      {/* Left Panel - Profile Card + Navigation */}
      <div className="w-[300px] shrink-0 flex flex-col items-center pt-8">
        {/* Avatar */}
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg mb-2 bg-gradient-to-br from-cyan-100 to-emerald-100">
          <img 
            src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix" 
            alt="用户头像"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Menu Navigation */}
        <nav className="w-full mt-6 flex flex-col space-y-1 px-4">
          {menuItems.map((item) => {
            const isActive = activeTab === item.key;
            const IconComp = item.icon;
            return (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                className={cn(
                  "flex items-center w-full px-6 py-2.5 rounded-lg text-[13px] transition-colors text-left",
                  isActive 
                    ? "bg-emerald-50 text-[#10B981] font-medium border border-emerald-100" 
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:bg-slate-900 hover:text-slate-800 dark:text-slate-200"
                )}
              >
                <IconComp className={cn("w-[16px] h-[16px] mr-3 shrink-0", isActive ? "text-[#10B981]" : "text-slate-400 dark:text-slate-500")} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Right Panel - Detail Card */}
      <div className="flex-1 min-w-0 p-6 pt-10 pl-0">
        <div className="bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl shadow-sm h-full flex flex-col">
          {/* Detail Header */}
          <div className="flex items-center justify-between px-8 pt-5 pb-4 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-[14px] font-bold text-slate-800 dark:text-slate-200">
              {menuItems.find(m => m.key === activeTab)?.label}
            </h2>
            <Button className="h-[28px] px-4 bg-[#10B981] text-[12px] text-white hover:bg-emerald-600 font-medium">编辑</Button>
          </div>

          {/* Detail Content */}
          <div className="flex-1 px-8 py-8 overflow-auto custom-scrollbar">
            {activeTab === 'basic' && (
              <div className="space-y-7">
                <div className="flex items-start">
                  <span className="w-16 text-[13px] text-slate-500 dark:text-slate-400 shrink-0 pt-0.5">姓名</span>
                  <span className="ml-8 text-[13px] text-slate-800 dark:text-slate-200 font-medium">李昭欣</span>
                </div>
                <div className="flex items-start">
                  <span className="w-16 text-[13px] text-slate-500 dark:text-slate-400 shrink-0 pt-0.5">用户ID</span>
                  <span className="ml-8 text-[13px] text-slate-800 dark:text-slate-200 font-mono">25524934542848</span>
                </div>
                <div className="flex items-start">
                  <span className="w-16 text-[13px] text-slate-500 dark:text-slate-400 shrink-0 pt-0.5">所属部门</span>
                  <span className="ml-8 text-[13px] text-slate-800 dark:text-slate-200">明镜集团/桃花源分公司/营销部</span>
                </div>
                <div className="flex items-center">
                  <span className="w-16 text-[13px] text-slate-500 dark:text-slate-400 shrink-0">状态</span>
                  <span className="ml-8">
                    <Badge variant="outline" className="rounded font-medium px-2 py-0 border-[#E2E8F0] dark:border-slate-700 pointer-events-none bg-emerald-50 text-[#10B981]">
                      启用
                    </Badge>
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="w-16 text-[13px] text-slate-500 dark:text-slate-400 shrink-0 pt-0.5">岗位</span>
                  <span className="ml-8 text-[13px] text-slate-800 dark:text-slate-200">信息化办公室主任</span>
                </div>
              </div>
            )}
            
            {activeTab === 'account' && (
              <div className="space-y-6">
                <div className="flex items-start">
                  <span className="w-16 text-[13px] text-slate-500 dark:text-slate-400 shrink-0 pt-0.5">账号</span>
                  <span className="ml-8 text-[13px] text-slate-800 dark:text-slate-200 font-mono">wangsixiao</span>
                </div>
                <div className="flex items-start">
                  <span className="w-16 text-[13px] text-slate-500 dark:text-slate-400 shrink-0 pt-0.5">手机号</span>
                  <span className="ml-8 text-[13px] text-slate-800 dark:text-slate-200 font-mono">133 1234 1234</span>
                </div>
                <div className="flex items-start">
                  <span className="w-16 text-[13px] text-slate-500 dark:text-slate-400 shrink-0 pt-0.5">密码</span>
                  <span className="ml-8 text-[13px] text-slate-800 dark:text-slate-200 align-middle leading-tight mt-[1px]">******</span>
                </div>
                <div className="flex items-start">
                  <span className="w-16 text-[13px] text-slate-500 dark:text-slate-400 shrink-0 pt-0.5">邮箱</span>
                  <span className="ml-8 text-[13px] text-slate-800 dark:text-slate-200 font-mono">wangsixiao@163.com</span>
                </div>
                <div className="flex items-center">
                  <span className="w-16 text-[13px] text-slate-500 dark:text-slate-400 shrink-0">密保</span>
                  <span className="ml-8">
                    <Badge variant="outline" className="rounded-[4px] font-medium px-2 py-[1px] border-[#E2E8F0] dark:border-slate-700 pointer-events-none bg-amber-50 text-amber-500 text-[11px]">
                      未设置
                    </Badge>
                  </span>
                </div>
              </div>
            )}
            
            {activeTab === 'permission' && (
              <div className="space-y-8 pb-4">
                
                {/* 1. Account Permissions */}
                <div>
                  <h3 className="text-[13px] font-bold text-slate-800 dark:text-slate-200 mb-4 border-l-2 border-[#10B981] pl-2">账号权限</h3>
                  <div className="flex items-center space-x-6">
                    {['超管', '高管', '运维', '财务'].map((role, idx) => (
                      <div key={role} className="flex items-center space-x-2">
                        <input type="checkbox" id={`role-${idx}`} checked={idx === 0 || idx === 2} className="ai-checkbox pointer-events-none opacity-80" readOnly />
                        <Label htmlFor={`role-${idx}`} className="text-[13px] text-slate-600 dark:text-slate-400 font-normal">{role}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Data Scope */}
                <div>
                  <h3 className="text-[13px] font-bold text-slate-800 dark:text-slate-200 mb-4 border-l-2 border-[#10B981] pl-2">数据权限</h3>
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="r1" checked={true} className="ai-checkbox pointer-events-none opacity-80" readOnly />
                      <Label htmlFor="r1" className="text-[13px] text-slate-600 dark:text-slate-400 font-normal">全部数据</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="r2" checked={false} className="ai-checkbox pointer-events-none opacity-80" readOnly />
                      <Label htmlFor="r2" className="text-[13px] text-slate-600 dark:text-slate-400 font-normal">本部门及下属部门数据</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="r3" checked={false} className="ai-checkbox pointer-events-none opacity-80" readOnly />
                      <Label htmlFor="r3" className="text-[13px] text-slate-600 dark:text-slate-400 font-normal">本部门数据</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="r4" checked={false} className="ai-checkbox pointer-events-none opacity-80" readOnly />
                      <Label htmlFor="r4" className="text-[13px] text-slate-600 dark:text-slate-400 font-normal">仅本人数据</Label>
                    </div>
                  </div>
                </div>

                {/* 3. Functional Permissions Table */}
                <div>
                  <h3 className="text-[13px] font-bold text-slate-800 dark:text-slate-200 mb-4 border-l-2 border-[#10B981] pl-2">功能权限</h3>
                  <div className="border border-slate-100 dark:border-slate-800 rounded-md overflow-hidden">
                    <Table className="w-full text-[13px] text-slate-600 dark:text-slate-400">
                      <TableHeader className="bg-[#F8FAFC]">
                        <TableRow className="hover:bg-transparent border-slate-100 dark:border-slate-800">
                          <TableHead className="w-48 font-bold h-10 border-r border-slate-100 dark:border-slate-800">模块</TableHead>
                          <TableHead className="font-bold h-10 text-center">查询/查看</TableHead>
                          <TableHead className="font-bold h-10 text-center">新增</TableHead>
                          <TableHead className="font-bold h-10 text-center">修改</TableHead>
                          <TableHead className="font-bold h-10 text-center">删除</TableHead>
                          <TableHead className="font-bold h-10 text-center">导出</TableHead>
                          <TableHead className="font-bold h-10 text-center">导入</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {['租户管理', '告警统计', '租户统计', '员工统计'].map((module, i) => (
                          <TableRow key={module} className="hover:bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800">
                            <TableCell className="font-medium h-12 border-r border-slate-100 dark:border-slate-800">{module}</TableCell>
                            {[1, 2, 3, 4, 5, 6].map((col) => {
                              // Simulate some realistic permissions: mostly read/edit/add, less delete/export
                              const isChecked = (col === 1) || (i < 2 && col <= 3) || (module === '员工统计' && col === 5);
                              return (
                                <TableCell key={col} className="h-12 text-center p-0 align-middle">
                                  <input type="checkbox" checked={isChecked} className="ai-checkbox pointer-events-none opacity-80" readOnly />
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

              </div>
            )}

            {activeTab === 'bindAuth' && (
              <div className="space-y-6 max-w-2xl">
                <div className="flex items-center justify-between py-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                       <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 12a4 4 0 1 0 8 0 4 4 0 0 0-8 0zm6 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm8-2h-3.32c-.17-1.16-.6-2.22-1.25-3.15l2.35-2.35L17.5 2.22l-2.35 2.35a8.038 8.038 0 0 0-3.15-1.25V0h-4v3.32a8.038 8.038 0 0 0-3.15 1.25L2.5 2.22 1.44 2.14 3.79 4.5A8.038 8.038 0 0 0 2.5 7.65L.15 5.3 0 7.3l2.25.75c-.17 1.16-.6 2.22-1.25 3.15l-2.35-2.35L1.44 14.5l2.35-2.35A8.038 8.038 0 0 0 6.94 13.4V16h4v-3.32c1.16-.17 2.22-.6 3.15-1.25l2.35 2.35L17.5 12.5l-2.35-2.35c.65-.93 1.08-1.99 1.25-3.15H20z"/></svg>
                    </div>
                    <div>
                      <h4 className="text-[14px] font-bold text-slate-800 dark:text-slate-200">微信</h4>
                      <p className="text-[12px] text-slate-500 dark:text-slate-400 mt-1">当前未绑定微信账号</p>
                    </div>
                  </div>
                  <Button variant="outline" className="h-8 px-4 text-[13px] border-emerald-500 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700">绑定</Button>
                </div>

                <div className="flex items-center justify-between py-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                       <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M11 2h2v20h-2zM2 11h20v2H2z"/></svg> 
                    </div>
                    <div>
                      <h4 className="text-[14px] font-bold text-slate-800 dark:text-slate-200">钉钉</h4>
                      <p className="text-[12px] text-slate-500 dark:text-slate-400 mt-1">已绑定：李某某 (133****1234)</p>
                    </div>
                  </div>
                  <Button variant="outline" className="h-8 px-4 text-[13px] text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800">解绑</Button>
                </div>
              </div>
            )}

            {activeTab === 'realName' && (
              <div className="space-y-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <h3 className="text-[15px] font-bold text-slate-800 dark:text-slate-200">您已完成实名认证</h3>
                </div>
                
                <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800 max-w-2xl">
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <span className="w-20 text-[13px] text-slate-500 dark:text-slate-400 shrink-0">真实姓名</span>
                      <span className="text-[13px] text-slate-800 dark:text-slate-200 font-medium font-mono">李*欣</span>
                    </div>
                    <div className="flex items-start">
                      <span className="w-20 text-[13px] text-slate-500 dark:text-slate-400 shrink-0">证件类型</span>
                      <span className="text-[13px] text-slate-800 dark:text-slate-200">居民身份证</span>
                    </div>
                    <div className="flex items-start">
                      <span className="w-20 text-[13px] text-slate-500 dark:text-slate-400 shrink-0">证件号码</span>
                      <span className="text-[13px] text-slate-800 dark:text-slate-200 font-mono">110105********1234</span>
                    </div>
                    <div className="flex items-start">
                      <span className="w-20 text-[13px] text-slate-500 dark:text-slate-400 shrink-0">认证时间</span>
                      <span className="text-[13px] text-slate-800 dark:text-slate-200 font-mono text-slate-500 dark:text-slate-400">2023-11-20 14:00:23</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'device' && (
              <div className="space-y-6 max-w-4xl">
                 <h3 className="text-[13px] font-bold text-slate-800 dark:text-slate-200 mb-4 border-l-2 border-[#10B981] pl-2">最近登录设备</h3>
                 
                 <div className="border border-slate-100 dark:border-slate-800 rounded-lg overflow-hidden">
                    <Table className="w-full text-[13px] text-slate-600 dark:text-slate-400">
                      <TableHeader className="bg-[#F8FAFC]">
                        <TableRow className="hover:bg-transparent border-slate-100 dark:border-slate-800">
                          <TableHead className="font-bold h-10 pl-6">设备名称</TableHead>
                          <TableHead className="font-bold h-10 w-40">IP / 地点</TableHead>
                          <TableHead className="font-bold h-10 w-48">最近登录时间</TableHead>
                          <TableHead className="font-bold h-10 w-24 text-right pr-6">操作</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                         <TableRow className="hover:bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800">
                            <TableCell className="h-12 py-2 pl-6">
                               <div className="flex items-center space-x-3">
                                  <Monitor className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                                  <div>
                                     <div className="font-medium text-slate-700 dark:text-slate-300 flex items-center">
                                       MacBook Pro - Chrome
                                       <Badge className="ml-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-50 border-[#E2E8F0] dark:border-slate-700 h-5 px-1.5 text-[10px] shadow-none">本机</Badge>
                                     </div>
                                     <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">macOS 14.1.2 - 浏览器登录</div>
                                  </div>
                               </div>
                            </TableCell>
                            <TableCell className="h-12 py-2 font-mono text-[12px]">113.111.43.*<br/><span className="text-[11px] text-slate-400 dark:text-slate-500 font-sans">广东 广州</span></TableCell>
                            <TableCell className="h-12 py-2 font-mono text-[12px] text-slate-500 dark:text-slate-400">2024-03-24 10:23:41</TableCell>
                            <TableCell className="h-12 py-2 text-right pr-6">
                               <span className="text-[12px] text-slate-300 dark:text-slate-600 dark:text-slate-400 cursor-not-allowed">下线</span>
                            </TableCell>
                         </TableRow>

                         <TableRow className="hover:bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800">
                            <TableCell className="h-12 py-2 pl-6">
                               <div className="flex items-center space-x-3">
                                  <div className="w-4 h-4 text-slate-400 dark:text-slate-500 border border-current rounded flex items-center justify-center text-[8px] font-bold shrink-0">iP</div>
                                  <div>
                                     <div className="font-medium text-slate-700 dark:text-slate-300">iPhone 14 Pro Max</div>
                                     <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">iOS 17.2 - App 登录</div>
                                  </div>
                               </div>
                            </TableCell>
                            <TableCell className="h-12 py-2 font-mono text-[12px]">120.231.11.*<br/><span className="text-[11px] text-slate-400 dark:text-slate-500 font-sans">北京</span></TableCell>
                            <TableCell className="h-12 py-2 font-mono text-[12px] text-slate-500 dark:text-slate-400">2024-03-21 18:41:09</TableCell>
                            <TableCell className="h-12 py-2 text-right pr-6">
                               <button className="text-[12px] text-red-500 hover:text-red-600 transition-colors font-medium">下线</button>
                            </TableCell>
                         </TableRow>
                      </TableBody>
                    </Table>
                  </div>
              </div>
            )}

            {activeTab === 'logout' && (
              <div className="max-w-2xl py-4">
                 <div className="flex items-start space-x-4 p-5 bg-red-50 border border-red-100 rounded-lg">
                    <div className="mt-0.5 text-red-500">
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
                    </div>
                    <div className="flex-1">
                       <h3 className="text-[15px] font-bold text-red-800 mb-2">注销账号风险提示</h3>
                       <p className="text-[13px] text-red-600/90 leading-relaxed mb-4">
                         账号注销为不可逆操作。注销后，您将无法再使用该账号登录系统，且账号下的所有资产、数据、权限历史均会被永久清理并不可恢复。
                       </p>
                       <ul className="list-disc pl-4 text-[13px] text-red-600/80 space-y-1 mb-6">
                         <li>清空系统关联的业务角色与权限数据</li>
                         <li>解除绑定的手机号、邮箱、微信等三方平台</li>
                         <li>清空历史操作记录、个人设置资料</li>
                       </ul>
                       <div className="flex items-center space-x-2">
                         <Checkbox id="confirm-logout" className="opacity-100 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500" />
                         <Label htmlFor="confirm-logout" className="text-[13px] text-red-800 font-bold cursor-pointer">我已充分了解上述风险，并自愿注销该账号</Label>
                       </div>
                       
                       <div className="mt-8">
                         <Button className="bg-red-500 hover:bg-red-600 text-white border-[#E2E8F0] dark:border-slate-700 shadow-sm opacity-60 pointer-events-none px-6">下一步，验证身份</Button>
                       </div>
                    </div>
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
