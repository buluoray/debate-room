import { Btn } from '@kirocrew/app-sdk/ui'
import { useState } from 'react'
import { copyText, type CopyResult } from '../lib/clipboard'
import { decisionText } from '../lib/decisionText'
import type { Decision } from '../lib/types'

const LABEL: Record<CopyResult | 'idle', string> = { idle: 'Copy', copied: 'Copied', failed: 'Copy failed' }

/** Puts one decision on the clipboard as plain text. */
export default function CopyButton({ decision }: { decision: Decision }) {
  const [state, setState] = useState<CopyResult | 'idle'>('idle')

  async function onCopy() {
    setState(await copyText(decisionText(decision)))
    setTimeout(() => setState('idle'), 1500)
  }

  return <Btn onClick={onCopy}>{LABEL[state]}</Btn>
}
