/** How each persona looks: its drawn mark, accent colour and tagline. */
export interface PersonaTheme {
  /** SVG path data drawn in a 24x24 box with a stroke, no fill. */
  mark: string
  /** From persona.color in backend/personas/<id>.json. */
  accent: string
  tagline: string
  /** Picks the column style in DebateStyles.tsx. */
  variant: 'guard' | 'ledger' | 'sprint' | 'record' | 'plain'
}

const THEMES: Record<string, Omit<PersonaTheme, 'accent'>> = {
  security: {
    mark: 'M12 2 4 5v6c0 5 3.4 9.3 8 11 4.6-1.7 8-6 8-11V5l-8-3Z M9 12l2 2 4-4',
    tagline: 'What could go wrong?',
    variant: 'guard',
  },
  cost: {
    mark: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z M15 9h-4a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4H9 M12 6v2 M12 17v2',
    tagline: 'What will it cost?',
    variant: 'ledger',
  },
  speed: {
    mark: 'M13 2 4 14h7l-1 8 9-12h-7l1-8Z',
    tagline: 'How fast can we ship?',
    variant: 'sprint',
  },
  compliance: {
    mark: 'M6 3h9l3 3v15H6Z M9 9h6 M9 13h6 M9 17h4',
    tagline: 'Would an auditor sign off?',
    variant: 'record',
  },
}

const FALLBACK: Omit<PersonaTheme, 'accent'> = {
  mark: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z M8 12h8',
  tagline: '',
  variant: 'plain',
}

/** The theme for a persona id. An unknown id gets a neutral look.
 * The accent is always the persona's own colour; with none, the text colour. */
export function personaTheme(id: string, color?: string): PersonaTheme {
  return { ...(THEMES[id] ?? FALLBACK), accent: color || 'currentColor' }
}
