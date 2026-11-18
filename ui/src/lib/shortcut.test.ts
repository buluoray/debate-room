import { describe, expect, it } from 'vitest'
import { isDecideShortcut } from './shortcut'

describe('isDecideShortcut', () => {
  it('matches Ctrl+Enter and Cmd+Enter', () => {
    expect(isDecideShortcut({ key: 'Enter', ctrlKey: true, metaKey: false })).toBe(true)
    expect(isDecideShortcut({ key: 'Enter', ctrlKey: false, metaKey: true })).toBe(true)
  })
  it('ignores plain Enter and other keys', () => {
    expect(isDecideShortcut({ key: 'Enter', ctrlKey: false, metaKey: false })).toBe(false)
    expect(isDecideShortcut({ key: 'a', ctrlKey: true, metaKey: false })).toBe(false)
  })
})
