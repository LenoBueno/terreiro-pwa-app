"use client"

import { useState } from "react"
import { Edit, Trash2, ArrowLeft, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

// Dados simulados
const banhos = [
  { id: 1, nome: "Banho de Descarrego", categoria: "limpeza" },
  { id: 2, nome: "Banho de Abertura de Caminhos", categoria: "prosperidade" },
  { id: 3, nome: "Banho de Proteção", categoria: "protecao" },
  { id: 4, nome: "Banho de Amor", categoria: "amor" },
  { id: 5, nome: "Banho de Harmonização", categoria: "harmonia" },
  { id: 6, nome: "Banho de Força", categoria: "protecao" },
  { id: 7, nome: "Banho de Prosperidade", categoria: "prosperidade" },
  { id: 8, nome: "Banho de Purificação", categoria: "limpeza" },
]

export default function AdminBanhosPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("todos")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredBanhos = banhos.filter((banho) => banho.nome.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Gerenciar Banhos</h1>

      <div className="relative w-full">
        <Input
          type="search"
          placeholder="Procurar banhos"
          className="w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button onClick={() => setSearchTerm("")} className="absolute right-2 top-1/2 -translate-y-1/2">
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("todos")}
            className={`px-4 py-2 text-sm ${
              activeTab === "todos"
                ? "border-b-2 border-terreiro-green font-medium text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setActiveTab("limpeza")}
            className={`px-4 py-2 text-sm ${
              activeTab === "limpeza"
                ? "border-b-2 border-terreiro-green font-medium text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Limpeza
          </button>
          <button
            onClick={() => setActiveTab("prosperidade")}
            className={`px-4 py-2 text-sm ${
              activeTab === "prosperidade"
                ? "border-b-2 border-terreiro-green font-medium text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Prosperidade
          </button>
          <button
            onClick={() => setActiveTab("protecao")}
            className={`px-4 py-2 text-sm ${
              activeTab === "protecao"
                ? "border-b-2 border-terreiro-green font-medium text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Proteção
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Button className="bg-terreiro-green hover:bg-terreiro-green/90">
            <Plus className="mr-2 h-4 w-4" />
            Adicionar
          </Button>
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {filteredBanhos.map((banho) => (
          <div key={banho.id} className="rounded-md border border-gray-200 p-4">
            <div className="mb-4 text-center font-medium">{banho.nome}</div>
            <div className="flex justify-between">
              <button>
                <Edit size={18} className="text-gray-600" />
              </button>
              <button>
                <Trash2 size={18} className="text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
