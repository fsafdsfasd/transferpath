import type { NextDeadline } from "@/lib/next-deadline"
import { EMAIL_PRODUCT_LINE } from "@/lib/brand"

type DeadlineRow = Exclude<NextDeadline, null>

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function safeExternalHref(url: string): string | null {
  try {
    const u = new URL(url)
    if (u.protocol !== "http:" && u.protocol !== "https:") return null
    return u.toString()
  } catch {
    return null
  }
}

function daysPhrase(days: number): string {
  if (days === 0) return "Due today (UTC calendar)."
  if (days === 1) return "Due tomorrow (UTC calendar)."
  return `Due in ${days} days (UTC calendar).`
}

/**
 * Public site URL for links in transactional email (server-side).
 * Prefer NEXT_PUBLIC_SITE_URL; production on Vercel can use VERCEL_URL.
 */
export function getServerSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "")
  if (explicit) return explicit
  const v = process.env.VERCEL_URL?.trim()
  if (v) return `https://${v.replace(/^https?:\/\//, "")}`
  return "http://localhost:3000"
}

export function buildDeadlineReminderEmail(deadline: DeadlineRow, siteUrl: string): {
  subject: string
  html: string
  text: string
} {
  const dashboardUrl = `${siteUrl}/dashboard`
  const settingsUrl = `${siteUrl}/dashboard/settings`
  const title = deadline.title
  const daysLine = daysPhrase(deadline.daysUntil)
  const when = deadline.dueDate
  const officialRaw = deadline.officialUrl?.trim()
  const officialHref = officialRaw ? safeExternalHref(officialRaw) : null

  const subject = `${EMAIL_PRODUCT_LINE} weekly reminder: ${title}`

  const officialHtml = officialHref
    ? `<p><a href="${escapeHtml(officialHref)}">Official information (from our planner)</a></p>`
    : ""
  const officialText = officialRaw ? `Official link (if any): ${officialRaw}\n` : ""

  const html = `
<!DOCTYPE html>
<html>
<body style="font-family: system-ui, sans-serif; line-height: 1.5; color: #111;">
  <p>This is your <strong>weekly</strong> deadline reminder from ${escapeHtml(EMAIL_PRODUCT_LINE)} (planner only — verify every date with your school).</p>
  <p><strong>${escapeHtml(title)}</strong><br />
  ${escapeHtml(when)} — ${escapeHtml(daysLine)}</p>
  ${officialHtml}
  <p>
    <a href="${escapeHtml(dashboardUrl)}">Open your dashboard</a> ·
    <a href="${escapeHtml(settingsUrl)}">Notification settings</a>
  </p>
  <p style="font-size: 13px; color: #555;">
    Turn off these emails anytime under Settings → Notifications. We send at most one email per week when your planner has a next upcoming deadline.
  </p>
  <p style="font-size: 13px; color: #555;">
    Deadlines in this app are for organization only. They are not official and can be incomplete or wrong — always confirm on your target institution’s site and communications.
  </p>
</body>
</html>`.trim()

  const text = [
    `${EMAIL_PRODUCT_LINE} — weekly deadline reminder (planner only; verify with your school).`,
    "",
    `${title}`,
    `${when} — ${daysLine}`,
    officialText,
    `Dashboard: ${dashboardUrl}`,
    `Settings: ${settingsUrl}`,
    "",
    "Unsubscribe: turn off deadline reminders in Settings → Notifications.",
    "",
    "This app does not replace official calendars or registrar communications.",
  ]
    .filter(Boolean)
    .join("\n")

  return { subject, html, text }
}
