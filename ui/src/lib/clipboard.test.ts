import { describe, expect, it } from 'vitest'
import { copyText } from './clipboard'

describe('copyText', () => {
  it('reports success', async () => {
    let got = ''
    const result = await copyText('hi', async (t) => { got = t })
    expect(result).toBe('copied')
    expect(got).toBe('hi')
  })
  it('reports a rejected write as failed', async () => {
    const result = await copyText('hi', () => Promise.reject(new Error('denied')))
    expect(result).toBe('failed')
  })
  it('reports a missing clipboard as failed', async () => {
    const result = await copyText('hi', () => { throw new TypeError('no clipboard') })
    expect(result).toBe('failed')
  })
})
