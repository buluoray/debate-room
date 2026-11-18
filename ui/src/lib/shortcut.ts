/** Key facts of a key press, so the check can be tested without a DOM. */
export interface KeyPress {
  key: string
  ctrlKey: boolean
  metaKey: boolean
}

/** True for Ctrl+Enter, or Cmd+Enter on macOS. */
export function isDecideShortcut(e: KeyPress): boolean {
  return e.key === 'Enter' && (e.ctrlKey || e.metaKey)
}
