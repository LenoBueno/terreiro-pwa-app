import Link from "next/link";
import "./mobile-navbar.css";
import { usePathname } from "next/navigation";
import { Home, Users, Calendar, User, BookOpen, MessageSquare, ShoppingCart, FileBarChart, Leaf, Droplets, MessageCircle, Brush } from "lucide-react";

export default function MobileNavbar() {
  const pathname = usePathname();

  const row1 = [
    { href: "/admin/dashboard", icon: Home, label: "Dashboard" },
    { href: "/admin/frentes", icon: Users, label: "Frentes" },
    { href: "/admin/eventos", icon: Calendar, label: "Eventos" },
    { href: "/admin/leitura", icon: BookOpen, label: "Leitura" },
    { href: "/admin/mensagens", icon: MessageSquare, label: "Mensagens" },
    { href: "/admin/limpeza", icon: Brush, label: "Limpeza" },
  ];
  const row2 = [
    { href: "/admin/compras", icon: ShoppingCart, label: "Compras" },
    { href: "/admin/ervas", icon: Leaf, label: "Ervas" },
    { href: "/admin/banhos", icon: Droplets, label: "Banhos" },
    { href: "/admin/chat", icon: MessageCircle, label: "Chat" },
    { href: "/admin/users", icon: Users, label: "Usuários" },
    { href: "/admin/profile", icon: User, label: "Perfil" },
  ];

  return (
    <nav className="mobile-navbar md:hidden">
      <div className="mobile-navbar-row">
        {row1.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`nav-item${isActive ? ' active' : ''}`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
      <div className="mobile-navbar-row">
        {row2.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`nav-item${isActive ? ' active' : ''}`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
