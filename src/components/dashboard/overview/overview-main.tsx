"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import type { OverviewData } from "@/types/overview"
import { Provenance } from "@/components/ui/provenance"
import { useCompactDashboard } from "@/components/dashboard/compact-dashboard-context"
import {
  ExternalActionLink,
  ScopeChip,
  TodayReadinessPanel,
  TodaySourcesLink,
} from "@/components/dashboard/overview/today-readiness-panel"

interface OverviewMainProps {
  data: OverviewData
}

export function OverviewMain({ data }: OverviewMainProps) {
  const compact = useCompactDashboard()

  if (data.pathwayPrompt) {
    return (
      <div className={cn("mx-auto max-w-3xl tp-stagger-children", compact ? "space-y-6" : "space-y-8")}>
        <p className="text-sm text-muted-foreground">{data.dateLine}</p>
        <section className="rounded-xl border border-border border-l-4 border-l-accent bg-card p-6 sm:p-8">
          <p className="tp-eyebrow text-muted-foreground">Set up your pathway</p>
          <h1 className="mt-3 font-heading text-2xl leading-tight text-foreground md:text-3xl">
            {data.pathwayPrompt.title}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {data.pathwayPrompt.body}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <ScopeChip label="Target school" />
            <ScopeChip label="Entry term" />
            <Link
              href={data.pathwayPrompt.settingsHref}
              className="ml-1 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
            >
              Save and continue
            </Link>
          </div>
        </section>
        <TodaySourcesLink />
      </div>
    )
  }

  return (
    <div
      className={cn(
        "mx-auto max-w-6xl tp-stagger-children",
        compact ? "space-y-6" : "space-y-8"
      )}
    >
      <p className="text-sm text-muted-foreground">{data.dateLine}</p>

      <div className={cn("grid gap-6 lg:grid-cols-[1.65fr_1fr] lg:gap-8", compact ? "gap-4" : "gap-6")}>
        <div className="flex flex-col gap-6">
          {data.nextAction ? <NextActionCard action={data.nextAction} /> : null}

          {data.comingUp.length > 0 ? (
            <section className="rounded-xl border border-border bg-card p-5 sm:p-6">
              <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                <h2 className="font-heading text-lg text-foreground">Also coming up</h2>
                <Link
                  href="/dashboard/deadlines"
                  className="text-sm font-medium text-primary hover:text-accent"
                >
                  See all tasks & deadlines
                </Link>
              </div>
              <ul className="divide-y divide-border">
                {data.comingUp.map((item) => (
                  <li key={`${item.dateLabel}-${item.title}`} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 text-sm">
                          <span className="shrink-0 tabular-nums text-muted-foreground">
                            {item.dateLabel}
                          </span>
                          {item.scopeChip ? <ScopeChip label={item.scopeChip} /> : null}
                        </div>
                        <p className="mt-1 font-medium text-foreground">{item.title}</p>
                        <p className="mt-0.5 text-caption text-muted-foreground">{item.meta}</p>
                        {item.provenance ? (
                          <Provenance {...item.provenance} className="mt-2" />
                        ) : null}
                      </div>
                      <ExternalActionLink href={item.href} label={item.actionLabel} />
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {data.thisTerm ? <ThisTermSection term={data.thisTerm} /> : null}

          {data.needsDate ? <NeedsDateSection needsDate={data.needsDate} /> : null}
        </div>

        <aside className="flex flex-col gap-4 lg:sticky lg:top-6 lg:self-start">
          {data.readiness ? <TodayReadinessPanel readiness={data.readiness} /> : null}
          <TodaySourcesLink />
        </aside>
      </div>
    </div>
  )
}

function NextActionCard({ action }: { action: NonNullable<OverviewData["nextAction"]> }) {
  return (
    <section className="rounded-xl border border-border border-l-4 border-l-accent bg-card p-5 sm:p-6">
      <p className="tp-eyebrow text-accent">Next</p>
      <h1 className="mt-3 font-heading text-2xl leading-tight text-foreground md:text-3xl">
        {action.title}
      </h1>
      {(action.dateLabel || action.scopeChips.length > 0) && (
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
          {action.dateLabel ? (
            <span className="tabular-nums text-muted-foreground">{action.dateLabel}</span>
          ) : null}
          {action.scopeChips.map((chip) => (
            <ScopeChip key={chip} label={chip} />
          ))}
          {action.dueDetail ? (
            <span className="text-muted-foreground">· {action.dueDetail}</span>
          ) : null}
        </div>
      )}
      <Provenance {...action.provenance} className="mt-3" />
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href={action.primaryHref}
          className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
        >
          {action.primaryLabel}
        </Link>
        {action.secondaryHref && action.secondaryLabel ? (
          <Link
            href={action.secondaryHref}
            className="rounded-md border border-border-strong px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted"
          >
            {action.secondaryLabel}
          </Link>
        ) : null}
      </div>
    </section>
  )
}

function ThisTermSection({ term }: { term: NonNullable<OverviewData["thisTerm"]> }) {
  return (
    <section className="rounded-xl border border-border bg-card p-5 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-heading text-lg text-foreground">This term</h2>
        <Link href="/dashboard/plan" className="text-sm font-medium text-primary hover:text-accent">
          Open Plan
        </Link>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span className="text-muted-foreground">
          {term.termLabel} · {term.dateRange}
        </span>
        <span className="text-foreground">{term.summary}</span>
      </div>
      {term.previewTitle ? (
        <div className="mt-4 flex items-start justify-between gap-3 border-t border-border pt-4">
          <div>
            <p className="text-sm font-medium text-foreground">{term.previewTitle}</p>
            {term.previewMeta ? (
              <p className="mt-0.5 text-caption capitalize text-muted-foreground">{term.previewMeta}</p>
            ) : null}
          </div>
          <Link href="/dashboard/plan" className="shrink-0 text-sm font-medium text-primary hover:text-accent">
            Open Plan
          </Link>
        </div>
      ) : null}
    </section>
  )
}

function NeedsDateSection({ needsDate }: { needsDate: NonNullable<OverviewData["needsDate"]> }) {
  return (
    <section className="rounded-xl border border-border bg-card p-5 sm:p-6">
      <p className="tp-eyebrow text-muted-foreground">Needs a date</p>
      <p className="mt-3 text-sm leading-relaxed text-foreground">{needsDate.headline}</p>
      <Provenance level="missing" what={needsDate.provenance.what} className="mt-3" />
      <div className="mt-4 flex flex-wrap gap-3">
        {needsDate.officialUrl ? (
          <ExternalActionLink href={needsDate.officialUrl} label="Open official page" />
        ) : null}
        <Link
          href={needsDate.recordHref}
          className="text-sm font-medium text-primary hover:text-accent"
        >
          Record the date yourself
        </Link>
      </div>
    </section>
  )
}
