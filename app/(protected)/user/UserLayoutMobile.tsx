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
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

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
      <div className="bg-white rounded-lg p-2 mb-2">{children}</div>
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow z-50 flex justify-between px-2 py-1 md:hidden">
        {sidebarLinks.slice(0, 5).map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex flex-col items-center flex-1 py-1 ${isActive(link.href) ? "text-terreiro-green" : "text-gray-600"}`}
          >
            <link.icon size={22} />
            <span className="text-[11px] leading-none">{link.label}</span>
          </Link>
        ))}
        <button
          onClick={handleLogout}
          className="flex flex-col items-center flex-1 py-1 text-red-500"
          aria-label="Sair"
        >
          <LogOut size={22} />
          <span className="text-[11px] leading-none">Sair</span>
        </button>
      </nav>
    </div>
  );
}
