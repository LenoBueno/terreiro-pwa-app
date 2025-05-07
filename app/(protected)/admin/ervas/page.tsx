"use client"

import { useState } from "react"
import { Edit, Trash2, ArrowLeft, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

// Dados simulados
const ervas = [
  { id: 1, nome: "Arruda", categoria: "proteção" },
  { id: 2, nome: "Guiné", categoria: "proteção" },
  { id: 3, nome: "Alfazema", categoria: "harmonia" },
  { id: 4, nome: "Alecrim", categoria: "proteção" },
  { id: 5, nome: "Manjericão", categoria: "prosperidade" },
  { id: 6, nome: "Espada de São Jorge", categoria: "proteção" },
  { id: 7, nome: "Comigo-ninguém-pode", categoria: "proteção" },
  { id: 8, nome: "Abre-caminho", categoria: "prosperidade" },
]

export default function AdminErvasPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("todas")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredErvas = ervas.filter((erva) => erva.nome.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="space-y-4">
      <h1 className="admin-title">Gerenciar Ervas</h1>

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
            onClick={() => setActiveTab("todas")}
            className={`admin-tab ${
              activeTab === "todas"
                ? "border-b-2 border-terreiro-green text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setActiveTab("protecao")}
            className={`admin-tab ${
              activeTab === "protecao"
                ? "border-b-2 border-terreiro-green text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Proteção
          </button>
          <button
            onClick={() => setActiveTab("prosperidade")}
            className={`admin-tab ${
              activeTab === "prosperidade"
                ? "border-b-2 border-terreiro-green text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Prosperidade
          </button>
          <button
            onClick={() => setActiveTab("harmonia")}
            className={`admin-tab ${
              activeTab === "harmonia"
                ? "border-b-2 border-terreiro-green text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Harmonia
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {filteredErvas.map((erva) => (
          <div key={erva.id} className="rounded-md border border-gray-200 p-4">
            <div className="mb-4 text-center admin-subtitle">{erva.nome}</div>
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
