/** Same limit as MAX_QUESTION in backend/routes/debates.py. */
export const MAX_QUESTION = 2000

/** The length the server checks: it trims the question first. */
export function questionLength(text: string): number {
  return text.trim().length
}

/** True when the server would refuse this question as too long. */
export function isTooLong(text: string, max: number = MAX_QUESTION): boolean {
  return questionLength(text) > max
}
