/**
 * Canonical transfer prerequisite keys and matching rules (shared across dashboard).
 *
 * Dev reference — normalized names are trim + lowercase before alias/regex checks:
 * - calculus_1: "Calculus I", "Calc I", "MATH 2413", "Introduction to Calculus I"
 * - english_comp_1: "English Composition I", "ENGL 1301", "Composition I", "RHET 1301"
 * - gov: "American Government", "Texas Government", "GOVT 2305" (substring "government")
 * - calculus_2: "Calculus II", "Calculus 2", "MATH 2414"
 * - physics_1: "Physics I", "University Physics I", "PHYS 1401"
 * - cs_1: "Computer Science I", "Introduction to Programming", common CS1 codes
 * - discrete_math: "Discrete Mathematics", "Discrete Structures"
 */

export type PrereqKey =
  | "english_comp_1"
  | "english_comp_2"
  | "gov"
  | "calculus_1"
  | "calculus_2"
  | "cs_1"
  | "discrete_math"
  | "physics_1"

/**
 * Full canonical ordering (core first, then STEM prep). Prefer `prereqKeysForField` in
 * `@/lib/field-of-study` for user-specific subsets.
 */
export const PREREQ_KEYS_IN_ORDER: readonly PrereqKey[] = [
  "english_comp_1",
  "english_comp_2",
  "gov",
  "calculus_1",
  "calculus_2",
  "cs_1",
  "discrete_math",
  "physics_1",
] as const

/** Single-row labels for tables and checklists. */
export const PREREQ_ROW_LABEL: Record<PrereqKey, string> = {
  english_comp_1: "English Composition I",
  english_comp_2: "English Composition II",
  gov: "U.S. Government or U.S. History",
  calculus_1: "Calculus I",
  calculus_2: "Calculus II",
  cs_1: "Computer Science I",
  discrete_math: "Discrete Mathematics",
  physics_1: "Physics I",
}

/** Checklist `task_key` values that correspond to transfer prereqs (keep DB keys stable). */
export const PREREQ_TO_CHECKLIST_TASK_KEY: Record<PrereqKey, string> = {
  english_comp_1: "complete_english_comp_1",
  english_comp_2: "complete_english_comp_2",
  gov: "complete_us_government",
  calculus_1: "complete_calculus_1",
  calculus_2: "complete_calculus_2",
  cs_1: "complete_cs_1",
  discrete_math: "complete_discrete_math",
  physics_1: "complete_physics_1",
}

function norm(s: string): string {
  return s.trim().toLowerCase()
}

function matchesCalculus1(cn: string): boolean {
  if (/\bbusiness\s+calculus\b/.test(cn)) return false
  if (cn.includes("precalculus") || cn.includes("pre-calculus")) return false
  if (cn.includes("calculus ii") || cn.includes("calculus 2")) return false
  if (cn.includes("calculus iii") || cn.includes("calculus 3")) return false
  if (cn === "calculus i") return true
  if (/\bcalculus\s+i\b/.test(cn)) return true
  if (/\bcalc\s+i\b/.test(cn)) return true
  if (/\bmath\s*2413\b/.test(cn)) return true
  return false
}

function matchesCalculus2(cn: string): boolean {
  if (/\bbusiness\s+calculus\b/.test(cn)) return false
  if (cn.includes("calculus iii") || cn.includes("calculus 3")) return false
  if (cn.includes("calculus iv") || cn.includes("calculus 4")) return false
  if (cn === "calculus ii") return true
  if (/\bcalculus\s*(ii|2)\b/.test(cn)) return true
  if (/\bcalc\s*(ii|2)\b/.test(cn)) return true
  if (/\bmath\s*2414\b/.test(cn)) return true
  return false
}

function matchesEnglishComp2(cn: string): boolean {
  if (/\bengl\s*1301\b/.test(cn)) return false
  if (/\benglish\s+composition\s+i\b/.test(cn)) return false
  if (/\bcomposition\s+i\b/.test(cn)) return false
  if (cn === "english composition ii") return true
  if (/\bengl\s*1302\b/.test(cn)) return true
  if (/\brhet\s*1302\b/.test(cn)) return true
  if (/\benglish\s+composition\s+(ii|2)\b/.test(cn)) return true
  if (/\bcomposition\s+(ii|2)\b/.test(cn)) return true
  return false
}

