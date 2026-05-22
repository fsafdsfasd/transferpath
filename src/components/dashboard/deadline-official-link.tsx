import type { ReactNode } from "react"

interface DeadlineOfficialLinkProps {
  href: string
  className?: string
  /** Default: "Official dates" for deadline widgets; use "Learn more" for notes. */
  children?: ReactNode
}

/** External link to an official or primary source (deadlines, requirement notes, etc.). */
export function DeadlineOfficialLink({ href, className, children }: DeadlineOfficialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={
        className ??
        "mt-1 inline-block text-xs font-medium text-primary underline-offset-2 hover:underline"
      }
    >
      {children ?? "Official dates"}
    </a>
  )
}
