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
      <div className="admin-font-small min-h-screen bg-[#f7f8fa] p-4 flex items-center justify-center rounded-3xl">
        <div className="flex w-full max-w-[1600px] gap-8">
          <aside className="w-64 min-h-[90vh] bg-white rounded-2xl shadow-md flex flex-col">
            <AdminSidebar />
          </aside>
          <main className="flex-1 bg-white rounded-2xl p-8 shadow-sm min-h-[90vh]">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
