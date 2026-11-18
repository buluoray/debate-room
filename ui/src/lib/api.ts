import type { AppApi } from '@kirocrew/app-sdk'
import type { Debate, Decision, Persona, PlanItem } from './types'

// Kiro Crew mounts the app backend under this prefix.
export const BASE = '/api/apps/debate-room'

export async function listPersonas(api: AppApi): Promise<Persona[]> {
  const res = await api.get<{ personas: Persona[] }>(`${BASE}/personas`)
  return res.personas
}

export async function startDebate(api: AppApi, question: string) {
  return api.post<{ debate: Debate; plan: Record<string, PlanItem> }>(`${BASE}/debates`, { question })
}

/** Create one persona's chat session and send it the opening prompt. */
export async function openPersonaChat(api: AppApi, item: PlanItem): Promise<string> {
  const created = await api.post<{ key?: string; slot?: string }>('/api/chat/slots', {
    name: item.slot,
    agent: item.agent,
    // The agent is this app's own agent template, not a Bot.
    agent_kind: 'template',
    app_agent_owner: 'debate-room',
    title: item.title,
  })
  const key = created?.key || created?.slot || item.slot
  // The chat endpoint answers 202 with no JSON body, so read the raw response.
  await api.raw('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ slot: key, message: item.prompt }),
  })
  return key
}

interface SlotMessage { role: string; content: string }

/** What was said in one chat, as plain text for the Judge. */
export async function readTranscript(api: AppApi, slot: string): Promise<string> {
  const res = await api.get<{ messages?: SlotMessage[] }>(
    `/api/chat/slots/${encodeURIComponent(slot)}?limit=200`,
  )
  return (res?.messages ?? [])
    .filter(m => (m.role === 'user' || m.role === 'assistant') && m.content)
    .map(m => `${m.role === 'user' ? 'User' : 'Advocate'}: ${m.content}`)
    .join('\n\n')
}

export async function decide(api: AppApi, debateId: string, transcripts: Record<string, string>) {
  const res = await api.post<{ decision: Decision }>(`${BASE}/debates/${debateId}/decide`, { transcripts })
  return res.decision
}

export async function getStats(api: AppApi): Promise<{ debates: number; decisions: number }> {
  return api.get(`${BASE}/stats`)
}

export async function exportMarkdown(api: AppApi, decisionId: string) {
  return api.get<{ filename: string; markdown: string }>(`${BASE}/decisions/${decisionId}/markdown`)
}

export async function listDecisions(api: AppApi): Promise<Decision[]> {
  const res = await api.get<{ decisions: Decision[] }>(`${BASE}/decisions`)
  return res.decisions
}
