"use client";
import { useEffect, useState } from "react";
import UserLayoutDesktop from "./UserLayoutDesktop";
import UserLayoutMobile from "./UserLayoutMobile";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 767);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile ? (
    <UserLayoutMobile>{children}</UserLayoutMobile>
  ) : (
    <UserLayoutDesktop>{children}</UserLayoutDesktop>
  );
}
