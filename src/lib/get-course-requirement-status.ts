/**
 * Course completion for requirement rows: prefers completed over in_progress.
 * Prerequisite name matching is centralized in `@/lib/prereq-catalog`.
 */
import {
  type PrereqKey,
  PREREQ_KEYS_IN_ORDER,
  courseNameMatchesPrereqKey,
} from "@/lib/prereq-catalog"

export type { PrereqKey }
export { PREREQ_KEYS_IN_ORDER, courseNameMatchesPrereqKey }

export type CourseRequirementStatus = "done" | "in-progress" | "not-started"

export type UserCourseRow = { course_name: string; status: string }

export function getPrereqKeyStatus(
  key: PrereqKey,
  userCourses: UserCourseRow[]
): CourseRequirementStatus {
  const matches = userCourses.filter((uc) => courseNameMatchesPrereqKey(uc.course_name, key))
  return statusFromMatches(matches)
}

function statusFromMatches(matches: UserCourseRow[]): CourseRequirementStatus {
  if (matches.some((m) => m.status === "completed")) return "done"
  if (matches.some((m) => m.status === "in_progress")) return "in-progress"
  return "not-started"
}
