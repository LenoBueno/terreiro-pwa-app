"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, Clock, MapPin, User, Users } from "lucide-react"

// Dados simulados de eventos
const eventos = [
  {
    id: 1,
    titulo: "Gira de Caboclos",
    data: "15/05/2025",
    horario: "19:00",
    local: "Terreiro Principal",
    descricao: "Gira dedicada aos caboclos da mata, com trabalhos de cura e orientação espiritual.",
    responsavel: "Maria da Mata",
    tipo: "ritual",
    participantes: 25,
  },
  {
    id: 2,
    titulo: "Estudo sobre Ervas Sagradas",
    data: "18/05/2025",
    horario: "15:00",
    local: "Sala de Estudos",
    descricao: "Aula sobre as propriedades medicinais e espirituais das ervas utilizadas nos rituais.",
    responsavel: "João das Ervas",
    tipo: "estudo",
    participantes: 15,
  },
  {
    id: 3,
    titulo: "Festa de Pretos Velhos",
    data: "22/05/2025",
    horario: "16:00",
    local: "Terreiro Principal",
    descricao: "Celebração em homenagem aos pretos velhos, com oferendas e consultas espirituais.",
    responsavel: "João da Paz",
    tipo: "celebracao",
    participantes: 40,
  },
  {
    id: 4,
    titulo: "Mutirão de Limpeza",
    data: "25/05/2025",
    horario: "09:00",
    local: "Todo o Terreiro",
    descricao: "Mutirão para limpeza e organização do espaço físico do terreiro.",
    responsavel: "Ana Clara",
    tipo: "organizacao",
    participantes: 18,
  },
  {
    id: 5,
    titulo: "Gira de Exus",
    data: "07/06/2025",
    horario: "20:00",
    local: "Terreiro Principal",
    descricao: "Trabalhos espirituais com exus e pombagiras para proteção e abertura de caminhos.",
    responsavel: "Carlos Tranca Ruas",
    tipo: "ritual",
    participantes: 30,
  },
]

// Função para obter a cor do badge baseado no tipo de evento
function getBadgeVariant(tipo: string) {
  switch (tipo) {
    case "ritual":
      return "bg-terreiro-green text-white"
    case "estudo":
      return "bg-blue-600 text-white"
    case "celebracao":
      return "bg-terreiro-red text-white"
    case "organizacao":
      return "bg-amber-600 text-white"
    default:
      return "bg-gray-600 text-white"
  }
}

export default function EventosPage() {
  const [filtro, setFiltro] = useState("todos")

  // Filtrar eventos baseado na tab selecionada
  const eventosFiltrados = filtro === "todos" ? eventos : eventos.filter((evento) => evento.tipo === filtro)

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Eventos</h1>
        <p className="text-muted-foreground">Calendário de eventos e atividades do terreiro.</p>
      </div>

      <Tabs defaultValue="todos" className="mb-8">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="todos" onClick={() => setFiltro("todos")}>
            Todos
          </TabsTrigger>
          <TabsTrigger value="ritual" onClick={() => setFiltro("ritual")}>
            Rituais
          </TabsTrigger>
          <TabsTrigger value="estudo" onClick={() => setFiltro("estudo")}>
            Estudos
          </TabsTrigger>
          <TabsTrigger value="celebracao" onClick={() => setFiltro("celebracao")}>
            Celebrações
          </TabsTrigger>
          <TabsTrigger value="organizacao" onClick={() => setFiltro("organizacao")}>
            Organização
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-9">
        {eventosFiltrados.map((evento) => (
          <Card key={evento.id} className="w-[200px] h-[200px] transition-all hover:shadow-md">
            <CardHeader className="gap-1 p-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-sm truncate max-w-[110px]">{evento.titulo}</CardTitle>
                <Badge variant="outline" className={getBadgeVariant(evento.tipo)}>
                  {evento.tipo === "ritual"
                    ? "Ritual"
                    : evento.tipo === "estudo"
                      ? "Estudo"
                      : evento.tipo === "celebracao"
                        ? "Celebração"
                        : evento.tipo === "organizacao"
                          ? "Organização"
                          : "Outro"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-2">
  <div className="flex items-center gap-1 mb-1">
    <CalendarIcon className="h-5 w-5 text-terreiro-green" />
    <span className="text-[10px] font-medium">{evento.data}</span>
    <Clock className="h-5 w-5 text-terreiro-green" />
    <span className="text-[10px] font-medium">{evento.horario}</span>
  </div>
  <CardDescription className="text-xs truncate max-w-full leading-tight mb-1" style={{display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>{evento.descricao}</CardDescription>
  <div className="flex items-center gap-1 mt-1">
    <MapPin className="h-5 w-5 text-gray-500" />
    <span className="text-[10px] truncate">{evento.local}</span>
  </div>
  <div className="flex items-center gap-1 mt-1">
    <User className="h-5 w-5 text-gray-500" />
    <span className="text-[10px] truncate">{evento.responsavel}</span>
  </div>
  <div className="flex items-center gap-1 mt-1">
    <Users className="h-5 w-5 text-gray-500" />
    <span className="text-[10px]">{evento.participantes} participantes</span>
  </div>
</CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
