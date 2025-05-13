"use client";
import { useEffect, useState } from "react";
import AdminLayoutDesktop from "./AdminLayoutDesktop";
import AdminLayoutMobile from "./AdminLayoutMobile";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 767);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile ? (
    <AdminLayoutMobile>{children}</AdminLayoutMobile>
  ) : (
    <AdminLayoutDesktop>{children}</AdminLayoutDesktop>
  );
}

