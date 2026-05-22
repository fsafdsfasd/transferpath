/**
 * Dashboard home “readiness score” (first StatCard ring).
 *
 * Weights (sum 1.0):
 * - Credits 25% — subscoreCredits0To100 vs PLANNER_CREDIT_TARGET
 * - Prerequisites 25% — field-aware PrereqKey completion (prereqKeysForField + course list)
 * - Checklist 20% — % of checklist task_keys complete (allChecklistTaskKeysForProfile)
 * - Essay 10% — 100 if any essay has non-empty content, else 0
 * - GPA 15% — subscoreGpa0To100 (null GPA → 0)
 * - Profile 5% — target school, transfer term, and display identity present
 *
 * Planner-only composite — not admission probability or institutional benchmark.
 *
 * Manual spot checks (all weights applied on 0–100 subscores):
 * | credits | gpa | prereq | checklist | essay | profile | → approximate |
 * | 100% | 100% | 100% | 100% | 100% | 100% | 100 |
 * | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
 * | 100% | 0 | 0 | 0 | 0 | 0 | 25 |
 */
import { fieldOfStudyOrDefault, prereqKeysForField } from "@/lib/field-of-study"
import type { UserCourseRow } from "@/lib/get-course-requirement-status"
import { actionableChecklistTaskKeysForReadiness } from "@/lib/checklist-task-keys"
import {
  subscoreCredits0To100,
  subscoreGpa0To100,
  subscorePrereqCompletion0To100,
} from "@/lib/planner-subscores"

const W_CREDITS = 0.25
const W_PREREQ = 0.25
const W_CHECKLIST = 0.2
const W_ESSAY = 0.1
const W_GPA = 0.15
const W_PROFILE = 0.05

export type DashboardOverallReadinessProfileSlice = {
  targetUniversityId: string | null
  expectedTransferTerm: string | null
  fullName: string | null
  email: string | null
}

export type DashboardOverallReadinessInput = {
  creditsCompleted: number | null
  gpa: number | null
  userCourses: UserCourseRow[]
  fieldOfStudy: string | null
  /** True if any user_essay row has non-empty trimmed content. */
  essayHasContent: boolean
  /** task_key → is_complete; missing keys treated as incomplete. */
  checklistCompleteByTaskKey: Record<string, boolean | undefined>
  profile: DashboardOverallReadinessProfileSlice
}

export type DashboardOverallReadinessBreakdown = {
  credits0To100: number
  gpa0To100: number
  prereq0To100: number
  essay0To100: number
  checklist0To100: number
  profile0To100: number
  weightedSumPreRound: number
}

export type DashboardOverallReadinessResult = {
  score: number
  breakdown: DashboardOverallReadinessBreakdown
}

function subscoreChecklist0To100(
  checklistCompleteByTaskKey: Record<string, boolean | undefined>
): number {
  const keys = actionableChecklistTaskKeysForReadiness()
  if (keys.length === 0) return 0
  let done = 0
  for (const k of keys) {
    if (checklistCompleteByTaskKey[k] === true) done++
  }
  return (done / keys.length) * 100
}

function subscoreProfile0To100(p: DashboardOverallReadinessProfileSlice): number {
  let n = 0
  if (p.targetUniversityId != null && String(p.targetUniversityId).trim() !== "") n += 1
  if (p.expectedTransferTerm != null && p.expectedTransferTerm.trim() !== "") n += 1
  if (
    (p.fullName != null && p.fullName.trim() !== "") ||
    (p.email != null && p.email.trim() !== "")
  ) {
    n += 1
  }
  return (n / 3) * 100
}

export function computeDashboardOverallReadiness(
  input: DashboardOverallReadinessInput
): DashboardOverallReadinessResult {
  const field = fieldOfStudyOrDefault(input.fieldOfStudy)
  const prereqKeys = prereqKeysForField(field)

  const credits0To100 = subscoreCredits0To100(input.creditsCompleted)
  const gpa0To100 = subscoreGpa0To100(input.gpa)
  const prereq0To100 = subscorePrereqCompletion0To100(prereqKeys, input.userCourses)
  const essay0To100 = input.essayHasContent ? 100 : 0
  const checklist0To100 = subscoreChecklist0To100(input.checklistCompleteByTaskKey)
  const profile0To100 = subscoreProfile0To100(input.profile)

  const weightedSumPreRound =
    W_CREDITS * credits0To100 +
    W_PREREQ * prereq0To100 +
    W_CHECKLIST * checklist0To100 +
    W_ESSAY * essay0To100 +
    W_GPA * gpa0To100 +
    W_PROFILE * profile0To100

  const score = Math.round(Math.min(100, Math.max(0, weightedSumPreRound)))

  return {
    score,
    breakdown: {
      credits0To100,
      gpa0To100,
      prereq0To100,
      essay0To100,
      checklist0To100,
      profile0To100,
      weightedSumPreRound,
    },
  }
}
