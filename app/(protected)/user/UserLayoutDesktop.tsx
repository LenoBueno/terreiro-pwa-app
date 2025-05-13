// Ajuste dos links do sidebar para o ambiente user
const sidebarLinks = [
  { href: "/user/dashboard", label: "Dashboard", icon: "Home" },
  { href: "/user/frentes", label: "Frentes", icon: "Users" },
  { href: "/user/eventos", label: "Eventos", icon: "Calendar" },
  { href: "/user/leitura", label: "Leitura", icon: "BookOpen" },
  { href: "/user/mensagens", label: "Mensagens", icon: "MessageSquare" },
  { href: "/user/limpeza", label: "Limpeza", icon: "Brush" },
  { href: "/user/compras", label: "Compras", icon: "ShoppingCart" },
  { href: "/user/ervas", label: "Ervas", icon: "Leaf" },
  { href: "/user/banhos", label: "Banhos", icon: "Droplets" },
  { href: "/user/chat", label: "Chat", icon: "MessageCircle" },
  { href: "/user/profile", label: "Perfil", icon: "User" },
];

import {
  BookOpen,
  Calendar,
  Home,
  MessageSquare,
  ShoppingCart,
  Users,
  Leaf,
  Droplets,
  MessageCircle,
  Brush,
  LogOut,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

function getIcon(icon: string) {
  const icons: any = { Home, Users, Calendar, BookOpen, MessageSquare, Brush, ShoppingCart, Leaf, Droplets, MessageCircle, User };
  const IconComponent = icons[icon];
  return <IconComponent size={16} />;
}

function SidebarItem({ href, icon, children, active }: any) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 py-2 text-sm transition-all ${active ? "text-terreiro-green font-medium" : "text-gray-600"}`}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}

export default function UserLayoutDesktop({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const isActive = (path: string) => pathname === path || pathname?.startsWith(`${path}/`);
  const handleLogout = async () => {
    await logout?.();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#f7f8fa] p-4 flex items-center justify-center rounded-3xl">
      <div className="flex w-full max-w-[1600px] gap-8">
        <aside className="w-[220px] min-h-[90vh] bg-white rounded-2xl shadow-md flex flex-col fixed left-[calc(45%-800px+128px)] top-1/2 -translate-y-1/2 z-30 p-9">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-terreiro-green text-white">
              <Leaf size={16} />
            </div>
            <span className="font-bold">Terreiro</span>
          </div>
          <div className="text-xs text-gray-500 mt-4 mb-2">Menu</div>
          <nav className="flex flex-col space-y-1">
            {sidebarLinks.map(link => (
              <SidebarItem
                key={link.href}
                href={link.href}
                icon={getIcon(link.icon)}
                active={isActive(link.href)}
              >
                {link.label}
              </SidebarItem>
            ))}
          </nav>
          <div className="mt-auto pt-4 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-white">U</div>
            <div className="flex flex-col">
              <span className="text-sm">Usuário</span>
              <span className="text-xs text-gray-500">Membro</span>
            </div>
            <button onClick={handleLogout} className="ml-auto" aria-label="Sair">
              <LogOut size={16} className="text-red-500" />
            </button>
          </div>
        </aside>
        <section className="flex-1" style={{ marginLeft: '15rem', marginRight: '-2rem'}}>
          <main className="bg-white rounded-2xl p-8 shadow-md min-h-[90vh] max-h-[90vh] overflow-y-auto">
            {children}
          </main>
        </section>
      </div>
    </div>
  );
}
