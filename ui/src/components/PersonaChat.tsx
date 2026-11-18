import { ChatEmbed } from '@kirocrew/app-sdk'
import type { Persona } from '../lib/types'
import { personaName } from '../lib/personaName'
import { personaTheme } from '../theme'
import PersonaMark from './PersonaMark'

interface Props {
  persona: Persona
  slot: string
}

/** One persona's live chat. Typing here adds a fact for that agent only. */
export default function PersonaChat({ persona, slot }: Props) {
  const theme = personaTheme(persona.id, persona.color)
  return (
    <section
      data-variant={theme.variant}
      style={{ '--dr-accent': theme.accent } as React.CSSProperties}
      className="dr-col flex min-h-0 min-w-0 flex-col rounded-lg border border-border">
      <header
        className="dr-col-head flex items-center gap-2 border-b border-border px-3 py-2"
        style={{ borderTop: `3px solid ${persona.color || 'currentColor'}` }}
      >
        <span className="dr-col-id">
          <PersonaMark path={theme.mark} color={theme.accent} />
          <span className="dr-col-name text-sm font-semibold" title={persona.focus}>{personaName(persona)}</span>
        </span>
        {theme.tagline && <span className="dr-col-tag">{theme.tagline}</span>}
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
