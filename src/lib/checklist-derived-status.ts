import { getPrereqKeyStatus, type UserCourseRow } from "@/lib/get-course-requirement-status"
import { actionableChecklistTaskKeysForReadiness } from "@/lib/checklist-task-keys"
import { PREREQ_TO_CHECKLIST_TASK_KEY, type PrereqKey } from "@/lib/prereq-catalog"
import { PLANNER_CREDIT_TARGET } from "@/lib/planner-constants"

export type ChecklistDerivedInput = {
  userCourses: UserCourseRow[]
  fieldOfStudy: string | null
  creditsCompleted: number | null
  gpa: number | null
  essayHasContent: boolean
}

const CHECKLIST_TO_PREREQ: Partial<Record<string, PrereqKey>> = Object.fromEntries(
  Object.entries(PREREQ_TO_CHECKLIST_TASK_KEY).map(([prereq, taskKey]) => [
    taskKey,
    prereq as PrereqKey,
  ])
)

const GPA_CHECKLIST_TARGET = 3.5

function prereqKeyForChecklistTask(taskKey: string): PrereqKey | null {
  return CHECKLIST_TO_PREREQ[taskKey] ?? null
}

/** Auto-complete from timeline courses, profile GPA/credits, or essay workspace. */
export function isChecklistTaskDerivedComplete(
  taskKey: string,
  input: ChecklistDerivedInput
): boolean {
  const prereq = prereqKeyForChecklistTask(taskKey)
  if (prereq) {
    return getPrereqKeyStatus(prereq, input.userCourses) === "done"
  }

  if (taskKey === "complete_us_government") {
    return getPrereqKeyStatus("gov", input.userCourses) === "done"
  }

  if (taskKey === "reach_30_credits") {
    return (
      input.creditsCompleted != null && input.creditsCompleted >= PLANNER_CREDIT_TARGET
    )
  }

  if (taskKey === "maintain_gpa_3_5") {
    return input.gpa != null && input.gpa >= GPA_CHECKLIST_TARGET
  }

  if (taskKey === "write_essay_part1" || taskKey === "write_essay_part2") {
    return input.essayHasContent
  }

  return false
}

export function isChecklistTaskDerivedInProgress(
  taskKey: string,
  input: ChecklistDerivedInput
): boolean {
  if (isChecklistTaskDerivedComplete(taskKey, input)) return false

  const prereq = prereqKeyForChecklistTask(taskKey)
  if (prereq) {
    return getPrereqKeyStatus(prereq, input.userCourses) === "in-progress"
  }

  if (taskKey === "complete_us_government") {
    return getPrereqKeyStatus("gov", input.userCourses) === "in-progress"
  }

  if (taskKey === "reach_30_credits") {
    return input.creditsCompleted != null && input.creditsCompleted > 0
  }

  if (taskKey === "maintain_gpa_3_5") {
    return input.gpa != null && input.gpa > 0 && input.gpa < GPA_CHECKLIST_TARGET
  }

  return false
}

export function isChecklistTaskEffectivelyComplete(
  taskKey: string,
  manualComplete: boolean | undefined,
  derived: ChecklistDerivedInput
): boolean {
  if (manualComplete === true) return true
  if (manualComplete === false) return false
  return isChecklistTaskDerivedComplete(taskKey, derived)
}

/** Merges manual checklist DB flags with derived completion for readiness scoring. */
export function effectiveChecklistCompleteByTaskKey(
  manual: Record<string, boolean | undefined>,
  derived: ChecklistDerivedInput
): Record<string, boolean | undefined> {
  const out = { ...manual }
  for (const k of actionableChecklistTaskKeysForReadiness()) {
    if (out[k] === true) continue
    if (isChecklistTaskDerivedComplete(k, derived)) out[k] = true
  }
  return out
}
