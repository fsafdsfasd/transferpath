"use client"

import Link from "next/link"
import { AlertCircle, ArrowUpRight, Flame, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import type { OverviewData } from "@/types/overview"
import { ReadinessRing, RoadmapTrack, SubMetricBar } from "@/components/dashboard/overview/overview-parts"
import { useCompactDashboard } from "@/components/dashboard/compact-dashboard-context"
import { settingsPath } from "@/lib/settings-tab"

interface OverviewMainProps {
  data: OverviewData
}

export function OverviewMain({ data }: OverviewMainProps) {
  const {
    user,
    pathway,
    readiness,
    nextAction,
    deadlines,
    missingRequirements,
    recommendedActions,
    deadlinesCycleLabel,
    recommendedHeadline,
  } = data

  const compact = useCompactDashboard()

  return (
    <div
      className={cn(
        "mx-auto max-w-6xl tp-stagger-children",
        compact ? "space-y-6" : "space-y-10"
      )}
    >
      <div
        className={cn(
          "flex flex-col items-start justify-between md:flex-row md:items-end",
          compact ? "gap-4" : "gap-6"
        )}
      >
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-accent">
            {user.todayLabel}
          </p>
          <h1
            className={cn(
              "mt-3 font-heading tracking-tight text-foreground",
              compact ? "text-3xl md:text-4xl" : "text-4xl md:text-5xl"
            )}
          >
            <span className="italic">{user.greetingLine}</span>
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-[15px]">
            {user.subcopy}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href={settingsPath("notifications")}
            className="rounded-sm border border-border-strong bg-card px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
          >
            Notification settings
          </Link>
          <Link
            href="/dashboard/timeline"
            className="rounded-sm bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            View timeline
          </Link>
        </div>
      </div>

      <div className={cn("grid lg:grid-cols-12", compact ? "gap-4" : "gap-6")}>
        <div
          className={cn(
            "rounded-2xl border border-border bg-primary text-primary-foreground shadow-xl shadow-primary/10 lg:col-span-7",
            compact ? "p-5 sm:p-6" : "p-6 sm:p-8"
          )}
        >
          <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-accent">
            Transfer readiness
          </p>
          <div className="mt-6 flex flex-col items-start gap-8 sm:flex-row sm:items-end sm:gap-10">
            <ReadinessRing value={readiness.score} />
            <div className="min-w-0 flex-1">
              <p className="font-heading text-5xl leading-none md:text-6xl">
                {readiness.score}
                <span className="text-2xl text-primary-foreground/40">%</span>
              </p>
              <p className="mt-2 text-sm text-primary-foreground/70">{readiness.deltaLabel}</p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {readiness.subMetrics.map((m) => (
                  <SubMetricBar key={m.label} {...m} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          className={cn(
            "flex flex-col rounded-2xl border border-border bg-accent text-accent-foreground shadow-xl shadow-accent/10 lg:col-span-5",
            compact ? "p-5 sm:p-6" : "p-6 sm:p-8"
          )}
        >
          <div className="flex items-center gap-2">
            <Flame className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden />
            <p className="font-mono text-[10px] font-bold uppercase tracking-widest">
              Next critical action
            </p>
          </div>
          <h3 className="mt-5 font-heading text-2xl leading-tight md:text-3xl">{nextAction.title}</h3>
          <p className="mt-3 text-sm text-accent-foreground/80">{nextAction.dueLabel}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={nextAction.primaryHref}
              className="rounded-sm bg-primary/90 px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary"
            >
              Execute task
            </Link>
            <Link
              href="/dashboard/checklist"
              className="rounded-sm border border-primary-foreground/30 px-5 py-2.5 text-sm font-medium transition hover:bg-primary-foreground/10"
            >
              Open checklist
            </Link>
          </div>
          {nextAction.followUpLabel ? (
            <div className="mt-8 border-t border-primary-foreground/20 pt-4">
              <p className="font-mono text-[10px] uppercase tracking-widest opacity-70">Then up next</p>
              <p className="mt-1 text-sm">{nextAction.followUpLabel}</p>
            </div>
          ) : null}
        </div>
      </div>

      <section
        className={cn(
          "rounded-2xl border border-border bg-card tp-interactive-panel",
          compact ? "p-5 sm:p-6" : "p-6 sm:p-8"
        )}
      >
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Your roadmap
            </p>
            <h2 className="mt-2 font-heading text-balance text-xl leading-snug text-foreground md:text-2xl">
              From {pathway.originLabel} to {pathway.targetLabel}
              {pathway.targetMajor ? (
                <span className="text-muted-foreground"> · {pathway.targetMajor}</span>
              ) : null}
            </h2>
            {pathway.semesterCount > 0 ? (
              <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {pathway.semesterCount} phase{pathway.semesterCount === 1 ? "" : "s"} on your timeline
              </p>
            ) : null}
          </div>
          <Link
            href="/dashboard/timeline"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-accent"
          >
            Open full timeline <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
        </div>
        <RoadmapTrack steps={pathway.steps} progressPct={pathway.progressPct} />
      </section>

      <div className={cn("grid lg:grid-cols-12", compact ? "gap-4" : "gap-6")}>
        <section
          className={cn(
            "rounded-2xl border border-border bg-card lg:col-span-7 tp-interactive-panel",
            compact ? "p-5 sm:p-6" : "p-6 sm:p-8"
          )}
        >
          <div className="mb-6 flex items-center justify-between gap-4">
            <h2 className="font-heading text-xl text-foreground md:text-2xl">Upcoming deadlines</h2>
            {deadlinesCycleLabel ? (
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {deadlinesCycleLabel}
              </span>
            ) : null}
          </div>
          {deadlines.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Set a target school to see deadlines from our database.
            </p>
          ) : (
            <div className="space-y-2">
              {deadlines.map((d) => (
                <div
                  key={`${d.date}-${d.title}`}
                  className="flex items-center justify-between gap-3 rounded-sm border border-border px-4 py-3.5 transition-colors hover:border-border-strong"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <span className="w-14 shrink-0 font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground sm:w-16">
                      {d.date}
                    </span>
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className={cn(
                          "size-1.5 shrink-0 rounded-full",
                          d.tone === "accent"
                            ? "bg-accent"
                            : d.tone === "success"
                              ? "bg-chart-3"
                              : "bg-muted-foreground/40"
                        )}
                      />
                      <span className="truncate text-sm font-medium">{d.title}</span>
                    </div>
                  </div>
                  <span className="hidden shrink-0 font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:inline">
                    {d.tag}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        <section
          className={cn(
            "rounded-2xl border border-border bg-card lg:col-span-5 tp-interactive-panel",
            compact ? "p-5 sm:p-6" : "p-6 sm:p-8"
          )}
        >
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-heading text-xl text-foreground md:text-2xl">Missing requirements</h2>
            <Link
              href="/dashboard/requirements"
              className="text-sm font-medium text-primary hover:text-accent"
            >
              View all →
            </Link>
          </div>
          {missingRequirements.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No obvious gaps on your profile checklist right now.
            </p>
          ) : (
            <div className="space-y-3">
              {missingRequirements.map((r) => (
                <div key={r.title} className="rounded-sm border border-border p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={1.5} />
                    <div>
                      <p className="text-sm font-semibold">{r.title}</p>
                      <p className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        {r.code} · {r.note}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {recommendedActions.length > 0 ? (
        <section>
          <div className="mb-6">
            <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-accent">
              Recommended next
            </p>
            <h2 className="mt-2 font-heading text-2xl text-foreground md:text-3xl">
              {recommendedHeadline ?? "Three moves to raise readiness."}
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {recommendedActions.map((a) => (
              <Link
                key={a.title}
                href={a.href}
                className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent/40 tp-interactive-panel"
              >
                <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-2.5 py-1 text-accent">
                  <Sparkles className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden />
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest">
                    {a.eyebrow}
                  </span>
                </div>
                <h3 className="mb-2 font-heading text-lg leading-snug">{a.title}</h3>
                <p className="flex-1 text-sm text-muted-foreground">{a.body}</p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:text-accent">
                  {a.cta} <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}
