"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Bell, Calendar, AlertCircle, Info, ArrowLeft } from "lucide-react"
import { UserPageHeader } from "@/components/user-page-header"
import { useRouter } from "next/navigation"

// Dados simulados de mensagens
const mensagens = [
  {
    id: 1,
    titulo: "Alteração na data da Gira de Caboclos",
    conteudo:
      "Informamos que a Gira de Caboclos prevista para o dia 15/05 foi alterada para o dia 16/05, no mesmo horário. Pedimos a compreensão de todos.",
    autor: "Maria da Mata",
    avatar: "/placeholder.svg?height=40&width=40",
    iniciais: "MM",
    data: "10/05/2025",
    lida: false,
    prioridade: "alta",
    categoria: "evento",
  },
  {
    id: 2,
    titulo: "Doações para a Festa de Pretos Velhos",
    conteudo:
      "Estamos recebendo doações para a Festa de Pretos Velhos que acontecerá no dia 22/05. Precisamos de velas, fumo de corda, café, doces e bebidas.",
    autor: "João da Paz",
    avatar: "/placeholder.svg?height=40&width=40",
    iniciais: "JP",
    data: "08/05/2025",
    lida: true,
    prioridade: "media",
    categoria: "doacao",
  },
  {
    id: 3,
    titulo: "Novos materiais de estudo disponíveis",
    conteudo:
      "Informamos que foram adicionados novos materiais de estudo na seção de Leitura, incluindo um guia completo sobre os orixás e seus domínios.",
    autor: "Carlos Silva",
    avatar: "/placeholder.svg?height=40&width=40",
    iniciais: "CS",
    data: "05/05/2025",
    lida: true,
    prioridade: "baixa",
    categoria: "material",
  },
  {
    id: 4,
    titulo: "Mutirão de Limpeza - Confirmação de Presença",
    conteudo:
      "Pedimos que todos os membros confirmem presença no Mutirão de Limpeza que acontecerá no dia 25/05, a partir das 9h. Sua participação é muito importante!",
    autor: "Ana Clara",
    avatar: "/placeholder.svg?height=40&width=40",
    iniciais: "AC",
    data: "03/05/2025",
    lida: false,
    prioridade: "media",
    categoria: "organizacao",
  },
  {
    id: 5,
    titulo: "Aviso Importante sobre Segurança",
    conteudo:
      "Reforçamos a importância de manter os pertences pessoais guardados durante as giras e eventos. O terreiro não se responsabiliza por objetos perdidos.",
    autor: "Carlos Tranca Ruas",
    avatar: "/placeholder.svg?height=40&width=40",
    iniciais: "CT",
    data: "01/05/2025",
    lida: true,
    prioridade: "alta",
    categoria: "aviso",
  },
]

// Função para obter a cor do badge baseado na prioridade
function getPrioridadeBadge(prioridade: string) {
  switch (prioridade) {
    case "alta":
      return "bg-terreiro-red text-white"
    case "media":
      return "bg-amber-600 text-white"
    case "baixa":
      return "bg-terreiro-green text-white"
    default:
      return "bg-gray-600 text-white"
  }
}

// Função para obter o ícone baseado na categoria
function getCategoriaIcon(categoria: string) {
  switch (categoria) {
    case "evento":
      return <Calendar className="h-5 w-5 text-terreiro-green" />
    case "doacao":
      return <Bell className="h-5 w-5 text-terreiro-green" />
    case "material":
      return <Info className="h-5 w-5 text-terreiro-green" />
    case "organizacao":
      return <MessageSquare className="h-5 w-5 text-terreiro-green" />
    case "aviso":
      return <AlertCircle className="h-5 w-5 text-terreiro-green" />
    default:
      return <MessageSquare className="h-5 w-5 text-terreiro-green" />
  }
}

