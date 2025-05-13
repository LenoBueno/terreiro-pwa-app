import type React from "react"
import { ProtectedRoute } from "@/components/protected-route"

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      <div
        className="min-h-screen bg-[#f7f8fa] p-4 flex items-center justify-center rounded-3xl"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 100,
        }}
      >
        <div className="flex w-full max-w-[1600px] gap-8">
          <main className="flex-1 rounded-2xl p-8 shadow-sm min-h-[90vh]">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
