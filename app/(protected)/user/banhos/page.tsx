"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Droplets, Leaf, BookOpen, Info, ArrowLeft } from "lucide-react"
import { UserPageHeader } from "@/components/user-page-header"
import { useRouter } from "next/navigation"

// Dados simulados de banhos
const banhos = [
  {
    id: 1,
    nome: "Banho de Descarrego",
    descricao:
      "Banho ritualístico para limpeza energética profunda, removendo energias negativas e bloqueios espirituais.",
    ingredientes: ["Arruda", "Guiné", "Alecrim", "Sal grosso", "Alfazema"],
    preparo:
      "Ferva 2 litros de água e adicione as ervas. Deixe em infusão por 15 minutos. Coe e adicione o sal grosso. Utilize após o banho normal, do pescoço para baixo.",
    indicacoes: ["Limpeza energética", "Remoção de cargas negativas", "Proteção espiritual"],
    categoria: "limpeza",
    imagem: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    nome: "Banho de Abertura de Caminhos",
    descricado: "Banho ritualístico para abrir caminhos, remover obstáculos e atrair oportunidades positivas.",
    descricao: "Banho ritualístico para abrir caminhos, remover obstáculos e atrair oportunidades positivas.",
    ingredientes: ["Manjericão", "Alecrim", "Canela em pau", "Louro", "Mel"],
    preparo:
      "Ferva 2 litros de água e adicione as ervas e a canela. Deixe em infusão por 15 minutos. Coe e adicione uma colher de mel. Utilize após o banho normal, do pescoço para baixo.",
    indicacoes: ["Abertura de caminhos", "Remoção de obstáculos", "Atração de oportunidades"],
    categoria: "prosperidade",
    imagem: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    nome: "Banho de Proteção",
    descricao:
      "Banho ritualístico para proteção espiritual, fortalecimento da aura e afastamento de energias negativas.",
    ingredientes: ["Arruda", "Espada de São Jorge", "Alecrim", "Sal grosso", "Guiné"],
    preparo:
      "Ferva 2 litros de água e adicione as ervas. Deixe em infusão por 15 minutos. Coe e adicione o sal grosso. Utilize após o banho normal, do pescoço para baixo.",
    indicacoes: ["Proteção espiritual", "Fortalecimento da aura", "Afastamento de energias negativas"],
    categoria: "proteção",
    imagem: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    nome: "Banho de Amor",
    descricao: "Banho ritualístico para atrair amor, harmonizar relacionamentos e aumentar o magnetismo pessoal.",
    ingredientes: ["Rosas vermelhas", "Canela em pau", "Manjericão", "Mel", "Pétalas de girassol"],
    preparo:
      "Ferva 2 litros de água e adicione as ervas e a canela. Deixe em infusão por 15 minutos. Coe e adicione uma colher de mel. Utilize após o banho normal, do pescoço para baixo.",
    indicacoes: ["Atração de amor", "Harmonização de relacionamentos", "Aumento do magnetismo pessoal"],
    categoria: "amor",
    imagem: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 5,
    nome: "Banho de Prosperidade",
    descricao: "Banho ritualístico para atrair prosperidade, abundância financeira e sucesso nos negócios.",
    ingredientes: ["Canela em pau", "Louro", "Manjericão", "Alecrim", "Cravo"],
    preparo:
      "Ferva 2 litros de água e adicione as ervas e especiarias. Deixe em infusão por 15 minutos. Coe e utilize após o banho normal, do pescoço para baixo.",
    indicacoes: ["Atração de prosperidade", "Abundância financeira", "Sucesso nos negócios"],
    categoria: "prosperidade",
    imagem: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 6,
    nome: "Banho de Harmonização",
    descricao: "Banho ritualístico para harmonizar energias, acalmar a mente e trazer paz interior.",
    ingredientes: ["Alfazema", "Camomila", "Alecrim", "Manjericão", "Pétalas de rosa branca"],
    preparo:
      "Ferva 2 litros de água e adicione as ervas. Deixe em infusão por 15 minutos. Coe e utilize após o banho normal, do pescoço para baixo.",
    indicacoes: ["Harmonização energética", "Calma mental", "Paz interior"],
    categoria: "harmonia",
    imagem: "/placeholder.svg?height=200&width=200",
  },
]

