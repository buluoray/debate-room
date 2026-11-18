/** The question to send, trimmed, or null when there is no real text. */
export function debateQuestion(raw: string): string | null {
  const trimmed = raw.trim()
  return trimmed ? trimmed : null
}
