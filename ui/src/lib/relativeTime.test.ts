import { describe, expect, it } from 'vitest'
import { formatWhen } from './format'
import { relativeTime } from './relativeTime'

const now = new Date('2026-11-18T12:00:00Z')

describe('relativeTime', () => {
  it('says just now under 1 minute', () => {
    expect(relativeTime('2026-11-18T11:59:30Z', now)).toBe('just now')
  })
  it('says N min ago under 1 hour', () => {
    expect(relativeTime('2026-11-18T11:55:00Z', now)).toBe('5 min ago')
  })
  it('says N h ago under 24 hours', () => {
    expect(relativeTime('2026-11-18T09:00:00Z', now)).toBe('3 h ago')
  })
  it('falls back to the full date after 24 hours', () => {
    const iso = '2026-11-16T12:00:00Z'
    expect(relativeTime(iso, now)).toBe(formatWhen(iso))
  })
})
