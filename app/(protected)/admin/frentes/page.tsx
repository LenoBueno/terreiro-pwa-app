"use client"

import { useState } from "react"
import { Edit, Trash2, ArrowLeft, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

// Dados simulados de frentes espirituais
const frentesIniciais = [
  { id: 1, nome: "Bará", tipo: "nacao" },
  { id: 2, nome: "Ogum", tipo: "umbanda" },
  { id: 3, nome: "Oya", tipo: "umbanda" },
  { id: 4, nome: "Xangô", tipo: "umbanda" },
  { id: 5, nome: "Odé", tipo: "umbanda" },
  { id: 6, nome: "Otim", tipo: "umbanda" },
  { id: 7, nome: "Obá", tipo: "umbanda" },
  { id: 8, nome: "Xapanã", tipo: "umbanda" },
  { id: 9, nome: "Oxalá", tipo: "nacao" },
  { id: 10, nome: "Iemanjá", tipo: "nacao" },
  { id: 11, nome: "Oxum", tipo: "nacao" },
  { id: 12, nome: "Oxóssi", tipo: "nacao" },
]

export default function AdminFrentesPage() {
  const router = useRouter()
  const [frentes, setFrentes] = useState(frentesIniciais)
  const [filtro, setFiltro] = useState("umbanda")
  const [busca, setBusca] = useState("")

  // Filtrar frentes
  const frentesFiltradas = frentes
    .filter((frente) => frente.tipo === filtro)
    .filter((frente) => frente.nome.toLowerCase().includes(busca.toLowerCase()))

  // Excluir frente
  const excluirFrente = (id: number) => {
    if (confirm("Tem certeza que deseja excluir esta frente?")) {
      setFrentes(frentes.filter((frente) => frente.id !== id))
    }
  }

  // Limpar busca
  const limparBusca = () => {
    setBusca("")
  }

  return (
    <div className="space-y-4">
      <h1 className="admin-title">Gerenciar Frentes</h1>

      {/* Barra de pesquisa */}
      <div className="relative w-full max-w-xs mb-4">
        <Input
          type="search"
          placeholder="Procurar"
          className="w-full"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        {busca && (
          <button onClick={() => setBusca("")} className="absolute right-2 top-1/2 -translate-y-1/2">
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
            onClick={() => setFiltro("umbanda")}
            className={`admin-tab ${
              filtro === "umbanda"
                ? "border-b-2 border-terreiro-green text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Umbanda
          </button>
          <button
            onClick={() => setFiltro("nacao")}
            className={`admin-tab ${
              filtro === "nacao"
                ? "border-b-2 border-terreiro-green text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Nação
          </button>
        </div>  
      </div>

      <div className="grid grid-cols-4 gap-4">
        {frentesFiltradas.map((frente) => (
          <Card key={frente.id}>
            <CardHeader className="mb-4 text-center">
              <CardTitle className="admin-subtitle">{frente.nome}</CardTitle>
            </CardHeader>
            <CardFooter className="flex justify-between">
              <button>
                <Edit size={18} className="text-gray-600" />
              </button>
              <button onClick={() => excluirFrente(frente.id)}>
                <Trash2 size={18} className="text-red-500" />
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
