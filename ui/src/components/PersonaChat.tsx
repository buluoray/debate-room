import { ChatEmbed } from '@kirocrew/app-sdk'
import type { Persona } from '../lib/types'

interface Props {
  persona: Persona
  slot: string
}

/** One persona's live chat. Typing here adds a fact for that agent only. */
export default function PersonaChat({ persona, slot }: Props) {
  return (
    <section className="flex min-h-0 min-w-0 flex-col rounded-lg border border-border">
      <header
        className="flex items-center gap-2 border-b border-border px-3 py-2"
        style={{ borderTop: `3px solid ${persona.color || 'currentColor'}` }}
      >
        <span
          aria-hidden
          className="inline-block h-2.5 w-2.5 rounded-full"
          style={{ background: persona.color || 'currentColor' }}
        />
        <span className="text-sm font-semibold" title={persona.focus}>{persona.id}</span>
        {persona.focus && <span className="truncate text-xs text-muted">{persona.focus}</span>}
      </header>
      <div className="h-[420px] min-h-0">
        <ChatEmbed
          slotKey={slot}
          frameless
          startAtBottom
          placeholder={`Add a fact for ${persona.label}…`}
        />
      </div>
    </section>
  )
}
