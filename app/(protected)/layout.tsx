import type React from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { AppSidebar } from "@/components/app-sidebar"
import { AdminSidebar } from "@/components/admin-sidebar"
import { useAuth } from "@/contexts/auth-context"

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Não podemos usar hooks diretamente aqui, então vamos criar um componente cliente
  return (
    <ProtectedRoute>
      <ProtectedLayoutContent>{children}</ProtectedLayoutContent>
    </ProtectedRoute>
  )
}
// Componente cliente para usar hooks
;("use client")
function ProtectedLayoutContent({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const isAdmin = user?.role === "admin"

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex gap-4">
        {isAdmin ? <AdminSidebar /> : <AppSidebar />}
        <div className="flex-1 bg-white rounded-lg p-6">{children}</div>
      </div>
    </div>
  )
}
