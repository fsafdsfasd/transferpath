"use client"

import { PRODUCT_NAME } from "@/lib/brand"

const points = [
  {
    title: "One plan, not eleven tabs",
    description:
      "Transfer planning usually means a spreadsheet, three school websites, ApplyTexas, and a group chat. Here it's one page that stays current.",
  },
  {
    title: "Deadlines from a shared database",
    description:
      "Application windows and priority dates for Texas universities, organized against your target term. We always link the official source.",
  },
  {
    title: "A planner, not a promise",
    description:
      "No admission predictions, no fake urgency. The score and checklist exist to tell you what to do next — nothing more.",
  },
] as const

export function Testimonials() {
  return (
    <section id="about" className="border-b border-border px-6 py-20">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[4fr_8fr]">
        <div>
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground">
            Why {PRODUCT_NAME}
          </h2>
          <p className="mt-3 max-w-xs text-muted-foreground">
            Built by people who went through the Texas transfer process and kept the receipts.
          </p>
        </div>
        <div className="space-y-0">
          {points.map((point) => (
            <div key={point.title} className="tp-ledger-row py-6">
              <h3 className="text-lg font-medium text-foreground">{point.title}</h3>
              <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-muted-foreground">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
