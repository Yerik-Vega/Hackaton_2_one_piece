import { EmptyState, ErrorBox, SkeletonBlock } from '../components/Feedback'
import KeyValueGrid from '../components/KeyValueGrid'
import { useFetch } from '../hooks/useFetch'
import type { FetchResult } from '../hooks/useFetch'
import { getDashboardSummary } from '../../../../Downloads/hackathon-cp1-cp2/hackathon-cp1-cp2/A-cp1/src/services/dashboard.service.ts'
import { getLogPose } from '../../../../Downloads/hackathon-cp1-cp2/hackathon-cp1-cp2/A-cp1/src/services/logpose.service.ts'

function Section({ title, result }: { title: string; result: FetchResult<Record<string, unknown>> }) {
  let body
  if (result.loading) {
    body = (
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <SkeletonBlock className="h-24" />
        <SkeletonBlock className="h-24" />
        <SkeletonBlock className="h-24" />
      </div>
    )
  } else if (result.error) {
    body = <ErrorBox error={result.error} onRetry={result.reload} />
  } else if (!result.data || Object.keys(result.data).length === 0) {
    body = <EmptyState title="Sin datos" message="La API no devolvió información para esta sección." />
  } else {
    body = <KeyValueGrid data={result.data} />
  }

  return (
    <section className="mb-8">
      <h2 className="mb-3 text-lg font-semibold text-slate-100">{title}</h2>
      {body}
    </section>
  )
}

export default function DashboardPage() {
  const summary = useFetch(getDashboardSummary, [])
  const logPose = useFetch(getLogPose, [])

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-100">Dashboard</h1>
      <Section title="Indicadores de la tripulación" result={summary} />
      <Section title="Estado del Log Pose" result={logPose} />
    </div>
  )
}