export default function BanhosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("todos")
  const router = useRouter()

  // Filtrar banhos por busca e categoria
  const banhosFiltrados = banhos.filter((banho) => {
    const matchBusca =
      banho.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      banho.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    const matchCategoria = activeTab === "todos" || banho.categoria === activeTab
    return matchBusca && matchCategoria
  })

  return (
    <div className="w-full bg-white flex flex-col pt-5 pb-[132px]" style={{ minHeight: '500px' }}>
      <UserPageHeader
        title="Banhos Ritualísticos"
        subtitle="Explore os banhos ritualísticos e suas propriedades espirituais."
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchPlaceholder="Buscar banhos..."
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
            onClick={() => setActiveTab("limpeza")}
            className={`admin-tab ${
              activeTab === "limpeza"
                ? "border-b-2 border-terreiro-green text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Limpeza
          </button>
          <button
            onClick={() => setActiveTab("proteção")}
            className={`admin-tab ${
              activeTab === "proteção"
                ? "border-b-2 border-terreiro-green text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Proteção
          </button>
          <button
            onClick={() => setActiveTab("prosperidade")}
            className={`admin-tab ${
              activeTab === "prosperidade"
                ? "border-b-2 border-terreiro-green text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Prosperidade
          </button>
          <button
            onClick={() => setActiveTab("amor")}
            className={`admin-tab ${
              activeTab === "amor"
                ? "border-b-2 border-terreiro-green text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Amor
          </button>
        </div>
      </div>

      {banhosFiltrados.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {banhosFiltrados.map((banho) => (
            <Card key={banho.id} className="w-[200px] h-[200px] transition-all hover:shadow-md flex flex-col overflow-hidden">
              <CardHeader className="gap-1 p-2 pb-0">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-sm truncate max-w-[110px]">{banho.nome}</CardTitle>
                  <Badge
                    variant="outline"
                    className={
                      banho.categoria === "limpeza"
                        ? "bg-blue-600 text-white"
                        : banho.categoria === "proteção"
                          ? "bg-terreiro-green text-white"
                          : banho.categoria === "prosperidade"
                            ? "bg-amber-600 text-white"
                            : banho.categoria === "amor"
                              ? "bg-terreiro-red text-white"
                              : "bg-purple-600 text-white"
                    }
                  >
                    {banho.categoria === "limpeza"
                      ? "Limpeza"
                      : banho.categoria === "proteção"
                        ? "Proteção"
                        : banho.categoria === "prosperidade"
                          ? "Prosperidade"
                          : banho.categoria === "amor"
                            ? "Amor"
                            : "Harmonia"}
                  </Badge>
                </div>
                <CardDescription className="text-xs truncate max-w-full leading-tight mb-1 italic" style={{display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>{banho.descricao}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 p-2 pt-1 flex flex-col gap-1">
                <div className="flex justify-center mb-1 items-center">
                  <img
                    src={banho.imagem || "/placeholder.svg"}
                    alt={banho.nome}
                    className="rounded-lg object-cover h-10 w-10"
                  />
                </div>
                <div className="flex-1 space-y-1 mt-1">
                  <div className="flex items-start gap-3">
                    <div className="flex h-4 w-4 items-center justify-center rounded-full bg-muted">
                      <Leaf className="h-3 w-3 text-terreiro-green" />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold">Ingredientes</p>
                      <ul className="list-disc list-inside mt-1 text-[10px] text-muted-foreground">
                        {banho.ingredientes.map((ingrediente, index) => (
                          <li key={index}>{ingrediente}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-4 w-4 items-center justify-center rounded-full bg-muted">
                      <BookOpen className="h-3 w-3 text-terreiro-green" />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold">Preparo</p>
                      <p className="text-[10px] text-muted-foreground mt-1 truncate max-w-full">{banho.preparo}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-4 w-4 items-center justify-center rounded-full bg-muted">
                      <Droplets className="h-3 w-3 text-terreiro-green" />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold">Indicações</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {banho.indicacoes.map((indicacao, index) => (
                          <Badge key={index} variant="outline" className="text-[10px] px-1 py-0.5">
                            {indicacao}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-2 pt-0">
                <Button variant="outline" className="w-full h-6 text-xs px-1">
                  <Info className="mr-1 h-3 w-3" />
                  Ver Detalhes
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Droplets className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">Nenhum banho encontrado</h3>
          <p className="text-muted-foreground">Tente ajustar sua busca ou filtros.</p>
        </div>
      )}
    </div>
  )
}
