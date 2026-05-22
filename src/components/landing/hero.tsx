"use client"

import Link from "next/link"
import { ArrowRight, Star, CheckCircle2 } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  CTA_BUILD_PATH,
  CTA_SEE_HOW,
  PRODUCT_NAME,
  REGION_TAGLINE,
  TAGLINE,
  TRUST_LINE,
} from "@/lib/brand"

export function Hero() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-6 tp-stagger-children">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent-soft px-3 py-1.5 text-sm font-medium text-accent">
              <span className="text-accent" aria-hidden>
                &#10022;
              </span>
              {REGION_TAGLINE}
            </div>

            <h1 className="font-heading text-balance text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl">
              {TAGLINE}
            </h1>

            <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
              One calm place for milestones, deadlines, and your semester plan—so you always know the
              next step. {PRODUCT_NAME} maps your path from where you are to where you&apos;re headed.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
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
                  buttonVariants({ variant: "ghost", size: "lg" }),
                  "text-muted-foreground hover:text-foreground"
                )}
              >
                {CTA_SEE_HOW}
              </Link>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-accent text-accent"
                    strokeWidth={1.25}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{TRUST_LINE}</span>
            </div>
          </div>

          <div className="tp-enter-slide-right lg:pl-8">
            <div className="rounded-xl border border-border bg-card p-6 shadow-glow-card tp-interactive-panel">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-medium text-foreground">Your transfer timeline</h3>
                <span className="text-xs text-muted-foreground">Dallas College → UT Austin</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-chart-3/15">
                    <CheckCircle2 className="h-5 w-5 text-chart-3" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-chart-3/15 px-2 py-0.5 text-xs font-medium text-chart-3">
                        Fall 2025
                      </span>
                      <span className="text-xs text-muted-foreground">Completed</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="rounded bg-secondary px-2 py-1 text-xs">ENGL 1301</span>
                      <span className="rounded bg-secondary px-2 py-1 text-xs">MATH 2413</span>
                      <span className="rounded bg-secondary px-2 py-1 text-xs">CS 1337</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-accent/15 shadow-[0_0_0_3px_oklch(0.68_0.14_48_/0.2)]">
                    <div className="h-3 w-3 rounded-full bg-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-accent-soft px-2 py-0.5 text-xs font-medium text-accent">
                        Spring 2026
                      </span>
                      <span className="text-xs text-muted-foreground">In progress</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="rounded bg-secondary px-2 py-1 text-xs">CS 2305</span>
                      <span className="rounded bg-secondary px-2 py-1 text-xs">MATH 2414</span>
                      <span className="rounded bg-secondary px-2 py-1 text-xs">GOVT 2305</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-muted">
                    <div className="h-2 w-2 rounded-full border border-dashed border-muted-foreground bg-transparent" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                        Fall 2026
                      </span>
                      <span className="text-xs font-medium text-muted-foreground">Apply to UT Austin</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-border pt-4">
                <p className="mb-2 text-xs text-muted-foreground">Key milestones</p>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-accent/15 bg-accent-soft px-2 py-1 text-xs font-medium text-accent">
                    Essay draft
                  </span>
                  <span className="rounded-full border border-accent/15 bg-accent-soft px-2 py-1 text-xs font-medium text-accent">
                    Rec letter
                  </span>
                  <span className="rounded-full border border-accent/15 bg-accent-soft px-2 py-1 text-xs font-medium text-accent">
                    Transcript
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
