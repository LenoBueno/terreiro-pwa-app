import {
  Home,
  Users,
  Calendar,
  BookOpen,
  MessageSquare,
  Brush,
  ShoppingCart,
  Leaf,
  Droplets,
  MessageCircle,
  LogOut,
  User,
  Bell,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Avatar } from "@/components/ui/avatar";

const sidebarLinks = [
  { href: "/user/dashboard", label: "Dashboard", icon: Home },
  { href: "/user/frentes", label: "Frentes", icon: Users },
  { href: "/user/eventos", label: "Eventos", icon: Calendar },
  { href: "/user/leitura", label: "Leitura", icon: BookOpen },
  { href: "/user/mensagens", label: "Mensagens", icon: MessageSquare },
  { href: "/user/limpeza", label: "Limpeza", icon: Brush },
  { href: "/user/compras", label: "Compras", icon: ShoppingCart },
  { href: "/user/ervas", label: "Ervas", icon: Leaf },
  { href: "/user/banhos", label: "Banhos", icon: Droplets },
  { href: "/user/chat", label: "Chat", icon: MessageCircle },
  { href: "/user/profile", label: "Perfil", icon: User },
];

export default function UserLayoutMobile({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const isActive = (path: string) => pathname === path || pathname?.startsWith(`${path}/`);

  const handleLogout = async () => {
    await logout?.();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <header className="sticky top-0 z-40 bg-gradient-to-b from-white to-white/95 backdrop-blur-sm shadow-sm px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 ring-2 ring-[#006B3F]/10">
              <div className="w-full h-full rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 text-sm font-medium">
                TD
              </div>
            </Avatar>
            <div>
              <h1 className="text-base font-semibold text-gray-800">Terreiro Digital</h1>
              <p className="text-xs text-gray-500">Bem-vindo(a)</p>
            </div>
          </div>
          <button className="p-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors">
            <Bell size={20} className="text-gray-600" />
          </button>
        </div>
      </header>

      <main className="px-4 py-4 overflow-y-auto scroll-smooth">
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          {children}
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-lg z-50 flex justify-between px-2 py-2 md:hidden">
        {sidebarLinks.slice(0, 5).map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex flex-col items-center flex-1 py-1.5 relative group ${
              isActive(link.href) 
                ? "text-[#006B3F]" 
                : "text-gray-600 hover:text-[#006B3F]"
            }`}
          >
            <link.icon 
              size={22} 
              className={`transition-transform group-hover:scale-110 ${
                isActive(link.href) ? "text-[#006B3F]" : "text-gray-600"
              }`}
            />
            <span className="text-[11px] leading-none mt-1 font-medium">
              {link.label}
            </span>
            {isActive(link.href) && (
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#006B3F]" />
            )}
          </Link>
        ))}
        <button
          onClick={handleLogout}
          className="flex flex-col items-center flex-1 py-1.5 text-red-500 hover:text-red-600 group"
          aria-label="Sair"
        >
          <LogOut 
            size={22} 
            className="transition-transform group-hover:scale-110" 
          />
          <span className="text-[11px] leading-none mt-1 font-medium">
            Sair
          </span>
        </button>
      </nav>
    </div>
  );
}
