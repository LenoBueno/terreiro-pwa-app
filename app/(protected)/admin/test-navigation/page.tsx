"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function TestNavigationPage() {
  const router = useRouter()
  const [lastClicked, setLastClicked] = useState("")

  const testPaths = [
    { name: "Dashboard (standard)", path: "/admin/dashboard" },
    { name: "Dashboard (absolute)", path: "/admin/dashboard" },
    { name: "Root", path: "/" },
    { name: "Back", action: () => router.back() },
  ]

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Navigation Test Page</h1>
      <p className="mb-6">Click the buttons below to test navigation:</p>
      
      <div className="flex flex-col gap-3">
        {testPaths.map((item) => (
          <Button 
            key={item.name}
            onClick={() => {
              setLastClicked(item.name)
              console.log(`Navigating to: ${item.path || 'back'}`)
              if (item.action) {
                item.action()
              } else {
                router.push(item.path)
              }
            }}
            className="w-full max-w-md"
          >
            {item.name}
          </Button>
        ))}
      </div>
      
      {lastClicked && (
        <p className="mt-4">Last clicked: {lastClicked}</p>
      )}
    </div>
  )
} 