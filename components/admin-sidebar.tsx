"use client"

import type React from "react"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  BookOpen,
  Calendar,
  Home,
  MessageSquare,
  ShoppingCart,
  Users,
  FileBarChart,
  Leaf,
  Droplets,
  MessageCircle,
  Brush,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"

interface SidebarItemProps {
  href: string
  icon: React.ReactNode
  children: React.ReactNode
  active?: boolean
}

function SidebarItem({ href, icon, children, active }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 py-2 text-sm transition-all",
        active ? "text-terreiro-green font-medium" : "text-gray-600",
      )}
    >
      {icon}
      <span>{children}</span>
    </Link>
  )
}

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { logout } = useAuth()

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`)
  }

  const handleLogout = async () => {
    await logout?.()
    router.push("/login")
  }

  return (
    <>
      <div className="flex items-center gap-2 mb-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-terreiro-green text-white">
          <Leaf size={16} />
        </div>
        <span className="font-bold">Terreiro</span>
      </div>
      <div className="text-xs text-gray-500 mt-4 mb-2">Menu</div>
      <nav className="flex flex-col space-y-1">
        <SidebarItem href="/admin/dashboard" icon={<Home size={16} />} active={isActive("/admin/dashboard")}>
          Dashboard
        </SidebarItem>
        <SidebarItem href="/admin/frentes" icon={<Users size={16} />} active={isActive("/admin/frentes")}>
          Frentes
        </SidebarItem>
        <SidebarItem href="/admin/eventos" icon={<Calendar size={16} />} active={isActive("/admin/eventos")}>
          Eventos
        </SidebarItem>
        <SidebarItem href="/admin/leitura" icon={<BookOpen size={16} />} active={isActive("/admin/leitura")}>
          Leitura
        </SidebarItem>
        <SidebarItem href="/admin/mensagens" icon={<MessageSquare size={16} />} active={isActive("/admin/mensagens")}>
          Mensagens
        </SidebarItem>
        <SidebarItem href="/admin/limpeza" icon={<Brush size={16} />} active={isActive("/admin/limpeza")}>
          Limpeza
        </SidebarItem>
        <SidebarItem href="/admin/compras" icon={<ShoppingCart size={16} />} active={isActive("/admin/compras")}>
          Compras
        </SidebarItem>
        <SidebarItem href="/admin/ervas" icon={<Leaf size={16} />} active={isActive("/admin/ervas")}>
          Ervas
        </SidebarItem>
        <SidebarItem href="/admin/banhos" icon={<Droplets size={16} />} active={isActive("/admin/banhos")}>
          Banhos
        </SidebarItem>
        <SidebarItem href="/admin/chat" icon={<MessageCircle size={16} />} active={isActive("/admin/chat")}>
          Chat
        </SidebarItem>
        <SidebarItem href="/admin/users" icon={<Users size={16} />} active={isActive("/admin/users")}>
          Usuários
        </SidebarItem>
        <SidebarItem href="/admin/profile" icon={<Users size={16} />} active={isActive("/admin/profile")}>
          Perfil
        </SidebarItem>
        {/* <SidebarItem href="/admin/reports" icon={<FileBarChart size={16} />} active={isActive("/admin/reports")}> */}
        {/*   Relatórios */}
        {/* </SidebarItem> */}
      </nav>

      <div className="mt-auto pt-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-white">U</div>
        <div className="flex flex-col">
          <span className="text-sm">Usuário</span>
          <span className="text-xs text-gray-500">Admin</span>
        </div>
        <button onClick={handleLogout} className="ml-auto" aria-label="Sair">
          <LogOut size={16} className="text-red-500" />
        </button>
      </div>
    </>
  )
}
