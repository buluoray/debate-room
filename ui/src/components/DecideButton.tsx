import { Btn } from '@kirocrew/app-sdk/ui'

interface Props {
  busy: boolean
  onDecide: () => void
}

/** Asks the Judge to read all chats and write a decision record. */
export default function DecideButton({ busy, onDecide }: Props) {
  return (
    <div>
      <Btn primary onClick={onDecide} disabled={busy} busy={busy}>Decide</Btn>
    </div>
  )
}
