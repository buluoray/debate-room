import { describe, expect, it } from 'vitest'
import { nextDecision } from './decision'
import type { Decision } from './types'

const old: Decision = {
  id: 'd1',
  debate_id: 'b1',
  question: 'Old question?',
  created_at: '2026-11-18T09:00:00+00:00',
  choice: 'Yes',
  why: 'Because.',
  risks: [],
}

describe('nextDecision', () => {
  it('clears the card when a new debate starts', () => {
    expect(nextDecision({ kind: 'debate-started' })).toBeNull()
  })
  it('shows a past decision opened from the list', () => {
    expect(nextDecision({ kind: 'shown', decision: old })).toBe(old)
  })
})
