/** True when the "No decisions yet" message should show. */
export function showNoDecisions(decisions: readonly unknown[]): boolean {
  return decisions.length === 0
}
