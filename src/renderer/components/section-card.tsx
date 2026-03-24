import type { PropsWithChildren, ReactNode } from 'react'

type SectionCardProps = PropsWithChildren<{
  eyebrow: string
  title: string
  description?: string
  action?: ReactNode
  className?: string
}>

export function SectionCard({
  eyebrow,
  title,
  description,
  action,
  className,
  children,
}: SectionCardProps) {
  return (
    <section
      className={[
        'rounded-[28px] border border-white/70 bg-white dark:bg-slate-950/80 p-6 shadow-[0_22px_60px_rgba(86,63,42,0.08)] backdrop-blur',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-stone-500">{eyebrow}</p>
          <h2 className="mt-2 font-display text-2xl text-stone-900">{title}</h2>
          {description ? <p className="mt-2 max-w-2xl text-sm text-stone-600">{description}</p> : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  )
}
