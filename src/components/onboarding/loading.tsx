"use client"

interface Props {
  targetUniversity: string
  major: string
}

export function OnboardingLoading({ targetUniversity, major }: Props) {
  const rawSchool = targetUniversity.trim()
  const schoolLabel =
    rawSchool === "ut-austin"
      ? "UT Austin"
      : rawSchool === "texas-am"
        ? "Texas A&M"
        : rawSchool === "uh"
          ? "University of Houston"
          : rawSchool === "baylor"
            ? "Baylor"
            : rawSchool === "smu"
              ? "SMU"
              : rawSchool

  const maj = major.trim()

  const statusBody =
    !schoolLabel && !maj
      ? "Finalizing your transfer plan..."
      : schoolLabel && maj
        ? `Analyzing requirements for ${maj} at ${schoolLabel}...`
        : schoolLabel
          ? `Analyzing requirements for ${schoolLabel}...`
          : `Analyzing requirements for ${maj}...`

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="space-y-6 text-center">
        {/* Spinning Icon */}
        <div className="relative mx-auto h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-primary" />
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary">
              <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-medium text-foreground mb-2">Generating your plan...</h2>
          <p className="text-muted-foreground">{statusBody}</p>
        </div>
      </div>
    </div>
  )
}
