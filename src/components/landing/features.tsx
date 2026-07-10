"use client"

import { ArrowRight } from "lucide-react"
import { CheckCircle2 } from "lucide-react"
import { PLANNER_CREDIT_TARGET } from "@/lib/planner-constants"

const roadmapRows = [
  { semester: "Fall 2025", status: "done" as const, courses: ["ENGL 1301", "MATH 2413", "CS 1337"] },
  { semester: "Spring 2026", status: "current" as const, courses: ["CS 2305", "MATH 2414", "PHYS 2425"] },
  { semester: "Fall 2026", status: "future" as const, courses: ["Transfer application window"] },
]

const requirementRows = [
  { text: `${PLANNER_CREDIT_TARGET} credit hours`, done: true },
  { text: "Minimum 3.0 GPA", done: true },
  { text: "MATH 2413 (Calculus I)", done: false },
  { text: "Transfer essay", done: false },
  { text: "2 recommendation letters", done: false },
]

const statusStyles = {
  done: "bg-chart-3/12 text-chart-3",
  current: "bg-accent-soft text-accent",
  future: "bg-muted text-muted-foreground",
} as const

export function Features() {
  return (
    <section className="border-t border-border px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground">
            Everything you need to stay on track
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
            A semester roadmap, requirements checklist, and readiness view—connected so updates in
            one place reflect everywhere else.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Semester roadmap
                </p>
                <h3 className="mt-1 text-lg font-medium text-foreground">Plan term by term</h3>
              </div>
              <span className="rounded-full bg-secondary px-2.5 py-1 text-xs text-muted-foreground">
                Example
              </span>
            </div>
            <div className="space-y-3">
              {roadmapRows.map((item) => (
                <div
                  key={item.semester}
                  className="flex items-start gap-3 rounded-xl border border-border/80 bg-secondary/35 p-3"
                >
                  <span
                    className={`mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${statusStyles[item.status]}`}
                  >
                    {item.semester}
                  </span>
                  <div className="flex min-w-0 flex-wrap gap-x-2 gap-y-1">
                    {item.courses.map((course) => (
                      <span key={course} className="text-sm text-muted-foreground">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-5">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Requirements
              </p>
              <h3 className="mt-1 text-lg font-medium text-foreground">See gaps early</h3>
            </div>
            <div className="space-y-3">
              {requirementRows.map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <div
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                      item.done ? "bg-chart-3/15" : "border border-border"
                    }`}
                  >
                    {item.done ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-chart-3" strokeWidth={1.5} />
                    ) : null}
                  </div>
                  <span
                    className={`text-sm ${item.done ? "text-muted-foreground line-through" : "text-foreground"}`}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-5 border-t border-border pt-4">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">2 of 5 complete</span>
                <span className="font-medium text-chart-3">40%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                <div className="h-full w-[40%] rounded-full bg-chart-3" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm lg:col-span-2">
            <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Path readiness
                </p>
                <h3 className="mt-1 text-lg font-medium text-foreground">
                  Momentum, not admission hype
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  A planner score from your profile and coursework helps you prioritize. It is not a
                  prediction of admission—just a clearer picture of what to tackle next.
                </p>
              </div>
              <div className="flex items-center gap-4 rounded-xl border border-border bg-secondary/35 p-4 md:min-w-[220px]">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-[3px] border-chart-3">
                  <span className="text-xl font-semibold text-foreground">68</span>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-foreground">Readiness score</p>
                  <p className="text-muted-foreground">Based on your plan</p>
                </div>
              </div>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-chart-3/20 bg-chart-3/8 p-3 text-sm">
                <p className="font-medium text-foreground">Credits on track</p>
                <p className="mt-0.5 text-muted-foreground">Keep aligning hours with your target guide.</p>
              </div>
              <div className="rounded-xl border border-accent/20 bg-accent-soft/50 p-3 text-sm">
                <p className="font-medium text-foreground">Essay still open</p>
                <p className="mt-0.5 text-muted-foreground">Draft in the workspace when you are ready.</p>
              </div>
            </div>
            <p className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
              See it on your dashboard after sign-up
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden />
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
