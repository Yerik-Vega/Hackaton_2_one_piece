import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function linkClass({ isActive }: { isActive: boolean }) {
  return `rounded px-3 py-1.5 text-sm ${isActive ? 'bg-amber-400 text-slate-900' : 'text-slate-300 hover:bg-slate-800'}`
}

export default function AppLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-4">
            <span className="font-bold text-amber-400">⚓ Log Pose Console</span>
            <nav className="flex gap-1" aria-label="Principal">
              <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
              <NavLink to="/wanted" className={linkClass}>Se Busca</NavLink>
            </nav>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-400">
            <span>{user?.teamCode ?? user?.email}</span>
            <button type="button" onClick={handleLogout} className="rounded border border-slate-700 px-3 py-1.5 text-slate-200 hover:bg-slate-800">
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}
