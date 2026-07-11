"use client"

import { AlertCircle, CheckCircle2, Circle, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { OfficialPrereqDisclaimer } from "@/components/dashboard/official-prereq-disclaimer"
import { DeadlineOfficialLink } from "@/components/dashboard/deadline-official-link"
import type {
  RequirementWorkspaceItem,
  RequirementsPlanningNote,
  RequirementsTimelineRow,
  RequirementsWorkspaceData,
} from "@/types/requirements-workspace"

export type RequirementsWorkspaceUiProps = {
  data: RequirementsWorkspaceData
  LinkComponent?: React.ComponentType<{
    href: string
    className?: string
    children: React.ReactNode
  }>
}

const STAT_LABEL_CLASS =
  "text-xs font-medium uppercase tracking-wide text-muted-foreground"

function SummaryStat({
  label,
  value,
  sub,
  tone,
}: {
  label: string
  value: string
  sub: string
  tone: "success" | "accent" | "muted"
}) {
  const color =
    tone === "success"
      ? "text-success"
      : tone === "accent"
        ? "text-accent"
        : "text-foreground"
  return (
    <div className="flex min-h-[140px] flex-col items-center justify-center rounded-2xl border border-border bg-card p-6 text-center tp-interactive-panel">
      <p className={STAT_LABEL_CLASS}>{label}</p>
      <p className={cn("mt-3 font-heading text-4xl tabular-nums", color)}>{value}</p>
      <p className="mt-2 max-w-[12rem] text-xs leading-snug text-muted-foreground">{sub}</p>
    </div>
  )
}

function RequirementRow({
  item,
  last,
  Link,
}: {
  item: RequirementWorkspaceItem
  last: boolean
  Link: RequirementsWorkspaceUiProps["LinkComponent"]
}) {
  const ctaClass =
    "rounded-sm border border-border-strong px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted"
  const cta =
    item.href && item.external ? (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={ctaClass}
      >
        {item.ctaLabel ?? "View"}
      </a>
    ) : item.href && Link ? (
      <Link href={item.href} className={ctaClass}>
        {item.ctaLabel ?? "View"}
      </Link>
    ) : item.href ? (
      <a
        href={item.href}
        target={item.external ? "_blank" : undefined}
        rel={item.external ? "noopener noreferrer" : undefined}
        className={ctaClass}
      >
        {item.ctaLabel ?? "View"}
      </a>
    ) : item.ctaLabel ? (
      <span className="rounded-sm border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground">
        {item.ctaLabel}
      </span>
    ) : null

  const subline = [item.code !== "—" ? item.code : null, item.equiv, item.credits ? `${item.credits} cr` : null]
    .filter(Boolean)
    .join(" · ")

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 px-6 py-4",
        !last && "border-b border-border"
      )}
    >
      <div className="flex min-w-0 items-center gap-5">
        {item.status === "done" && (
          <CheckCircle2 className="size-5 shrink-0 text-success" strokeWidth={1.5} />
        )}
        {item.status === "active" && (
          <div className="relative grid size-5 shrink-0 place-items-center">
            <div className="size-3 rounded-full bg-accent" />
            <span className="absolute inset-0 rounded-full bg-accent/20 animate-pulse" />
          </div>
        )}
        {item.status === "missing" && (
          <Circle className="size-5 shrink-0 text-muted-foreground/40" strokeWidth={1.5} />
        )}
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground">{item.title}</p>
          {subline ? (
            <p className="mt-0.5 text-xs leading-snug text-muted-foreground">{subline}</p>
          ) : null}
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        {item.status === "missing" && (
          <span className="hidden items-center gap-1.5 rounded-sm border border-accent/30 bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent md:inline-flex">
            <AlertCircle className="size-3" />
            Action needed
          </span>
        )}
        {cta}
      </div>
    </div>
  )
}

const ROW_CTA_CLASS =
  "rounded-sm border border-border-strong px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted"

function WorkspaceSectionHeader({
  title,
  meta,
  intro,
}: {
  title: string
  meta: string
  intro?: string
}) {
  return (
    <div className="mb-4 space-y-1">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="font-heading text-2xl text-foreground">{title}</h2>
        <p className="shrink-0 text-[11px] uppercase tracking-widest text-muted-foreground">
          {meta}
        </p>
      </div>
      {intro ? (
        <p className="max-w-2xl text-sm text-muted-foreground">{intro}</p>
      ) : null}
    </div>
  )
}

function DeadlineStatusIcon({ row }: { row: RequirementsTimelineRow }) {
  if (row.passed) {
    return <CheckCircle2 className="size-5 shrink-0 text-success" strokeWidth={1.5} />
  }
  if (row.current) {
    return (
      <div className="relative grid size-5 shrink-0 place-items-center">
        <div className="size-3 rounded-full bg-accent" />
        <span className="absolute inset-0 rounded-full bg-accent/20 animate-pulse" />
      </div>
    )
  }
  return <Circle className="size-5 shrink-0 text-muted-foreground/40" strokeWidth={1.5} />
}

function deadlineSubline(row: RequirementsTimelineRow): string {
  const scopeLabel = row.scope === "statewide" ? "Texas-wide" : "Your target school"
  const parts = [row.dateLabel, scopeLabel]
  if (row.recommended) parts.push("Recommended")
  if (row.current) parts.push("You are here")
  return parts.join(" · ")
}

