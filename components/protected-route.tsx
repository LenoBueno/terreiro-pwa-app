"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: "admin" | "user"
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { isAuthenticated, user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Se não estiver carregando e não estiver autenticado, redirecionar para login
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
      return
    }

    // Se estiver autenticado, mas não tiver o papel necessário
    if (!isLoading && isAuthenticated && requiredRole && user?.role !== requiredRole) {
      // Redirecionar para a página apropriada com base no papel do usuário
      if (user?.role === "admin") {
        router.push("/admin/dashboard")
      } else {
        router.push("/dashboard")
      }
    }
  }, [isAuthenticated, isLoading, requiredRole, router, user?.role])

  // Mostrar um indicador de carregamento enquanto verifica a autenticação
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>
  }

  // Se não estiver autenticado, não renderizar nada (será redirecionado)
  if (!isAuthenticated) {
    return null
  }

  // Se requerer um papel específico e o usuário não tiver esse papel, não renderizar nada
  if (requiredRole && user?.role !== requiredRole) {
    return null
  }

  // Se estiver autenticado e tiver o papel necessário, renderizar os filhos
  return <>{children}</>
}
