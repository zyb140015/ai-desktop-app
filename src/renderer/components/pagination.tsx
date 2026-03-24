import * as Icons from './icons';

interface PaginationProps {
  total: number;
}

export function Pagination({ total }: PaginationProps) {
  return (
    <div className="flex items-center justify-end px-5 py-4 border-t border-slate-100 dark:border-slate-800/70 shrink-0 text-[13px] text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-950 rounded-b-lg">
       <span className="mr-5 text-slate-600 dark:text-slate-400">共有{total}条</span>
       
       <div className="relative border border-slate-200 dark:border-slate-800 rounded px-3 py-1 w-24 flex items-center justify-between cursor-pointer hover:border-emerald-400 dark:hover:border-emerald-600 mr-5 bg-white dark:bg-slate-950">
          10条/页
          <Icons.ChevronDown className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
       </div>

       <div className="flex items-center space-x-1 border-r border-slate-200 dark:border-slate-800 pr-5 mr-5">
          <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 hover:border-emerald-400 dark:hover:border-emerald-600 hover:text-emerald-500 transition-colors bg-white dark:bg-slate-950"><Icons.ChevronDown className="w-3.5 h-3.5 rotate-90" /></button>
          <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-emerald-400 dark:hover:border-emerald-600 hover:text-emerald-500 transition-colors bg-white dark:bg-slate-950">1</button>
          <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-emerald-400 dark:hover:border-emerald-600 hover:text-emerald-500 transition-colors bg-white dark:bg-slate-950">2</button>
          <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-emerald-400 dark:hover:border-emerald-600 hover:text-emerald-500 transition-colors bg-white dark:bg-slate-950">3</button>
          <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-emerald-400 dark:hover:border-emerald-600 hover:text-emerald-500 transition-colors bg-white dark:bg-slate-950">4</button>
          
          <button className="w-7 h-7 flex items-center justify-center rounded bg-[#10B981] font-bold text-white leading-none shadow-sm">5</button>
          
          <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-emerald-400 dark:hover:border-emerald-600 hover:text-emerald-500 transition-colors bg-white dark:bg-slate-950">6</button>
          <span className="mx-1 mt-1 font-serif text-slate-400 dark:text-slate-500">...</span>
          <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-emerald-400 dark:hover:border-emerald-600 hover:text-emerald-500 transition-colors bg-white dark:bg-slate-950">50</button>
          <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 hover:border-emerald-400 dark:hover:border-emerald-600 hover:text-emerald-500 transition-colors bg-white dark:bg-slate-950"><Icons.ChevronDown className="w-3.5 h-3.5 -rotate-90" /></button>
       </div>

       <div className="flex items-center bg-white dark:bg-slate-950">
          <span>跳至</span>
          <input type="text" className="w-10 border border-slate-200 dark:border-slate-800 rounded mx-2 py-0.5 text-center focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500/80" defaultValue="1" />
          <span>页</span>
       </div>
    </div>
  );
}
