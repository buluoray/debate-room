import { useAppApi } from '@kirocrew/app-sdk'
import { ErrorNotice, PageHeader } from '@kirocrew/app-sdk/ui'
import { useCallback, useEffect, useState } from 'react'
import DebateBoard from './components/DebateBoard'
import DecideButton from './components/DecideButton'
import DecisionCard from './components/DecisionCard'
import DecisionList from './components/DecisionList'
import QuestionForm from './components/QuestionForm'
import StatsBar from './components/StatsBar'
import * as client from './lib/api'
import type { Debate, Decision, Persona } from './lib/types'
import { nextDecision } from './lib/decision'
import { useDecisionBadge } from './lib/useDecisionBadge'

export default function DebateRoom() {
  const api = useAppApi()
  const [personas, setPersonas] = useState<Persona[]>([])
  const [debate, setDebate] = useState<Debate | null>(null)
  const [slots, setSlots] = useState<Record<string, string>>({})
  const [starting, setStarting] = useState(false)
  const [deciding, setDeciding] = useState(false)
  const [decision, setDecision] = useState<Decision | null>(null)
  const [decisions, setDecisions] = useState<Decision[]>([])
  useDecisionBadge(decisions.length)
  const [error, setError] = useState('')
  const [stats, setStats] = useState<{ debates: number; decisions: number } | null>(null)

  const refreshDecisions = useCallback(() => {
    client.listDecisions(api).then(setDecisions).catch(e => setError(String(e)))
    client.getStats(api).then(setStats).catch(() => setStats(null))
  }, [api])

  useEffect(() => {
    client.listPersonas(api).then(setPersonas).catch(e => setError(String(e)))
    refreshDecisions()
  }, [api, refreshDecisions])

  async function onDebate(question: string) {
    setError('')
    setDecision(nextDecision({ kind: 'debate-started' }))
    setStarting(true)
    try {
      const { debate: started, plan } = await client.startDebate(api, question)
      // All persona chats start at once.
      const entries = await Promise.all(
        Object.entries(plan).map(async ([id, item]) => [id, await client.openPersonaChat(api, item)] as const),
      )
      setDebate(started)
      setSlots(Object.fromEntries(entries))
      refreshDecisions()
    } catch (e) {
      setError(String(e))
    } finally {
      setStarting(false)
    }
  }

  async function onDecide() {
    if (!debate) return
    setError('')
    setDeciding(true)
    try {
      const transcripts = Object.fromEntries(
        await Promise.all(
          Object.entries(slots).map(async ([id, slot]) => [id, await client.readTranscript(api, slot)] as const),
        ),
      )
      const made = await client.decide(api, debate.id, transcripts)
      setDecision(made)
      refreshDecisions()
    } catch (e) {
      setError(String(e))
    } finally {
      setDeciding(false)
    }
  }

  return (
    <>
      <PageHeader title="Debate Room" subtitle="Three agents argue your technical question. A Judge decides." />
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-6 pb-8">
        <QuestionForm busy={starting} onDebate={onDebate} />
        {error && <ErrorNotice message={error} onDismiss={() => setError('')} />}
        {debate && (
          <>
            <p className="text-sm"><span className="font-semibold">Question:</span> {debate.question}</p>
            <DebateBoard personas={personas} slots={slots} />
            <DecideButton busy={deciding} onDecide={onDecide} />
          </>
        )}
        {decision && <DecisionCard decision={decision} />}
        <StatsBar stats={stats} />
        <DecisionList decisions={decisions} onOpen={setDecision} />
      </div>
    </>
  )
}
