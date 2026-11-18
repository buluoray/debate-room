import { describe, expect, it } from 'vitest'
import { personaName } from './personaName'

describe('personaName', () => {
  it('shows the label, not the id', () => {
    expect(personaName({ id: 'security', label: 'Security' })).toBe('Security')
    expect(personaName({ id: 'cost', label: 'Cost' })).toBe('Cost')
    expect(personaName({ id: 'speed', label: 'Delivery speed' })).toBe('Delivery speed')
  })

  it('falls back to the id when the label is empty', () => {
    expect(personaName({ id: 'speed', label: '' })).toBe('speed')
    expect(personaName({ id: 'speed', label: '   ' })).toBe('speed')
  })
})
