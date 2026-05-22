"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CTA_GET_STARTED, PRODUCT_NAME } from "@/lib/brand"

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-foreground">
          <span className="h-6 w-6 shrink-0 rounded-full bg-accent" aria-hidden />
          <span className="font-sans">{PRODUCT_NAME}</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="#how-it-works"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            How it works
          </Link>
          <Link
            href="#schools"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Schools
          </Link>
          <Link
            href="#about"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground sm:block"
          >
            Log in
          </Link>
          <Link
            href="/onboarding"
            className={cn(buttonVariants({ variant: "accent" }))}
          >
            {CTA_GET_STARTED} <ArrowRight className="ml-1 h-4 w-4" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </nav>
  )
}
