import type { DashboardOverallReadinessBreakdown } from "@/lib/dashboard-overall-readiness"
import type { UserCourseRow } from "@/lib/get-course-requirement-status"
import { getPrereqKeyStatus } from "@/lib/get-course-requirement-status"
import { PREREQ_ROW_LABEL, type PrereqKey } from "@/lib/prereq-catalog"
import { fieldOfStudyOrDefault, prereqKeysForField } from "@/lib/field-of-study"
import { PLANNER_CREDIT_TARGET } from "@/lib/planner-constants"
import { formatDueDateDisplay, type NextDeadline, type RequirementDeadlineRow } from "@/lib/next-deadline"
import {
  buildTimelineMilestones,
  type TimelineCourseInput,
} from "@/lib/build-timeline-milestones"
import type { ChecklistProfileSummary } from "@/lib/checklist-task-definitions"
import type { TimelineMilestone } from "@/types/timeline-milestone"
import type {
  MissingRequirement,
  OverviewData,
  OverviewDeadline,
  RecommendedAction,
  RoadmapStep,
} from "@/types/overview"

function todayLabel(): string {
  const raw = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date())
  return raw.replace(",", " ·").toUpperCase()
}

function shortDeadlineDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number)
  const dt = new Date(Date.UTC(y, m - 1, d))
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  })
    .format(dt)
    .toUpperCase()
}

function greetingSubcopy(
  score: number,
  transferTerm: string | null,
  hasUpcomingDeadline: boolean
): string {
  if (!transferTerm) {
    return "Set your target school and transfer term in Settings to unlock your timeline and deadline view."
  }
  if (score >= 88) {
    return "You're in strong shape on your planner timeline. Tackle the critical action below to stay ahead of deadlines."
  }
  if (hasUpcomingDeadline) {
    return "A few focused moves this week will lift your planner readiness and keep your application on track."
  }
  return "Review your roadmap and requirements to stay aligned with your transfer goals."
}

function subMetricsFromBreakdown(b: DashboardOverallReadinessBreakdown) {
  const academic = Math.round((b.gpa0To100 + b.credits0To100) / 2)
  const materials = Math.round((b.checklist0To100 + b.essay0To100) / 2)
  return [
    { label: "Academic", value: academic },
    { label: "Program fit", value: Math.round(b.profile0To100) },
    { label: "Requirements", value: Math.round(b.prereq0To100) },
    { label: "Materials", value: materials },
  ]
}

function deltaLabel(score: number, breakdown: DashboardOverallReadinessBreakdown): string {
  const parts: string[] = []
  if (breakdown.credits0To100 >= 80 && breakdown.gpa0To100 >= 80) {
    parts.push("Strong academic baseline on your profile")
  } else if (breakdown.credits0To100 < 50 || breakdown.gpa0To100 < 50) {
    parts.push("Academic profile still has room to grow")
  }
  parts.push(`Planner readiness at ${score}%`)
  return parts.join(" · ")
}

function roadmapTermLabel(m: TimelineMilestone): string {
  const range = m.dateRange?.trim()
  if (range && range !== "—") return range
  return m.termLabel
}

/** Same milestone sequence as Semester Timeline → compact Overview track. */
export function timelineMilestonesToRoadmapSteps(milestones: TimelineMilestone[]): {
  steps: RoadmapStep[]
  semesterCount: number
} {
  const steps: RoadmapStep[] = milestones.map((m) => ({
    title: m.phaseTitle,
    term: roadmapTermLabel(m),
    state: m.state,
  }))
  return { steps, semesterCount: milestones.length }
}

