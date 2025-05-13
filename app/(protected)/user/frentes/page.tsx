"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Info, ArrowLeft } from "lucide-react"
import { UserPageHeader } from "@/components/user-page-header"
import { useRouter } from "next/navigation"

// Dados simulados de frentes espirituais
const frentes = [
  {
    id: 1,
    nome: "Caboclos",
    descricao: "Frente espiritual dedicada aos trabalhos com caboclos da mata.",
    responsavel: "Maria da Mata",
    avatar: "/placeholder.svg?height=40&width=40",
    iniciais: "MM",
    proximoEvento: "15/05/2025",
    membros: 12,
    categoria: "umbanda"
  },
  {
    id: 2,
    nome: "Pretos Velhos",
    descricao: "Frente espiritual dedicada à sabedoria ancestral dos pretos velhos.",
    responsavel: "João da Paz",
    avatar: "/placeholder.svg?height=40&width=40",
    iniciais: "JP",
    proximoEvento: "22/05/2025",
    membros: 15,
    categoria: "umbanda"
  },
  {
    id: 3,
    nome: "Erês",
    descricao: "Frente espiritual dedicada aos trabalhos com as crianças espirituais.",
    responsavel: "Ana Clara",
    avatar: "/placeholder.svg?height=40&width=40",
    iniciais: "AC",
    proximoEvento: "01/06/2025",
    membros: 8,
    categoria: "umbanda"
  },
  {
    id: 4,
    nome: "Exus e Pombagiras",
    descricao: "Frente espiritual dedicada aos trabalhos com exus e pombagiras.",
    responsavel: "Carlos Tranca Ruas",
    avatar: "/placeholder.svg?height=40&width=40",
    iniciais: "CT",
    proximoEvento: "07/06/2025",
    membros: 10,
    categoria: "nacao"
  },
]

export default function FrentesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("todas")
  const router = useRouter()

  // Filtrar frentes por termo de busca e categoria ativa
  const frentesFiltradas = frentes.filter(frente => {
    const matchBusca = 
      frente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      frente.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      frente.responsavel.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchCategoria = activeTab === "todas" || frente.categoria === activeTab
    
    return matchBusca && matchCategoria
  })

  return (
    <div className="w-full bg-white flex flex-col pt-5 pb-[132px]" style={{ minHeight: '500px' }}>
      <UserPageHeader
        title="Frentes Espirituais"
        subtitle="Conheça as frentes espirituais do terreiro e suas atividades."
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchPlaceholder="Buscar frentes..."
      />

      <div className="flex items-center gap-4 mb-4">
        <Button variant="ghost" size="sm" onClick={() => router.push('/user/dashboard')}>
          <ArrowLeft className="mr-1 h-4 w-4" />
          <span>Voltar</span>
        </Button>
        <div className="flex border-b">
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
            onClick={() => setActiveTab("umbanda")}
            className={`admin-tab ${
              activeTab === "umbanda"
                ? "border-b-2 border-terreiro-green text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Umbanda
          </button>
          <button
            onClick={() => setActiveTab("nacao")}
            className={`admin-tab ${
              activeTab === "nacao"
                ? "border-b-2 border-terreiro-green text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Nação
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-9">
        {frentesFiltradas.map((frente) => (
          <Card key={frente.id} className="w-[200px] h-[200px] transition-all hover:shadow-md">
            <CardHeader className="gap-1 p-2">
              <div className="flex items-center justify-between w-full">
                <CardTitle className="text-sm truncate max-w-[110px]">{frente.nome}</CardTitle>
                <Avatar className="w-5 h-5">
                  <AvatarImage src={frente.avatar} alt={frente.nome} />
                  <AvatarFallback>{frente.iniciais}</AvatarFallback>
                </Avatar>
              </div>
            </CardHeader>
            <CardContent className="p-2">
              <CardDescription className="text-xs truncate max-w-full leading-tight mb-1" style={{display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>{frente.descricao}</CardDescription>
              <div className="flex items-center gap-1 mt-1">
                <Info size={14} className="text-gray-500 h-5 w-5" />
                <span className="text-[10px] truncate">{frente.responsavel}</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <Calendar size={14} className="text-gray-500 h-5 w-5" />
                <span className="text-[10px] truncate">{frente.proximoEvento}</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <Avatar className="w-5 h-5">
                  <AvatarImage src={frente.avatar} alt={frente.nome} />
                  <AvatarFallback>{frente.iniciais}</AvatarFallback>
                </Avatar>
                <span className="text-[10px]">{frente.membros} membros</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Info className="mr-2 h-4 w-4" />
                Ver Detalhes
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
