"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import type { User, AuthState } from "@/types/user"

// Usuários mockados para demonstração
const MOCK_USERS = [
  {
    id: "1",
    email: "root@admin.com",
    password: "148750",
    name: "Administrador",
    role: "admin" as const,
  },
  {
    id: "2",
    email: "user@user.com",
    password: "148750",
    name: "Usuário",
    role: "user" as const,
  },
]

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  })

  useEffect(() => {
    // Verificar se há um usuário no localStorage ao carregar a página
    const storedUser = localStorage.getItem("terreiro_user")

    if (storedUser) {
      try {
        const user = JSON.parse(storedUser) as User
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
        })
      } catch (error) {
        console.error("Erro ao carregar usuário:", error)
        localStorage.removeItem("terreiro_user")
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        })
      }
    } else {
      setAuthState((prev) => ({ ...prev, isLoading: false }))
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simular uma chamada de API com os usuários mockados
      const user = MOCK_USERS.find((u) => u.email === email && u.password === password)

      if (user) {
        const { password: _, ...userWithoutPassword } = user
        setAuthState({
          user: userWithoutPassword,
          isAuthenticated: true,
          isLoading: false,
        })

        // Salvar no localStorage
        localStorage.setItem("terreiro_user", JSON.stringify(userWithoutPassword))

        // Redirecionar com base no papel do usuário
        if (userWithoutPassword.role === "admin") {
          router.push("/admin/dashboard")
        } else {
          router.push("/user/dashboard")
        }

        return true
      }

      return false
    } catch (error) {
      console.error("Erro no login:", error)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem("terreiro_user")
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    })
    router.push("/")
  }

  return <AuthContext.Provider value={{ ...authState, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider")
  }
  return context
}
