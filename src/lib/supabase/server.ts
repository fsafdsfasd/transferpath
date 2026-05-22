import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { supabaseAnonKey, supabaseUrl } from "@/lib/supabase/env"

/**
 * Creates a Supabase client for use in Server Components, Route Handlers,
 * and Server Actions. This client has access to cookies for auth sessions.
 */
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {
          // setAll can fail in Server Components (read-only context).
        }
      },
    },
  })
}
