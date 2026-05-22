/** Dashboard route labels for chrome / breadcrumbs (no demo copy). */

const ROUTE_LABELS: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/timeline": "Timeline",
  "/dashboard/requirements": "Requirements",
  "/dashboard/competitiveness": "Requirements",
  "/dashboard/checklist": "Checklist",
  "/dashboard/essay": "Essay workspace",
  "/dashboard/settings": "Settings",
}

export function getDashboardNavLabel(pathname: string): string {
  if (ROUTE_LABELS[pathname]) return ROUTE_LABELS[pathname]
  const match = Object.entries(ROUTE_LABELS)
    .filter(([path]) => path !== "/dashboard" && pathname.startsWith(path))
    .sort((a, b) => b[0].length - a[0].length)[0]
  return match?.[1] ?? "Workspace"
}
