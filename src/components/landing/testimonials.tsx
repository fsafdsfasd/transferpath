"use client"

import { BookOpen, CalendarClock, ListChecks } from "lucide-react"
import { PRODUCT_NAME } from "@/lib/brand"

const pillars = [
  {
    icon: BookOpen,
    title: "One plan, not ten tabs",
    description:
      "Courses, requirements, essays, and deadlines live together so you spend less time hunting and more time finishing.",
  },
  {
    icon: CalendarClock,
    title: "Deadlines you can act on",
    description:
      "Target-school dates are organized in one view. We still point you to official sources—this is a planner, not admissions advice.",
  },
  {
    icon: ListChecks,
    title: "Clear next steps",
    description:
      "Your checklist and timeline stay in sync as you add courses and update your profile, so momentum is easy to see.",
  },
] as const

export function Testimonials() {
  return (
    <section id="about" className="border-t border-border bg-secondary/25 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground">
            Built for the transfer grind
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
            {PRODUCT_NAME} is for students who want structure without the noise—honest tooling for a
            process that is already stressful enough.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/8 text-primary">
                <pillar.icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
              </div>
              <h3 className="text-lg font-medium text-foreground">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {pillar.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
