"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Loader2, X, Check } from "lucide-react"
import { createBrowserClient } from "@supabase/ssr"
import { PRODUCT_NAME, TAGLINE, TRUST_LINE } from "@/lib/brand"

function MiniDashboardPreview() {
  return (
    <div className="mx-auto w-full max-w-[320px] rounded-xl border border-border bg-popover p-4 shadow-glow-card">
      <div className="mb-3 flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-primary" />
        <div className="flex min-w-0 flex-col">
          <span className="text-xs font-medium text-foreground">Your path on {PRODUCT_NAME}</span>
          <span className="text-[9px] text-muted-foreground">Example preview (not your data)</span>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-16 shrink-0 text-[10px] text-muted-foreground">Fall 2025</span>
          <div className="flex h-6 flex-1 items-center rounded border border-chart-2/30 bg-chart-2/20 px-2">
            <span className="text-[10px] font-medium text-chart-2">4 courses · 13 cr</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-16 shrink-0 text-[10px] text-muted-foreground">Spring 2026</span>
          <div className="flex h-6 flex-1 items-center rounded border border-chart-3/30 bg-chart-3/20 px-2">
            <span className="text-[10px] font-medium text-chart-3">5 courses · 15 cr</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-16 shrink-0 text-[10px] text-muted-foreground">Fall 2026</span>
          <div className="flex h-6 flex-1 items-center rounded border border-primary/30 bg-primary/15 px-2">
            <span className="text-[10px] font-medium text-primary">Apply · Deadline Mar 1</span>
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
        <svg
          className="h-1.5 flex-1"
          viewBox="0 0 100 6"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <rect width="100" height="6" rx="3" className="fill-muted" />
          <rect width="68" height="6" rx="3" className="fill-primary" />
        </svg>
        <span className="text-[10px] text-muted-foreground">68% complete</span>
      </div>
    </div>
  )
}

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showToast, setShowToast] = useState(false)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    setShowToast(true)
    setTimeout(() => router.push("/dashboard"), 1200)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
        <div className="relative hidden flex-col overflow-hidden border-r border-border bg-background tp-mesh-bg p-10 text-foreground lg:flex lg:w-[40%]">
        {/* Logo */}
        <div className="flex items-center gap-2 font-sans text-sm font-semibold tracking-tight text-foreground">
          <span className="h-8 w-8 shrink-0 rounded-full bg-accent" aria-hidden />
          {PRODUCT_NAME}
        </div>

        {/* Main Copy */}
        <div className="flex flex-1 flex-col justify-center gap-8">
          <div>
            <h1 className="font-heading text-balance text-3xl font-semibold leading-snug tracking-tight text-foreground">
              {TAGLINE}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Plan milestones and deadlines in one place—built first for Texas transfer students, with a
              voice that scales as we grow.
            </p>
          </div>

          {/* Social Proof */}
          <ul className="space-y-3">
            {[
              "Personalized semester-by-semester roadmap",
              "Tracks every deadline and requirement",
              "Path readiness you can act on—not hype",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-chart-2/90">
                  <Check className="h-2.5 w-2.5 text-background" strokeWidth={3} />
                </span>
                <span className="text-sm text-foreground/90">{item}</span>
              </li>
            ))}
          </ul>

          {/* Mini Dashboard Preview */}
          <MiniDashboardPreview />
        </div>

        {/* Trust */}
        <p className="text-center text-xs text-muted-foreground">
          {TRUST_LINE}
        </p>
      </div>

      {/* Right Panel */}
      <div className="flex flex-1 items-center justify-center bg-background px-6 py-12">
        <div className="w-full max-w-[400px] space-y-6">
          {/* Mobile Logo */}
          <div className="flex items-center gap-2 font-sans text-sm font-semibold tracking-tight text-foreground lg:hidden">
            <span className="h-8 w-8 shrink-0 rounded-full bg-accent" aria-hidden />
            {PRODUCT_NAME}
          </div>

          <div>
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
              Welcome back
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">Log in to your transfer dashboard</p>
          </div>

          {/* Google SSO */}
          <button
            type="button"
            onClick={() => supabase.auth.signInWithOAuth({
              provider: "google",
              options: {
                redirectTo: window.location.origin + "/auth/callback",
              },
            })}
            className="flex h-10 w-full items-center justify-center gap-3 rounded-lg border border-border bg-card text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            <svg width="18" height="18" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.36-8.16 2.36-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              <path fill="none" d="M0 0h48v48H0z"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">or continue with email</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Error Banner */}
          {error && (
            <div className="flex items-start gap-3 rounded-lg border border-destructive/25 bg-destructive/10 px-3 py-2.5 text-sm text-destructive">
              <span className="flex-1">{error}</span>
              <button
                onClick={() => setError("")}
                className="shrink-0 text-destructive/70 hover:text-destructive"
              >
                <X className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-sm font-medium text-foreground">
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/50"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-foreground">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="h-10 w-full rounded-lg border border-border bg-background px-3 pr-10 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" strokeWidth={1.5} />
                  ) : (
                    <Eye className="h-4 w-4" strokeWidth={1.5} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-70"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />}
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/onboarding" className="font-medium text-primary hover:underline">
              Get started for free &rarr;
            </Link>
          </p>
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="animate-in slide-in-from-bottom-4 fixed bottom-6 right-6 flex items-center gap-2 rounded-lg bg-chart-2 px-4 py-3 text-sm font-medium text-primary-foreground shadow-lg">
          <Check className="h-4 w-4" strokeWidth={1.5} />
          Signed in successfully
        </div>
      )}
    </div>
  )
}
