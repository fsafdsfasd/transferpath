"use client"

const steps = [
  {
    n: "1",
    title: "Tell us your situation",
    description:
      "Current school, target university, major, GPA. Takes about two minutes — no essay required to start planning one.",
  },
  {
    n: "2",
    title: "Get your semester map",
    description:
      "Courses laid out term by term against your target's requirements, so the next registration decision is obvious.",
  },
  {
    n: "3",
    title: "Work the checklist",
    description:
      "Deadlines, transcripts, rec letters, essays. Check things off; your readiness picture updates as you go.",
  },
] as const

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b border-border px-6 py-20">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[4fr_8fr]">
        <div>
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground">
            How it works
          </h2>
          <p className="mt-3 max-w-xs text-muted-foreground">
            Sign-up to a living plan in three steps. Adjust it any semester.
          </p>
        </div>
        <ol className="space-y-0">
          {steps.map((step) => (
            <li key={step.n} className="tp-ledger-row grid gap-4 py-6 sm:grid-cols-[3rem_1fr]">
              <span className="font-mono text-sm text-accent">{step.n}</span>
              <div>
                <h3 className="text-lg font-medium text-foreground">{step.title}</h3>
                <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