function PlanningNoteRow({
  note,
  last,
}: {
  note: RequirementsPlanningNote
  last: boolean
}) {
  return (
    <div
      className={cn(
        "relative flex items-start justify-between gap-4 px-6 py-4",
        !last && "border-b border-border"
      )}
    >
      <div className="flex min-w-0 items-start gap-4">
        <div className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-muted/60 text-muted-foreground">
          <Info className="size-4" strokeWidth={1.5} />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground">{note.title}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{note.body}</p>
        </div>
      </div>
      {note.optionalUrl ? (
        <DeadlineOfficialLink href={note.optionalUrl} className={cn("shrink-0", ROW_CTA_CLASS)}>
          Learn more
        </DeadlineOfficialLink>
      ) : null}
    </div>
  )
}

function DeadlineRow({ row, last }: { row: RequirementsTimelineRow; last: boolean }) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-between gap-4 px-6 py-4",
        !last && "border-b border-border",
        row.current && "bg-accent/5"
      )}
    >
      {row.current ? (
        <span
          className="absolute inset-y-3 left-0 w-[3px] rounded-r-full bg-accent"
          aria-hidden
        />
      ) : null}
      <div className="flex min-w-0 items-center gap-5">
        <DeadlineStatusIcon row={row} />
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground">{row.label}</p>
          <p className="mt-0.5 text-xs leading-snug text-muted-foreground">
            {deadlineSubline(row)}
          </p>
        </div>
      </div>
      {row.officialUrl ? (
        <DeadlineOfficialLink href={row.officialUrl} className={cn("shrink-0", ROW_CTA_CLASS)}>
          Official page
        </DeadlineOfficialLink>
      ) : null}
    </div>
  )
}

export function RequirementsWorkspaceUi({
  data,
  LinkComponent,
}: RequirementsWorkspaceUiProps) {
  const Link =
    LinkComponent ??
    (({ href, className, children }) => (
      <a href={href} className={className}>
        {children}
      </a>
    ))

  const all = data.categories.flatMap((c) => c.items)
  const total = all.length || 1
  const done = all.filter((i) => i.status === "done").length
  const active = all.filter((i) => i.status === "active").length
  const missing = all.filter((i) => i.status === "missing").length
  const pct = Math.round((done / total) * 100)
  const activeTitle = all.find((i) => i.status === "active")?.title ?? "—"

  const h = data.header

  return (
    <div className="mx-auto max-w-6xl space-y-10 tp-stagger-children">
      <header>
        <p className="text-[11px] font-medium uppercase tracking-widest text-accent">
          {h.eyebrow ?? "Requirements"}
        </p>
        <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          {h.title}
          {h.titleItalic ? <> {h.titleItalic}</> : null}
        </h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">{h.subtitle}</p>
      </header>

      <div className="grid gap-4 md:grid-cols-4">
        <SummaryStat
          label="Completed"
          value={String(done)}
          sub={`of ${total} requirements`}
          tone="success"
        />
        <SummaryStat
          label="In progress"
          value={String(active)}
          sub={activeTitle}
          tone="accent"
        />
        <SummaryStat
          label="Missing"
          value={String(missing)}
          sub="Action required"
          tone="muted"
        />
        <div className="flex min-h-[140px] flex-col items-center justify-center rounded-xl border border-border border-t-4 border-t-accent bg-card p-6 text-center">
          <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
            Overall completion
          </p>
          <p className="mt-3 font-heading text-4xl tabular-nums text-foreground">{pct}%</p>
          <div className="mt-4 h-1.5 w-full max-w-[10rem] overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-accent transition-all duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>

      <OfficialPrereqDisclaimer />

      <div className="space-y-10">
        {data.categories.map((cat) => {
          const catDone = cat.items.filter((i) => i.status === "done").length
          return (
            <section key={cat.id}>
              <WorkspaceSectionHeader
                title={cat.name}
                meta={`${catDone} of ${cat.items.length} complete`}
              />
              <div
                className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
                data-req-category={cat.id}
              >
                {cat.items.map((item, i) => (
                  <div key={item.id} data-req-status={item.status}>
                    <RequirementRow item={item} last={i === cat.items.length - 1} Link={Link} />
                  </div>
                ))}
              </div>
            </section>
          )
        })}
      </div>

      <section>
        <WorkspaceSectionHeader
          title="Planning notes"
          meta={`${data.planningNotes.length} ${data.planningNotes.length === 1 ? "note" : "notes"}`}
          intro={data.planningNotesIntro}
        />
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          {data.planningNotes.length === 0 ? (
            <p className="px-6 py-4 text-sm text-muted-foreground">No planning notes for this view.</p>
          ) : (
            data.planningNotes.map((note, i) => (
              <PlanningNoteRow
                key={note.id}
                note={note}
                last={i === data.planningNotes.length - 1}
              />
            ))
          )}
        </div>
      </section>

      <section>
        <WorkspaceSectionHeader
          title="Deadlines"
          meta={`${data.timelineRows.length} ${data.timelineRows.length === 1 ? "date" : "dates"}`}
          intro="Texas-wide and your target school"
        />
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          {data.timelineRows.length === 0 ? (
            <p className="px-6 py-4 text-sm text-muted-foreground">
              No upcoming deadlines in the next 24 months for this view.
            </p>
          ) : (
            <>
              {data.timelineRows.map((row, i) => (
                <DeadlineRow
                  key={row.id}
                  row={row}
                  last={i === data.timelineRows.length - 1}
                />
              ))}
              <p className="border-t border-border px-6 py-4 text-xs leading-relaxed text-muted-foreground">
                Dates are for planning—confirm with your school&apos;s official admissions
                calendar. Day counts use the server&apos;s UTC calendar date; your local day may
                differ near midnight.
              </p>
            </>
          )}
        </div>
      </section>
    </div>
  )
}
