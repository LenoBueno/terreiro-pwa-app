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

function SidebarItem({ href, icon, children, active, onClick }: SidebarItemProps & { onClick?: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 py-2 text-sm transition-all",
        active ? "text-terreiro-green font-medium" : "text-gray-600",
        "hover:text-terreiro-green hover:bg-terreiro-green/10 rounded px-2"
      )}
    >
      {icon}
      <span>{children}</span>
    </Link>
  )
}

export default function MobileSidebar({ open, onClose }: { open: boolean, onClose: () => void }) {
  const pathname = usePathname()
  const router = useRouter()
  const { logout } = useAuth()

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`)
  }

  const handleLogout = async () => {
    await logout?.()
    router.push("/login")
    onClose()
  }

  return (
    <div className={`fixed inset-0 z-50 ${open ? '' : 'hidden'}`} style={{ background: 'transparent' }}>
      {/* Sidebar fixo, sem overlay, sem transição */}
      <aside className="fixed left-0 right-0 top-10 z-50 mx-auto w-[240px] max-w-[95vw] bg-white rounded-lg p-9 flex flex-col h-auto overflow-y-auto scrollbar-none shadow-lg">
        {/* Botão de fechar */}
        <button
          className="absolute top-3 right-5 text-gray-400 hover:text-terreiro-green text-2xl font-bold focus:outline-none"
          onClick={onClose}
          aria-label="Fechar menu"
        >
          ×
        </button>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-terreiro-green text-white">
            <Leaf size={16} />
          </div>
          <span className="font-bold">Terreiro</span>
        </div>
        <div className="text-xs text-gray-500 mt-4 mb-2">Menu</div>
        <nav className="flex flex-col space-y-1 flex-1">
          <SidebarItem href="/admin/dashboard" icon={<Home size={16} />} active={isActive("/admin/dashboard")} onClick={onClose}>
            Dashboard
          </SidebarItem>
          <SidebarItem href="/admin/frentes" icon={<Users size={16} />} active={isActive("/admin/frentes")} onClick={onClose}>
            Frentes
          </SidebarItem>
          <SidebarItem href="/admin/eventos" icon={<Calendar size={16} />} active={isActive("/admin/eventos")} onClick={onClose}>
            Eventos
          </SidebarItem>
          <SidebarItem href="/admin/leitura" icon={<BookOpen size={16} />} active={isActive("/admin/leitura")} onClick={onClose}>
            Leitura
          </SidebarItem>
          <SidebarItem href="/admin/mensagens" icon={<MessageSquare size={16} />} active={isActive("/admin/mensagens")} onClick={onClose}>
            Mensagens
          </SidebarItem>
          <SidebarItem href="/admin/limpeza" icon={<Brush size={16} />} active={isActive("/admin/limpeza")} onClick={onClose}>
            Limpeza
          </SidebarItem>
          <SidebarItem href="/admin/compras" icon={<ShoppingCart size={16} />} active={isActive("/admin/compras")} onClick={onClose}>
            Compras
          </SidebarItem>
          <SidebarItem href="/admin/ervas" icon={<Leaf size={16} />} active={isActive("/admin/ervas")} onClick={onClose}>
            Ervas
          </SidebarItem>
          <SidebarItem href="/admin/banhos" icon={<Droplets size={16} />} active={isActive("/admin/banhos")} onClick={onClose}>
            Banhos
          </SidebarItem>
          <SidebarItem href="/admin/chat" icon={<MessageCircle size={16} />} active={isActive("/admin/chat")} onClick={onClose}>
            Chat
          </SidebarItem>
          <SidebarItem href="/admin/users" icon={<Users size={16} />} active={isActive("/admin/users")} onClick={onClose}>
            Usuários
          </SidebarItem>
        </nav>
        <div className="mt-auto pt-4 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-white">N</div>
          <div className="flex flex-col">
            <span className="text-sm">Usuário</span>
            <span className="text-xs text-gray-500">Administrador</span>
          </div>
          <button onClick={handleLogout} className="ml-auto" aria-label="Sair">
            <LogOut size={16} className="text-red-500" />
          </button>
        </div>
      </aside>
    </div>
  )
}
