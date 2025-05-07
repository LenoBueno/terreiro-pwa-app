import type React from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { AdminSidebar } from "@/components/admin-sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="flex gap-4">
          <AdminSidebar />
          <div className="flex-1 bg-white rounded-lg p-6">{children}</div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
