"use client"

import { CheckCircle2 } from "lucide-react"
import { PLANNER_CREDIT_TARGET } from "@/lib/planner-constants"

export function Features() {
  return (
    <section className="bg-secondary/30 px-6 py-20">
      <div className="mx-auto max-w-6xl space-y-20 tp-stagger-children">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold tracking-tight text-foreground">
              Your personalized semester roadmap
            </h3>
            <p className="leading-relaxed text-muted-foreground">
              See which courses belong in each term. We organize your journey from your current
              institution to your target—always with the reminder to confirm details on official
              catalogs.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 tp-interactive-panel">
            <div className="space-y-3">
              {[
                { semester: "Fall 2025", status: "done", courses: ["ENGL 1301", "MATH 2413", "CS 1337"] },
                { semester: "Spring 2026", status: "current", courses: ["CS 2305", "MATH 2414", "PHYS 2425"] },
                { semester: "Fall 2026", status: "future", courses: ["Transfer to UT Austin"] },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 rounded-lg bg-secondary/50 p-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      item.status === "done"
                        ? "bg-chart-2/15 text-chart-2"
                        : item.status === "current"
                          ? "bg-chart-3/15 text-chart-3"
                          : "bg-primary/10 text-primary"
                    }`}
                  >
                    {item.semester}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {item.courses.map((course, j) => (
                      <span key={j} className="text-xs text-muted-foreground">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="order-2 rounded-xl border border-border bg-card p-6 tp-interactive-panel lg:order-1">
            <div className="space-y-3">
              {[
                { text: `${PLANNER_CREDIT_TARGET} credit hours`, done: true },
                { text: "Minimum 3.0 GPA", done: true },
                { text: "MATH 2413 (Calculus I)", done: false },
                { text: "Transfer essay", done: false },
                { text: "2 recommendation letters", done: false },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-full ${
                      item.done ? "bg-chart-2/15" : "border border-border"
                    }`}
                  >
                    {item.done && <CheckCircle2 className="h-4 w-4 text-chart-2" strokeWidth={1.5} />}
                  </div>
                  <span
                    className={`text-sm ${item.done ? "text-muted-foreground line-through" : "text-foreground"}`}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 border-t border-border pt-4">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">2 of 5 complete</span>
                <span className="font-medium text-chart-2">40%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-secondary">
                <div className="h-full w-[40%] rounded-full bg-chart-2" />
              </div>
            </div>
          </div>
          <div className="order-1 space-y-4 lg:order-2">
            <h3 className="text-2xl font-semibold tracking-tight text-foreground">
              Requirements in one place
            </h3>
            <p className="leading-relaxed text-muted-foreground">
              Track credits, GPA, essays, and materials alongside your timeline. Everything is a
              planning aid—you still confirm the real rules on your target&apos;s site.
            </p>
          </div>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold tracking-tight text-foreground">Path readiness, not hype</h3>
            <p className="leading-relaxed text-muted-foreground">
              A planner score from your profile and coursework helps you see momentum. It&apos;s not a
              prediction of admission—just a clearer picture of your next priorities.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 tp-interactive-panel">
            <div className="mb-6 text-center">
              <div className="mb-2 inline-flex h-24 w-24 items-center justify-center rounded-full border-4 border-chart-2">
                <span className="text-2xl font-medium text-foreground">3.4</span>
              </div>
              <p className="text-sm text-muted-foreground">GPA on your profile</p>
            </div>
            <div className="space-y-3">
              <div className="rounded-lg border-l-2 border-chart-2 bg-chart-2/10 p-3">
                <p className="text-sm text-foreground">GPA looks strong for planning</p>
                <p className="text-xs text-muted-foreground">Always verify expectations on official pages.</p>
              </div>
              <div className="rounded-lg border-l-2 border-chart-3 bg-chart-3/10 p-3">
                <p className="text-sm text-foreground">Credits still building</p>
                <p className="text-xs text-muted-foreground">Align hours with your target&apos;s transfer guide.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
