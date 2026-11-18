import { describe, expect, it } from 'vitest'
import { risksToShow } from './risks'

describe('risksToShow', () => {
  it('keeps every risk in order', () => {
    expect(risksToShow(['a', 'b', 'c'])).toEqual(['a', 'b', 'c'])
  })
  it('keeps a single risk', () => {
    expect(risksToShow(['only'])).toEqual(['only'])
  })
  it('returns nothing for no risks', () => {
    expect(risksToShow([])).toEqual([])
  })
})
