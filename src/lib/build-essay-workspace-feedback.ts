import type { ChecklistProfileSummary } from "@/lib/checklist-task-definitions"

export type EssayPromptId =
  | "why_transfer"
  | "leadership"
  | "diversity"
  | "extracurricular"
  | "other"

const PROMPT_LABELS: Record<EssayPromptId, { title: string; defaultSubtitle: string }> = {
  why_transfer: { title: "Personal statement", defaultSubtitle: "Why transfer" },
  leadership: { title: "Leadership essay", defaultSubtitle: "Contribution" },
  diversity: { title: "Diversity essay", defaultSubtitle: "Perspective" },
  extracurricular: { title: "Extracurricular essay", defaultSubtitle: "Activity" },
  other: { title: "Supplemental essay", defaultSubtitle: "Additional prompt" },
}

export function essayDisplayTitle(
  promptType: EssayPromptId,
  customTitle: string | null
): { title: string; subtitle: string } {
  const meta = PROMPT_LABELS[promptType]
  const trimmed = customTitle?.trim()
  if (trimmed && trimmed.length > 48) {
    return { title: meta.title, subtitle: trimmed.slice(0, 64) }
  }
  if (trimmed) {
    return { title: meta.title, subtitle: trimmed }
  }
  return { title: meta.title, subtitle: meta.defaultSubtitle }
}

export function buildDefaultPromptText(
  promptType: EssayPromptId,
  profile: ChecklistProfileSummary
): string {
  const tgt = profile.targetUniversityName?.trim() || "your target university"
  const major = profile.targetMajor?.trim() || "your intended major"
  switch (promptType) {
    case "why_transfer":
      return `Why are you applying to ${tgt}, and how will your transfer prepare you for ${major}?`
    case "leadership":
      return `Describe how you have demonstrated leadership or made a significant contribution—and how that prepares you for ${major} at ${tgt}.`
    case "diversity":
      return `How have your background or experiences shaped your perspective, and how will you contribute to ${tgt}?`
    case "extracurricular":
      return `Describe a significant activity or achievement and what it reveals about your readiness for ${major} at ${tgt}.`
    default:
      return `Respond to your target program's supplemental prompt for ${tgt} (${major}). Paste the exact question above when you have it.`
  }
}

export function buildCoachNotes(
  content: string,
  promptType: EssayPromptId,
  profile: ChecklistProfileSummary,
  tips: string[]
): string[] {
  const words = content.trim().split(/\s+/).filter(Boolean).length
  const tgt = profile.targetUniversityName?.trim()
  const notes: string[] = []

  if (words < 80) {
    notes.push("Add a concrete opening scene or moment from your current college—specific beats read stronger than general claims.")
  }
  if (tgt && !content.toLowerCase().includes(tgt.split(" ")[0]?.toLowerCase() ?? "")) {
    notes.push(`Name ${tgt} explicitly and tie one program, lab, or opportunity there to your goals.`)
  }
  if (profile.targetMajor && !content.toLowerCase().includes(profile.targetMajor.toLowerCase().slice(0, 6))) {
    notes.push(`Connect your narrative to ${profile.targetMajor}—admissions readers look for major fit, not just enthusiasm.`)
  }
  if (words > 400) {
    notes.push("Trim repetition in the middle third; keep one clear arc from past → transfer → future.")
  }

  for (const tip of tips.slice(0, 2)) {
    if (notes.length >= 3) break
    if (!notes.some((n) => n.slice(0, 20) === tip.slice(0, 20))) notes.push(tip)
  }

  return notes.slice(0, 3)
}

export function buildStrengthSignals(
  content: string,
  profile: ChecklistProfileSummary
): string[] {
  const words = content.trim().split(/\s+/).filter(Boolean).length
  const hasI = /\b(I|I'm|I've|my)\b/.test(content)
  const signals: string[] = []

  signals.push(
    hasI && words >= 120
      ? "Voice: distinct and personal"
      : words >= 50
        ? "Voice: developing—keep your own perspective forward"
        : "Voice: not yet visible—draft in first person"
  )

  const major = profile.targetMajor?.trim()
  signals.push(
    major && content.toLowerCase().includes(major.toLowerCase().slice(0, 5))
      ? `Major fit: links to ${major}`
      : major
        ? `Major fit: mention ${major} with a specific example`
        : "Major fit: add your intended major when relevant"
  )

  signals.push(
    words >= 200
      ? "Depth: enough room for reflection and outcome"
      : words >= 100
        ? "Depth: building—add outcome or lesson learned"
        : "Depth: early draft"
  )

  return signals
}

export function buildReferenceCard(profile: ChecklistProfileSummary): {
  eyebrow: string
  body: string
  ctaLabel: string
} {
  const tgt = profile.targetUniversityName?.trim() || "your target school"
  const term = profile.expectedTransferTerm?.trim()
  return {
    eyebrow: "Reference",
    body: term
      ? `Strong transfer essays for ${tgt} usually map clearly to ${term} entry—plan several revision passes before you submit.`
      : `Set your target school and entry term in Settings to align essay length and themes with ${tgt} expectations.`,
    ctaLabel: "See requirements",
  }
}

export function formatEssayAutosaveLabel(
  savedAtIso: string | null,
  saving: boolean
): string | undefined {
  if (saving) return "Saving…"
  if (!savedAtIso) return undefined
  const d = new Date(savedAtIso)
  if (Number.isNaN(d.getTime())) return "Saved"
  const mins = Math.floor((Date.now() - d.getTime()) / 60000)
  if (mins < 1) return "Saved · just now"
  if (mins === 1) return "Saved · 1 min ago"
  if (mins < 60) return `Saved · ${mins} min ago`
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(d)
}
