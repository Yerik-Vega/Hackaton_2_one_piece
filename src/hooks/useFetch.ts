import { useEffect, useState } from 'react'
import { toAppError } from '../lib/errors.ts'
import type { AppError } from '../lib/errors.ts'

export interface FetchResult<T> {
  data: T | null
  loading: boolean
  error: AppError | null
  reload: () => void
}

export function useFetch<T>(
  fetcher: (signal: AbortSignal) => Promise<T>,
  deps: readonly unknown[],
): FetchResult<T> {
  const [state, setState] = useState<{ data: T | null; loading: boolean; error: AppError | null }>({
    data: null,
    loading: true,
    error: null,
  })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    setState({ data: null, loading: true, error: null })

    fetcher(controller.signal)
      .then((data) => {
        if (controller.signal.aborted) return
        setState({ data, loading: false, error: null })
      })
      .catch((e: unknown) => {
        if (controller.signal.aborted) return
        const error = toAppError(e)
        if (error.kind === 'CANCELED') return
        setState({ data: null, loading: false, error })
      })

    // Al cambiar deps (o desmontar) se cancela la request anterior.
    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, attempt])

  return { ...state, reload: () => setAttempt((n) => n + 1) }
}
