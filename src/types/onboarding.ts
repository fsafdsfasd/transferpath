import type { FieldOfStudy } from "@/lib/field-of-study"

export interface OnboardingData {
  currentSchool: string
  currentSchoolId: string
  isCapStudent: boolean
  targetUniversities: string[]
  targetUniversityIds: string[]
  /** Required before leaving step 3; persisted as `user_profiles.field_of_study`. */
  fieldOfStudy: FieldOfStudy | ""
  major: string
  gpa: string
  creditsCompleted: string
  completedCourses: string[]
  targetSemester: string
  email: string
  password: string
  sendReminders: boolean
}
