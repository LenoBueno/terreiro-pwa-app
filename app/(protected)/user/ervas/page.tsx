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
      "Planta de forte aroma,",
    propriedades: [],
    usos: [],
    categoria: "proteção",
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
            <Card key={erva.id} className="w-[200px] h-[200px] transition-all hover:shadow-md flex flex-col overflow-hidden">
              <CardHeader className="gap-0.5 p-1 pb-0">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-[8px] truncate max-w-[90px]">{erva.nome}</CardTitle>
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
                <CardDescription className="text-[8px] truncate max-w-full leading-tight mb-0.5 italic" style={{display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>{erva.nomecientifico}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 p-1 pt-0.5 flex flex-col gap-0.5">
                <div className="flex justify-center mb-0.5 items-center">
                  <img
                    src={erva.imagem || "/placeholder.svg"}
                    alt={erva.nome}
                    className="rounded-lg object-cover h-6 w-6 mx-auto"
                  />
                </div>
                <p className="text-[8px] truncate max-w-full leading-tight mb-0.5">{erva.descricao}</p>
                <div className="flex-1 space-y-0.5 mt-0.5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-3 w-3 items-center justify-center rounded-full bg-muted">
                      <Tag className="h-2 w-2 text-terreiro-green" />
                    </div>
                    <div>
                      <p className="text-[8px] font-semibold">Propriedades</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {erva.propriedades.map((prop, index) => (
                          <Badge key={index} variant="secondary" className="text-[8px] px-0.5 py-0.5">
                            {prop}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-3 w-3 items-center justify-center rounded-full bg-muted">
                      <Droplets className="h-2 w-2 text-terreiro-green" />
                    </div>
                    <div>
                      <p className="text-[8px] font-semibold">Usos</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {erva.usos.map((uso, index) => (
                          <Badge key={index} variant="outline" className="text-[8px] px-0.5 py-0.5">
                            {uso}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-1 pt-0">
                <Button variant="outline" className="w-full h-4 text-[8px] px-0.5">
                  <Info className="mr-0.5 h-2 w-2" />
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
