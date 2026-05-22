import { cache } from "react"
import { createClient } from "@/lib/supabase/server"
import {
  computeDashboardOverallReadiness,
  type DashboardOverallReadinessResult,
} from "@/lib/dashboard-overall-readiness"
import type { UserCourseRow } from "@/lib/get-course-requirement-status"
import { effectiveChecklistCompleteByTaskKey } from "@/lib/checklist-derived-status"

export type DashboardReadinessContext = DashboardOverallReadinessResult

/** Cached planner readiness for layout chrome + home (one fetch set per request). */
export const getCachedDashboardReadiness = cache(
  async (userId: string): Promise<DashboardReadinessContext> => {
    const supabase = await createClient()

    const [{ data: profile }, { data: userCourses }, { data: essayRows }, { data: checklistRows }] =
      await Promise.all([
        supabase
          .from("user_profiles")
          .select("gpa, credits_completed, field_of_study, target_university_id, expected_transfer_term, full_name, email")
          .eq("id", userId)
          .single(),
        supabase.from("user_courses").select("course_name, status").eq("user_id", userId),
        supabase.from("user_essays").select("content").eq("user_id", userId),
        supabase.from("user_checklist_items").select("task_key, is_complete").eq("user_id", userId),
      ])

    const userCourseRows: UserCourseRow[] = (userCourses ?? []).map((r) => ({
      course_name: r.course_name,
      status: r.status,
    }))

    const manualChecklist: Record<string, boolean | undefined> = Object.fromEntries(
      (checklistRows ?? []).map((r) => [r.task_key, r.is_complete === true])
    )

    const essayHasContent =
      essayRows?.some((e) => (e.content ?? "").trim().length > 0) ?? false

    const derivedInput = {
      userCourses: userCourseRows,
      fieldOfStudy: profile?.field_of_study ?? null,
      creditsCompleted: profile?.credits_completed ?? null,
      gpa: profile?.gpa ?? null,
      essayHasContent,
    }

    const checklistCompleteByTaskKey = effectiveChecklistCompleteByTaskKey(
      manualChecklist,
      derivedInput
    )

    return computeDashboardOverallReadiness({
      creditsCompleted: profile?.credits_completed ?? null,
      gpa: profile?.gpa ?? null,
      userCourses: userCourseRows,
      fieldOfStudy: profile?.field_of_study ?? null,
      essayHasContent,
      checklistCompleteByTaskKey,
      profile: {
        targetUniversityId: profile?.target_university_id ?? null,
        expectedTransferTerm: profile?.expected_transfer_term ?? null,
        fullName: profile?.full_name ?? null,
        email: profile?.email ?? null,
      },
    })
  }
)
