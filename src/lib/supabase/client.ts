import { createBrowserClient } from "@supabase/ssr"
import { hasSupabasePublicEnv, supabaseAnonKey, supabaseUrl } from "@/lib/supabase/env"

/**
 * Supabase client for Client Components (browser).
 * Uses @supabase/ssr for App Router cookie session handling.
 */
export function createClient() {
  if (!hasSupabasePublicEnv()) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY, then redeploy."
    )
  }
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
