import type { AppError } from './errors'
import { isRecord } from './format'

// Clave = nombre del campo. La clave especial "form" es un error general.
export type FormErrors = Record<string, string>

const SYNONYMS: Record<string, string[]> = {
  email: ['email', 'correo'],
  password: ['password', 'contraseña', 'contrasena'],
  teamName: ['teamname', 'team name', 'nombre', 'equipo', 'team'],
}

export function getFieldErrors(err: AppError, fields: string[]): FormErrors {
  const result: FormErrors = {}
  const details = err.details

  if (isRecord(details)) {
    for (const f of fields) {
      const v = details[f]
      if (typeof v === 'string') result[f] = v
    }
  } else if (Array.isArray(details)) {
    for (const item of details) {
      if (!isRecord(item)) continue
      const name = item.field ?? item.path ?? item.param
      const msg = item.message
      if (typeof name === 'string' && typeof msg === 'string' && fields.includes(name)) result[name] = msg
    }
  }

  if (Object.keys(result).length === 0) {
    const msg = err.message.toLowerCase()
    for (const f of fields) {
      if ((SYNONYMS[f] ?? [f]).some((w) => msg.includes(w))) {
        result[f] = err.message
        break
      }
    }
  }

  if (Object.keys(result).length === 0) result.form = err.message
  return result
}
