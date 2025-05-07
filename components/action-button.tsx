"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ActionButtonProps {
  onClick?: () => void
  label?: string
}

export function ActionButton({ onClick, label = "Adicionar" }: ActionButtonProps) {
  return (
    <Button className="bg-terreiro-green hover:bg-terreiro-green/90" onClick={onClick}>
      <Plus className="mr-2 h-4 w-4" /> {label}
    </Button>
  )
}
