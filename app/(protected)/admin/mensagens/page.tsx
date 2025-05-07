"use client"

import { useState } from "react"
import { Edit, Trash2, ArrowLeft, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

// Dados simulados
const mensagens = [
  { id: 1, titulo: "Alteração na data da Gira", autor: "Maria da Mata", prioridade: "alta" },
  { id: 2, titulo: "Doações para a Festa", autor: "João da Paz", prioridade: "media" },
  { id: 3, titulo: "Novos materiais disponíveis", autor: "Carlos Silva", prioridade: "baixa" },
  { id: 4, titulo: "Mutirão de Limpeza", autor: "Ana Clara", prioridade: "media" },
  { id: 5, titulo: "Cancelamento de Evento", autor: "Carlos Tranca Ruas", prioridade: "alta" },
  { id: 6, titulo: "Reunião de Coordenadores", autor: "José Silva", prioridade: "media" },
  { id: 7, titulo: "Curso de Ervas Medicinais", autor: "Maria Santos", prioridade: "baixa" },
  { id: 8, titulo: "Aviso Importante", autor: "João Pereira", prioridade: "alta" },
]

export default function AdminMensagensPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("todas")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredMensagens = mensagens.filter(
    (mensagem) =>
      mensagem.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mensagem.autor.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Gerenciar Mensagens</h1>

      <div className="relative w-full">
        <Input
          type="search"
          placeholder="Procurar mensagens"
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
            onClick={() => setActiveTab("enviadas")}
            className={`px-4 py-2 text-sm ${
              activeTab === "enviadas"
                ? "border-b-2 border-terreiro-green font-medium text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Enviadas
          </button>
          <button
            onClick={() => setActiveTab("rascunhos")}
            className={`px-4 py-2 text-sm ${
              activeTab === "rascunhos"
                ? "border-b-2 border-terreiro-green font-medium text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Rascunhos
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
        {filteredMensagens.map((mensagem) => (
          <div key={mensagem.id} className="rounded-md border border-gray-200 p-4">
            <div className="mb-4 text-center font-medium">{mensagem.titulo}</div>
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
