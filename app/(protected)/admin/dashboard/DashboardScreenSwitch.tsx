"use client"
import AdminDashboardDesktop from "./AdminDashboardDesktop"
import AdminDashboardMobile from "./AdminDashboardMobile"
import { useEffect, useState } from "react"

export default function DashboardScreenSwitch() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 767)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  return isMobile ? <AdminDashboardMobile /> : <AdminDashboardDesktop />
}
