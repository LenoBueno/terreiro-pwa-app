"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Book, FileText, Download, Clock, Eye, ArrowLeft } from "lucide-react"
import { UserPageHeader } from "@/components/user-page-header"
import { useRouter } from "next/navigation"

// Dados simulados de materiais de leitura
const materiais = [
  {
    id: 1,
    titulo: "Fundamentos da Umbanda",
    descricao: "Material introdutório sobre os fundamentos e princípios da Umbanda.",
    categoria: "fundamentos",
    autor: "Pai José de Aruanda",
    dataPublicacao: "10/01/2025",
    tempoLeitura: "15 minutos",
    visualizacoes: 128,
    arquivo: "#",
  },
  {
    id: 2,
    titulo: "Guia de Ervas Sagradas",
    descricao: "Catálogo completo das ervas utilizadas nos rituais e suas propriedades.",
    categoria: "praticas",
    autor: "Mãe Maria das Ervas",
    dataPublicacao: "05/02/2025",
    tempoLeitura: "30 minutos",
    visualizacoes: 95,
    arquivo: "#",
  },
  {
    id: 3,
    titulo: "Orixás: Guia Completo",
    descricao: "Estudo detalhado sobre os orixás, suas características e domínios.",
    categoria: "entidades",
    autor: "Babalorixá João da Mata",
    dataPublicacao: "20/03/2025",
    tempoLeitura: "45 minutos",
    visualizacoes: 210,
    arquivo: "#",
  },
  {
    id: 4,
    titulo: "Pontos Cantados e Riscados",
    descricao: "Compilação de pontos cantados e riscados para diferentes entidades.",
    categoria: "praticas",
    autor: "Grupo de Estudos do Terreiro",
    dataPublicacao: "15/04/2025",
    tempoLeitura: "25 minutos",
    visualizacoes: 150,
    arquivo: "#",
  },
  {
    id: 5,
    titulo: "História da Umbanda no Brasil",
    descricao: "Estudo histórico sobre o surgimento e desenvolvimento da Umbanda no Brasil.",
    categoria: "historia",
    autor: "Prof. Carlos Silva",
    dataPublicacao: "30/04/2025",
    tempoLeitura: "40 minutos",
    visualizacoes: 85,
    arquivo: "#",
  },
  {
    id: 6,
    titulo: "Guia de Oferendas",
    descricao: "Manual prático sobre oferendas para diferentes entidades e ocasiões.",
    categoria: "praticas",
    autor: "Pai Roberto de Oxóssi",
    dataPublicacao: "12/05/2025",
    tempoLeitura: "20 minutos",
    visualizacoes: 110,
    arquivo: "#",
  },
]

export default function LeituraPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("todos")
  const router = useRouter()
  
  // Filtrar materiais por termo de busca
  const materiaisFiltrados = materiais.filter(material => 
    material.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.autor.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Filtrar materiais por categoria
  const filteredByCategory = activeTab === "todos" 
    ? materiaisFiltrados 
    : materiaisFiltrados.filter(material => material.categoria === activeTab)

  return (
    <div className="w-full bg-white flex flex-col pt-5 pb-[132px]" style={{ minHeight: '500px' }}>
      <UserPageHeader
        title="Materiais de Leitura"
        subtitle="Acesse materiais de estudo e aprofundamento espiritual."
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchPlaceholder="Buscar materiais..."
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
            onClick={() => setActiveTab("fundamentos")}
            className={`admin-tab ${
              activeTab === "fundamentos"
                ? "border-b-2 border-terreiro-green text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Fundamentos
          </button>
          <button
            onClick={() => setActiveTab("entidades")}
            className={`admin-tab ${
              activeTab === "entidades"
                ? "border-b-2 border-terreiro-green text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Entidades
          </button>
          <button
            onClick={() => setActiveTab("praticas")}
            className={`admin-tab ${
              activeTab === "praticas"
                ? "border-b-2 border-terreiro-green text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Práticas
          </button>
          <button
            onClick={() => setActiveTab("historia")}
            className={`admin-tab ${
              activeTab === "historia"
                ? "border-b-2 border-terreiro-green text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            História
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-9">
        {filteredByCategory.map((material) => (
          <MaterialCard key={material.id} material={material} />
        ))}
      </div>
    </div>
  )
}

function MaterialCard({ material }: { material: any }) {
  return (
    <Card className="w-[200px] h-[200px] transition-all hover:shadow-md flex flex-col">
  <CardHeader className="gap-1 p-2">
    <div className="flex items-center justify-between w-full">
      <CardTitle className="text-sm truncate max-w-[110px]">{material.titulo}</CardTitle>
      <Badge
        variant="outline"
        className={
          material.categoria === "fundamentos"
            ? "bg-terreiro-green text-white px-2 py-0.5 text-[10px]"
            : material.categoria === "entidades"
              ? "bg-terreiro-red text-white px-2 py-0.5 text-[10px]"
              : material.categoria === "praticas"
                ? "bg-blue-600 text-white px-2 py-0.5 text-[10px]"
                : "bg-amber-600 text-white px-2 py-0.5 text-[10px]"
        }
      >
        {material.categoria === "fundamentos"
          ? "Fund."
          : material.categoria === "entidades"
            ? "Entid."
            : material.categoria === "praticas"
              ? "Prát."
              : "Hist."
        }
      </Badge>
    </div>
    <CardDescription className="text-xs truncate max-w-full leading-tight mb-1" style={{display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>{material.descricao}</CardDescription>
  </CardHeader>
  <CardContent className="p-2 flex flex-col gap-1 flex-grow">
    <div className="flex items-center gap-1">
      <Book className="h-5 w-5 text-terreiro-green" />
      <span className="text-[10px] truncate">{material.autor}</span>
    </div>
    <div className="flex items-center gap-1">
      <FileText className="h-5 w-5 text-terreiro-green" />
      <span className="text-[10px] truncate">{material.dataPublicacao}</span>
    </div>
    <div className="flex items-center gap-1">
      <Clock className="h-5 w-5 text-muted-foreground" />
      <span className="text-[10px] truncate">{material.tempoLeitura}</span>
    </div>
    <div className="flex items-center gap-1">
      <Eye className="h-5 w-5 text-muted-foreground" />
      <span className="text-[10px] truncate">{material.visualizacoes} visualizações</span>
    </div>
  </CardContent>
</Card>
  )
}
