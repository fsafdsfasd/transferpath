"use client"

import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  CTA_BUILD_PATH,
  CTA_SEE_HOW,
  PRODUCT_NAME,
  REGION_TAGLINE,
  TAGLINE,
  TRUST_BADGES,
} from "@/lib/brand"

export function Hero() {
  return (
    <section className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1.5 text-sm text-muted-foreground shadow-sm backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              {REGION_TAGLINE}
            </div>

            <div className="space-y-4">
              <h1 className="font-heading text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-[3.25rem]">
                {PRODUCT_NAME}
              </h1>
              <p className="max-w-lg text-xl leading-relaxed text-muted-foreground md:text-2xl">
                {TAGLINE}
              </p>
            </div>

            <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
              Plan courses semester by semester, track requirements and deadlines, and always know
              what to work on next—without juggling spreadsheets and school websites.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/onboarding"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
              >
                {CTA_BUILD_PATH} <ArrowRight className="ml-1 h-4 w-4" strokeWidth={1.5} />
              </Link>
              <Link
                href="#how-it-works"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-border-strong bg-card/60"
                )}
              >
                {CTA_SEE_HOW}
              </Link>
            </div>

            <ul className="flex flex-wrap gap-2 pt-1" aria-label="Product highlights">
              {TRUST_BADGES.map((badge) => (
                <li
                  key={badge}
                  className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-foreground"
                >
                  {badge}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:pl-4">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-glow-card">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Example timeline
                  </p>
                  <h2 className="mt-1 font-medium text-foreground">Your transfer path</h2>
                </div>
                <span className="shrink-0 rounded-full bg-secondary px-2.5 py-1 text-xs text-muted-foreground">
                  Dallas College → UT Austin
                </span>
              </div>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-chart-3/15">
                    <CheckCircle2 className="h-4 w-4 text-chart-3" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0 flex-1 border-b border-border pb-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium text-foreground">Fall 2025</span>
                      <span className="text-xs text-muted-foreground">Completed</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {["ENGL 1301", "MATH 2413", "CS 1337"].map((course) => (
                        <span
                          key={course}
                          className="rounded-md bg-secondary px-2 py-0.5 font-mono text-xs text-muted-foreground"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-accent bg-accent/10">
                    <div className="h-2.5 w-2.5 rounded-full bg-accent" />
                  </div>
                  <div className="min-w-0 flex-1 border-b border-border pb-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium text-foreground">Spring 2026</span>
                      <span className="rounded-full bg-accent-soft px-2 py-0.5 text-xs font-medium text-accent">
                        In progress
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {["CS 2305", "MATH 2414", "GOVT 2305"].map((course) => (
                        <span
                          key={course}
                          className="rounded-md bg-secondary px-2 py-0.5 font-mono text-xs text-muted-foreground"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-dashed border-muted-foreground/40">
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/30" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium text-foreground">Fall 2026</span>
                      <span className="text-xs text-muted-foreground">Apply to UT Austin</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-secondary/60 p-4">
                <p className="text-xs font-medium text-muted-foreground">Up next on your checklist</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {["Essay draft", "Rec letter", "Transcript"].map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-border bg-card px-2.5 py-1 text-xs text-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
