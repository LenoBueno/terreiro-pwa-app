import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Calendar, MessageCircle, User } from "lucide-react";

export default function MobileNavbar() {
  const pathname = usePathname();
  const navItems = [
    { href: "/admin/dashboard", icon: Home, label: "Início" },
    { href: "/admin/frentes", icon: Users, label: "Frentes" },
    { href: "/admin/eventos", icon: Calendar, label: "Eventos" },
    { href: "/admin/chat", icon: MessageCircle, label: "Chat" },
    { href: "/admin/profile", icon: User, label: "Perfil" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-[4.5rem] bg-white/90 backdrop-blur-lg border-t border-gray-100/50 flex items-center justify-around px-6 z-50 pb-[env(safe-area-inset-bottom)]">
      {navItems.map(({ href, icon: Icon, label }) => {
        const isActive = pathname === href || 
                       (href !== '/admin/dashboard' && pathname.startsWith(href));
        
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center justify-center gap-1 ${
              isActive ? "text-terreiro-green" : "text-gray-400"
            }`}
          >
            <div className="relative">
              <Icon size={20} strokeWidth={2} className={`transition-colors ${isActive ? "text-terreiro-green" : "text-gray-400"}`} />
              {isActive && (
                <span className="absolute -bottom-2 left-1/2 w-1 h-1 bg-terreiro-green rounded-full -translate-x-1/2" />
              )}
            </div>
            <span className="text-[10px] font-medium">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
