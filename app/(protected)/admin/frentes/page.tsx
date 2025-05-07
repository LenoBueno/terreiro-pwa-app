"use client"

import { useState } from "react"
import { Edit, Trash2, ArrowLeft, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

// Dados simulados de frentes espirituais
const frentesIniciais = [
  { id: 1, nome: "Barô", tipo: "umbanda" },
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
      <h1 className="text-2xl font-bold">Gerenciar Frentes</h1>

      <div className="relative w-full">
        <Input
          type="search"
          placeholder="Procurar"
          className="w-full"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        {busca && (
          <button onClick={limparBusca} className="absolute right-2 top-1/2 -translate-y-1/2">
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex border-b">
          <button
            onClick={() => setFiltro("umbanda")}
            className={`px-4 py-2 text-sm ${
              filtro === "umbanda"
                ? "border-b-2 border-terreiro-green font-medium text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Umbanda
          </button>
          <button
            onClick={() => setFiltro("nacao")}
            className={`px-4 py-2 text-sm ${
              filtro === "nacao" ? "border-b-2 border-terreiro-green font-medium text-terreiro-green" : "text-gray-600"
            }`}
          >
            Nação
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
        {frentesFiltradas.map((frente) => (
          <div key={frente.id} className="rounded-md border border-gray-200 p-4">
            <div className="mb-4 text-center font-medium">{frente.nome}</div>
            <div className="flex justify-between">
              <button>
                <Edit size={18} className="text-gray-600" />
              </button>
              <button onClick={() => excluirFrente(frente.id)}>
                <Trash2 size={18} className="text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
