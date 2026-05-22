import { createBrowserClient } from "@supabase/ssr";

/**
 * Creates a Supabase client for use in Client Components (browser).
 * Uses `createBrowserClient` from `@supabase/ssr` so the session follows Supabase + Next.js
 * App Router cookie patterns. The anon key is safe to expose; RLS enforces access.
 * Prefer **server actions** or `createClient` from `@/lib/supabase/server` for writes that must
 * honor the HTTP-only session (e.g. settings profile updates).
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
