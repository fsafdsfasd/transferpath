import type { SupabaseClient } from "@supabase/supabase-js"
import type { UniversityCompetitivenessInsight } from "@/types"

/**
 * Competitiveness / readiness planning insights from `university_competitiveness_insights`.
 *
 * Merge rule with a target school: rows for `university_id = target` (by `sort_order`),
 * then global rows (`university_id IS NULL`). Never loads another institution\u2019s rows.
 *
 * Without a target: global rows only.
 */
export async function getUniversityCompetitivenessInsightsMerged(
  supabase: SupabaseClient,
  targetUniversityId: string | null
): Promise<UniversityCompetitivenessInsight[]> {
  if (!targetUniversityId) {
    const { data, error } = await supabase
      .from("university_competitiveness_insights")
      .select("id, university_id, sort_order, title, body, tone, optional_url, created_at")
      .is("university_id", null)
      .order("sort_order", { ascending: true })

    if (error || !data?.length) return []
    return data as UniversityCompetitivenessInsight[]
  }

  const [schoolRes, globalRes] = await Promise.all([
    supabase
      .from("university_competitiveness_insights")
      .select("id, university_id, sort_order, title, body, tone, optional_url, created_at")
      .eq("university_id", targetUniversityId)
      .order("sort_order", { ascending: true }),
    supabase
      .from("university_competitiveness_insights")
      .select("id, university_id, sort_order, title, body, tone, optional_url, created_at")
      .is("university_id", null)
      .order("sort_order", { ascending: true }),
  ])

  if (schoolRes.error || globalRes.error) return []

  const school = (schoolRes.data ?? []) as UniversityCompetitivenessInsight[]
  const global = (globalRes.data ?? []) as UniversityCompetitivenessInsight[]
  return [...school, ...global]
}
