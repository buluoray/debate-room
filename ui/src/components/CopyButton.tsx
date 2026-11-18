import { Btn } from '@kirocrew/app-sdk/ui'
import { useState } from 'react'
import { decisionText } from '../lib/decisionText'
import type { Decision } from '../lib/types'

/** Puts one decision on the clipboard as plain text. */
export default function CopyButton({ decision }: { decision: Decision }) {
  const [copied, setCopied] = useState(false)

  async function onCopy() {
    await navigator.clipboard.writeText(decisionText(decision))
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return <Btn onClick={onCopy}>{copied ? 'Copied' : 'Copy'}</Btn>
}
