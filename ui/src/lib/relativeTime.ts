import { formatWhen } from './format'

/** "just now", "5 min ago", "3 h ago", or the full date when older. */
export function relativeTime(iso: string, now: Date = new Date()): string {
  const diff = now.getTime() - new Date(iso).getTime()
  // Bad input or a future time falls back to the plain date.
  if (Number.isNaN(diff) || diff < 0) return formatWhen(iso)
  const min = Math.floor(diff / 60_000)
  if (min < 1) return 'just now'
  if (min < 60) return `${min} min ago`
  const h = Math.floor(min / 60)
  if (h < 24) return `${h} h ago`
  return formatWhen(iso)
}
