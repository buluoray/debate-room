import { describe, expect, it } from 'vitest'
import { formatWhen, truncate } from './format'

describe('truncate', () => {
  it('keeps short text', () => {
    expect(truncate('hello', 10)).toBe('hello')
  })
})

describe('formatWhen', () => {
  it('returns bad input unchanged', () => {
    expect(formatWhen('not a date')).toBe('not a date')
  })
  it('formats a real timestamp', () => {
    expect(formatWhen('2026-11-18T09:00:00+00:00')).toMatch(/2026/)
  })
})
