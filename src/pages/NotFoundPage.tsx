import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="grid min-h-screen place-items-center bg-slate-950 px-4 text-center">
      <div>
        <svg viewBox="0 0 120 120" className="mx-auto h-32 w-32" role="img" aria-label="Brújula perdida">
          <circle cx="60" cy="60" r="54" fill="none" stroke="#fbbf24" strokeWidth="4" />
          <circle cx="60" cy="60" r="44" fill="#0f172a" stroke="#334155" strokeWidth="2" />
          <polygon points="60,18 68,60 60,56 52,60" fill="#f43f5e" transform="rotate(130 60 60)" />
          <polygon points="60,102 52,60 60,64 68,60" fill="#94a3b8" transform="rotate(130 60 60)" />
          <circle cx="60" cy="60" r="4" fill="#fbbf24" />
        </svg>
        <h1 className="mt-4 text-4xl font-bold text-amber-400">404</h1>
        <p className="mt-2 text-slate-300">El Log Pose no apunta a ninguna isla en esta ruta.</p>
        <Link to="/dashboard" className="mt-6 inline-block rounded-md bg-amber-400 px-4 py-2 font-semibold text-slate-900 hover:bg-amber-300">
          Volver al dashboard
        </Link>
      </div>
    </div>
  )
}
