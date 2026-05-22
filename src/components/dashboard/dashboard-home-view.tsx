"use client"

import { OverviewMain } from "@/components/dashboard/overview/overview-main"
import type { OverviewData } from "@/types/overview"

interface DashboardHomeViewProps {
  overviewData: OverviewData
}

export function DashboardHomeView({ overviewData }: DashboardHomeViewProps) {
  return <OverviewMain data={overviewData} />
}
