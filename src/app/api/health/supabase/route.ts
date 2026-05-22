import { NextResponse } from "next/server"
import { hasSupabasePublicEnv, supabaseAnonKey, supabaseUrl, supabasePublicEnvIssue } from "@/lib/supabase/env"

/** Safe diagnostics for Vercel env (no secrets returned). */
export async function GET() {
  const issue = supabasePublicEnvIssue()
  const projectRef = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1] ?? null

  return NextResponse.json({
    ok: hasSupabasePublicEnv() && issue === null,
    hasUrl: supabaseUrl.length > 0,
    hasAnonKey: supabaseAnonKey.length > 0,
    anonKeyFormat: supabaseAnonKey.startsWith("eyJ")
      ? "jwt"
      : supabaseAnonKey.startsWith("sb_")
        ? "publishable"
        : supabaseAnonKey.length > 0
          ? "unknown"
          : "missing",
    projectRef,
    issue,
  })
}
