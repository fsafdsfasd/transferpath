export type RequirementRowStatus = "done" | "active" | "missing"

export type RequirementWorkspaceItem = {
  id: string
  code: string
  title: string
  credits: number
  equiv: string
  status: RequirementRowStatus
  ctaLabel?: string
  href?: string
  external?: boolean
}

export type RequirementWorkspaceCategory = {
  id: string
  name: string
  items: RequirementWorkspaceItem[]
}

export type RequirementsWorkspaceHeader = {
  eyebrow?: string
  title: string
  titleItalic: string
  subtitle: string
}

export type RequirementsPlanningNote = {
  id: string
  title: string
  body: string
  optionalUrl: string | null
}

export type RequirementsTimelineRow = {
  id: string
  dateLabel: string
  label: string
  scope: string
  officialUrl: string | null
  passed: boolean
  current: boolean
  recommended: boolean
}

export type RequirementsWorkspaceData = {
  header: RequirementsWorkspaceHeader
  categories: RequirementWorkspaceCategory[]
  planningNotes: RequirementsPlanningNote[]
  planningNotesIntro: string
  timelineRows: RequirementsTimelineRow[]
}
