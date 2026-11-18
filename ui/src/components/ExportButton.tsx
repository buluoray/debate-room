import { useAppApi } from '@kirocrew/app-sdk'
import { Btn } from '@kirocrew/app-sdk/ui'
import { useState } from 'react'
import { exportMarkdown } from '../lib/api'

/** Downloads one decision as a Markdown file. */
export default function ExportButton({ decisionId }: { decisionId: string }) {
  const api = useAppApi()
  const [busy, setBusy] = useState(false)

  async function onExport() {
    setBusy(true)
    try {
      const { filename, markdown } = await exportMarkdown(api, decisionId)
      const url = URL.createObjectURL(new Blob([markdown], { type: 'text/markdown' }))
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      link.click()
      URL.revokeObjectURL(url)
    } finally {
      setBusy(false)
    }
  }

  return <Btn onClick={onExport} busy={busy}>Export Markdown</Btn>
}
