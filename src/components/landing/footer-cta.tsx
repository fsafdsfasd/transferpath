"use client"

import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CTA_BUILD_PATH, PRODUCT_NAME, REGION_TAGLINE } from "@/lib/brand"

export function FooterCta() {
  return (
    <section className="bg-primary px-6 py-20 text-primary-foreground">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-heading text-3xl font-semibold tracking-tight">
          Map your next semester on {PRODUCT_NAME}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/85">
          {REGION_TAGLINE} Start with your schools and major—we surface deadlines, milestones, and a
          clear path forward.
        </p>
        <Link
          href="/onboarding"
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "mt-8 border-primary-foreground/25 bg-card text-primary hover:bg-card/90"
          )}
        >
          {CTA_BUILD_PATH} — about 2 minutes
        </Link>
      </div>
    </section>
  )
}
