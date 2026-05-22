"use client"

import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CTA_BUILD_PATH, PRODUCT_NAME, REGION_TAGLINE } from "@/lib/brand"

export function FooterCta() {
  return (
    <section className="px-6 py-20 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-3xl text-center tp-enter-fade-only">
        <h2 className="mb-4 text-3xl font-semibold tracking-tight">Map your next semester on {PRODUCT_NAME}</h2>
        <p className="mb-8 text-primary-foreground/85">
          {REGION_TAGLINE} — start with your schools and major; we&apos;ll surface deadlines, milestones, and a
          clear path forward.
        </p>
        <Link
          href="/onboarding"
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "border-primary-foreground/25 bg-popover text-primary hover:bg-popover/90 hover:text-primary"
          )}
        >
          {CTA_BUILD_PATH} — about 2 minutes
        </Link>
      </div>
    </section>
  )
}
