import { useState } from 'react'
import { Btn } from '@kirocrew/app-sdk/ui'

interface Props {
  busy: boolean
  onDebate: (question: string) => void
}

/** The question box and the Debate button. */
export default function QuestionForm({ busy, onDebate }: Props) {
  const [question, setQuestion] = useState('')
  const trimmed = question.trim()

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={e => {
        e.preventDefault()
        if (question && !busy) onDebate(question)
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
      <div>
        <Btn primary type="submit" disabled={!question || busy} busy={busy}>Debate</Btn>
      </div>
    </form>
  )
}
