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
      <h1 className="text-2xl font-bold">Gerenciar Ervas</h1>

      <div className="relative w-full">
        <Input
          type="search"
          placeholder="Procurar ervas"
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
            onClick={() => setActiveTab("todas")}
            className={`px-4 py-2 text-sm ${
              activeTab === "todas"
                ? "border-b-2 border-terreiro-green font-medium text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Todas
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
            onClick={() => setActiveTab("harmonia")}
            className={`px-4 py-2 text-sm ${
              activeTab === "harmonia"
                ? "border-b-2 border-terreiro-green font-medium text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Harmonia
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
        {filteredErvas.map((erva) => (
          <div key={erva.id} className="rounded-md border border-gray-200 p-4">
            <div className="mb-4 text-center font-medium">{erva.nome}</div>
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
