interface FieldProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  error?: string
  autoComplete?: string
}

export default function Field({ id, label, value, onChange, type = 'text', error, autoComplete }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-slate-300">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full rounded-md border bg-slate-900 px-3 py-2 text-slate-100 outline-none focus:ring-2 focus:ring-amber-400 ${
          error ? 'border-rose-500' : 'border-slate-700'
        }`}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-rose-400">
          {error}
        </p>
      )}
    </div>
  )
}