function buildPathwayFromTimeline(input: {
  timelineCourses: TimelineCourseInput[]
  checklistProfile: ChecklistProfileSummary
  gpa: number | null
  creditsCompleted: number | null
  checklistCompleteByTaskKey: Record<string, boolean | undefined>
  deadlineRows: RequirementDeadlineRow[]
  nextDeadline: NextDeadline
  essayStarted: boolean
}): { steps: RoadmapStep[]; semesterCount: number } {
  const { milestones } = buildTimelineMilestones({
    courses: input.timelineCourses,
    profile: input.checklistProfile,
    gpa: input.gpa,
    creditsCompleted: input.creditsCompleted,
    checklistCompleteByTaskKey: input.checklistCompleteByTaskKey,
    deadlineRows: input.deadlineRows,
    nextDeadline: input.nextDeadline,
    essayStarted: input.essayStarted,
  })
  return timelineMilestonesToRoadmapSteps(milestones)
}

function buildMissingRequirements(
  userCourses: UserCourseRow[],
  fieldOfStudy: string | null,
  gpa: number | null,
  creditsCompleted: number | null,
  essayStarted: boolean,
  recommendationLettersDone: boolean,
  officialTranscriptRequested: boolean
): MissingRequirement[] {
  const out: MissingRequirement[] = []
  const keys = prereqKeysForField(fieldOfStudyOrDefault(fieldOfStudy))

  for (const key of keys) {
    const st = getPrereqKeyStatus(key, userCourses)
    if (st === "done") continue
    out.push({
      code: key.replace(/_/g, " ").toUpperCase(),
      title: PREREQ_ROW_LABEL[key as PrereqKey] ?? key,
      note: st === "in-progress" ? "In progress in your course list" : "Not yet on your timeline",
    })
  }

  if (gpa == null || gpa < 3.0) {
    out.push({
      code: "GPA",
      title: gpa == null ? "GPA not on profile" : "GPA below 3.0 planner target",
      note: "Update in Settings if your transcript reflects a higher GPA",
    })
  }

  if (creditsCompleted == null || creditsCompleted < PLANNER_CREDIT_TARGET) {
    out.push({
      code: "CREDITS",
      title: `${PLANNER_CREDIT_TARGET} credit hours (planner)`,
      note:
        creditsCompleted != null
          ? `${creditsCompleted} / ${PLANNER_CREDIT_TARGET} logged`
          : "Add completed credits in Settings",
    })
  }

  if (!essayStarted) {
    out.push({
      code: "ESSAY",
      title: "Transfer essay",
      note: "No draft content saved yet",
    })
  }

  if (!recommendationLettersDone) {
    out.push({
      code: "RECS",
      title: "Recommendation letters",
      note: "Request early via your checklist",
    })
  }

  if (!officialTranscriptRequested) {
    out.push({
      code: "TRANSCRIPT",
      title: "Official transcript",
      note: "Allow time for registrar processing",
    })
  }

  return out.slice(0, 5)
}

