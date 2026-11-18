import { describe, expect, it } from 'vitest'
import { decisionText } from './decisionText'
import type { Decision } from './types'

const base: Decision = {
  id: 'd1',
  debate_id: 'b1',
  question: 'Use Postgres?',
  created_at: '2026-11-18T09:00:00+00:00',
  choice: 'Yes',
  why: 'It fits.',
  risks: ['Cost', 'Ops load'],
}

describe('decisionText', () => {
  it('formats every risk', () => {
    expect(decisionText(base)).toBe(
      'Decision: Yes\nQuestion: Use Postgres?\nWhy: It fits.\nRisks:\n- Cost\n- Ops load',
    )
  })
  it('handles no risks', () => {
    expect(decisionText({ ...base, risks: [] })).toBe(
      'Decision: Yes\nQuestion: Use Postgres?\nWhy: It fits.\nRisks:',
    )
  })
})
