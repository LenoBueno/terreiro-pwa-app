import {
    MapPin,
    Menu,
    Users,
    Calendar,
    BookOpen,
    MessageSquare,
    ShoppingBag,
    Leaf,
    Droplets,
    ClipboardList,
    Plus,
    FileText,
    Settings,
    Search,
  } from "lucide-react";
  import { Avatar } from "@/components/ui/avatar";
  import Link from "next/link";
  import { useRouter } from 'next/navigation';
  
  
  const menuPages = [
    { icon: BookOpen, label: "Frentes", href: "/admin/frentes" },
    { icon: Calendar, label: "Eventos", href: "/admin/eventos" },
    { icon: FileText, label: "Leitura", href: "/admin/leitura" },
    { icon: MessageSquare, label: "Mensagens", href: "/admin/mensagens" },
    { icon: ClipboardList, label: "Limpeza", href: "/admin/limpeza" },
    { icon: ShoppingBag, label: "Compras", href: "/admin/compras" },
    { icon: Leaf, label: "Ervas", href: "/admin/ervas" },
    { icon: Droplets, label: "Banhos", href: "/admin/banhos" },
    { icon: MessageSquare, label: "Chat", href: "/admin/chat" },
    { icon: Users, label: "Usuários", href: "/admin/users" },
  ];
  
  export default function AdminDashboardMobile() {
    const router = useRouter();
    // Usar todas as páginas do menu
  
    return (
      <div className="fixed inset-0 bg-[#006B3F] pt-16">
        {/* Conteúdo Principal */}
        <main className="absolute top-28 bottom-0 left-0 right-0 bg-white p-9 overflow-auto rounded-t-[35px] shadow-[0_0_15px_rgba(0,0,0,0.10)]">
          <div className="mb-6">
            <h2 className="text-lg font-medium text-[#006B3F] mb-4">INÍCIO</h2>
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Pesquisar..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#006B3F]/50 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {menuPages.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="relative w-16 h-16 mx-auto rounded-full overflow-hidden mb-2 shadow-[0_0px_7px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-200 bg-white flex items-center justify-center">
                  <item.icon size={20} className="text-[#006B3F]" />
                </div>
                <span className="text-xs text-center font-medium text-gray-700 group-hover:text-[#006B3F] transition-colors">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </main>
      </div>
    );
  }
  