import type { ReactNode } from "react";
import { ProtectedRoute } from "@/components/protected-route";
import { AdminSidebar } from "@/components/admin-sidebar";

export default function AdminLayoutDesktop({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute requiredRole="admin">
      <div className="admin-font-small min-h-screen bg-[#f7f8fa] p-4 flex items-center justify-center rounded-3xl">
        <div className="flex w-full max-w-[1600px] gap-8">
          <aside className="w-[220px] min-h-[90vh] bg-white rounded-2xl shadow-md flex flex-col fixed left-[calc(45%-800px+128px)] top-1/2 -translate-y-1/2 z-30 p-9">
  <AdminSidebar />
</aside>
          <section className="flex-1" style={{ marginLeft: '15rem', marginRight: '-2rem'}}>
            <main className="bg-white rounded-2xl p-8 shadow-md min-h-[90vh] max-h-[90vh] overflow-y-auto">
              {children}
            </main>
          </section>
        </div>
      </div>
    </ProtectedRoute>
  );
}
