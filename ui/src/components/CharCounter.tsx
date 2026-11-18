import { MAX_QUESTION, isTooLong, questionLength } from '../lib/charCount'

interface Props {
  text: string
}

/** Shows "<count> / 2000" under the question box. */
export default function CharCounter({ text }: Props) {
  const over = isTooLong(text)
  return (
    <p className={`text-xs ${over ? 'text-danger' : 'text-muted'}`} aria-live="polite">
      {questionLength(text)} / {MAX_QUESTION}
    </p>
  )
}
