import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { TimelineClient, type TimelineCourseRow } from "@/components/dashboard/timeline-client"
import {
  getCachedNextDeadline,
  getCachedRequirementDeadlines,
} from "@/lib/dashboard-data"
import type { ChecklistProfileSummary } from "@/lib/checklist-task-definitions"

export default async function TimelinePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data: profile, error: profileError } = await supabase
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

  if (profileError) {
    console.error("[dashboard/timeline] failed to fetch profile:", profileError.message)
  }

  const targetId = profile?.target_university_id ?? null
  const expectedTerm = profile?.expected_transfer_term ?? null

  const [
    { data: rawCourses, error: rawCoursesError },
    { data: checklistRowsRaw, error: checklistRowsError },
    { data: essayRowsRaw, error: essayRowsError },
    nextDeadline,
    deadlineRowsRaw,
  ] = await Promise.all([
    supabase
      .from("user_courses")
      .select("id, course_name, status, semester_taken, canonical_course_id")
      .eq("user_id", user.id)
      .order("course_name", { ascending: true }),
    supabase
      .from("user_checklist_items")
      .select("task_key, is_complete")
      .eq("user_id", user.id),
    supabase.from("user_essays").select("content").eq("user_id", user.id),
    getCachedNextDeadline(targetId, expectedTerm),
    getCachedRequirementDeadlines(targetId, expectedTerm),
  ])

  if (rawCoursesError) {
    console.error("[dashboard/timeline] failed to fetch user_courses:", rawCoursesError.message)
  }
  if (checklistRowsError) {
    console.error(
      "[dashboard/timeline] failed to fetch user_checklist_items:",
      checklistRowsError.message
    )
  }
  if (essayRowsError) {
    console.error("[dashboard/timeline] failed to fetch user_essays:", essayRowsError.message)
  }

  const coursesRaw = rawCourses ?? []
  const checklistRows = checklistRowsRaw ?? []
  const essayRows = essayRowsRaw ?? []
  const deadlineRows = deadlineRowsRaw ?? []

  const essayStarted =
    essayRows.some((e) => (e.content ?? "").trim().length > 0) ?? false

  const courses: TimelineCourseRow[] = coursesRaw.map((r) => ({
    id: r.id,
    course_name: r.course_name,
    status: (r.status as TimelineCourseRow["status"]) ?? "planned",
    semester_taken: r.semester_taken,
    canonical_course_id: r.canonical_course_id,
  }))

  const checklistCompleteByTaskKey: Record<string, boolean | undefined> = Object.fromEntries(
    checklistRows.map((r) => [r.task_key, r.is_complete === true])
  )

  const checklistProfile: ChecklistProfileSummary = {
    currentUniversityName:
      (profile?.current_university as { name: string } | null)?.name ?? null,
    targetUniversityName:
      (profile?.target_university as { name: string } | null)?.name ?? null,
    targetMajor: profile?.target_major ?? null,
    fieldOfStudy: profile?.field_of_study ?? null,
    expectedTransferTerm: profile?.expected_transfer_term ?? null,
  }

  return (
    <TimelineClient
      userId={user.id}
      initialCourses={courses}
      checklistProfile={checklistProfile}
      checklistCompleteByTaskKey={checklistCompleteByTaskKey}
      deadlineRows={deadlineRows}
      nextDeadline={nextDeadline}
      gpa={profile?.gpa ?? null}
      creditsCompleted={profile?.credits_completed ?? null}
      essayStarted={essayStarted}
    />
  )
}
