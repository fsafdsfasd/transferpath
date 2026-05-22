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
        <div className="mb-12 text-center tp-enter-fade-only">
          <h2 className="mb-4 text-3xl font-semibold tracking-tight text-foreground">How it works</h2>
          <p className="mx-auto max-w-lg text-muted-foreground">
            Three steps from sign-up to a living plan you can adjust anytime
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 tp-stagger-children">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="rounded-xl border border-border bg-card p-6 tp-interactive-panel">
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <step.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <span className="text-sm text-muted-foreground">Step {index + 1}</span>
                </div>
                <h3 className="mb-2 text-lg font-medium text-foreground">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
