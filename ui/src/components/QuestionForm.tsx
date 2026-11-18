import { useState } from 'react'
import { Btn } from '@kirocrew/app-sdk/ui'
import { debateQuestion } from '../lib/debateQuestion'
import CharCounter from './CharCounter'
import { isTooLong } from '../lib/charCount'

interface Props {
  busy: boolean
  onDebate: (question: string) => void
}

/** The question box and the Debate button. */
export default function QuestionForm({ busy, onDebate }: Props) {
  const [question, setQuestion] = useState('')
  const trimmed = debateQuestion(question)

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={e => {
        e.preventDefault()
        if (trimmed && !busy) onDebate(trimmed)
      }}
    >
      <label className="text-sm font-medium" htmlFor="debate-question">Technical question</label>
      <textarea
        id="debate-question"
        className="w-full rounded-md border border-border bg-transparent p-2 text-sm"
        rows={2}
        placeholder="Postgres or DynamoDB for a 2-person startup?"
        value={question}
        onChange={e => setQuestion(e.target.value)}
      />
      <CharCounter text={question} />
      <div>
        <Btn primary type="submit" disabled={!trimmed || busy || isTooLong(question)} busy={busy}>Debate</Btn>
      </div>
    </form>
  )
}
