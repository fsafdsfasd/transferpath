import { cache } from "react"
import { createClient } from "@/lib/supabase/server"
import {
  getNextDeadline,
  getRequirementTimelineDeadlines,
  type NextDeadline,
  type RequirementDeadlineRow,
} from "@/lib/next-deadline"
import { getUniversityRequirementNotesMerged } from "@/lib/requirement-notes"
import type { UniversityRequirementNote } from "@/types"

export type { NextDeadline, RequirementDeadlineRow }
export type { UniversityRequirementNote }

export const getCachedNextDeadline = cache(
  async (targetUniversityId: string | null, expectedTransferTerm: string | null) => {
    const supabase = await createClient()
    return getNextDeadline(supabase, targetUniversityId, expectedTransferTerm)
  }
)

export const getCachedRequirementDeadlines = cache(
  async (targetUniversityId: string | null, expectedTransferTerm: string | null) => {
    const supabase = await createClient()
    return getRequirementTimelineDeadlines(supabase, targetUniversityId, expectedTransferTerm)
  }
)

export const getCachedRequirementNotes = cache(async (targetUniversityId: string | null) => {
  const supabase = await createClient()
  return getUniversityRequirementNotesMerged(supabase, targetUniversityId)
})
