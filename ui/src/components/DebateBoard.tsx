import type { Persona } from '../lib/types'
import PersonaChat from './PersonaChat'

interface Props {
  personas: Persona[]
  slots: Record<string, string>
}

/** The persona chats, side by side. */
export default function DebateBoard({ personas, slots }: Props) {
  const shown = personas.filter(p => slots[p.id])
  return (
    <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${shown.length || 1}, minmax(0, 1fr))` }}>
      {shown.map(p => <PersonaChat key={p.id} persona={p} slot={slots[p.id]} />)}
    </div>
  )
}
