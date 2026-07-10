"use client"

import { ArrowRight } from "lucide-react"

const communityColleges = ["Dallas College", "Collin College", "ACC", "HCC"]
const universities = ["UT Austin", "Texas A&M", "University of Houston", "Baylor", "SMU"]

export function SchoolLogos() {
  return (
    <section id="schools" className="border-y border-border bg-card/50 px-6 py-14">
      <div className="mx-auto max-w-6xl">
        <p className="mb-8 text-center text-sm font-medium text-muted-foreground">
          Supports common Texas transfer routes
        </p>
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-center md:gap-10">
          <div className="flex flex-wrap justify-center gap-2">
            {communityColleges.map((school) => (
              <span
                key={school}
                className="rounded-full border border-border bg-background px-3.5 py-1.5 text-sm text-muted-foreground"
              >
                {school}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 text-muted-foreground" aria-hidden>
            <ArrowRight className="hidden h-4 w-4 md:block" strokeWidth={1.5} />
            <span className="text-xs font-medium uppercase tracking-wide md:hidden">to</span>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {universities.map((school) => (
              <span
                key={school}
                className="rounded-full border border-primary/15 bg-primary/5 px-3.5 py-1.5 text-sm font-medium text-foreground"
              >
                {school}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