function buildRecommendedActions(args: {
  overallReadinessScore: number
  creditsCompleted: number | null
  gpa: number | null
  essayStarted: boolean
  recommendationLettersDone: boolean
  officialTranscriptRequested: boolean
  hasTargetUniversity: boolean
  nextDeadline: NextDeadline
}): RecommendedAction[] {
  type Rec = RecommendedAction & { priority: number }
  const score = Math.round(Math.min(100, Math.max(0, args.overallReadinessScore)))
  const out: Rec[] = []

  if (!args.hasTargetUniversity) {
    out.push({
      eyebrow: "Decisive",
      title: "Choose your target university",
      body: "Deadlines and requirements stay generic until you set a target school.",
      cta: "Open settings",
      href: "/dashboard/settings",
      priority: 100,
    })
  }

  if (args.gpa == null) {
    out.push({
      eyebrow: "Quick win",
      title: "Add your GPA",
      body: "GPA feeds your readiness score and academic sub-metrics.",
      cta: "Update profile",
      href: "/dashboard/settings",
      priority: 94,
    })
  }

  if (!args.essayStarted) {
    out.push({
      eyebrow: "High impact",
      title: "Start your transfer essay",
      body: "Capture a first draft in the essay workspace — even bullet points count.",
      cta: "Open essay workspace",
      href: "/dashboard/essay",
      priority: 92,
    })
  }

  if (args.creditsCompleted == null) {
    out.push({
      eyebrow: "Quick win",
      title: "Log completed credits",
      body: `We track progress toward ${PLANNER_CREDIT_TARGET} credits in your planner.`,
      cta: "Add credits",
      href: "/dashboard/settings",
      priority: 88,
    })
  } else if (args.creditsCompleted < PLANNER_CREDIT_TARGET) {
    out.push({
      eyebrow: "High impact",
      title: `Plan ${PLANNER_CREDIT_TARGET - args.creditsCompleted} more credits`,
      body: `You have ${args.creditsCompleted} / ${PLANNER_CREDIT_TARGET} credits on file.`,
      cta: "Open timeline",
      href: "/dashboard/timeline",
      priority: 86,
    })
  }

  if (!args.recommendationLettersDone) {
    out.push({
      eyebrow: "High impact",
      title: "Request recommendation letters",
      body: "Give recommenders several weeks — track progress on your checklist.",
      cta: "Open checklist",
      href: "/dashboard/checklist",
      priority: 80,
    })
  }

  if (args.nextDeadline && args.nextDeadline.daysUntil <= 180) {
    const dl = args.nextDeadline
    out.push({
      eyebrow: dl.daysUntil <= 30 ? "Decisive" : "Quick win",
      title: dl.title.slice(0, 64),
      body: `${dl.dueDate} · ${dl.daysUntil} day${dl.daysUntil === 1 ? "" : "s"} out`,
      cta: "Review requirements",
      href: "/dashboard/requirements",
      priority: dl.daysUntil <= 30 ? 98 : 70,
    })
  }

  if (score < 88) {
    out.push({
      eyebrow: "Quick win",
      title: "Review requirements",
      body: `Planner readiness is ${score}% — close gaps before deadlines stack up.`,
      cta: "View requirements",
      href: "/dashboard/requirements",
      priority: 58,
    })
  }

  out.sort((a, b) => b.priority - a.priority)
  const seen = new Set<string>()
  const deduped: Rec[] = []
  for (const r of out) {
    if (seen.has(r.href)) continue
    seen.add(r.href)
    deduped.push(r)
  }
  return deduped.slice(0, 3).map(({ priority: _p, ...rest }) => rest)
}

function deadlineTone(category: string): OverviewDeadline["tone"] {
  const c = category.toLowerCase()
  if (c.includes("application") || c.includes("priority")) return "accent"
  if (c.includes("complete") || c.includes("funding")) return "success"
  return "muted"
}

function mapDeadlines(rows: RequirementDeadlineRow[]): OverviewDeadline[] {
  return rows.slice(0, 6).map((r) => ({
    date: shortDeadlineDate(r.due_date),
    title: r.title,
    tag: r.category.replace(/_/g, " ").toUpperCase().slice(0, 24),
    tone: deadlineTone(r.category),
    href: r.officialUrl ?? "/dashboard/requirements",
  }))
}

