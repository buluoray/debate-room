import { describe, expect, it } from 'vitest'
import { personaTheme } from './theme'

describe('personaTheme', () => {
  it('gives the three debaters their own look', () => {
    const s = personaTheme('security', '#d9534f')
    const c = personaTheme('cost', '#2e8b57')
    const f = personaTheme('speed', '#3b7dd8')
    expect(s.tagline).toBe('What could go wrong?')
    expect(c.tagline).toBe('What will it cost?')
    expect(f.tagline).toBe('How fast can we ship?')
    expect([s.accent, c.accent, f.accent]).toEqual(['#d9534f', '#2e8b57', '#3b7dd8'])
    expect(new Set([s.mark, c.mark, f.mark]).size).toBe(3)
    expect(new Set([s.variant, c.variant, f.variant]).size).toBe(3)
  })

  it('falls back to a neutral look for an unknown persona', () => {
    const t = personaTheme('nobody')
    expect(t.variant).toBe('plain')
    expect(t.tagline).toBe('')
    expect(t.mark).not.toBe('')
    expect(personaTheme('nobody', '#123456').accent).toBe('#123456')
    expect(t.accent).toBe('currentColor')
  })

  it('never uses its own colour for a known persona', () => {
    expect(personaTheme('security').accent).toBe('currentColor')
  })
})
