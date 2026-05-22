"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import {
  Home,
  Calendar,
  ClipboardList,
  CheckSquare,
  PenLine,
  Settings,
  LogOut,
  Menu,
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import type { NextDeadline } from "@/lib/next-deadline"
import { DeadlineOfficialLink } from "@/components/dashboard/deadline-official-link"
import { cn } from "@/lib/utils"
import { PRODUCT_NAME } from "@/lib/brand"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { buttonVariants } from "@/components/ui/button"

const navItems = [
  { href: "/dashboard", label: "Overview", icon: Home },
  { href: "/dashboard/timeline", label: "Semester Timeline", icon: Calendar },
  { href: "/dashboard/requirements", label: "Requirements", icon: ClipboardList },
  { href: "/dashboard/checklist", label: "Checklist", icon: CheckSquare },
  { href: "/dashboard/essay", label: "Essay Builder", icon: PenLine },
] as const

function BrandOrb({ className }: { className?: string }) {
  return <span className={cn("shrink-0 rounded-full bg-sidebar-primary", className)} aria-hidden />
}

function NavList({
  pathname,
  onNavigate,
}: {
  pathname: string
  onNavigate?: () => void
}) {
  return (
    <ul className="space-y-1">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors duration-150",
                isActive
                  ? "bg-sidebar-accent font-medium text-sidebar-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" strokeWidth={1.5} />
              {item.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

interface SidebarProps {
  displayName: string
  initials: string
  routeLabel: string | null
  nextDeadline: NextDeadline
  hasTargetUniversity: boolean
  pathwayReadinessScore: number
  currentSchoolName: string | null
  targetSchoolName: string | null
  targetMajor: string | null
  expectedTransferTerm: string | null
}

function PathwayPanel({
  targetSchoolName,
  targetMajor,
  currentSchoolName,
  expectedTransferTerm,
  pathwayReadinessScore,
}: Pick<
  SidebarProps,
  | "targetSchoolName"
  | "targetMajor"
  | "currentSchoolName"
  | "expectedTransferTerm"
  | "pathwayReadinessScore"
>) {
  const readinessPct = Math.round(Math.min(100, Math.max(0, pathwayReadinessScore)))
  const pathwayHeadline =
    targetSchoolName && targetMajor
      ? `${targetSchoolName} · ${targetMajor}`
      : targetSchoolName
        ? targetSchoolName
        : targetMajor
          ? targetMajor
          : "Set your target path"

  return (
    <div className="border-b border-sidebar-border px-4 py-4">
      <p className="font-mono text-[10px] font-medium uppercase tracking-widest text-sidebar-foreground/45">
        Current pathway
      </p>
      <p className="mt-2 font-heading text-base leading-snug text-sidebar-foreground">{pathwayHeadline}</p>
      {currentSchoolName ? (
        <p className="mt-1 text-xs text-sidebar-foreground/60">From {currentSchoolName}</p>
      ) : (
        <p className="mt-1 text-xs text-sidebar-foreground/60">Add your current school in settings</p>
      )}
      {expectedTransferTerm ? (
        <p className="mt-0.5 text-xs text-sidebar-primary/90">Planning for {expectedTransferTerm}</p>
      ) : null}
      <div className="mt-4 flex items-center gap-2">
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-sidebar-foreground/15">
          <svg className="h-1 w-full" viewBox="0 0 100 4" preserveAspectRatio="none" aria-hidden>
            <rect width="100" height="4" rx="2" className="fill-sidebar-foreground/15" />
            <rect width={readinessPct} height="4" rx="2" className="fill-sidebar-primary" />
          </svg>
        </div>
        <span className="font-mono text-[10px] font-medium text-sidebar-primary">{readinessPct}%</span>
      </div>
      <p className="mt-1.5 text-[10px] leading-snug text-sidebar-foreground/50">Planner readiness</p>
    </div>
  )
}

export function DashboardSidebar({
  displayName,
  initials,
  routeLabel,
  nextDeadline,
  hasTargetUniversity,
  pathwayReadinessScore,
  currentSchoolName,
  targetSchoolName,
  targetMajor,
  expectedTransferTerm,
}: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/login")
  }

  const deadlineCard = (
    <div className="rounded-xl border border-sidebar-border bg-sidebar-accent/70 p-3">
      {!hasTargetUniversity ? (
        <p className="text-xs leading-relaxed text-sidebar-foreground/75">
          Set a target school in{" "}
          <Link
            href="/dashboard/settings"
            className="font-medium text-sidebar-primary underline-offset-2 hover:underline"
            onClick={() => setMobileOpen(false)}
          >
            Settings
          </Link>{" "}
          to see deadlines.
        </p>
      ) : !nextDeadline ? (
        <p className="text-xs text-sidebar-foreground/70">No upcoming deadlines in our database yet.</p>
      ) : (
        <>
          <p className="line-clamp-2 text-xs font-medium text-sidebar-primary">{nextDeadline.title}</p>
          <p className="mt-1 text-lg font-semibold tracking-tight text-sidebar-foreground">
            {nextDeadline.daysUntil} {nextDeadline.daysUntil === 1 ? "day" : "days"} away
          </p>
          <p className="text-xs text-sidebar-foreground/70">{nextDeadline.dueDate}</p>
          {nextDeadline.officialUrl ? (
            <DeadlineOfficialLink
              href={nextDeadline.officialUrl}
              className="mt-1.5 block text-xs font-medium text-sidebar-primary underline-offset-2 hover:underline"
            />
          ) : null}
        </>
      )}
    </div>
  )

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-40 flex h-14 items-center justify-between border-b border-sidebar-border bg-sidebar px-3 md:hidden">
        <div className="flex items-center gap-2">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon-sm" }),
                "text-sidebar-foreground hover:bg-sidebar-accent"
              )}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            </SheetTrigger>
            <SheetContent side="left" className="w-[min(100%,320px)] gap-0 p-0 sm:max-w-sm">
              <SheetHeader className="border-b border-border p-4 text-left">
                <SheetTitle className="flex items-center gap-2 font-sans font-semibold text-sidebar-foreground">
                  <BrandOrb className="h-5 w-5" />
                  {PRODUCT_NAME}
                </SheetTitle>
                <p className="font-heading text-xs text-sidebar-foreground/80">{routeLabel ?? "Transfer planner"}</p>
              </SheetHeader>
              <div className="flex flex-1 flex-col overflow-y-auto px-2 py-4">
                <PathwayPanel
                  targetSchoolName={targetSchoolName}
                  targetMajor={targetMajor}
                  currentSchoolName={currentSchoolName}
                  expectedTransferTerm={expectedTransferTerm}
                  pathwayReadinessScore={pathwayReadinessScore}
                />
                <p className="mb-2 mt-4 px-3 text-xs font-medium uppercase tracking-wider text-sidebar-foreground/50">
                  Workspace
                </p>
                <NavList pathname={pathname} onNavigate={() => setMobileOpen(false)} />
                <div className="mt-4 px-1">{deadlineCard}</div>
              </div>
              <div className="mt-auto border-t border-border p-2">
                <Link
                  href="/dashboard/settings"
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors duration-150",
                    pathname === "/dashboard/settings"
                      ? "bg-sidebar-accent font-medium text-sidebar-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <Settings className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                  Settings
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false)
                    void handleSignOut()
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground/70 transition-colors duration-150 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <LogOut className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                  Sign out
                </button>
              </div>
            </SheetContent>
          </Sheet>
          <Link
            href="/"
            className="flex items-center gap-2 font-sans text-sm font-semibold tracking-tight text-sidebar-foreground transition-opacity duration-150 hover:opacity-90"
          >
            <BrandOrb className="h-5 w-5" />
            {PRODUCT_NAME}
          </Link>
        </div>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-sidebar-border bg-sidebar-accent text-xs font-medium text-sidebar-foreground">
          {initials}
        </div>
      </header>

        <aside className="fixed left-0 top-0 hidden h-screen w-64 flex-col border-r border-sidebar-border bg-sidebar md:flex">
        <div className="flex h-14 items-center gap-2 border-b border-sidebar-border px-4">
          <BrandOrb className="h-5 w-5" />
          <Link
            href="/"
            className="font-mono text-sm font-bold uppercase tracking-tight text-sidebar-foreground transition-opacity duration-150 hover:opacity-90"
          >
            {PRODUCT_NAME}
          </Link>
        </div>

        <PathwayPanel
          targetSchoolName={targetSchoolName}
          targetMajor={targetMajor}
          currentSchoolName={currentSchoolName}
          expectedTransferTerm={expectedTransferTerm}
          pathwayReadinessScore={pathwayReadinessScore}
        />

        <nav className="flex-1 space-y-1 px-3 py-5">
          <p className="px-3 pb-2 font-mono text-[10px] font-medium uppercase tracking-widest text-sidebar-foreground/40">
            Workspace
          </p>
          <NavList pathname={pathname} />
        </nav>

        <div className="px-3 py-4">{deadlineCard}</div>

        <div className="border-t border-sidebar-border p-2">
          <Link
            href="/dashboard/settings"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors duration-150",
              pathname === "/dashboard/settings"
                ? "bg-sidebar-accent font-medium text-sidebar-foreground"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
          >
            <Settings className="h-4 w-4 shrink-0" strokeWidth={1.5} />
            Settings
          </Link>
          <button
            type="button"
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground/70 transition-colors duration-150 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <LogOut className="h-4 w-4 shrink-0" strokeWidth={1.5} />
            Sign out
          </button>
        </div>
      </aside>
    </>
  )
}
