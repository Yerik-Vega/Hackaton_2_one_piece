import axios from 'axios'
import type { ApiErrorBody } from '../types/api'

export type ErrorKind =
  | 'LOG_POSE_REQUIRED'
  | 'UNAUTHORIZED'
  | 'RATE_LIMITED'
  | 'NETWORK'
  | 'CANCELED'
  | 'OTHER'

export interface AppError {
  kind: ErrorKind
  message: string
  status?: number
  details?: unknown
}

export function toAppError(error: unknown): AppError {
  if (axios.isCancel(error)) {
    return { kind: 'CANCELED', message: '' }
  }
  if (axios.isAxiosError<ApiErrorBody>(error)) {
    const status = error.response?.status
    const body = error.response?.data
    if (status === 423 || body?.error === 'LOG_POSE_REQUIRED') {
      return {
        kind: 'LOG_POSE_REQUIRED',
        status: 423,
        message: 'Aprueba la inspección del Log Pose (CP3) para entrar al Grand Line.',
      }
    }
    if (status === 401) {
      return { kind: 'UNAUTHORIZED', status, message: body?.message ?? 'Sesión no válida.' }
    }
    if (status === 429) {
      return { kind: 'RATE_LIMITED', status, message: 'Demasiadas solicitudes. Espera unos segundos.' }
    }
    if (!error.response) {
      return { kind: 'NETWORK', message: 'No hay conexión con el servidor.' }
    }
    return {
      kind: 'OTHER',
      status,
      message: body?.message ?? 'Ocurrió un error inesperado.',
      details: body?.details,
    }
  }
  return { kind: 'OTHER', message: 'Ocurrió un error inesperado.' }
}
