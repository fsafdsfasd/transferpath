import { OFFICIAL_PREREQ_DISCLAIMER } from "@/lib/field-of-study"

export function OfficialPrereqDisclaimer({ className }: { className?: string }) {
  return (
    <p
      className={`text-xs text-muted-foreground leading-relaxed border-l-2 border-border pl-3 ${className ?? ""}`}
    >
      {OFFICIAL_PREREQ_DISCLAIMER}
    </p>
  )
}
