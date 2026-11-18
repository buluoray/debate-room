import { beforeEach, describe, expect, it, vi } from 'vitest'

const setBadge = vi.fn()

vi.mock('@kirocrew/app-sdk', () => ({ useNavBadge: () => setBadge }))
// Run effects at once, so the hook can be called outside a renderer.
vi.mock('react', () => ({ useEffect: (fn: () => void) => fn() }))

import { useDecisionBadge } from './useDecisionBadge'

describe('useDecisionBadge', () => {
  beforeEach(() => setBadge.mockClear())

  it('sets the badge to the decision count', () => {
    useDecisionBadge(3)
    expect(setBadge).toHaveBeenCalledWith(3)
  })

  it('updates the badge when the count changes', () => {
    useDecisionBadge(3)
    useDecisionBadge(4)
    expect(setBadge).toHaveBeenLastCalledWith(4)
  })

  it('clears the badge with 0', () => {
    useDecisionBadge(0)
    expect(setBadge).toHaveBeenCalledWith(0)
  })
})
