"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, Search, Check, Trash2, ShoppingCart, Edit } from "lucide-react"
import Link from "next/link"

interface Compra {
  id: string
  item: string
  quantidade: number
  unidade: string
  preco: number
  total: number
  categoria: string
  responsavel: string
  dataCompra: string
  status: "pendente" | "concluida"
}

// Simulação de dados iniciais
const comprasIniciais: Compra[] = [
  {
    id: "1",
    item: "Velas brancas",
    quantidade: 50,
    unidade: "unidade",
    preco: 2.5,
    total: 125,
    categoria: "ritual",
    responsavel: "Maria da Mata",
    dataCompra: "2024-03-20",
    status: "pendente"
  },
  {
    id: "2",
    item: "Ervas para banho",
    quantidade: 10,
    unidade: "kg",
    preco: 15,
    total: 150,
    categoria: "ervas",
    responsavel: "João da Paz",
    dataCompra: "2024-03-19",
    status: "concluida"
  }
]

export default function AdminComprasMobile() {
  const router = useRouter()
  const [compras, setCompras] = useState<Compra[]>(comprasIniciais)
  const [filtroAtivo, setFiltroAtivo] = useState<string>("todos")
  const [busca, setBusca] = useState("")

  const comprasFiltradas = compras.filter(compra => {
    const matchFiltro = filtroAtivo === "todos" || compra.status === filtroAtivo
    const matchBusca = compra.item.toLowerCase().includes(busca.toLowerCase()) ||
                      compra.responsavel.toLowerCase().includes(busca.toLowerCase())
    return matchFiltro && matchBusca
  })

  const getBadgeColor = (categoria: string) => {
    switch (categoria) {
      case "ritual":
        return "bg-purple-100 text-purple-800"
      case "ervas":
        return "bg-green-100 text-green-800"
      case "limpeza":
        return "bg-blue-100 text-blue-800"
      case "alimentacao":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const marcarComoConcluida = (id: string) => {
    setCompras(compras.map(compra =>
      compra.id === id ? { ...compra, status: "concluida" } : compra
    ))
  }

  const excluirCompra = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta compra?")) {
      setCompras(compras.filter(compra => compra.id !== id))
    }
  }

  return (
    <div className="fixed inset-0 bg-[#006B3F] pt-16">
      <main className="absolute top-28 bottom-0 left-0 right-0 bg-white p-4 overflow-auto rounded-t-[35px] shadow-[0_0_15px_rgba(0,0,0,0.10)]">
        <div className="flex items-center mb-4">
          <Link href="/admin/dashboard">
            <Button variant="ghost" size="icon" className="p-2 rounded-full hover:bg-gray-100 mr-2">
              <ArrowLeft className="h-5 w-5 text-[#006B3F]" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold text-[#006B3F] flex-1">Compras</h1>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Pesquisar compras..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#006B3F]/50 focus:border-transparent text-sm"
          />
        </div>

        <div className="flex items-center mb-4 overflow-x-auto hide-scrollbar">
          <div className="flex space-x-2">
            <button
              onClick={() => setFiltroAtivo("todos")}
              className={`px-3 py-1.5 text-sm font-medium whitespace-nowrap ${
                filtroAtivo === "todos" ? "text-[#006B3F] border-b-2 border-[#006B3F]" : "text-gray-500 hover:text-[#006B3F]"
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFiltroAtivo("pendente")}
              className={`px-3 py-1.5 text-sm font-medium whitespace-nowrap ${
                filtroAtivo === "pendente" ? "text-[#006B3F] border-b-2 border-[#006B3F]" : "text-gray-500 hover:text-[#006B3F]"
              }`}
            >
              Pendentes
            </button>
            <button
              onClick={() => setFiltroAtivo("concluida")}
              className={`px-3 py-1.5 text-sm font-medium whitespace-nowrap ${
                filtroAtivo === "concluida" ? "text-[#006B3F] border-b-2 border-[#006B3F]" : "text-gray-500 hover:text-[#006B3F]"
              }`}
            >
              Concluídas
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {comprasFiltradas.length > 0 ? (
            comprasFiltradas.map((compra) => (
              <div
                key={compra.id}
                className="group flex flex-col items-center bg-white p-3 rounded-lg border border-gray-100 shadow-sm"
              >
                <div 
                  className="w-full cursor-pointer"
                  onClick={() => router.push(`/admin/compras/${compra.id}`)}
                >
                  <div className="relative w-14 h-14 mx-auto rounded-full overflow-hidden mb-2 shadow-[0_0px_7px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-shadow duration-200 bg-gray-100 flex items-center justify-center">
                    <ShoppingCart className="h-7 w-7 text-gray-400" />
                    <Badge className={`absolute bottom-0 right-0 text-[10px] px-1.5 py-0.5 ${getBadgeColor(compra.categoria)}`}>
                      {compra.categoria}
                    </Badge>
                  </div>
                  <div className="text-center w-full">
                    <h3 className="text-sm font-medium text-gray-900 group-hover:text-[#006B3F] transition-colors truncate">
                      {compra.item}
                    </h3>
                    <p className="text-[11px] text-gray-500 truncate">{compra.responsavel}</p>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <p className="text-[11px] text-gray-500">{compra.quantidade} {compra.unidade}</p>
                      <span className="text-[11px] text-gray-400">•</span>
                      <p className="text-[11px] font-medium text-[#006B3F]">R$ {compra.total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-1 mt-2" onClick={(e) => e.stopPropagation()}>
                  {compra.status === "pendente" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0"
                      onClick={() => marcarComoConcluida(compra.id)}
                    >
                      <Check className="h-3.5 w-3.5" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0"
                    onClick={() => excluirCompra(compra.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center py-8 text-gray-500 text-sm">
              Nenhuma compra encontrada
            </div>
          )}
        </div>

        <div className="fixed bottom-6 right-6">
          <Button
            onClick={() => router.push("/admin/compras/nova")}
            className="rounded-full w-12 h-12 p-0 flex items-center justify-center bg-[#006B3F] hover:bg-[#005a33] shadow-lg"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </main>
    </div>
  )
} 