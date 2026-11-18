import { describe, expect, it } from 'vitest'
import { MAX_QUESTION, isTooLong, questionLength } from './charCount'

describe('questionLength', () => {
  it('ignores spaces at the ends, like the server', () => {
    expect(questionLength('  abc \n')).toBe(3)
  })
})

describe('isTooLong', () => {
  it('allows exactly the limit', () => {
    expect(isTooLong('a'.repeat(MAX_QUESTION))).toBe(false)
  })
  it('refuses one over the limit', () => {
    expect(isTooLong('a'.repeat(MAX_QUESTION + 1))).toBe(true)
  })
})
