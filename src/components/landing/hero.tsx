"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CTA_BUILD_PATH, REGION_TAGLINE } from "@/lib/brand"

const ledgerRows = [
  { term: "Fall 2025", code: "ENGL 1301", name: "Composition I", credits: "3", state: "done" },
  { term: "", code: "MATH 2413", name: "Calculus I", credits: "4", state: "done" },
  { term: "", code: "CS 1337", name: "Programming Fundamentals", credits: "3", state: "done" },
  { term: "Spring 2026", code: "CS 2305", name: "Discrete Math", credits: "3", state: "now" },
  { term: "", code: "MATH 2414", name: "Calculus II", credits: "4", state: "now" },
  { term: "", code: "GOVT 2305", name: "Federal Government", credits: "3", state: "now" },
  { term: "Fall 2026", code: "—", name: "Apply to UT Austin", credits: "", state: "next" },
] as const

export function Hero() {
  return (
    <section className="border-b border-border px-6">
      <div className="mx-auto grid max-w-6xl gap-12 py-16 md:py-24 lg:grid-cols-[7fr_5fr] lg:gap-16">
        <div className="flex flex-col justify-center">
          <p className="text-sm font-medium text-accent">{REGION_TAGLINE}</p>
          <h1 className="mt-5 max-w-xl font-heading text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
            The degree plan that gets you out of here.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            Map every course from community college to your target university. Credits, deadlines,
            essays — one plan instead of eleven browser tabs.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/onboarding"
              className={cn(buttonVariants({ size: "lg" }), "gap-2 bg-primary text-primary-foreground hover:bg-primary/90")}
            >
              {CTA_BUILD_PATH}
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
            <span className="text-sm text-muted-foreground">Free · Open source · No credit card</span>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="border-y-2 border-foreground">
            <div className="flex items-baseline justify-between py-3">
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Degree plan
              </span>
              <span className="font-mono text-xs text-muted-foreground">Dallas College → UT Austin</span>
            </div>
            <div>
              {ledgerRows.map((row, i) => (
                <div
                  key={i}
                  className={cn(
                    "tp-ledger-row grid grid-cols-[5.5rem_1fr_2rem] items-baseline gap-3 py-2.5 text-sm",
                    row.state === "next" && "bg-accent-soft/60"
                  )}
                >
                  <span className="font-mono text-xs text-muted-foreground">{row.term}</span>
                  <span className="min-w-0">
                    <span
                      className={cn(
                        "font-mono text-xs",
                        row.state === "now" ? "text-accent" : "text-muted-foreground"
                      )}
                    >
                      {row.code}
                    </span>
                    <span
                      className={cn(
                        "ml-3",
                        row.state === "done" ? "text-muted-foreground line-through decoration-muted-foreground/40" : "text-foreground",
                        row.state === "next" && "font-medium"
                      )}
                    >
                      {row.name}
                    </span>
                  </span>
                  <span className="text-right font-mono text-xs text-muted-foreground">{row.credits}</span>
                </div>
              ))}
            </div>
            <div className="flex items-baseline justify-between border-t border-border py-3">
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Transferable credits
              </span>
              <span className="font-mono text-sm font-medium text-foreground">20 / 30</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
