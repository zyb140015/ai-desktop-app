import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="rounded-[30px] border border-white/70 bg-white dark:bg-slate-950/85 p-10 shadow-panel">
      <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Not found</p>
      <h2 className="mt-4 font-display text-5xl text-stone-950">This route is not part of the desktop shell.</h2>
      <p className="mt-4 max-w-2xl text-base leading-7 text-stone-700">
        Return to the overview and continue from the typed routes that are already wired through the Electron app.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800"
      >
        Back to overview
      </Link>
    </div>
  )
}
