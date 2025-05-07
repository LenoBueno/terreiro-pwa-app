"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Leaf, Search, Tag, Info, Droplets } from "lucide-react"

// Dados simulados de ervas
const ervas = [
  {
    id: 1,
    nome: "Arruda",
    nomecientifico: "Ruta graveolens",
    descricao:
      "Planta de forte aroma, utilizada para proteção espiritual e limpeza energética. Afasta energias negativas e inveja.",
    propriedades: ["Proteção", "Limpeza", "Purificação"],
    usos: ["Banhos", "Defumação", "Amacis"],
    categoria: "proteção",
    imagem: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    nome: "Guiné",
    nomecientifico: "Petiveria alliacea",
    descricao: "Erva de forte poder espiritual, usada para quebrar demandas negativas e afastar espíritos obsessores.",
    propriedades: ["Proteção", "Descarrego", "Quebra de demandas"],
    usos: ["Banhos", "Defumação", "Sacudimentos"],
    categoria: "proteção",
    imagem: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    nome: "Alfazema",
    nomecientifico: "Lavandula angustifolia",
    descricao: "Erva aromática que traz paz, tranquilidade e harmonia. Utilizada para acalmar ambientes e pessoas.",
    propriedades: ["Paz", "Harmonia", "Purificação"],
    usos: ["Banhos", "Defumação", "Sachês"],
    categoria: "harmonia",
    imagem: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    nome: "Alecrim",
    nomecientifico: "Rosmarinus officinalis",
    descricao:
      "Erva de Oxóssi, traz força, vitalidade e clareza mental. Afasta energias negativas e protege o ambiente.",
    propriedades: ["Proteção", "Força", "Clareza mental"],
    usos: ["Banhos", "Defumação", "Chás"],
    categoria: "proteção",
    imagem: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 5,
    nome: "Manjericão",
    nomecientifico: "Ocimum basilicum",
    descricao:
      "Erva de Oxalá, traz prosperidade, amor e felicidade. Utilizada para harmonizar ambientes e atrair boas energias.",
    propriedades: ["Prosperidade", "Amor", "Felicidade"],
    usos: ["Banhos", "Defumação", "Amacis"],
    categoria: "prosperidade",
    imagem: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 6,
    nome: "Espada de São Jorge",
    nomecientifico: "Sansevieria trifasciata",
    descricao:
      "Planta de Ogum, oferece proteção contra energias negativas e inveja. Corta energias densas e protege o ambiente.",
    propriedades: ["Proteção", "Corte de energias", "Força"],
    usos: ["Amacis", "Proteção de ambientes"],
    categoria: "proteção",
    imagem: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 7,
    nome: "Comigo-ninguém-pode",
    nomecientifico: "Dieffenbachia seguine",
    descricao: "Planta de proteção que afasta olho gordo e inveja. Utilizada para proteger ambientes e pessoas.",
    propriedades: ["Proteção", "Afastamento de inveja"],
    usos: ["Proteção de ambientes"],
    categoria: "proteção",
    imagem: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 8,
    nome: "Patchouli",
    nomecientifico: "Pogostemon cablin",
    descricao:
      "Erva de forte aroma, utilizada para atrair prosperidade, dinheiro e abundância. Também tem propriedades afrodisíacas.",
    propriedades: ["Prosperidade", "Atração", "Abundância"],
    usos: ["Banhos", "Defumação", "Sachês"],
    categoria: "prosperidade",
    imagem: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 9,
    nome: "Canela",
    nomecientifico: "Cinnamomum verum",
    descricao: "Especiaria que atrai prosperidade, sucesso e dinheiro. Também utilizada para aquecer relacionamentos.",
    propriedades: ["Prosperidade", "Sucesso", "Amor"],
    usos: ["Banhos", "Defumação", "Amacis"],
    categoria: "prosperidade",
    imagem: "/placeholder.svg?height=200&width=200",
  },
]

export default function ErvasPage() {
  const [busca, setBusca] = useState("")
  const [categoriaAtiva, setCategoriaAtiva] = useState("todas")

  // Filtrar ervas por busca e categoria
  const ervasFiltradas = ervas.filter((erva) => {
    const matchBusca =
      erva.nome.toLowerCase().includes(busca.toLowerCase()) ||
      erva.descricao.toLowerCase().includes(busca.toLowerCase())
    const matchCategoria = categoriaAtiva === "todas" || erva.categoria === categoriaAtiva
    return matchBusca && matchCategoria
  })

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Catálogo de Ervas</h1>
        <p className="text-muted-foreground">Explore o catálogo de ervas sagradas e suas propriedades.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar ervas..."
            className="pl-8"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="todas" className="mb-8" onValueChange={setCategoriaAtiva}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="todas">Todas</TabsTrigger>
          <TabsTrigger value="proteção">Proteção</TabsTrigger>
          <TabsTrigger value="prosperidade">Prosperidade</TabsTrigger>
          <TabsTrigger value="harmonia">Harmonia</TabsTrigger>
        </TabsList>
      </Tabs>

      {ervasFiltradas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ervasFiltradas.map((erva) => (
            <Card key={erva.id} className="h-full flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl">{erva.nome}</CardTitle>
                  <Badge
                    variant="outline"
                    className={
                      erva.categoria === "proteção"
                        ? "bg-terreiro-green text-white"
                        : erva.categoria === "prosperidade"
                          ? "bg-amber-600 text-white"
                          : "bg-blue-600 text-white"
                    }
                  >
                    {erva.categoria === "proteção"
                      ? "Proteção"
                      : erva.categoria === "prosperidade"
                        ? "Prosperidade"
                        : "Harmonia"}
                  </Badge>
                </div>
                <CardDescription className="italic">{erva.nomecientifico}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 flex-grow">
                <div className="flex justify-center mb-4">
                  <img
                    src={erva.imagem || "/placeholder.svg"}
                    alt={erva.nome}
                    className="rounded-md object-cover h-40 w-full"
                  />
                </div>
                <p className="text-sm">{erva.descricao}</p>
                <div className="space-y-3 mt-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted">
                      <Tag className="h-3 w-3 text-terreiro-green" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Propriedades</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {erva.propriedades.map((prop, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {prop}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted">
                      <Droplets className="h-3 w-3 text-terreiro-green" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Usos</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {erva.usos.map((uso, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {uso}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
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
      ) : (
        <div className="text-center py-8">
          <Leaf className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">Nenhuma erva encontrada</h3>
          <p className="text-muted-foreground">Tente ajustar sua busca ou filtros.</p>
        </div>
      )}
    </div>
  )
}
