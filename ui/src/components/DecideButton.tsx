import { useEffect } from 'react'
import { Btn } from '@kirocrew/app-sdk/ui'
import { isDecideShortcut } from '../lib/shortcut'

interface Props {
  busy: boolean
  onDecide: () => void
}

/** Asks the Judge to read all chats and write a decision record. */
export default function DecideButton({ busy, onDecide }: Props) {
  // The button only renders while a debate is on screen, so the shortcut does too.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!isDecideShortcut(e)) return
      e.preventDefault()
      if (!busy) onDecide()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [busy, onDecide])

  return (
    <div>
      <Btn primary onClick={onDecide} disabled={busy} busy={busy} title="Ctrl+Enter">Decide</Btn>
    </div>
  )
}
