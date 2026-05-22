"use client"

import { createContext, useContext } from "react"

const CompactDashboardContext = createContext(false)

export function CompactDashboardProvider({
  value,
  children,
}: {
  value: boolean
  children: React.ReactNode
}) {
  return <CompactDashboardContext.Provider value={value}>{children}</CompactDashboardContext.Provider>
}

export function useCompactDashboard() {
  return useContext(CompactDashboardContext)
}
