import { NextResponse } from "next/server"
import { Resend } from "resend"
import { getNextDeadline } from "@/lib/next-deadline"
import { buildDeadlineReminderEmail, getServerSiteUrl } from "@/lib/deadline-reminder-email"
import { createServiceRoleClient } from "@/lib/supabase/service"

export const dynamic = "force-dynamic"

/**
 * Weekly “next deadline” email crons should call this route with:
 *   Authorization: Bearer <CRON_SECRET>
 * Supports GET or POST (e.g. Vercel Cron often uses GET).
 *
 * Opt-in rule (aligned with DB function + Settings): NULL notify_deadline_reminders = ON;
 * only explicit false opts out. See migration on public.deadline_reminder_recipients().
 */

type RecipientRow = {
  user_id: string
  email: string
  target_university_id: string | null
  expected_transfer_term: string | null
}

function jsonError(message: string, status: number) {
  return NextResponse.json({ ok: false, error: message }, { status })
}

function authorizeCron(request: Request): NextResponse | null {
  const expected = process.env.CRON_SECRET
  if (!expected) {
    return jsonError("Cron not configured (CRON_SECRET missing)", 503)
  }
  const header = request.headers.get("authorization")
  const token = header?.startsWith("Bearer ") ? header.slice(7).trim() : null
  if (!token || token !== expected) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })
  }
  return null
}

export async function GET(request: Request) {
  return runDeadlineReminders(request)
}

export async function POST(request: Request) {
  return runDeadlineReminders(request)
}

async function runDeadlineReminders(request: Request) {
  const authErr = authorizeCron(request)
  if (authErr) return authErr

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL?.trim()
  if (!apiKey || !from) {
    return jsonError("Resend not configured (RESEND_API_KEY or RESEND_FROM_EMAIL missing)", 503)
  }

  let supabase: ReturnType<typeof createServiceRoleClient>
  try {
    supabase = createServiceRoleClient()
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Supabase service client error"
    return jsonError(msg, 503)
  }

  const { data: recipients, error: rpcError } = await supabase.rpc("deadline_reminder_recipients")
  if (rpcError) {
    console.error("[deadline-reminders] rpc deadline_reminder_recipients", rpcError)
    return jsonError(rpcError.message, 500)
  }

  const rows = (recipients ?? []) as RecipientRow[]
  const siteUrl = getServerSiteUrl()
  const resend = new Resend(apiKey)

  let sent = 0
  let skippedNoDeadline = 0
  let failed = 0

  for (const row of rows) {
    try {
      const deadline = await getNextDeadline(
        supabase,
        row.target_university_id,
        row.expected_transfer_term
      )
      if (!deadline) {
        skippedNoDeadline++
        continue
      }

      const { subject, html, text } = buildDeadlineReminderEmail(deadline, siteUrl)
      const { error: sendError } = await resend.emails.send({
        from,
        to: row.email,
        subject,
        html,
        text,
      })

      if (sendError) {
        console.error("[deadline-reminders] resend", row.user_id, row.email, sendError)
        failed++
        continue
      }
      sent++
    } catch (e) {
      console.error("[deadline-reminders] user", row.user_id, e)
      failed++
    }
  }

  return NextResponse.json({
    ok: true,
    recipients: rows.length,
    sent,
    skippedNoDeadline,
    failed,
  })
}
