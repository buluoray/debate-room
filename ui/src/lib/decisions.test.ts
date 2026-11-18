import { describe, expect, it } from 'vitest'
import { showNoDecisions } from './decisions'

describe('showNoDecisions', () => {
  it('shows the message when there are no decisions', () => {
    expect(showNoDecisions([])).toBe(true)
  })

  it('hides the message once one decision exists', () => {
    expect(showNoDecisions([{ id: 'a' }])).toBe(false)
  })

  it('hides the message with many decisions', () => {
    expect(showNoDecisions([{ id: 'a' }, { id: 'b' }, { id: 'c' }])).toBe(false)
  })
})
