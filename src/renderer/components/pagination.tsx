import * as Icons from './icons';

interface PaginationProps {
  total: number;
}

export function Pagination({ total }: PaginationProps) {
  return (
    <div className="flex items-center justify-end px-5 py-4 border-t border-slate-100/70 shrink-0 text-[13px] text-slate-500 bg-white rounded-b-lg">
       <span className="mr-5 text-slate-600">共有{total}条</span>
       
       <div className="relative border border-slate-200 rounded px-3 py-1 w-24 flex items-center justify-between cursor-pointer hover:border-emerald-400 mr-5 bg-white">
          10条/页
          <Icons.ChevronDown className="w-3.5 h-3.5 text-slate-400" />
       </div>

       <div className="flex items-center space-x-1 border-r border-slate-200 pr-5 mr-5">
          <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 text-slate-400 hover:border-emerald-400 hover:text-emerald-500 transition-colors bg-white"><Icons.ChevronDown className="w-3.5 h-3.5 rotate-90" /></button>
          <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 text-slate-600 hover:border-emerald-400 hover:text-emerald-500 transition-colors bg-white">1</button>
          <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 text-slate-600 hover:border-emerald-400 hover:text-emerald-500 transition-colors bg-white">2</button>
          <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 text-slate-600 hover:border-emerald-400 hover:text-emerald-500 transition-colors bg-white">3</button>
          <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 text-slate-600 hover:border-emerald-400 hover:text-emerald-500 transition-colors bg-white">4</button>
          
          <button className="w-7 h-7 flex items-center justify-center rounded bg-[#10B981] font-bold text-white leading-none shadow-sm">5</button>
          
          <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 text-slate-600 hover:border-emerald-400 hover:text-emerald-500 transition-colors bg-white">6</button>
          <span className="mx-1 mt-1 font-serif text-slate-400">...</span>
          <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 text-slate-600 hover:border-emerald-400 hover:text-emerald-500 transition-colors bg-white">50</button>
          <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 text-slate-400 hover:border-emerald-400 hover:text-emerald-500 transition-colors bg-white"><Icons.ChevronDown className="w-3.5 h-3.5 -rotate-90" /></button>
       </div>

       <div className="flex items-center bg-white">
          <span>跳至</span>
          <input type="text" className="w-10 border border-slate-200 rounded mx-2 py-0.5 text-center focus:outline-none focus:border-emerald-500" defaultValue="1" />
          <span>页</span>
       </div>
    </div>
  );
}
