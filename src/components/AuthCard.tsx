import type { ReactNode } from 'react'

export default function AuthCard({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <div className="grid min-h-screen place-items-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl">
        <p className="text-sm font-semibold text-amber-400">⚓ Log Pose Console</p>
        <h1 className="mt-1 text-2xl font-bold text-slate-100">{title}</h1>
        <p className="mb-5 mt-1 text-sm text-slate-400">{subtitle}</p>
        {children}
      </div>
    </div>
  )
}
