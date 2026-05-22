"use client"

import { ArrowRight } from "lucide-react"

export function SchoolLogos() {
  const communityColleges = ["Dallas College", "Collin College", "ACC", "HCC"]
  const universities = ["UT Austin", "Texas A&M", "University of Houston", "Baylor", "SMU"]

  return (
    <section id="schools" className="py-12 px-6 bg-secondary/50">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm text-center text-muted-foreground mb-6">
          Supports transfers from/to:
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
          {/* Community Colleges */}
          <div className="flex flex-wrap justify-center gap-4">
            {communityColleges.map((school) => (
              <span key={school} className="text-sm text-muted-foreground font-medium">
                {school}
              </span>
            ))}
          </div>

          <ArrowRight className="h-5 w-5 text-muted-foreground hidden md:block" />
          <span className="text-muted-foreground md:hidden">to</span>

          {/* Universities */}
          <div className="flex flex-wrap justify-center gap-4">
            {universities.map((school) => (
              <span key={school} className="text-sm text-foreground font-medium">
                {school}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
