import { PLANNER_CREDIT_TARGET } from "@/lib/planner-constants"
import type { PrereqKey } from "@/lib/prereq-catalog"
import { getPrereqKeyStatus, type UserCourseRow } from "@/lib/get-course-requirement-status"

/**
 * Shared 0–100 subscores for planner UIs. Not admission metrics.
 */

/** Same cap as StatCards credits bar: min(credits/target, 1) * 100. Null → 0 (nothing on file). */
export function subscoreCredits0To100(
  creditsCompleted: number | null,
  target: number = PLANNER_CREDIT_TARGET
): number {
  if (creditsCompleted == null) return 0
  return Math.min(100, Math.max(0, (creditsCompleted / target) * 100))
}

/**
 * Linear vs 4.0 → 0–100.
 * Null GPA → 0 (unknown; we do not impute a midpoint).
 */
export function subscoreGpa0To100(gpa: number | null): number {
  if (gpa == null) return 0
  return Math.min(100, Math.max(0, (gpa / 4) * 100))
}

/** Fraction of given prereq keys with course status `done`, → 0–100. Empty key list → 0. */
export function subscorePrereqCompletion0To100(
  keys: readonly PrereqKey[],
  userCourses: UserCourseRow[]
): number {
  if (keys.length === 0) return 0
  let done = 0
  for (const k of keys) {
    if (getPrereqKeyStatus(k, userCourses) === "done") done++
  }
  return (done / keys.length) * 100
}

/** Competitiveness page: credit slice toward 100 (max 30 of 100). */
export function competitivenessCreditPoints(
  credits: number,
  target: number = PLANNER_CREDIT_TARGET
): number {
  return Math.min(30, (credits / target) * 30)
}

/** Competitiveness page: GPA slice toward 100 (max 30 of 100). */
export function competitivenessGpaPoints(gpa: number): number {
  return Math.min(30, (gpa / 4) * 30)
}

/** Competitiveness page: prereq slice toward 100 (max 40 of 100). */
export function competitivenessPrereqPoints(prereqDone: number, prereqTotal: number): number {
  return prereqTotal > 0 ? (prereqDone / prereqTotal) * 40 : 0
}

/**
 * Same formula as the historical Competitiveness ring: 40% prereq + 30% GPA + 30% credits,
 * using the shared slice functions above. Returns null if GPA or credits missing (unchanged UX).
 */
export function computeCompetitivenessPlannerScore(
  prereqDone: number,
  prereqTotal: number,
  gpa: number | null,
  credits: number | null
): number | null {
  if (gpa === null || credits === null) return null
  const p = competitivenessPrereqPoints(prereqDone, prereqTotal)
  const g = competitivenessGpaPoints(gpa)
  const c = competitivenessCreditPoints(credits)
  return Math.round(Math.min(100, p + g + c))
}
