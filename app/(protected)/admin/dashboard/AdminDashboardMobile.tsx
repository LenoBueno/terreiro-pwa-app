import MobileNavbar from "./MobileNavbar"
import Image from "next/image"
import { Home, Users, Calendar, BookOpen, MessageSquare, Brush, ShoppingCart, Leaf, Droplets, MessageCircle, User } from "lucide-react";

export default function AdminDashboardMobile() {
  const cards = [
    { href: "/admin/dashboard", icon: Home, label: "Dashboard" },
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
    <div className="w-screen min-h-screen bg-white flex flex-col pt-2 pb-[132px] overflow-y-auto">
      <Image src="/logo.png" alt="Logo Terreiro" width={36} height={28} priority />
      <div className="w-full grid grid-cols-2 gap-3 px-2 place-items-center">
        {cards.map(({ href, icon: Icon, label }) => (
          <a
            key={href}
            href={href}
            className="flex flex-col items-center justify-center bg-[#f7f8fa] shadow rounded-[20px] transition hover:shadow-md h-[108px] w-[108px] min-w-0"
          >
            <Icon size={24} className="mb-1 text-terreiro-green" />
            <span className="text-xs font-medium text-gray-700 text-center mt-1">{label}</span>
          </a>
        ))}
      </div>
    </div>
  )
}
