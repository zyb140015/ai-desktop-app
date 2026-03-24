import * as React from 'react';
import * as Icons from '../components/icons';

export function SysconfigPage() {
  return (
    <div className="w-full h-full max-w-[1600px] mx-auto flex flex-col min-h-0 bg-white dark:bg-slate-950 shadow-sm border border-slate-100 dark:border-slate-800 rounded-lg">
      <div className="flex border-b border-slate-100 dark:border-slate-800 items-center justify-between px-6 py-4">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">系统设置</h2>
      </div>
      
      <div className="flex-1 overflow-auto p-6 flex flex-col space-y-8">
        {/* 基本信息设置卡片 */}
        <div className="flex flex-col space-y-6 max-w-2xl">
          <div className="flex flex-col">
            <h3 className="text-[13px] font-bold text-slate-800 dark:text-slate-200 mb-6 border-l-2 border-[#10B981] pl-2">基本设置</h3>
            <div className="flex flex-col space-y-6 ml-3">
              {/* 网站标题 */}
              <div className="flex items-center">
                <label className="text-[13px] text-slate-700 dark:text-slate-300 w-24 shrink-0 font-medium">网站标题 :</label>
                <input 
                  type="text" 
                  defaultValue="多租户后台管理系统"
                  className="w-[400px] border border-slate-200 dark:border-slate-800 rounded px-3 py-2 text-[13px] text-slate-700 dark:text-slate-300 hover:border-emerald-400 dark:hover:border-emerald-600 focus:outline-none focus:border-[#10B981] transition-colors"
                />
              </div>

              {/* 网站 Logo */}
              <div className="flex items-start">
                <label className="text-[13px] text-slate-700 dark:text-slate-300 w-24 shrink-0 font-medium mt-1">系统 Logo :</label>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                    <Icons.Layers className="w-8 h-8 text-[#10B981]" />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <button className="px-4 py-1.5 border border-slate-200 dark:border-slate-800 rounded text-[13px] text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:bg-slate-900 transition-colors w-fit">
                      上传 Logo
                    </button>
                    <span className="text-[12px] text-slate-400 dark:text-slate-500">建议尺寸: 120 x 120px，支持 jpg、png 格式</span>
                  </div>
                </div>
              </div>

              {/* 系统主题 */}
              <div className="flex items-center">
                <label className="text-[13px] text-slate-700 dark:text-slate-300 w-24 shrink-0 font-medium">系统主题 :</label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 cursor-pointer">
                    <div className="w-4 h-4 rounded-full border border-emerald-500 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#10B981]"></div>
                    </div>
                    <span className="text-[13px] text-slate-700 dark:text-slate-300">翠绿 (默认)</span>
                  </div>
                  <div className="flex items-center space-x-2 cursor-pointer">
                    <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center">
                    </div>
                    <span className="text-[13px] text-slate-500 dark:text-slate-400">科技蓝</span>
                  </div>
                  <div className="flex items-center space-x-2 cursor-pointer">
                    <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center">
                    </div>
                    <span className="text-[13px] text-slate-500 dark:text-slate-400">薄暮红</span>
                  </div>
                </div>
              </div>

              {/* 备案信息 */}
              <div className="flex items-center">
                <label className="text-[13px] text-slate-700 dark:text-slate-300 w-24 shrink-0 font-medium">备案信息 :</label>
                <input 
                  type="text" 
                  defaultValue="京ICP备10000000号-1"
                  className="w-[400px] border border-slate-200 dark:border-slate-800 rounded px-3 py-2 text-[13px] text-slate-700 dark:text-slate-300 hover:border-emerald-400 dark:hover:border-emerald-600 focus:outline-none focus:border-[#10B981] transition-colors"
                />
              </div>

               {/* 版权信息 */}
               <div className="flex items-center">
                <label className="text-[13px] text-slate-700 dark:text-slate-300 w-24 shrink-0 font-medium">版权信息 :</label>
                <input 
                  type="text" 
                  defaultValue="Copyright © 2023 MTBM SYSTEM. All Rights Reserved."
                  className="w-[400px] border border-slate-200 dark:border-slate-800 rounded px-3 py-2 text-[13px] text-slate-700 dark:text-slate-300 hover:border-emerald-400 dark:hover:border-emerald-600 focus:outline-none focus:border-[#10B981] transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 高级设置 */}
        <div className="flex flex-col space-y-6 max-w-2xl mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
          <div className="flex flex-col">
            <h3 className="text-[13px] font-bold text-slate-800 dark:text-slate-200 mb-6 border-l-2 border-[#10B981] pl-2">高级设置</h3>
            <div className="flex flex-col space-y-6 ml-3">
              {/* 强制密码复杂度 */}
              <div className="flex items-center">
                <label className="text-[13px] text-slate-700 dark:text-slate-300 w-28 shrink-0 font-medium">密码复杂度 :</label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="ai-checkbox" defaultChecked />
                    <span className="text-[13px] text-slate-600 dark:text-slate-400">必须包含大小写字母、数字和特殊字符</span>
                  </div>
                </div>
              </div>

               {/* 登录失败锁定 */}
               <div className="flex items-center">
                <label className="text-[13px] text-slate-700 dark:text-slate-300 w-28 shrink-0 font-medium">账号安全 :</label>
                <div className="flex items-center space-x-2 text-[13px] text-slate-600 dark:text-slate-400">
                  <span>连续密码错误</span>
                  <input type="text" className="w-12 border border-slate-200 dark:border-slate-800 rounded px-2 text-center text-[13px] focus:border-[#10B981] focus:outline-none" defaultValue="5" />
                  <span>次后锁定账号</span>
                  <input type="text" className="w-16 border border-slate-200 dark:border-slate-800 rounded px-2 text-center text-[13px] focus:border-[#10B981] focus:outline-none ml-2" defaultValue="30" />
                  <span>分钟</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="ml-3 pt-6 mt-6">
          <button className="px-6 py-2 bg-[#10B981] text-white rounded text-[13px] hover:bg-emerald-600 transition-colors font-medium">
             保存设置
          </button>
        </div>

      </div>
    </div>
  );
}
