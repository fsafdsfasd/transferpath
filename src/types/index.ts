export interface University {
  id: string;
  name: string;
  abbreviation: string | null;
  location: string;
  type: "community_college" | "four_year";
  website: string | null;
  created_at: string;
}

export interface Major {
  id: string;
  university_id: string;
  name: string;
  department: string | null;
  degree_type: "associate" | "bachelor" | "master";
  created_at: string;
  university?: University;
}

export interface RequiredCourse {
  code: string;
  name: string;
  credits: number;
}

export interface TransferRequirement {
  id: string;
  from_university_id: string;
  to_university_id: string;
  major_id: string;
  min_gpa: number;
  required_courses: RequiredCourse[];
  recommended_courses: RequiredCourse[];
  notes: string | null;
  application_deadline: string | null;
  essay_required: boolean;
  created_at: string;
  updated_at: string;
  from_university?: University;
  to_university?: University;
  major?: Major;
}

export interface Deadline {
  id: string;
  university_id: string | null;
  title: string;
  description: string | null;
  due_date: string;
  category: "application" | "financial_aid" | "housing" | "registration" | "other";
  academic_term: string | null;
  academic_year: number | null;
  official_info_url?: string | null;
  created_at: string;
  university?: University;
}

/** Planning copy for Requirements; optional_url is a learn-more link, not scraped deadlines. */
export interface UniversityRequirementNote {
  id: string;
  university_id: string | null;
  sort_order: number;
  title: string;
  body: string;
  optional_url: string | null;
  created_at?: string;
}

export type CompetitivenessInsightTone = "info" | "success" | "warning";

/** Planning copy for Competitiveness / readiness (same trust model as requirement notes). */
export interface UniversityCompetitivenessInsight {
  id: string;
  university_id: string | null;
  sort_order: number;
  title: string;
  body: string;
  tone: CompetitivenessInsightTone;
  optional_url: string | null;
  created_at?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  current_university_id: string | null;
  target_university_id: string | null;
  target_major: string | null;
  /** STEM/business/etc. bucket for track-aware prereq UI (`user_profiles.field_of_study`). */
  field_of_study: string | null;
  expected_transfer_term: string | null;
  gpa: number | null;
  credits_completed: number | null;
  /** Null = opted in (same as `coalesce(..., true)` in DB); explicit false opts out. */
  notify_deadline_reminders: boolean | null;
  notify_product_updates: boolean | null; // Email announcements not implemented in v1 (toggle only).
  prefer_compact_dashboard: boolean | null;
  created_at: string;
  updated_at: string;
}

export interface CanonicalCourse {
  id: string;
  course_name: string;
  category: string;
  created_at: string;
}

export interface CustomCourse {
  id: string;
  user_id: string;
  course_name: string;
  category: string | null;
  status: "pending" | "approved" | "rejected";
  created_at: string;
}

export interface UserCourse {
  id: string;
  user_id: string;
  canonical_course_id: string | null;
  course_name: string;
  credits: number | null;
  status: "completed" | "in_progress" | "planned";
  grade: string | null;
  semester_taken: string | null;
  created_at: string;
  canonical_course?: CanonicalCourse;
}

export interface UserEssay {
  id: string;
  user_id: string;
  prompt_type: "why_transfer" | "leadership" | "diversity" | "extracurricular" | "other";
  title: string | null;
  content: string | null;
  word_count: number;
  word_limit: number | null;
  updated_at: string;
  created_at: string;
}

export interface UserChecklistItem {
  id: string;
  user_id: string;
  task_key: string;
  category: "academic" | "application" | "preparation";
  is_complete: boolean;
  completed_at: string | null;
  created_at: string;
}
