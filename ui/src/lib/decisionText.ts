import type { Decision } from './types'

/** The decision as plain text, for pasting into chat or tickets. */
export function decisionText(decision: Decision): string {
  return [
    `Decision: ${decision.choice}`,
    `Question: ${decision.question}`,
    `Why: ${decision.why}`,
    'Risks:',
    ...decision.risks.map((r) => `- ${r}`),
  ].join('\n')
}
