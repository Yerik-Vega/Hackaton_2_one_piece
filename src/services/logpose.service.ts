import api from '../api'
import type { LogPoseState } from '../../../../Downloads/hackathon-cp1-cp2/hackathon-cp1-cp2/A-cp1/src/types/dashboard.ts'

export async function getLogPose(signal?: AbortSignal): Promise<LogPoseState> {
  const res = await api.get<LogPoseState>('/log-pose', { signal })
  return res.data
}
