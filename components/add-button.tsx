import type React from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AddButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
}

export function AddButton({ className, children = "Adicionar", ...props }: AddButtonProps) {
  return (
    <Button className={cn("bg-terreiro-green hover:bg-terreiro-green/90", className)} {...props}>
      <Plus className="mr-1 h-4 w-4" />
      {children}
    </Button>
  )
}
