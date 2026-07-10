/** Central product copy — import here instead of hardcoding the name in dozens of files. */

export const PRODUCT_NAME = "TransferPath"

export const TAGLINE = "Your transfer journey, mapped clearly."

/** Texas positioning; use in hero pills, footnotes, and where scope matters. */
export const REGION_TAGLINE = "Built first for Texas transfer students."

/** Short line for meta / share descriptions. */
export const PRODUCT_TAGLINE_SHORT = TAGLINE

export function buildPageTitle(suffix?: string): string {
  if (!suffix?.trim()) return `${PRODUCT_NAME} — ${TAGLINE.replace(/\.$/, "")}`
  return `${suffix.trim()} — ${PRODUCT_NAME}`
}

export const META_DESCRIPTION =
  `${PRODUCT_NAME} helps Texas transfer students plan their move to a four-year school with a clear semester-by-semester path. ${REGION_TAGLINE}`

export const CTA_BUILD_PATH = "Build your path"

export const CTA_SEE_HOW = "See how it works"

export const CTA_GET_STARTED = "Get started"

/** Honest positioning — no inflated social proof. */
export const TRUST_LINE = "Free · Open source · Built for Texas transfer students"

export const TRUST_BADGES = ["Free to use", "Open source", "Texas-first"] as const

/** Transactional email / product line (plain text). */
export const EMAIL_PRODUCT_LINE = PRODUCT_NAME
