"use client"

import { useState } from "react"
import { Edit, Trash2, ArrowLeft, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

// Dados simulados
const materiais = [
  { id: 1, titulo: "Guia Completo dos Orixás", autor: "Carlos Silva", tipo: "PDF" },
  { id: 2, titulo: "Ervas Sagradas e seus Usos", autor: "Maria da Mata", tipo: "PDF" },
  { id: 3, titulo: "História da Umbanda no Brasil", autor: "João da Paz", tipo: "DOC" },
  { id: 4, titulo: "Pontos Cantados - Coletânea", autor: "Ana Clara", tipo: "PDF" },
  { id: 5, titulo: "Guia de Defumação", autor: "Carlos Tranca Ruas", tipo: "PDF" },
  { id: 6, titulo: "Fundamentos da Umbanda", autor: "José Silva", tipo: "PDF" },
  { id: 7, titulo: "Orixás e seus Domínios", autor: "Maria Santos", tipo: "DOC" },
  { id: 8, titulo: "Guia de Oferendas", autor: "João Pereira", tipo: "PDF" },
]

export default function AdminLeituraPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("todos")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredMateriais = materiais.filter(
    (material) =>
      material.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.autor.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Gerenciar Materiais de Leitura</h1>

      <div className="relative w-full">
        <Input
          type="search"
          placeholder="Procurar materiais"
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
            onClick={() => setActiveTab("estudos")}
            className={`px-4 py-2 text-sm ${
              activeTab === "estudos"
                ? "border-b-2 border-terreiro-green font-medium text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Estudos
          </button>
          <button
            onClick={() => setActiveTab("guias")}
            className={`px-4 py-2 text-sm ${
              activeTab === "guias"
                ? "border-b-2 border-terreiro-green font-medium text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Guias
          </button>
          <button
            onClick={() => setActiveTab("historia")}
            className={`px-4 py-2 text-sm ${
              activeTab === "historia"
                ? "border-b-2 border-terreiro-green font-medium text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            História
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
        {filteredMateriais.map((material) => (
          <div key={material.id} className="rounded-md border border-gray-200 p-4">
            <div className="mb-4 text-center font-medium">{material.titulo}</div>
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
