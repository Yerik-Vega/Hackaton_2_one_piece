import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import AuthCard from '../components/AuthCard'
import Field from '../components/Field'
import { FullPageMessage } from '../components/Feedback'
import { useAuth } from '../context/AuthContext'
import { toAppError } from '../lib/errors'
import { getFieldErrors } from '../lib/formErrors'
import type { FormErrors } from '../lib/formErrors'

function getFrom(state: unknown): string {
  if (typeof state === 'object' && state !== null && 'from' in state && typeof state.from === 'string') {
    return state.from
  }
  return '/dashboard'
}

export default function LoginPage() {
  const { status, login } = useAuth()
  const location = useLocation()
  const from = getFrom(location.state)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)

  if (status === 'loading') return <FullPageMessage>Verificando sesión…</FullPageMessage>
  if (status === 'authenticated') return <Navigate to={from} replace />

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const found: FormErrors = {}
    if (!email.trim()) found.email = 'Ingresa tu email.'
    else if (!email.includes('@')) found.email = 'Email no válido.'
    if (!password) found.password = 'Ingresa tu contraseña.'
    if (Object.keys(found).length > 0) {
      setErrors(found)
      return
    }

    setSubmitting(true)
    setErrors({})
    try {
      await login({ email: email.trim(), password })
      // status pasa a 'authenticated' y el <Navigate> de arriba nos lleva a "from".
    } catch (err) {
      const appError = toAppError(err)
      setErrors(appError.kind === 'UNAUTHORIZED' ? { form: appError.message } : getFieldErrors(appError, ['email', 'password']))
      setSubmitting(false)
    }
  }

  return (
    <AuthCard title="Zarpar" subtitle="Inicia sesión con la cuenta de tu tripulación.">
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Field id="email" label="Email" type="email" value={email} onChange={setEmail} error={errors.email} autoComplete="email" />
        <Field id="password" label="Contraseña" type="password" value={password} onChange={setPassword} error={errors.password} autoComplete="current-password" />
        {errors.form && (
          <p role="alert" className="rounded bg-rose-500/10 p-2 text-sm text-rose-300">
            {errors.form}
          </p>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-md bg-amber-400 py-2 font-semibold text-slate-900 hover:bg-amber-300 disabled:opacity-60"
        >
          {submitting ? 'Entrando…' : 'Entrar'}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-slate-400">
        ¿Tu tripulación no existe?{' '}
        <Link to="/register" className="text-amber-400 underline">
          Regístrala
        </Link>
      </p>
    </AuthCard>
  )
}
