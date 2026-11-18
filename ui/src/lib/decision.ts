import type { Decision } from './types'

export type DecisionEvent =
  | { kind: 'debate-started' }
  | { kind: 'shown'; decision: Decision }

// A new debate has no decision yet, so the old card must not stay up.
export function nextDecision(event: DecisionEvent): Decision | null {
  return event.kind === 'shown' ? event.decision : null
}
