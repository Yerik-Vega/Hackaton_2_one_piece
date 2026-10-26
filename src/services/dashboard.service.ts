import api from '../api'
import type { DashboardSummary } from '../../../../Downloads/hackathon-cp1-cp2/hackathon-cp1-cp2/A-cp1/src/types/dashboard.ts'

export async function getDashboardSummary(signal?: AbortSignal): Promise<DashboardSummary> {
  const res = await api.get<DashboardSummary>('/dashboard/summary', { signal })
  return res.data
}
