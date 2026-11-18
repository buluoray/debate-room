import { Card, CardTitle } from '@kirocrew/app-sdk/ui'
import { showNoDecisions } from '../lib/decisions'
import { formatWhen, truncate } from '../lib/format'
import { relativeTime } from '../lib/relativeTime'
import type { Decision } from '../lib/types'

interface Props {
  decisions: Decision[]
  onOpen: (decision: Decision) => void
}

/** Past decisions, as the backend returns them. */
export default function DecisionList({ decisions, onOpen }: Props) {
  return (
    <Card>
      <CardTitle>Past decisions</CardTitle>
      {showNoDecisions(decisions) && <p className="text-sm text-muted">No decisions yet. Start a debate and click Decide.</p>}
      <ul className="flex flex-col gap-1">
        {decisions.map(d => (
          <li key={d.id}>
            <button type="button" className="w-full text-left text-sm hover:underline" title={formatWhen(d.created_at)} onClick={() => onOpen(d)}>
              <span className="font-medium">{d.choice}</span>
              <span className="text-muted"> · {truncate(d.question, 80)} · {relativeTime(d.created_at)}</span>
            </button>
          </li>
        ))}
      </ul>
    </Card>
  )
}
