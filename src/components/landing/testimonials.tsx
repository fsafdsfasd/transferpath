"use client"

import { PRODUCT_NAME } from "@/lib/brand"

export function Testimonials() {
  const testimonials = [
    {
      quote: `${PRODUCT_NAME} made the whole process so much clearer. I knew exactly what I needed to do each semester.`,
      name: "Jamie R.",
      path: "Dallas College → UT Austin",
      initials: "JR",
    },
    {
      quote:
        "The readiness view helped me understand where I stood and what to improve next. I stayed on top of deadlines and got in.",
      name: "Marcus T.",
      path: "Collin College → Texas A&M",
      initials: "MT",
    },
    {
      quote:
        "I was overwhelmed before. Now I have a clear roadmap and I'm on track to transfer next fall.",
      name: "Sofia L.",
      path: "ACC → UT Austin",
      initials: "SL",
    },
  ]

  return (
    <section id="about" className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center tp-enter-fade-only">
          <h2 className="mb-4 text-3xl font-semibold tracking-tight text-foreground">What students say</h2>
          <p className="text-muted-foreground">
            Texas students using TransferPath to plan with less stress
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 tp-stagger-children">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="rounded-xl border border-border bg-card p-6 tp-interactive-panel">
              <p className="mb-6 leading-relaxed text-foreground">&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-sm font-medium text-primary">{testimonial.initials}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.path}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
