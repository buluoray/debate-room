import { Card, CardTitle } from '@kirocrew/app-sdk/ui'
import { formatWhen } from '../lib/format'
import { risksToShow } from '../lib/risks'
import ExportButton from './ExportButton'
import type { Decision } from '../lib/types'

/** A decision record: the choice, why, and the risks. */
export default function DecisionCard({ decision }: { decision: Decision }) {
  return (
    <Card>
      <CardTitle>Decision: {decision.choice}</CardTitle>
      <p className="mb-2 text-xs text-muted">{decision.question} · {formatWhen(decision.created_at)}</p>
      <h4 className="text-sm font-semibold">Why</h4>
      <p className="mb-2 whitespace-pre-wrap text-sm">{decision.why}</p>
      <h4 className="text-sm font-semibold">Risks</h4>
      {decision.risks.length === 0
        ? <p className="text-sm text-muted">None named.</p>
        : <ul className="list-disc pl-5 text-sm">{risksToShow(decision.risks).map((r, i) => <li key={i}>{r}</li>)}</ul>}
      <div className="mt-3">
        <ExportButton decisionId={decision.id} />
      </div>
    </Card>
  )
}
