import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"

interface UserPageHeaderProps {
  title: string
  subtitle: string
  searchTerm: string
  setSearchTerm: (value: string) => void
  searchPlaceholder?: string
}

export function UserPageHeader({
  title,
  subtitle,
  searchTerm,
  setSearchTerm,
  searchPlaceholder = "Buscar..."
}: UserPageHeaderProps) {
  return (
    <>
      <h1 className="text-2xl font-bold mb-1">{title}</h1>
      <p className="text-sm text-muted-foreground mb-4">{subtitle}</p>

      {/* Barra de pesquisa padrão */}
      <div className="relative w-full max-w-xs mb-4">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder={searchPlaceholder}
          className="w-full pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button onClick={() => setSearchTerm("")} className="absolute right-2 top-1/2 -translate-y-1/2">
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>
    </>
  )
} 