"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Brush as Broom, Clock, Users, CheckCircle2, ArrowLeft } from "lucide-react"
import { UserPageHeader } from "@/components/user-page-header"
import { useRouter } from "next/navigation"

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
  const [activeTab, setActiveTab] = useState("pendentes")
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  // Marcar escala como concluída
  const marcarComoConcluida = (id: number) => {
    setEscalasState(escalasState.map((escala) => (escala.id === id ? { ...escala, status: "concluida" } : escala)))
  }

  // Filtrar escalas por status e termo de busca
  const escalasFiltradas = escalasState.filter(escala => 
    escala.area.toLowerCase().includes(searchTerm.toLowerCase()) || 
    escala.tarefas.some(tarefa => tarefa.toLowerCase().includes(searchTerm.toLowerCase())) ||
    escala.responsaveis.some(resp => resp.nome.toLowerCase().includes(searchTerm.toLowerCase()))
  )
  
  const escalasPendentes = escalasFiltradas.filter((escala) => escala.status === "pendente")
  const escalasConcluidas = escalasFiltradas.filter((escala) => escala.status === "concluida")

  return (
    <div className="w-full bg-white flex flex-col pt-5 pb-[132px]" style={{ minHeight: '500px' }}>
      <UserPageHeader
        title="Escalas de Limpeza"
        subtitle="Acompanhe as escalas de limpeza e organização do terreiro."
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchPlaceholder="Buscar escalas..."
      />

      <div className="flex items-center gap-4 mb-4">
        <Button variant="ghost" size="sm" onClick={() => router.push('/user/dashboard')}>
          <ArrowLeft className="mr-1 h-4 w-4" />
          <span>Voltar</span>
        </Button>
        <div className="flex border-b">
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
        </div>
      </div>

      {activeTab === "pendentes" ? (
        <div className="space-y-4">
          {escalasPendentes.length > 0 ? (
            escalasPendentes.map((escala) => (
              <EscalaCard key={escala.id} escala={escala} onConcluir={marcarComoConcluida} />
            ))
          ) : (
            <div className="text-center py-8">
              <Broom className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">Nenhuma escala pendente</h3>
              <p className="text-muted-foreground">Todas as escalas foram concluídas.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
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
      )}
    </div>
  )
}

function EscalaCard({ escala, onConcluir }: { escala: any; onConcluir: (id: number) => void }) {
  return (
    <Card className="w-full">
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
