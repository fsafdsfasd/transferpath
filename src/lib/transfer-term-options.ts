/**
 * Rolling transfer entry labels for typical U.S. semester starts: **Spring ≈ January**, **Fall ≈ August**.
 * Used for onboarding + Settings; not calendar-exact (institutions vary).
 *
 * `getNextTransferTermOptions` returns the next `count` intakes **strictly on or after today’s UTC calendar date**
 * (midnight UTC), ordered by approximate intake start (Spring mid‑Jan, Fall mid‑Aug).
 *
 * Examples (`getNextTransferTermOptions(3, date)`):
 * - **May 14, 2026** → `["Fall 2026", "Spring 2027", "Fall 2027"]`
 * - **Jan 5, 2027** → `["Spring 2027", "Fall 2027", "Spring 2028"]`
 * - **Sep 10, 2026** (after Fall 2026 start) → `["Spring 2027", "Fall 2027", "Spring 2028"]`
 */

export type ParsedTransferTerm = {
  /** Title case: Spring | Summer | Fall */
  season: string
  year: number
}

const TRANSFER_INTAKE_SEASONS: readonly string[] = ["Spring", "Fall"]

/** Mid-month UTC anchors for chronological ordering (planning only). */
function intakeAnchorUtc(season: string, year: number): number {
  const s = season.toLowerCase()
  if (s === "spring") return Date.UTC(year, 0, 15)
  if (s === "summer") return Date.UTC(year, 5, 15)
  if (s === "fall") return Date.UTC(year, 7, 15)
  return Date.UTC(year, 0, 1)
}

function startOfTodayUtc(now: Date): number {
  return Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
}

/**
 * Next `count` transfer intakes (Spring / Summer / Fall + year), chronological, on or after today UTC.
 */
export function getNextTransferTermOptions(count = 3, now = new Date()): string[] {
  const minTs = startOfTodayUtc(now)
  const startYear = now.getUTCFullYear() - 1
  const candidates: { label: string; ts: number }[] = []

  for (let y = startYear; y <= startYear + 6; y++) {
    for (const season of TRANSFER_INTAKE_SEASONS) {
      const ts = intakeAnchorUtc(season, y)
      if (ts < minTs) continue
      candidates.push({ label: `${season} ${y}`, ts })
    }
  }

  candidates.sort((a, b) => a.ts - b.ts)
  const out: string[] = []
  for (const c of candidates) {
    if (out.length >= count) break
    out.push(c.label)
  }
  return out
}

/**
 * Parse profile/onboarding strings like `"Fall 2026"` or `"fall 2026"`.
 * Returns null if the string is empty or not `Season + 4-digit year`.
 */
export function parseExpectedTransferTerm(raw: string | null | undefined): ParsedTransferTerm | null {
  const t = raw?.trim()
  if (!t) return null
  const m = /^(spring|summer|fall)\s+(\d{4})$/i.exec(t)
  if (!m) return null
  const seasonLower = m[1].toLowerCase()
  const season = seasonLower.charAt(0).toUpperCase() + seasonLower.slice(1)
  const year = Number.parseInt(m[2], 10)
  if (!Number.isFinite(year)) return null
  return { season, year }
}

/** Canonical display for a parsed term (for Select values). */
export function formatParsedTransferTerm(p: ParsedTransferTerm): string {
  return `${p.season} ${p.year}`
}

/**
 * Normalize free-text term to canonical `"Fall 2026"` when parseable; otherwise trimmed raw (for legacy rows).
 */
export function normalizeTransferTermForSelect(raw: string | null | undefined): string {
  const t = raw?.trim() ?? ""
  if (!t) return ""
  const p = parseExpectedTransferTerm(t)
  return p ? formatParsedTransferTerm(p) : t
}

/**
 * Rolling options plus any current value not in the rolling list (case-insensitive), deduped.
 */
export function getTransferTermSelectOptions(
  currentValue: string | null | undefined,
  count = 3,
  now = new Date()
): string[] {
  const rolling = getNextTransferTermOptions(count, now)
  const norm = normalizeTransferTermForSelect(currentValue ?? "")
  if (!norm) return rolling
  const lower = norm.toLowerCase()
  if (rolling.some((r) => r.toLowerCase() === lower)) return rolling
  return [norm, ...rolling]
}
