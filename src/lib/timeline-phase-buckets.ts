/** Reserved `user_courses.semester_taken` values for journey-map phases (not calendar terms). */
export const FOUNDATION_PHASE_BUCKET = "Foundation & core"
export const MAJOR_PREREQ_PHASE_BUCKET = "Major prerequisites"

const RESERVED = new Set([FOUNDATION_PHASE_BUCKET, MAJOR_PREREQ_PHASE_BUCKET])

export function isReservedTimelinePhase(semesterTaken: string | null | undefined): boolean {
  const t = semesterTaken?.trim() ?? ""
  return RESERVED.has(t)
}

export function isCalendarTermBucket(key: string): boolean {
  if (key === "") return false
  return !RESERVED.has(key)
}
