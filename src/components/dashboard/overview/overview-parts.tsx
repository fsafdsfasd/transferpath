import { Meter } from "@/components/ui/progress"
import type { MilestoneState, SubMetric } from "@/types/overview"
import type { RoadmapStep } from "@/types/overview"

export function ReadinessRing({ value }: { value: number }) {
  const r = 42
  const c = 2 * Math.PI * r
  return (
    <div className="relative size-32 shrink-0">
      <svg viewBox="0 0 100 100" className="size-full -rotate-90" aria-hidden>
        <circle cx="50" cy="50" r={r} fill="none" stroke="var(--color-secondary)" strokeWidth="6" />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - value / 100)}
        />
      </svg>
      <span className="absolute inset-0 grid place-items-center font-heading text-3xl text-foreground">
        <span aria-hidden="true">{value}%</span>
        <span className="sr-only">Planner readiness: {value} percent complete</span>
      </span>
    </div>
  )
}

export function SubMetricBar({ label, value }: SubMetric) {
  return (
    <div>
      <div className="flex justify-between text-xs">
        <span className="uppercase tracking-wide text-muted-foreground">{label}</span>
        <span className="font-mono tabular-nums text-foreground">{value}</span>
      </div>
      <Meter value={value} label={`${label}: ${value} out of 100`} className="mt-1.5" />
    </div>
  )
}

export function RoadmapTrack({
  steps,
  progressPct,
}: {
  steps: RoadmapStep[]
  progressPct: number
}) {
  if (steps.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Set your target school and transfer term in Settings to see your full transfer path.
      </p>
    )
  }

  const colMin = steps.length > 4 ? "6.5rem" : "5.5rem"

  return (
    <div className="relative -mx-1 overflow-x-auto px-1 pb-2">
      <div
        className="relative min-w-full"
        style={{ minWidth: `max(100%, ${steps.length * 88}px)` }}
      >
        <div className="absolute left-0 right-0 top-3 h-px bg-border" />
        <div
          className="absolute left-0 top-3 h-px bg-accent/60"
          style={{ width: `${Math.min(100, progressPct)}%` }}
        />
        <div
          className="relative grid gap-4"
          style={{
            gridTemplateColumns: `repeat(${steps.length}, minmax(${colMin}, 1fr))`,
          }}
        >
          {steps.map((s) => (
            <div
              key={`${s.title}-${s.term}`}
              className="flex min-w-0 flex-col items-center px-1 text-center"
            >
              <RoadmapNode state={s.state} />
              <p className="mt-4 w-full break-words text-sm font-medium leading-snug">
                {s.title}
              </p>
              <p className="mt-0.5 w-full break-words tp-eyebrow leading-tight text-muted-foreground">
                {s.term}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function RoadmapNode({ state }: { state: MilestoneState }) {
  if (state === "done") {
    return (
      <div className="grid size-6 place-items-center rounded-full bg-chart-3 text-primary-foreground ring-4 ring-card">
        <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth="4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    )
  }
  if (state === "active") {
    return (
      <div className="relative size-6 rounded-full bg-accent ring-4 ring-card">
        <span className="absolute inset-0 -m-2 rounded-full bg-accent/15 animate-pulse-ring" />
      </div>
    )
  }
  if (state === "target") {
    return (
      <div className="grid size-6 place-items-center rounded-full bg-primary ring-4 ring-card">
        <div className="size-2 rounded-full bg-accent" />
      </div>
    )
  }
  return (
    <div className="size-6 rounded-full border-2 border-primary/40 bg-card ring-4 ring-card" />
  )
}
