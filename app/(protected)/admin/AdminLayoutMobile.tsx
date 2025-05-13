import type { ReactNode } from "react";
import { ProtectedRoute } from "@/components/protected-route";
import MobileNavbar from "./dashboard/MobileNavbar";

export default function AdminLayoutMobile({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute requiredRole="admin">
      <div className="w-screen min-h-screen bg-white flex flex-col">
        <main className="flex-1 w-screen h-screen overflow-y-auto p-0 m-0">{children}</main>
        <MobileNavbar />
      </div>
    </ProtectedRoute>
  );
}
