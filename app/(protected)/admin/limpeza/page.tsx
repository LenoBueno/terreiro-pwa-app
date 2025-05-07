"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Calendar, Clock, User, Check, X, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AddButton } from "@/components/add-button"

export default function AdminLimpezaPage() {
  const [activeTab, setActiveTab] = useState("todas")

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
        <h1 className="text-2xl font-bold tracking-tight">Gerenciamento de Limpeza</h1>
        <p className="text-muted-foreground">Administre as tarefas de limpeza do terreiro.</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Buscar tarefas..." className="w-full pl-8" />
        </div>
        <AddButton>Nova Tarefa</AddButton>
      </div>

      <Tabs defaultValue="todas" onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="todas">Todas</TabsTrigger>
          <TabsTrigger value="pendentes">Pendentes</TabsTrigger>
          <TabsTrigger value="concluidas">Concluídas</TabsTrigger>
          <TabsTrigger value="alta">Alta Prioridade</TabsTrigger>
          <TabsTrigger value="media">Média Prioridade</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <div className="space-y-4">
            {tarefasFiltradas.map((tarefa) => (
              <Card key={tarefa.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold">{tarefa.titulo}</h3>
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
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <Check className="mr-1 h-4 w-4" /> Marcar como Concluída
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline">
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
