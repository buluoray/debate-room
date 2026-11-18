export type CopyResult = 'copied' | 'failed'

/** Writes text to the clipboard. The write can reject (no permission, insecure page, iframe), so report it instead of throwing. */
export async function copyText(
  text: string,
  write: (text: string) => Promise<void> = (t) => navigator.clipboard.writeText(t),
): Promise<CopyResult> {
  try {
    await write(text)
    return 'copied'
  } catch {
    return 'failed'
  }
}
