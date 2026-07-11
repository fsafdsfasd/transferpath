"use client"

const routes = [
  ["Dallas College", "UT Austin"],
  ["Collin College", "Texas A&M"],
  ["ACC", "University of Houston"],
  ["HCC", "Baylor"],
  ["Tarrant County College", "SMU"],
] as const

export function SchoolLogos() {
  return (
    <section id="schools" className="border-b border-border px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-baseline gap-x-10 gap-y-3">
        <span className="text-sm text-muted-foreground">Common routes</span>
        {routes.map(([from, to]) => (
          <span key={from} className="whitespace-nowrap text-sm">
            <span className="text-muted-foreground">{from}</span>
            <span className="mx-1.5 text-accent" aria-hidden>→</span>
            <span className="font-medium text-foreground">{to}</span>
          </span>
        ))}
      </div>
    </section>
  )
}
