import type React from "react"
import { ProtectedRoute } from "@/components/protected-route"

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="flex gap-4">
          {/* Sidebar is now handled in specific layouts */}
          <div className="flex-1 bg-white rounded-lg p-6">{children}</div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
