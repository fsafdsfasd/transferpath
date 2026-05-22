import type { SupabaseClient } from "@supabase/supabase-js"
import type { UniversityRequirementNote } from "@/types"

/**
 * Requirement planning notes from `university_requirement_notes`.
 *
 * Merge rule when `targetUniversityId` is set: rows for that school (ordered by `sort_order`),
 * then global rows (`university_id IS NULL`, ordered by `sort_order`). Never mixes in another
 * school\u2019s notes.
 *
 * When no target: global rows only (Texas-wide / ApplyTexas-style context).
 */
export async function getUniversityRequirementNotesMerged(
  supabase: SupabaseClient,
  targetUniversityId: string | null
): Promise<UniversityRequirementNote[]> {
  if (!targetUniversityId) {
    const { data, error } = await supabase
      .from("university_requirement_notes")
      .select("id, university_id, sort_order, title, body, optional_url, created_at")
      .is("university_id", null)
      .order("sort_order", { ascending: true })

    if (error || !data?.length) return []
    return data as UniversityRequirementNote[]
  }

  const [schoolRes, globalRes] = await Promise.all([
    supabase
      .from("university_requirement_notes")
      .select("id, university_id, sort_order, title, body, optional_url, created_at")
      .eq("university_id", targetUniversityId)
      .order("sort_order", { ascending: true }),
    supabase
      .from("university_requirement_notes")
      .select("id, university_id, sort_order, title, body, optional_url, created_at")
      .is("university_id", null)
      .order("sort_order", { ascending: true }),
  ])

  if (schoolRes.error || globalRes.error) return []

  const school = (schoolRes.data ?? []) as UniversityRequirementNote[]
  const global = (globalRes.data ?? []) as UniversityRequirementNote[]
  return [...school, ...global]
}
