import { describe, expect, it } from 'vitest'
import { debateQuestion } from './debateQuestion'

describe('debateQuestion', () => {
  it('rejects empty and whitespace-only text', () => {
    for (const raw of ['', ' ', '   ', '\t', '\n', ' \t\n ', '\u00a0']) {
      expect(debateQuestion(raw)).toBeNull()
    }
  })
  it('trims real text', () => {
    expect(debateQuestion('  Postgres or DynamoDB?\n')).toBe('Postgres or DynamoDB?')
    expect(debateQuestion('a')).toBe('a')
  })
  it('keeps inner spaces', () => {
    expect(debateQuestion(' a  b ')).toBe('a  b')
  })
})
