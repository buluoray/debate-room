import { pluralize } from '../lib/format'

interface Props {
  stats: { debates: number; decisions: number } | null
}

/** A one-line summary above the history. */
export default function StatsBar({ stats }: Props) {
  if (!stats) return null
  return (
    <p className="text-xs text-muted">
      {pluralize(stats.debates, 'debate')} · {pluralize(stats.decisions, 'decision')}
    </p>
  )
}
