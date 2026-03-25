import * as React from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type CrudDialogProps = {
  open: boolean
  title: string
  description?: string
  onClose: () => void
  children: React.ReactNode
  footer?: React.ReactNode
}

export function CrudDialog({ open, title, description, onClose, children, footer }: CrudDialogProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4">
      <div className="w-full max-w-lg rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-950">
        <div className="flex items-start justify-between border-b border-slate-100 px-5 py-4 dark:border-slate-800">
          <div>
            <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">{title}</h3>
            {description ? <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p> : null}
          </div>
          <button className="text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-slate-200" onClick={onClose}>✕</button>
        </div>
        <div className="space-y-4 px-5 py-4">{children}</div>
        <div className={cn('flex items-center justify-end gap-3 border-t border-slate-100 px-5 py-4 dark:border-slate-800')}>
          {footer}
        </div>
      </div>
    </div>
  )
}

type ConfirmDialogProps = {
  open: boolean
  title: string
  description: string
  confirmText?: string
  onCancel: () => void
  onConfirm: () => void
}

export function ConfirmDialog({ open, title, description, confirmText = '确认', onCancel, onConfirm }: ConfirmDialogProps) {
  if (!open) return null

  return (
    <CrudDialog
      open={open}
      title={title}
      description={description}
      onClose={onCancel}
      footer={(
        <>
          <Button variant="outline" onClick={onCancel}>取消</Button>
          <Button variant="destructive" onClick={onConfirm}>{confirmText}</Button>
        </>
      )}
    >
      <div className="text-sm text-slate-600 dark:text-slate-300">此操作不可撤销，请确认后继续。</div>
    </CrudDialog>
  )
}
