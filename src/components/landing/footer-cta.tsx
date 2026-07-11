"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CTA_BUILD_PATH } from "@/lib/brand"

export function FooterCta() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="max-w-2xl font-heading text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
          Your next semester is a decision, not a guess.
        </h2>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/onboarding"
            className={cn(buttonVariants({ size: "lg" }), "gap-2 bg-primary text-primary-foreground hover:bg-primary/90")}
          >
            {CTA_BUILD_PATH}
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
          <span className="text-sm text-muted-foreground">About two minutes to set up</span>
        </div>
      </div>
    </section>
  )
}
