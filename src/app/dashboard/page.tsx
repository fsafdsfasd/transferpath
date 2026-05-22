import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { DashboardHomeView } from "@/components/dashboard/dashboard-home-view"
import type { UserCourseRow } from "@/lib/get-course-requirement-status"
import { getCachedNextDeadline, getCachedRequirementDeadlines } from "@/lib/dashboard-data"
import { getCachedDashboardReadiness } from "@/lib/dashboard-readiness-loader"
import { buildOverviewData } from "@/lib/build-overview-data"
import type { ChecklistProfileSummary } from "@/lib/checklist-task-definitions"

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data: profile } = await supabase
    .from("user_profiles")
    .select(
      `
    *,
    current_university:current_university_id(name),
    target_university:target_university_id(name)
  `
    )
    .eq("id", user.id)
    .single()

  const targetId = profile?.target_university_id ?? null
  const hasTargetUniversity = targetId != null
  const expectedTerm = profile?.expected_transfer_term ?? null
  const [nextDeadline, deadlineRows, readiness] = await Promise.all([
    getCachedNextDeadline(targetId, expectedTerm),
    getCachedRequirementDeadlines(targetId, expectedTerm),
    getCachedDashboardReadiness(user.id),
  ])

  const [{ data: userCourses }, { data: essayRows }, { data: checklistRows }] = await Promise.all([
    supabase
      .from("user_courses")
      .select("id, course_name, status, semester_taken")
      .eq("user_id", user.id),
    supabase.from("user_essays").select("id, content").eq("user_id", user.id),
    supabase.from("user_checklist_items").select("task_key, is_complete").eq("user_id", user.id),
  ])

  const checklistCompleteByTaskKey: Record<string, boolean | undefined> = Object.fromEntries(
    (checklistRows ?? []).map((r) => [r.task_key, r.is_complete === true])
  )

  const recommendationLettersDone =
    checklistCompleteByTaskKey.request_rec_letter_1 === true &&
    checklistCompleteByTaskKey.request_rec_letter_2 === true
  const officialTranscriptRequested =
    checklistCompleteByTaskKey.request_transcript === true

  const userCourseRows: UserCourseRow[] = (userCourses ?? []).map((r) => ({
    course_name: r.course_name,
    status: r.status,
  }))

  const timelineCourses = (userCourses ?? []).map((r) => ({
    id: r.id,
    course_name: r.course_name,
    status: r.status as "completed" | "in_progress" | "planned",
    semester_taken: r.semester_taken,
  }))

  const checklistProfile: ChecklistProfileSummary = {
    currentUniversityName:
      (profile?.current_university as { name: string } | null)?.name ?? null,
    targetUniversityName:
      (profile?.target_university as { name: string } | null)?.name ?? null,
    targetMajor: profile?.target_major ?? null,
    fieldOfStudy: profile?.field_of_study ?? null,
    expectedTransferTerm: profile?.expected_transfer_term ?? null,
  }

  const essayStarted =
    essayRows?.some((e) => (e.content ?? "").trim().length > 0) ?? false

  const displayName = profile?.full_name ?? user.email?.split("@")[0] ?? "there"
  const currentSchoolName =
    (profile?.current_university as { name: string } | null)?.name ?? null
  const targetSchoolName =
    (profile?.target_university as { name: string } | null)?.name ?? null
  const transferTerm = profile?.expected_transfer_term ?? null

  const hour = new Date().getHours()
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening"

  const overviewData = buildOverviewData({
    displayName,
    greeting,
    currentSchoolName,
    targetSchoolName,
    targetMajor: profile?.target_major ?? null,
    transferTerm,
    overallReadinessScore: readiness.score,
    readinessBreakdown: readiness.breakdown,
    nextDeadline,
    deadlineRows,
    timelineCourses,
    checklistProfile,
    checklistCompleteByTaskKey,
    userCourseRows,
    fieldOfStudy: profile?.field_of_study ?? null,
    gpa: profile?.gpa ?? null,
    creditsCompleted: profile?.credits_completed ?? null,
    essayStarted,
    recommendationLettersDone,
    officialTranscriptRequested,
    hasTargetUniversity,
  })

  return <DashboardHomeView overviewData={overviewData} />
}
