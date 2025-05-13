"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Clock, MapPin, User, Users, ArrowLeft } from "lucide-react"
import { UserPageHeader } from "@/components/user-page-header"
import { useRouter } from "next/navigation"

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
  const [activeTab, setActiveTab] = useState("todos")
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  // Filtrar eventos baseado na tab selecionada e termo de busca
  const eventosFiltrados = eventos
    .filter(evento => 
      evento.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evento.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evento.responsavel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evento.local.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(evento => activeTab === "todos" ? true : evento.tipo === activeTab)

  return (
    <div className="w-full bg-white flex flex-col pt-5 pb-[132px]" style={{ minHeight: '500px' }}>
      <UserPageHeader
        title="Eventos"
        subtitle="Calendário de eventos e atividades do terreiro."
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchPlaceholder="Buscar eventos..."
      />

      <div className="flex items-center gap-4 mb-4">
        <Button variant="ghost" size="sm" onClick={() => router.push('/user/dashboard')}>
          <ArrowLeft className="mr-1 h-4 w-4" />
          <span>Voltar</span>
        </Button>
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("todos")}
            className={`admin-tab ${
              activeTab === "todos"
                ? "border-b-2 border-terreiro-green text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setActiveTab("ritual")}
            className={`admin-tab ${
              activeTab === "ritual"
                ? "border-b-2 border-terreiro-green text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Rituais
          </button>
          <button
            onClick={() => setActiveTab("estudo")}
            className={`admin-tab ${
              activeTab === "estudo"
                ? "border-b-2 border-terreiro-green text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Estudos
          </button>
          <button
            onClick={() => setActiveTab("celebracao")}
            className={`admin-tab ${
              activeTab === "celebracao"
                ? "border-b-2 border-terreiro-green text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Celebrações
          </button>
          <button
            onClick={() => setActiveTab("organizacao")}
            className={`admin-tab ${
              activeTab === "organizacao"
                ? "border-b-2 border-terreiro-green text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Organização
          </button>
        </div>
      </div>

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
