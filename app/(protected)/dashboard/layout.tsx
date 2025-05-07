import type React from "react"
import { AppSidebar } from "@/components/app-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      <div className="flex-shrink-0">
        <AppSidebar />
      </div>
      <div className="flex-1 overflow-auto p-6">{children}</div>
    </div>
  )
}
