"use client"

import { useState } from "react"
import { Edit, Trash2, ArrowLeft, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

// Dados simulados
const usuarios = [
  { id: 1, nome: "Maria da Mata", cargo: "admin", frente: "Caboclos" },
  { id: 2, nome: "João da Paz", cargo: "admin", frente: "Pretos Velhos" },
  { id: 3, nome: "Ana Clara", cargo: "membro", frente: "Erês" },
  { id: 4, nome: "Carlos Tranca Ruas", cargo: "membro", frente: "Exus e Pombagiras" },
  { id: 5, nome: "Roberto Santos", cargo: "membro", frente: "Caboclos" },
  { id: 6, nome: "Juliana Costa", cargo: "membro", frente: "Pretos Velhos" },
  { id: 7, nome: "Pedro Alves", cargo: "membro", frente: "Caboclos" },
  { id: 8, nome: "Fernanda Lima", cargo: "membro", frente: "Erês" },
]

export default function AdminUsersPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("todos")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredUsuarios = usuarios.filter(
    (usuario) =>
      usuario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.frente.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <h1 className="admin-title">Gerenciar Usuários</h1>

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
            onClick={() => setActiveTab("admins")}
            className={`admin-tab ${
              activeTab === "admins"
                ? "border-b-2 border-terreiro-green text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Administradores
          </button>
          <button
            onClick={() => setActiveTab("membros")}
            className={`admin-tab ${
              activeTab === "membros"
                ? "border-b-2 border-terreiro-green text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Membros
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {filteredUsuarios.map((usuario) => (
          <div key={usuario.id} className="rounded-md border border-gray-200 p-4">
            <div className="mb-4 text-center admin-subtitle">{usuario.nome}</div>
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
