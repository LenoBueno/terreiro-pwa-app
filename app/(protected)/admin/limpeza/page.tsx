"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Calendar, Clock, User, Check, X, Search, ArrowLeft, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AddButton } from "@/components/add-button"
import { useRouter } from "next/navigation"

export default function AdminLimpezaPage() {
  const [activeTab, setActiveTab] = useState("todas")
  const [busca, setBusca] = useState("")
  const router = useRouter()

  // Dados de exemplo
  const tarefas = [
    {
      id: 1,
      titulo: "Limpeza do Congá",
      responsavel: "Maria da Mata",
      data: "15/05/2025",
      horario: "14:00",
      descricao: "Realizar a limpeza completa do Congá, incluindo troca de velas e flores.",
      status: "pendente",
      prioridade: "alta",
    },
    {
      id: 2,
      titulo: "Limpeza do Salão Principal",
      responsavel: "João da Paz",
      data: "16/05/2025",
      horario: "09:00",
      descricao: "Varrer e passar pano no salão principal. Limpar os bancos e cadeiras.",
      status: "concluida",
      prioridade: "media",
    },
    {
      id: 3,
      titulo: "Limpeza dos Banheiros",
      responsavel: "Carlos Silva",
      data: "16/05/2025",
      horario: "10:30",
      descricao: "Limpeza completa dos banheiros masculino e feminino.",
      status: "pendente",
      prioridade: "alta",
    },
  ]

  // Filtrar tarefas com base na aba ativa
  const tarefasFiltradas = tarefas.filter((tarefa) => {
    if (activeTab === "todas") return true
    if (activeTab === "pendentes") return tarefa.status === "pendente"
    if (activeTab === "concluidas") return tarefa.status === "concluida"
    if (activeTab === "alta") return tarefa.prioridade === "alta"
    if (activeTab === "media") return tarefa.prioridade === "media"
    return false
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="admin-title tracking-tight">Gerenciar Limpeza</h1>
      </div>

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

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        {/* Botões à esquerda e abas à direita */}
        <div className="flex items-center gap-2 mb-2"> {/* gap e margem menores */}
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="admin-button" onClick={() => router.back()}>
              <ArrowLeft className="mr-1 h-3 w-3" />
              <span>Voltar</span>
            </Button>
            <Button className="admin-button bg-terreiro-green hover:bg-terreiro-green/90" size="sm">
              <Plus className="mr-1 h-3 w-3" />
              Adicionar
            </Button>
          </div>
          <div className="flex border-b ml-2 h-7"> {/* abas compactas */}
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
              onClick={() => setActiveTab("pendentes")}
              className={`admin-tab ${
                activeTab === "pendentes"
                  ? "border-b-2 border-terreiro-green text-terreiro-green"
                  : "text-gray-600"
              }`}
            >
              Pendentes
            </button>
            <button
              onClick={() => setActiveTab("concluidas")}
              className={`admin-tab ${
                activeTab === "concluidas"
                  ? "border-b-2 border-terreiro-green text-terreiro-green"
                  : "text-gray-600"
              }`}
            >
              Concluídas
            </button>
            <button
              onClick={() => setActiveTab("alta")}
              className={`admin-tab ${
                activeTab === "alta"
                  ? "border-b-2 border-terreiro-green text-terreiro-green"
                  : "text-gray-600"
              }`}
            >
              Alta Prioridade
            </button>
            <button
              onClick={() => setActiveTab("media")}
              className={`admin-tab ${
                activeTab === "media"
                  ? "border-b-2 border-terreiro-green text-terreiro-green"
                  : "text-gray-600"
              }`}
            >
              Média Prioridade
            </button>
          </div>
        </div>
        {/* Conteúdo das abas */}
        <TabsContent value={activeTab}>
          <div className="space-y-4">
            {tarefasFiltradas.map((tarefa) => (
              <Card key={tarefa.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="admin-subtitle">{tarefa.titulo}</h3>
                        {tarefa.status === "pendente" ? (
                          <Badge className="bg-yellow-500">Pendente</Badge>
                        ) : (
                          <Badge className="bg-green-600">Concluída</Badge>
                        )}
                        {tarefa.prioridade === "alta" && <Badge className="bg-red-600">Alta Prioridade</Badge>}
                        {tarefa.prioridade === "media" && <Badge className="bg-orange-500">Média Prioridade</Badge>}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mb-4">
                        <div className="flex items-center mr-4">
                          <User className="mr-1 h-4 w-4" />
                          Responsável: {tarefa.responsavel}
                        </div>
                        <div className="flex items-center mr-4">
                          <Calendar className="mr-1 h-4 w-4" />
                          {tarefa.data}
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-1 h-4 w-4" />
                          {tarefa.horario}
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuItem>Duplicar</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Excluir</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <p className="mb-4">{tarefa.descricao}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      {tarefa.status === "pendente" ? (
                        <Button size="sm" className="admin-button bg-green-600 hover:bg-green-700">
                          <Check className="mr-1 h-4 w-4" /> Marcar como Concluída
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline" className="admin-button">
                          <X className="mr-1 h-4 w-4" /> Marcar como Pendente
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
