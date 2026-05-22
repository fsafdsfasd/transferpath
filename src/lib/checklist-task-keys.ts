/**
 * Single source of truth for which `user_checklist_items.task_key` values exist for a user,
 * matching `buildTaskDefinitions` / academic builder in `checklist-client.tsx`.
 */
import { fieldOfStudyOrDefault, prereqKeysForField } from "@/lib/field-of-study"
import { PREREQ_TO_CHECKLIST_TASK_KEY } from "@/lib/prereq-catalog"

/** Academic section task_keys in display order for a given field bucket. */
export function buildAcademicChecklistTaskKeyList(fieldOfStudy: string | null): string[] {
  const keys = prereqKeysForField(fieldOfStudyOrDefault(fieldOfStudy))
  const out: string[] = []

  for (const k of keys) {
    if (k === "gov") {
      out.push("complete_us_government")
      continue
    }
    out.push(PREREQ_TO_CHECKLIST_TASK_KEY[k])
  }

  out.push("reach_30_credits", "maintain_gpa_3_5")
  return out
}

export const CHECKLIST_APPLICATION_TASK_KEYS = [
  "create_applytexas",
  "research_requirements",
  "write_essay_part1",
  "write_essay_part2",
  "request_transcript",
  "request_rec_letter_1",
  "request_rec_letter_2",
  "submit_application",
  "pay_application_fee",
  "confirm_financial_aid",
] as const

export const CHECKLIST_PREPARATION_TASK_KEYS = [
  "research_housing",
  "review_credit_equiv",
  "attend_info_session",
  "connect_peer_mentor",
  "review_financial_aid",
  "check_tsi",
  "plan_first_semester",
] as const

/** All checklist keys the dashboard readiness score counts (field-aware academic block). */
export function allChecklistTaskKeysForProfile(fieldOfStudy: string | null): string[] {
  return [
    ...buildAcademicChecklistTaskKeyList(fieldOfStudy),
    ...CHECKLIST_APPLICATION_TASK_KEYS,
    ...CHECKLIST_PREPARATION_TASK_KEYS,
  ]
}

/** Application + preparation only — avoids double-counting academic work already in prereq subscore. */
export function actionableChecklistTaskKeysForReadiness(): string[] {
  return [...CHECKLIST_APPLICATION_TASK_KEYS, ...CHECKLIST_PREPARATION_TASK_KEYS]
}
