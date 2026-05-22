"use client"

import Link from "next/link"
import { buildRequirementsWorkspaceData } from "@/lib/build-requirements-workspace-data"
import type { NextDeadline, RequirementDeadlineRow } from "@/lib/next-deadline"
import type { UserCourseRow } from "@/lib/get-course-requirement-status"
import type { UniversityRequirementNote } from "@/types"
import { RequirementsWorkspaceUi } from "@/components/dashboard/requirements-workspace-ui"

export type RequirementsProfile = {
  gpa: number | null
  credits_completed: number | null
  target_major: string | null
  field_of_study: string | null
  expected_transfer_term: string | null
  current_university: { name: string } | null
  target_university: { name: string } | null
}

type EssaySnippet = { id: string; content: string | null }

interface RequirementsClientProps {
  profile: RequirementsProfile | null
  userCourses: UserCourseRow[]
  essays: EssaySnippet[]
  deadlines: RequirementDeadlineRow[]
  requirementNotes: UniversityRequirementNote[]
  nextDeadline: NextDeadline
  hasTargetUniversity: boolean
  timelineTodayYmd: string
  checklistCompleteByTaskKey: Record<string, boolean>
}

export function RequirementsClient(props: RequirementsClientProps) {
  const workspaceData = buildRequirementsWorkspaceData({
    profile: props.profile,
    userCourses: props.userCourses,
    essays: props.essays,
    deadlines: props.deadlines,
    requirementNotes: props.requirementNotes,
    nextDeadline: props.nextDeadline,
    hasTargetUniversity: props.hasTargetUniversity,
    timelineTodayYmd: props.timelineTodayYmd,
    checklistCompleteByTaskKey: props.checklistCompleteByTaskKey,
  })

  return (
    <RequirementsWorkspaceUi
      data={workspaceData}
      LinkComponent={({ href, className, children }) => (
        <Link href={href} className={className}>
          {children}
        </Link>
      )}
    />
  )
}
