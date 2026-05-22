import { createClient } from "@/lib/supabase/server"
import { getCachedNextDeadline } from "@/lib/dashboard-data"
import { redirect } from "next/navigation"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardChrome } from "@/components/dashboard/dashboard-chrome"
import { CompactDashboardProvider } from "@/components/dashboard/compact-dashboard-context"
import { getCachedDashboardReadiness } from "@/lib/dashboard-readiness-loader"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data: profile } = await supabase
    .from("user_profiles")
    .select(`
      *,
      current_university:current_university_id(name, abbreviation),
      target_university:target_university_id(name, abbreviation)
    `)
    .eq("id", user.id)
    .maybeSingle()

  if (!profile) {
    redirect("/onboarding")
  }

  const displayName = profile?.full_name ?? user.email?.split("@")[0] ?? "there"
  const initials = displayName.slice(0, 2).toUpperCase()
  const currentSchoolName = (profile?.current_university as { name: string } | null)?.name ?? null
  const targetSchoolName = (profile?.target_university as { name: string } | null)?.name ?? null
  const routeLabel = [currentSchoolName, targetSchoolName].filter(Boolean).join(" → ") || null

  const targetId = profile?.target_university_id ?? null
  const hasTargetUniversity = targetId != null
  const expectedTerm = profile?.expected_transfer_term ?? null
  const nextDeadline = await getCachedNextDeadline(targetId, expectedTerm)

  const preferCompact = Boolean(profile?.prefer_compact_dashboard)
  const { score: pathwayReadinessScore } = await getCachedDashboardReadiness(user.id)
  const targetMajor = profile?.target_major ?? null

  return (
    <CompactDashboardProvider value={preferCompact}>
      <div className="flex min-h-screen bg-background tp-dashboard-bg">
        <DashboardSidebar
          displayName={displayName}
          initials={initials}
          routeLabel={routeLabel}
          nextDeadline={nextDeadline}
          hasTargetUniversity={hasTargetUniversity}
          pathwayReadinessScore={pathwayReadinessScore}
          currentSchoolName={currentSchoolName}
          targetSchoolName={targetSchoolName}
          targetMajor={targetMajor}
          expectedTransferTerm={expectedTerm}
        />
        <main className="ml-0 flex min-w-0 flex-1 flex-col pt-14 md:ml-64 md:pt-0">
          <DashboardChrome initials={initials}>{children}</DashboardChrome>
        </main>
      </div>
    </CompactDashboardProvider>
  )
}