function matchesEnglishComp1(cn: string): boolean {
  if (/\bengl\s*1302\b/.test(cn)) return false
  if (/\benglish\s+composition\s+(ii|2)\b/.test(cn)) return false
  if (/\bcomposition\s+(ii|2)\b/.test(cn)) return false
  if (/\bcomp\s*(ii|2)\b/.test(cn)) return false
  if (cn === "english composition i") return true
  if (/\bengl\s*1301\b/.test(cn)) return true
  if (/\brhet\s*1301\b/.test(cn)) return true
  if (/\benglish\s+composition\s+i\b/.test(cn)) return true
  if (/\bcomposition\s+i\b/.test(cn)) return true
  return false
}

function matchesPhysics1(cn: string): boolean {
  if (cn.includes("physics ii") || cn.includes("physics 2")) return false
  if (cn.includes("physics iii") || cn.includes("physics 3")) return false
  if (cn === "physics i") return true
  if (/\bphysics\s+i\b/.test(cn)) return true
  if (/\bphysics\s+1\b/.test(cn)) return true
  if (/\buniversity\s+physics\s+i\b/.test(cn)) return true
  if (/\buniversity\s+physics\s+1\b/.test(cn)) return true
  if (/\bphys\s*14\d{2}\b/.test(cn)) return true
  return false
}

function matchesUsHistory(cn: string): boolean {
  if (/\bworld\s+history\b/.test(cn)) return false
  if (/\bwestern\s+civilization\b/.test(cn)) return false
  if (/\bhist\s*1301\b/.test(cn)) return true
  if (/\bhist\s*1302\b/.test(cn)) return true
  if (/\bu\.?\s*s\.?\s*history\s*(i|ii|1|2)?\b/.test(cn)) return true
  if (/\bamerican\s+history\b/.test(cn)) return true
  if (/\bunited\s+states\s+history\b/.test(cn)) return true
  return false
}

function matchesGov(cn: string): boolean {
  if (matchesUsHistory(cn)) return true
  const exact = new Set([
    "american government",
    "texas government",
    "u.s. government",
    "us government",
  ])
  if (exact.has(cn)) return true
  if (cn.includes("antigovernment")) return false
  return cn.includes("government")
}

function matchesCs1(cn: string): boolean {
  if (/\bcomputer science\s*(ii|2|iii|3)\b/.test(cn)) return false
  if (/\bdata structures\b/.test(cn) && !/intro/.test(cn)) return false
  if (cn === "computer science i" || cn === "cs i") return true
  if (/\bcomputer science\s+i\b/.test(cn)) return true
  if (/\bcs\s*1\b/.test(cn)) return true
  if (/\bintro(duction)?\s+to\s+computer science\b/.test(cn)) return true
  if (/\bintro(duction)?\s+to\s+programming\b/.test(cn)) return true
  if (/\bprogramming\s+fundamentals\b/.test(cn)) return true
  if (/\bcosc\s*1336\b/.test(cn)) return true
  if (/\bcsce\s*121\b/.test(cn)) return true
  if (/\bcsci\s*1301\b/.test(cn)) return true
  return false
}

function matchesDiscreteMath(cn: string): boolean {
  if (/\bdiscrete\b/.test(cn)) return true
  if (/\bcombinatorics\b/.test(cn) && /intro/.test(cn)) return true
  return false
}

export function courseNameMatchesPrereqKey(courseName: string, key: PrereqKey): boolean {
  const cn = norm(courseName)
  switch (key) {
    case "calculus_1":
      return matchesCalculus1(cn)
    case "calculus_2":
      return matchesCalculus2(cn)
    case "english_comp_1":
      return matchesEnglishComp1(cn)
    case "english_comp_2":
      return matchesEnglishComp2(cn)
    case "physics_1":
      return matchesPhysics1(cn)
    case "gov":
      return matchesGov(cn)
    case "cs_1":
      return matchesCs1(cn)
    case "discrete_math":
      return matchesDiscreteMath(cn)
  }
}
