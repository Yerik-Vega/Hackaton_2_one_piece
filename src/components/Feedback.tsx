import type { ReactNode } from 'react'
import type { AppError } from '../lib/errors.ts'

export function ErrorBox({ error, onRetry }: { error: AppError; onRetry?: () => void }) {
  const locked = error.kind === 'LOG_POSE_REQUIRED'
  const tone = locked
    ? 'border-amber-500/50 bg-amber-500/10 text-amber-200'
    : 'border-rose-500/50 bg-rose-500/10 text-rose-200'
  return (
    <div role="alert" className={`rounded-lg border p-4 ${tone}`}>
      <p className="font-semibold">{locked ? 'Grand Line bloqueado' : 'No se pudo cargar'}</p>
      <p className="mt-1 text-sm">{error.message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-3 rounded bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-900 hover:bg-white"
        >
          Reintentar
        </button>
      )}
    </div>
  )
}

export function EmptyState({ title, message, action }: { title: string; message?: string; action?: ReactNode }) {
  return (
    <div className="grid place-items-center rounded-lg border border-dashed border-slate-700 p-10 text-center">
      <div>
        <p className="font-semibold text-slate-200">{title}</p>
        {message && <p className="mt-1 text-sm text-slate-400">{message}</p>}
        {action && <div className="mt-4">{action}</div>}
      </div>
    </div>
  )
}

export function SkeletonBlock({ className = '' }: { className?: string }) {
  return <div aria-hidden="true" className={`animate-pulse rounded-lg bg-slate-800 ${className}`} />
}

export function FullPageMessage({ children }: { children: ReactNode }) {
  return <div className="grid min-h-screen place-items-center bg-slate-950 text-slate-300">{children}</div>
}
