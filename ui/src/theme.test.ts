import { describe, expect, it } from 'vitest'
import { personaTheme } from './theme'

describe('personaTheme', () => {
  it('gives the three debaters their own look', () => {
    const s = personaTheme('security')
    const c = personaTheme('cost')
    const f = personaTheme('speed')
    expect(s.tagline).toBe('What could go wrong?')
    expect(c.tagline).toBe('What will it cost?')
    expect(f.tagline).toBe('How fast can we ship?')
    expect(new Set([s.accent, c.accent, f.accent]).size).toBe(3)
    expect(new Set([s.mark, c.mark, f.mark]).size).toBe(3)
    expect(new Set([s.variant, c.variant, f.variant]).size).toBe(3)
  })

  it('falls back to a neutral look for an unknown persona', () => {
    const t = personaTheme('nobody')
    expect(t.variant).toBe('plain')
    expect(t.tagline).toBe('')
    expect(t.mark).not.toBe('')
    expect(personaTheme('nobody', '#123456').accent).toBe('#123456')
  })
})
