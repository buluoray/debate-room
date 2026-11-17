export interface Persona {
  id: string
  label: string
  focus?: string
  color?: string
  agent: string
  order?: number
}

export interface PlanItem {
  slot: string
  agent: string
  title: string
  prompt: string
}

export interface Debate {
  id: string
  question: string
  slots: Record<string, string>
  created_at: string
  decision_id: string | null
}

export interface Decision {
  id: string
  debate_id: string
  question: string
  created_at: string
  choice: string
  why: string
  risks: string[]
}
