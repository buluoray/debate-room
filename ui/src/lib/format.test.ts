import { describe, expect, it } from 'vitest'
import { formatWhen, pluralize, truncate } from './format'

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

describe('pluralize', () => {
  it('uses the plural for 0', () => {
    expect(pluralize(0, 'debate')).toBe('0 debates')
  })
  it('uses the singular for 1', () => {
    expect(pluralize(1, 'decision')).toBe('1 decision')
  })
  it('uses the plural for 2', () => {
    expect(pluralize(2, 'decision')).toBe('2 decisions')
  })
})
