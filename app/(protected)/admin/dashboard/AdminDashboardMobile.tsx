import MobileNavbar from "./MobileNavbar"
import Image from "next/image"
import { Users, Calendar, BookOpen, MessageSquare, Brush, ShoppingCart, Leaf, Droplets, MessageCircle, User } from "lucide-react";

export default function AdminDashboardMobile() {
  const cards = [
    { href: "/admin/frentes", icon: Users, label: "Frentes" },
    { href: "/admin/eventos", icon: Calendar, label: "Eventos" },
    { href: "/admin/leitura", icon: BookOpen, label: "Leitura" },
    { href: "/admin/mensagens", icon: MessageSquare, label: "Mensagens" },
    { href: "/admin/limpeza", icon: Brush, label: "Limpeza" },
    { href: "/admin/compras", icon: ShoppingCart, label: "Compras" },
    { href: "/admin/ervas", icon: Leaf, label: "Ervas" },
    { href: "/admin/banhos", icon: Droplets, label: "Banhos" },
    { href: "/admin/chat", icon: MessageCircle, label: "Chat" },
    { href: "/admin/users", icon: Users, label: "Usuários" },
    { href: "/admin/profile", icon: User, label: "Perfil" },
  ];

  return (
    <div className="w-screen min-h-screen bg-white flex flex-col p-4 pb-[132px] overflow-y-auto">
      <div className="mb-4 mt-2">
        <h2 className="text-xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-sm text-muted-foreground">Bem-vindo ao painel administrativo do terreiro.</p>
      </div>
      
      <div className="w-full grid grid-cols-2 gap-4 px-1 place-items-center">
        {cards.map(({ href, icon: Icon, label }) => (
          <a
            key={href}
            href={href}
            className="flex flex-col items-center justify-center bg-[#f7f8fa] shadow rounded-[16px] transition hover:shadow-md h-[110px] w-[140px] min-w-0"
          >
            <Icon size={22} className="mb-2 text-terreiro-green" />
            <span className="text-sm font-medium text-gray-700 text-center">{label}</span>
          </a>
        ))}
      </div>
    </div>
  )
}
