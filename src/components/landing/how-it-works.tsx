"use client"

import { User, Map, CheckCircle } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: User,
      title: "Tell us your situation",
      description:
        "School, major, GPA, and target—about two minutes. Built first for Texas, structured to scale.",
    },
    {
      icon: Map,
      title: "Get your path",
      description:
        "See a semester-by-semester layout and the requirements we track so your next step stays obvious.",
    },
    {
      icon: CheckCircle,
      title: "Track momentum",
      description:
        "Check off milestones, watch deadlines, and revisit readiness as your profile evolves.",
    },
  ]

  return (
    <section id="how-it-works" className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground">
            How it works
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Three steps from sign-up to a living plan you can adjust anytime.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <article key={step.title} className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/8 text-primary">
                  <step.icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Step {index + 1}</span>
              </div>
              <h3 className="text-lg font-medium text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
