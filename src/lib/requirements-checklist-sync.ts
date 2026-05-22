import { getPrereqKeyStatus, type UserCourseRow } from "@/lib/get-course-requirement-status"
import {
  PREREQ_TO_CHECKLIST_TASK_KEY,
  PREREQ_ROW_LABEL,
  type PrereqKey,
} from "@/lib/prereq-catalog"
import type { RequirementRowStatus } from "@/types/requirements-workspace"

export type ChecklistCompleteByTaskKey = Record<string, boolean | undefined>

const APPLICATION_ITEM_TASK_KEYS: Record<string, string[]> = {
  "app-essay": ["write_essay_part1", "write_essay_part2"],
  "app-transcript": ["request_transcript"],
  "app-rec": ["request_rec_letter_1", "request_rec_letter_2"],
  "app-applytexas": ["create_applytexas"],
}

export function checklistTaskKeyForPrereqKey(key: PrereqKey): string {
  return PREREQ_TO_CHECKLIST_TASK_KEY[key]
}

export function checklistTaskKeysForApplicationItemId(id: string): string[] {
  return APPLICATION_ITEM_TASK_KEYS[id] ?? []
}

export function isChecklistTaskComplete(
  checklist: ChecklistCompleteByTaskKey,
  taskKey: string
): boolean {
  return checklist[taskKey] === true
}

export function areAllChecklistTasksComplete(
  checklist: ChecklistCompleteByTaskKey,
  taskKeys: string[]
): boolean {
  if (taskKeys.length === 0) return false
  return taskKeys.every((k) => isChecklistTaskComplete(checklist, k))
}

export function countChecklistTasksComplete(
  checklist: ChecklistCompleteByTaskKey,
  taskKeys: string[]
): number {
  return taskKeys.filter((k) => isChecklistTaskComplete(checklist, k)).length
}

type AcademicDisplayStatus = "done" | "in-progress" | "warning"

function courseStatusToDisplay(
  courseStatus: ReturnType<typeof getPrereqKeyStatus>
): { have: string; status: AcademicDisplayStatus } {
  if (courseStatus === "done") return { have: "Complete", status: "done" }
  if (courseStatus === "in-progress") return { have: "In progress", status: "in-progress" }
  return { have: "Not started", status: "warning" }
}

/** Checklist complete overrides course list; otherwise derive from user_courses. */
export function mergedPrereqAcademicStatus(
  key: PrereqKey,
  userCourses: UserCourseRow[],
  checklist: ChecklistCompleteByTaskKey
): { have: string; status: AcademicDisplayStatus } {
  const taskKey = checklistTaskKeyForPrereqKey(key)
  if (isChecklistTaskComplete(checklist, taskKey)) {
    return { have: "Complete", status: "done" }
  }
  return courseStatusToDisplay(getPrereqKeyStatus(key, userCourses))
}

export function mergedPrereqAcademicRow(
  key: PrereqKey,
  userCourses: UserCourseRow[],
  checklist: ChecklistCompleteByTaskKey,
  required: string
): {
  rowKey: string
  name: string
  required: string
  have: string
  status: AcademicDisplayStatus
} {
  const { have, status } = mergedPrereqAcademicStatus(key, userCourses, checklist)
  return {
    rowKey: key,
    name: PREREQ_ROW_LABEL[key],
    required,
    have,
    status,
  }
}

export function academicDisplayToRequirementStatus(
  status: AcademicDisplayStatus
): RequirementRowStatus {
  if (status === "done") return "done"
  if (status === "in-progress") return "active"
  return "missing"
}

export function buildTransferEssayApplicationStatus(
  checklist: ChecklistCompleteByTaskKey,
  essayHasContent: boolean
): { status: RequirementRowStatus; equiv: string } {
  const keys = checklistTaskKeysForApplicationItemId("app-essay")
  if (essayHasContent) {
    return { status: "done", equiv: "Draft saved in essay workspace" }
  }
  if (areAllChecklistTasksComplete(checklist, keys)) {
    return { status: "done", equiv: "Complete" }
  }
  const anyPart = countChecklistTasksComplete(checklist, keys) > 0
  if (anyPart || essayHasContent) {
    const parts = countChecklistTasksComplete(checklist, keys)
    return {
      status: "active",
      equiv:
        parts > 0
          ? `In progress (${parts} of ${keys.length} essay parts on checklist)`
          : "In progress (draft in essay workspace)",
    }
  }
  return { status: "missing", equiv: "Not started" }
}

export function buildRecLettersApplicationStatus(
  checklist: ChecklistCompleteByTaskKey
): { status: RequirementRowStatus; equiv: string } {
  const keys = checklistTaskKeysForApplicationItemId("app-rec")
  const done = countChecklistTasksComplete(checklist, keys)
  if (done === keys.length) {
    return { status: "done", equiv: `${done} of ${keys.length} requested` }
  }
  if (done > 0) {
    return { status: "active", equiv: `${done} of ${keys.length} requested` }
  }
  return { status: "missing", equiv: `0 of ${keys.length} requested` }
}

export function buildSimpleApplicationStatus(
  applicationItemId: string,
  checklist: ChecklistCompleteByTaskKey,
  options: {
    missingEquiv: string
    doneEquiv?: string
  }
): { status: RequirementRowStatus; equiv: string } {
  const keys = checklistTaskKeysForApplicationItemId(applicationItemId)
  if (keys.length === 1 && isChecklistTaskComplete(checklist, keys[0]!)) {
    return { status: "done", equiv: options.doneEquiv ?? "Complete" }
  }
  if (areAllChecklistTasksComplete(checklist, keys)) {
    return { status: "done", equiv: options.doneEquiv ?? "Complete" }
  }
  return { status: "missing", equiv: options.missingEquiv }
}
