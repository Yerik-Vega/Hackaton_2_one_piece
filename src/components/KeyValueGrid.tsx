import { formatPrimitive, isRecord, labelize } from '../lib/format'

export default function KeyValueGrid({ data }: { data: Record<string, unknown> }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">{labelize(key)}</p>
          {isRecord(value) ? (
            <ul className="mt-2 space-y-1 text-sm">
              {Object.entries(value).map(([k, v]) => (
                <li key={k} className="flex justify-between gap-2">
                  <span className="text-slate-400">{labelize(k)}</span>
                  <span className="font-medium text-slate-100">{formatPrimitive(v)}</span>
                </li>
              ))}
            </ul>
          ) : Array.isArray(value) ? (
            <p className="mt-2 text-2xl font-semibold text-slate-100">{value.length} elementos</p>
          ) : (
            <p className="mt-2 text-2xl font-semibold text-slate-100">{formatPrimitive(value)}</p>
          )}
        </div>
      ))}
    </div>
  )
}
