import * as Icons from './icons';

interface PaginationProps {
  total: number;
  page?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
}

export function Pagination({ total, page = 1, pageSize = 10, onPageChange }: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1).slice(0, 6);

  return (
    <div className="flex items-center justify-end px-5 py-4 border-t border-slate-100 dark:border-slate-800/70 shrink-0 text-[13px] text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-950 rounded-b-lg">
       <span className="mr-5 text-slate-600 dark:text-slate-400">共有{total}条</span>
        
       <div className="relative border border-slate-200 dark:border-slate-800 rounded px-3 py-1 w-24 flex items-center justify-between cursor-default mr-5 bg-white dark:bg-slate-950">
          {pageSize}条/页
          <Icons.ChevronDown className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
       </div>

       <div className="flex items-center space-x-1 border-r border-slate-200 dark:border-slate-800 pr-5 mr-5">
          <button disabled={safePage <= 1} onClick={() => onPageChange?.(safePage - 1)} className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 hover:border-emerald-400 dark:hover:border-emerald-600 hover:text-emerald-500 transition-colors bg-white dark:bg-slate-950 disabled:cursor-not-allowed disabled:opacity-60"><Icons.ChevronDown className="w-3.5 h-3.5 rotate-90" /></button>
          {pages.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => onPageChange?.(pageNumber)}
              className={pageNumber === safePage ? 'w-7 h-7 flex items-center justify-center rounded bg-[#10B981] font-bold text-white leading-none shadow-sm' : 'w-7 h-7 flex items-center justify-center rounded border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-emerald-400 dark:hover:border-emerald-600 hover:text-emerald-500 transition-colors bg-white dark:bg-slate-950'}
            >
              {pageNumber}
            </button>
          ))}
          {totalPages > pages.length ? <span className="mx-1 mt-1 font-serif text-slate-400 dark:text-slate-500">...</span> : null}
          {totalPages > pages.length ? <button onClick={() => onPageChange?.(totalPages)} className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-emerald-400 dark:hover:border-emerald-600 hover:text-emerald-500 transition-colors bg-white dark:bg-slate-950">{totalPages}</button> : null}
          <button disabled={safePage >= totalPages} onClick={() => onPageChange?.(safePage + 1)} className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 hover:border-emerald-400 dark:hover:border-emerald-600 hover:text-emerald-500 transition-colors bg-white dark:bg-slate-950 disabled:cursor-not-allowed disabled:opacity-60"><Icons.ChevronDown className="w-3.5 h-3.5 -rotate-90" /></button>
       </div>

        <div className="flex items-center bg-white dark:bg-slate-950">
           <span>跳至</span>
          <input type="text" readOnly className="w-10 border border-slate-200 dark:border-slate-800 rounded mx-2 py-0.5 text-center focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500/80" value={safePage} />
           <span>页</span>
        </div>
     </div>
   );
}
