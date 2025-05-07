import type React from "react"
import { AppSidebar } from "@/components/app-sidebar"

export default function LeituraLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex gap-4">
        <AppSidebar />
        <div className="flex-1 bg-white rounded-lg p-6">{children}</div>
      </div>
    </div>
  )
}
