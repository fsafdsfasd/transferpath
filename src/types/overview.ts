export type MilestoneState = "done" | "active" | "upcoming" | "target"

export type DeadlineTone = "accent" | "success" | "muted"

export interface RoadmapStep {
  title: string
  term: string
  state: MilestoneState
}

export interface SubMetric {
  label: string
  value: number
}

export interface OverviewDeadline {
  date: string
  title: string
  tag: string
  tone?: DeadlineTone
  href?: string
}

export interface MissingRequirement {
  code: string
  title: string
  note: string
}

export interface RecommendedAction {
  eyebrow: string
  title: string
  body: string
  cta: string
  href: string
}

export interface OverviewData {
  user: {
    firstName: string
    todayLabel: string
    greetingLine: string
    subcopy: string
  }
  pathway: {
    originLabel: string
    targetLabel: string
    targetMajor?: string | null
    semesterCount: number
    progressPct: number
    steps: RoadmapStep[]
  }
  readiness: {
    score: number
    deltaLabel: string
    subMetrics: SubMetric[]
  }
  nextAction: {
    title: string
    dueLabel: string
    primaryHref: string
    followUpLabel?: string
  }
  deadlines: OverviewDeadline[]
  deadlinesCycleLabel?: string
  missingRequirements: MissingRequirement[]
  recommendedActions: RecommendedAction[]
  recommendedHeadline?: string
}