export function buildOverviewData(input: {
  displayName: string
  greeting: string
  currentSchoolName: string | null
  targetSchoolName: string | null
  targetMajor: string | null
  transferTerm: string | null
  overallReadinessScore: number
  readinessBreakdown: DashboardOverallReadinessBreakdown
  nextDeadline: NextDeadline
  deadlineRows: RequirementDeadlineRow[]
  timelineCourses: TimelineCourseInput[]
  checklistProfile: ChecklistProfileSummary
  checklistCompleteByTaskKey: Record<string, boolean | undefined>
  userCourseRows: UserCourseRow[]
  fieldOfStudy: string | null
  gpa: number | null
  creditsCompleted: number | null
  essayStarted: boolean
  recommendationLettersDone: boolean
  officialTranscriptRequested: boolean
  hasTargetUniversity: boolean
}): OverviewData {
  const firstName = input.displayName.split(/\s+/)[0] || "there"
  const score = Math.round(Math.min(100, Math.max(0, input.overallReadinessScore)))

  const originLabel = input.currentSchoolName?.trim() || "your current school"
  const targetSchoolLabel =
    input.targetSchoolName?.trim() ?? input.targetMajor?.trim() ?? "your target program"
  const targetMajor = input.targetMajor?.trim() ?? null

  const { steps, semesterCount } = buildPathwayFromTimeline({
    timelineCourses: input.timelineCourses,
    checklistProfile: input.checklistProfile,
    gpa: input.gpa,
    creditsCompleted: input.creditsCompleted,
    checklistCompleteByTaskKey: input.checklistCompleteByTaskKey,
    deadlineRows: input.deadlineRows,
    nextDeadline: input.nextDeadline,
    essayStarted: input.essayStarted,
  })

  const missingRequirements = buildMissingRequirements(
    input.userCourseRows,
    input.fieldOfStudy,
    input.gpa,
    input.creditsCompleted,
    input.essayStarted,
    input.recommendationLettersDone,
    input.officialTranscriptRequested
  )

  const recommendedActions = buildRecommendedActions({
    overallReadinessScore: score,
    creditsCompleted: input.creditsCompleted,
    gpa: input.gpa,
    essayStarted: input.essayStarted,
    recommendationLettersDone: input.recommendationLettersDone,
    officialTranscriptRequested: input.officialTranscriptRequested,
    hasTargetUniversity: input.hasTargetUniversity,
    nextDeadline: input.nextDeadline,
  })

  const deadlines = mapDeadlines(input.deadlineRows)
  const nextDl = input.nextDeadline

  let nextActionTitle = "Review your transfer requirements"
  let nextActionDue = "Set a target school to see personalized deadlines"
  let primaryHref = "/dashboard/requirements"

  if (missingRequirements[0] && !nextDl) {
    nextActionTitle = missingRequirements[0].title
    nextActionDue = missingRequirements[0].note
    primaryHref = "/dashboard/requirements"
  }

  if (nextDl) {
    nextActionTitle = nextDl.title
    nextActionDue = `Due ${formatDueDateDisplay(nextDl.dueDateIso)} · ${nextDl.daysUntil} day${nextDl.daysUntil === 1 ? "" : "s"} away`
    primaryHref = nextDl.officialUrl ?? "/dashboard/requirements"
  }

  const followUp =
    recommendedActions[1] != null
      ? `${recommendedActions[1].title} · ${recommendedActions[1].cta}`
      : missingRequirements[1]
        ? `${missingRequirements[1].title}`
        : undefined

  return {
    user: {
      firstName,
      todayLabel: todayLabel(),
      greetingLine: `${input.greeting}, ${firstName}.`,
      subcopy: greetingSubcopy(
        score,
        input.transferTerm,
        Boolean(input.nextDeadline || deadlines.length > 0)
      ),
    },
    pathway: {
      originLabel,
      targetLabel: targetSchoolLabel,
      targetMajor,
      semesterCount,
      progressPct: score,
      steps,
    },
    readiness: {
      score,
      deltaLabel: deltaLabel(score, input.readinessBreakdown),
      subMetrics: subMetricsFromBreakdown(input.readinessBreakdown),
    },
    nextAction: {
      title: nextActionTitle,
      dueLabel: nextActionDue,
      primaryHref,
      followUpLabel: followUp,
    },
    deadlines:
      deadlines.length > 0
        ? deadlines
        : input.nextDeadline
          ? [
              {
                date: shortDeadlineDate(input.nextDeadline.dueDateIso),
                title: input.nextDeadline.title,
                tag: "DEADLINE",
                tone: "accent" as const,
                href: input.nextDeadline.officialUrl ?? "/dashboard/requirements",
              },
            ]
          : [],
    deadlinesCycleLabel: input.transferTerm
      ? `${input.transferTerm} cycle`
      : undefined,
    missingRequirements,
    recommendedActions,
    recommendedHeadline: `Three moves to lift readiness toward ${Math.min(100, score + 8)}%.`,
  }
}
