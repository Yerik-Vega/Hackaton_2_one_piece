import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, Navigate } from 'react-router-dom'
import AuthCard from '../components/AuthCard'
import Field from '../components/Field'
import { FullPageMessage } from '../components/Feedback'
import { useAuth } from '../context/AuthContext'
import { toAppError } from '../lib/errors'
import { getFieldErrors } from '../lib/formErrors'
import type { FormErrors } from '../lib/formErrors'

export default function RegisterPage() {
  const { status, register } = useAuth()
  const [teamName, setTeamName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)

  if (status === 'loading') return <FullPageMessage>Verificando sesión…</FullPageMessage>
  if (status === 'authenticated') return <Navigate to="/dashboard" replace />

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const found: FormErrors = {}
    if (!teamName.trim()) found.teamName = 'Ingresa el nombre de la tripulación.'
    if (!email.trim()) found.email = 'Ingresa un email.'
    else if (!email.includes('@')) found.email = 'Email no válido.'
    if (!password) found.password = 'Ingresa una contraseña.'
    if (Object.keys(found).length > 0) {
      setErrors(found)
      return
    }

    setSubmitting(true)
    setErrors({})
    try {
      await register({ teamName: teamName.trim(), email: email.trim(), password })
    } catch (err) {
      setErrors(getFieldErrors(toAppError(err), ['teamName', 'email', 'password']))
      setSubmitting(false)
    }
  }

  return (
    <AuthCard title="Registrar tripulación" subtitle="Crea la cuenta de tu equipo y entra directo.">
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Field id="teamName" label="Nombre de la tripulación" value={teamName} onChange={setTeamName} error={errors.teamName} />
        <Field id="email" label="Email" type="email" value={email} onChange={setEmail} error={errors.email} autoComplete="email" />
        <Field id="password" label="Contraseña" type="password" value={password} onChange={setPassword} error={errors.password} autoComplete="new-password" />
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
          {submitting ? 'Registrando…' : 'Registrar y entrar'}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-slate-400">
        ¿Ya tienes cuenta?{' '}
        <Link to="/login" className="text-amber-400 underline">
          Inicia sesión
        </Link>
      </p>
    </AuthCard>
  )
}
