"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Brush, Clock, Users, CheckCircle2 } from "lucide-react"

// Dados simulados de escalas de limpeza
const escalas = [
  {
    id: 1,
    data: "15/05/2025",
    horario: "09:00",
    area: "Salão Principal",
    responsaveis: [
      { nome: "Maria da Mata", avatar: "/placeholder.svg?height=40&width=40", iniciais: "MM" },
      { nome: "João da Paz", avatar: "/placeholder.svg?height=40&width=40", iniciais: "JP" },
      { nome: "Ana Clara", avatar: "/placeholder.svg?height=40&width=40", iniciais: "AC" },
    ],
    tarefas: ["Varrer o salão", "Limpar os assentamentos", "Organizar as cadeiras"],
    status: "pendente",
  },

]

export default function LimpezaPage() {
  const [escalasState, setEscalasState] = useState(escalas)

  // Marcar escala como concluída
  const marcarComoConcluida = (id: number) => {
    setEscalasState(escalasState.map((escala) => (escala.id === id ? { ...escala, status: "concluida" } : escala)))
  }

  // Filtrar escalas por status
  const escalasPendentes = escalasState.filter((escala) => escala.status === "pendente")
  const escalasConcluidas = escalasState.filter((escala) => escala.status === "concluida")

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Escalas de Limpeza</h1>
        <p className="text-muted-foreground">Acompanhe as escalas de limpeza e organização do terreiro.</p>
      </div>

      <Tabs defaultValue="pendentes" className="mb-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pendentes">Pendentes</TabsTrigger>
          <TabsTrigger value="concluidas">Concluídas</TabsTrigger>
        </TabsList>
        <TabsContent value="pendentes">
          <div className="space-y-4 mt-6">
            {escalasPendentes.length > 0 ? (
              escalasPendentes.map((escala) => (
                <EscalaCard key={escala.id} escala={escala} onConcluir={marcarComoConcluida} />
              ))
            ) : (
              <div className="text-center py-8">
                <Brush className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Nenhuma escala pendente</h3>
                <p className="text-muted-foreground">Todas as escalas foram concluídas.</p>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="concluidas">
          <div className="space-y-4 mt-6">
            {escalasConcluidas.length > 0 ? (
              escalasConcluidas.map((escala) => (
                <EscalaCard key={escala.id} escala={escala} onConcluir={marcarComoConcluida} />
              ))
            ) : (
              <div className="text-center py-8">
                <CheckCircle2 className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Nenhuma escala concluída</h3>
                <p className="text-muted-foreground">As escalas ainda estão pendentes.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function EscalaCard({ escala, onConcluir }: { escala: any; onConcluir: (id: number) => void }) {
  return (
    <Card className="w-[500px] h-[500px]">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl">Limpeza: {escala.area}</CardTitle>
          <Badge
            variant="outline"
            className={escala.status === "pendente" ? "bg-amber-600 text-white" : "bg-terreiro-green text-white"}
          >
            {escala.status === "pendente" ? "Pendente" : "Concluída"}
          </Badge>
        </div>
        <CardDescription>Escala de limpeza e organização</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
            <Calendar className="h-5 w-5 text-terreiro-green" />
          </div>
          <div>
            <p className="text-sm font-medium">Data</p>
            <p className="text-sm text-muted-foreground">{escala.data}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
            <Clock className="h-5 w-5 text-terreiro-green" />
          </div>
          <div>
            <p className="text-sm font-medium">Horário</p>
            <p className="text-sm text-muted-foreground">{escala.horario}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
            <Users className="h-5 w-5 text-terreiro-green" />
          </div>
          <div>
            <p className="text-sm font-medium">Responsáveis</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {escala.responsaveis.map((responsavel: any, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={responsavel.avatar || "/placeholder.svg"} alt={responsavel.nome} />
                    <AvatarFallback className="text-xs">{responsavel.iniciais}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{responsavel.nome}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
            <Broom className="h-5 w-5 text-terreiro-green" />
          </div>
          <div>
            <p className="text-sm font-medium">Tarefas</p>
            <ul className="list-disc list-inside mt-2 text-sm text-muted-foreground">
              {escala.tarefas.map((tarefa: string, index: number) => (
                <li key={index}>{tarefa}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {escala.status === "pendente" ? (
          <Button className="w-full bg-terreiro-green hover:bg-terreiro-green/90" onClick={() => onConcluir(escala.id)}>
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Marcar como Concluída
          </Button>
        ) : (
          <Button className="w-full" variant="outline" disabled>
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Concluída
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
