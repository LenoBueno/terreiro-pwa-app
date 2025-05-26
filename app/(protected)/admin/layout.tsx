"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import AdminLayoutDesktop from "./AdminLayoutDesktop";
import AdminLayoutMobile from "./AdminLayoutMobile";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <AdminLayoutMobile>{children}</AdminLayoutMobile>;
  }

  return <AdminLayoutDesktop>{children}</AdminLayoutDesktop>;
}

