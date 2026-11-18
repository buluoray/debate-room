/** A saved ISO timestamp as a short local date and time. */
export function formatWhen(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
}

/** Cut long text to `max` characters, ending with an ellipsis. */
export function truncate(text: string, max: number): string {
  return text.length > max ? `${text.slice(0, max - 1)}…` : text
}

/** "1 decision", "3 decisions". */
export function pluralize(count: number, word: string): string {
  return `${count} ${count > 0 ? `${word}s` : word}`
}
