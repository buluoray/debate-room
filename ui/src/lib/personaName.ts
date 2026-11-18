import type { Persona } from './types'

/** The name a person reads. The id is internal, so it is only a fallback. */
export function personaName(p: Pick<Persona, 'id' | 'label'>): string {
  return p.label?.trim() || p.id
}
