export type TimelineMilestoneState = "done" | "active" | "upcoming" | "target"

export type TimelineMilestoneKind =
  | "foundation"
  | "major_prereqs"
  | "transfer_term"
  | "essay"
  | "application"
  | "target"

export interface TimelineRecordedCourse {
  id: string
  course_name: string
  status: "completed" | "in_progress" | "planned"
  semester_taken?: string | null
}

export interface TimelineTaskItem {
  task_key: string
  text: string
  href: string
  done: boolean
}

export interface TimelineMilestone {
  key: string
  kind: TimelineMilestoneKind
  termLabel: string
  stepIndex: number
  totalSteps: number
  dateRange: string
  isCurrent: boolean
  phaseTitle: string
  summary: string
  state: TimelineMilestoneState
  recorded: TimelineRecordedCourse[]
  tasks: TimelineTaskItem[]
  showTargetBadge?: boolean
  editableCourses: boolean
  /** Show course list + add controls even when empty (major prerequisites). */
  showCoursePanel?: boolean
  courses: TimelineRecordedCourse[]
}

export interface TimelineMilestonesResult {
  milestones: TimelineMilestone[]
  mappedSemesters: number
  hasTarget: boolean
}
