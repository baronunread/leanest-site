export type DiffLineType = 'context' | 'add' | 'del' | 'hunk'

export interface DiffLine {
  type: DiffLineType
  oldNum: number | null
  newNum: number | null
  content: string
}

/** Parses a single-file unified diff (the body after the --- / +++ headers) into renderable lines. */
export function parseUnifiedDiff(patch: string): DiffLine[] {
  const lines: DiffLine[] = []
  let oldNum = 0
  let newNum = 0

  for (const raw of patch.split('\n')) {
    if (raw.startsWith('---') || raw.startsWith('+++')) continue

    const hunkMatch = /^@@ -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@/.exec(raw)
    if (hunkMatch) {
      oldNum = Number(hunkMatch[1])
      newNum = Number(hunkMatch[2])
      lines.push({ type: 'hunk', oldNum: null, newNum: null, content: raw })
      continue
    }

    if (raw.startsWith('+')) {
      lines.push({ type: 'add', oldNum: null, newNum: newNum++, content: raw.slice(1) })
    } else if (raw.startsWith('-')) {
      lines.push({ type: 'del', oldNum: oldNum++, newNum: null, content: raw.slice(1) })
    } else if (raw.length > 0) {
      lines.push({ type: 'context', oldNum: oldNum++, newNum: newNum++, content: raw.slice(1) })
    }
  }

  return lines
}