export default function MensagensPage() {
  const [filtro, setFiltro] = useState("todas")
  const [mensagensState, setMensagensState] = useState(mensagens)
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  // Marcar mensagem como lida
  const marcarComoLida = (id: number) => {
    setMensagensState(mensagensState.map((msg) => (msg.id === id ? { ...msg, lida: true } : msg)))
  }

  // Filtrar mensagens
  const mensagensFiltradas = mensagensState
    .filter(msg => {
      // Filtrar por termo de busca
      const matchSearch = 
        msg.titulo.toLowerCase().includes(searchTerm.toLowerCase()) || 
        msg.conteudo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.autor.toLowerCase().includes(searchTerm.toLowerCase())
        
      // Filtrar por categoria/status
      const matchFiltro = 
        filtro === "todas" ? true : 
        filtro === "nao-lidas" ? !msg.lida :
        msg.categoria === filtro
        
      return matchSearch && matchFiltro
    })

  return (
    <div className="w-full bg-white flex flex-col pt-5 pb-[132px]" style={{ minHeight: '500px' }}>
      <UserPageHeader
        title="Mensagens"
        subtitle="Comunicados e avisos importantes do terreiro."
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchPlaceholder="Buscar mensagens..."
      />

      <div className="flex items-center gap-4 mb-4">
        <Button variant="ghost" size="sm" onClick={() => router.push('/user/dashboard')}>
          <ArrowLeft className="mr-1 h-4 w-4" />
          <span>Voltar</span>
        </Button>
        <div className="flex border-b">
          <button
            onClick={() => setFiltro("todas")}
            className={`admin-tab ${
              filtro === "todas"
                ? "border-b-2 border-terreiro-green text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setFiltro("nao-lidas")}
            className={`admin-tab ${
              filtro === "nao-lidas"
                ? "border-b-2 border-terreiro-green text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Não Lidas
          </button>
          <button
            onClick={() => setFiltro("evento")}
            className={`admin-tab ${
              filtro === "evento"
                ? "border-b-2 border-terreiro-green text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Eventos
          </button>
          <button
            onClick={() => setFiltro("aviso")}
            className={`admin-tab ${
              filtro === "aviso"
                ? "border-b-2 border-terreiro-green text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Avisos
          </button>
          <button
            onClick={() => setFiltro("doacao")}
            className={`admin-tab ${
              filtro === "doacao"
                ? "border-b-2 border-terreiro-green text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Doações
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-9">
        {mensagensFiltradas.map((mensagem) => (
          <Card
            key={mensagem.id}
            className={`w-[200px] h-[200px] transition-all hover:shadow-md flex flex-col ${!mensagem.lida ? "border-l-4 border-l-terreiro-green" : ""}`}
          >
            <CardHeader className="gap-1 p-2">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <Avatar className="w-5 h-5">
                    <AvatarImage src={mensagem.avatar || "/placeholder.svg"} alt={mensagem.autor} />
                    <AvatarFallback>{mensagem.iniciais}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-sm truncate max-w-[110px]">{mensagem.titulo}</CardTitle>
                    <CardDescription className="text-xs truncate max-w-[110px]">{mensagem.autor} • {mensagem.data}</CardDescription>
                  </div>
                </div>
                <Badge variant="outline" className={`${getPrioridadeBadge(mensagem.prioridade)} px-2 py-0.5 text-[10px]`}>
                  {mensagem.prioridade === "alta"
                    ? "Alta"
                    : mensagem.prioridade === "media"
                      ? "Média"
                      : "Baixa"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-2 flex flex-col gap-1 flex-grow">
              <div className="flex items-center gap-1 mb-1">
                <span className="flex h-5 w-5 items-center justify-center">
                  {getCategoriaIcon(mensagem.categoria)}
                </span>
                <span className="text-[10px] truncate capitalize">{mensagem.categoria}</span>
              </div>
              <p className="text-xs truncate max-w-full leading-tight mb-1" style={{display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>{mensagem.conteudo}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
