"use client"

import { PLANNER_CREDIT_TARGET } from "@/lib/planner-constants"

export function Features() {
  return (
    <section className="border-b border-border px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground">
            Everything in one plan
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            The roadmap, requirements, and checklist read from the same data — update one and the
            rest follow.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-3">
          <div className="bg-card p-8">
            <h3 className="text-base font-medium text-foreground">Semester roadmap</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Plan courses term by term against your target&apos;s degree requirements. Move a course,
              and your credit math updates.
            </p>
            <div className="mt-6 space-y-0 border-t border-border pt-1">
              {[
                ["Fall 2025", "3 courses · 10 cr", true],
                ["Spring 2026", "3 courses · 10 cr", false],
                ["Fall 2026", "Apply", false],
              ].map(([term, detail, done]) => (
                <div key={term as string} className="tp-ledger-row flex items-baseline justify-between py-2.5 text-sm">
                  <span className={done ? "text-muted-foreground line-through decoration-muted-foreground/40" : "text-foreground"}>
                    {term}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">{detail}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card p-8">
            <h3 className="text-base font-medium text-foreground">Requirements tracking</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {PLANNER_CREDIT_TARGET} credit hours, GPA floors, prerequisites, materials — see what&apos;s
              met and what&apos;s still open before it costs you a semester.
            </p>
            <div className="mt-6 space-y-0 border-t border-border pt-1">
              {[
                ["Credit hours", "20 / 30", false],
                ["GPA minimum", "met", true],
                ["Calculus I", "met", true],
                ["Transfer essay", "open", false],
              ].map(([req, status, met]) => (
                <div key={req as string} className="tp-ledger-row flex items-baseline justify-between py-2.5 text-sm">
                  <span className="text-foreground">{req}</span>
                  <span className={`font-mono text-xs ${met ? "text-success" : "text-accent"}`}>{status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card p-8">
            <h3 className="text-base font-medium text-foreground">Honest readiness</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              A planning score built from your actual coursework. It tells you what to work on next —
              it does not pretend to predict admission.
            </p>
            <div className="mt-6 border-t border-border pt-4">
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-4xl font-medium tabular-nums text-foreground">68</span>
                <span className="text-xs text-muted-foreground">of 100</span>
              </div>
              <div className="mt-3 h-1 overflow-hidden rounded-full bg-secondary">
                <div className="h-full w-[68%] rounded-full bg-accent" />
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                Next: draft your essay, verify credit alignment with the official transfer guide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
