import { createClient } from "@supabase/supabase-js"

/**
 * Server-only Supabase client with the service role key. Never import from client components.
 * Used for cron jobs and other trusted server tasks that must bypass RLS.
 *
 * URL: prefers SUPABASE_URL, falls back to NEXT_PUBLIC_SUPABASE_URL (matches existing project env).
 */
export function createServiceRoleClient() {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    throw new Error(
      "Missing SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL, or SUPABASE_SERVICE_ROLE_KEY"
    )
  }
  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}
