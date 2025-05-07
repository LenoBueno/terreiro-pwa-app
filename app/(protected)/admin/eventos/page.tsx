"use client"

import { useState } from "react"
import { Edit, Trash2, ArrowLeft, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

// Dados simulados
const eventos = [
  { id: 1, nome: "Gira de Caboclos", data: "15/05/2025", responsavel: "Maria da Mata" },
  { id: 2, nome: "Estudo sobre Ervas", data: "18/05/2025", responsavel: "João das Ervas" },
  { id: 3, nome: "Festa de Pretos Velhos", data: "22/05/2025", responsavel: "João da Paz" },
  { id: 4, nome: "Mutirão de Limpeza", data: "25/05/2025", responsavel: "Ana Clara" },
  { id: 5, nome: "Gira de Exus", data: "07/06/2025", responsavel: "Carlos Tranca Ruas" },
  { id: 6, nome: "Estudo sobre Orixás", data: "10/06/2025", responsavel: "João das Ervas" },
  { id: 7, nome: "Festa de Iemanjá", data: "15/06/2025", responsavel: "Maria das Águas" },
  { id: 8, nome: "Gira de Erês", data: "20/06/2025", responsavel: "Ana Clara" },
]

export default function AdminEventosPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("proximos")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredEventos = eventos.filter(
    (evento) =>
      evento.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evento.responsavel.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <h1 className="admin-title">Gerenciar Eventos</h1>

      {/* Barra de pesquisa */}
      <div className="relative w-full max-w-xs mb-4">
        <Input
          type="search"
          placeholder="Procurar"
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

      {/* Botões à esquerda e abas à direita */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="admin-button" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          <Button className="admin-button bg-terreiro-green hover:bg-terreiro-green/90">
            <Plus className="mr-2 h-4 w-4" />
            Adicionar
          </Button>
        </div>
        <div className="flex border-b ml-4">
          <button
            onClick={() => setActiveTab("proximos")}
            className={`admin-tab ${
              activeTab === "proximos"
                ? "border-b-2 border-terreiro-green text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Próximos
          </button>
          <button
            onClick={() => setActiveTab("passados")}
            className={`admin-tab ${
              activeTab === "passados"
                ? "border-b-2 border-terreiro-green text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Passados
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {filteredEventos.map((evento) => (
          <div key={evento.id} className="rounded-md border border-gray-200 p-4">
            <div className="mb-4 text-center admin-subtitle">{evento.nome}</div>
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
