import type { ReactNode } from "react";
import { ProtectedRoute } from "@/components/protected-route";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Menu,
  X,
  Users,
  Calendar,
  BookOpen,
  MessageSquare,
  ShoppingBag,
  ShoppingCart,
  Leaf,
  Droplets,
  ClipboardList,
  Settings,
  LogOut,
  Home,
  MapPin,
  Brush,
  MessageCircle,
  Bell
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import Link from "next/link";

const menuItems = [
  { icon: Users, label: "Frentes", href: "/admin/frentes" },
  { icon: Calendar, label: "Eventos", href: "/admin/eventos" },
  { icon: BookOpen, label: "Leitura", href: "/admin/leitura" },
  { icon: MessageSquare, label: "Mensagens", href: "/admin/mensagens" },
  { icon: ClipboardList, label: "Limpeza", href: "/admin/limpeza" },
  { icon: ShoppingBag, label: "Compras", href: "/admin/compras" },
  { icon: Leaf, label: "Ervas", href: "/admin/ervas" },
  { icon: Droplets, label: "Banhos", href: "/admin/banhos" },
  { icon: MessageCircle, label: "Chat", href: "/admin/chat" },
  { icon: Users, label: "Usuários", href: "/admin/users" },
];

export default function AdminLayoutMobile({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Adiciona animação suave ao abrir/fechar sidebar
  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: "-100%" }
  };

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="mobile-layout relative min-h-screen w-full m-0 p-0 bg-[#006B3F] overflow-x-hidden">
        {/* Header fixo no topo */}
        <header className="mobile-header w-full left-0 right-0 p-7 bg-transparent flex items-center justify-between fixed top-0 z-30 inset-x-0 w-full">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors"
              aria-label="Menu"
            >
              <Menu size={22} className="text-white" />
            </button>
          </div>
          <div className="flex items-center gap-3"> {/*Icone alerta*/}
            <button className="p-2 rounded-full hover:bg-white/10 active:bg-white/20 transition-colors">
              <Bell size={20} className="text-white" />
            </button>
            <Avatar className="h-9 w-9 ring-2 ring-[#006B3F]/10 transition-transform hover:scale-105">
              <div className="w-full h-full rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 text-sm font-medium">
                LB
              </div>
            </Avatar>
          </div>
        </header>

        {/* Overlay com animação */}
        <div 
          className={`mobile-sidebar-overlay ${isSidebarOpen ? 'open' : ''} transition-opacity duration-300`}
          onClick={() => setIsSidebarOpen(false)} 
        />
        
        {/* Sidebar com animação e gestos */}
        <aside 
          className={`mobile-sidebar ${isSidebarOpen ? 'open' : ''} transition-transform duration-300 ease-in-out`}
          onTouchStart={(e) => {
            const touch = e.touches[0];
            const startX = touch.clientX;
            const handleTouchMove = (e: TouchEvent) => {
              const touch = e.touches[0];
              const currentX = touch.clientX;
              const diff = startX - currentX;
              if (diff > 50) {
                setIsSidebarOpen(false);
                document.removeEventListener('touchmove', handleTouchMove);
              }
            };
            document.addEventListener('touchmove', handleTouchMove);
            document.addEventListener('touchend', () => {
              document.removeEventListener('touchmove', handleTouchMove);
            }, { once: true });
          }}
        >
          <div className="flex items-center gap-3 mb-8 mt-2">
            <Avatar className="h-11 w-11 ring-2 ring-white/20">
              <div className="w-full h-full rounded-full bg-white/10 flex items-center justify-center text-white text-base font-medium">
                TD
              </div>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="text-[16px] font-semibold text-white">Admin</h3>
              <p className="text-white/60 text-sm">admin@terreiro.com</p>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 rounded-full hover:bg-white/10 active:bg-white/20 transition-colors"
            >
              <X size={20} className="text-white" />
            </button>
          </div>

          {/* Menu Principal com feedback visual melhorado */}
          <nav className="flex flex-col gap-1 mt-2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[#FAFAFA] text-base font-medium transition-all ${
                  pathname === item.href 
                    ? 'bg-white/20 shadow-lg shadow-black/10' 
                    : 'hover:bg-white/10 active:bg-white/15'
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <item.icon size={22} className={pathname === item.href ? 'text-white' : 'text-white/80'} />
                <span>{item.label}</span>
                {pathname === item.href && (
                  <div className="ml-auto w-1 h-6 bg-white rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Menu Inferior com separador visual */}
          <div className="mt-auto pt-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <Link
                href="/admin/profile"
                className="flex items-center gap-2 text-white hover:bg-white/10 active:bg-white/20 px-3 py-2 rounded-lg transition-colors"
                onClick={() => setIsSidebarOpen(false)}
              >
                <Settings size={20} />
                <span>Configurações</span>
              </Link>
              <span className="text-white/20">|</span>
              <Link
                href="/logout"
                className="flex items-center gap-2 text-white hover:bg-white/10 active:bg-white/20 px-3 py-2 rounded-lg transition-colors"
                onClick={() => setIsSidebarOpen(false)}
              >
                <LogOut size={20} />
                <span>Sair</span>
              </Link>
            </div>
          </div>
        </aside>

        {/* Conteúdo Principal com scroll suave */}
        <main className="mobile-content min-h-screen pt-16 pb-safe px-0 overflow-y-auto scroll-smooth w-full bg-white -mt-px">
          <div className="w-full h-full px-4">
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
