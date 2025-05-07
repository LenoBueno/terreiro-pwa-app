import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Book, FileText, Download, Clock, Eye } from "lucide-react"

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
  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Materiais de Leitura</h1>
        <p className="text-muted-foreground">Acesse materiais de estudo e aprofundamento espiritual.</p>
      </div>

      <Tabs defaultValue="todos" className="mb-8">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="fundamentos">Fundamentos</TabsTrigger>
          <TabsTrigger value="entidades">Entidades</TabsTrigger>
          <TabsTrigger value="praticas">Práticas</TabsTrigger>
          <TabsTrigger value="historia">História</TabsTrigger>
        </TabsList>
        <TabsContent value="todos">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {materiais.map((material) => (
              <MaterialCard key={material.id} material={material} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="fundamentos">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {materiais
              .filter((material) => material.categoria === "fundamentos")
              .map((material) => (
                <MaterialCard key={material.id} material={material} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="entidades">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {materiais
              .filter((material) => material.categoria === "entidades")
              .map((material) => (
                <MaterialCard key={material.id} material={material} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="praticas">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {materiais
              .filter((material) => material.categoria === "praticas")
              .map((material) => (
                <MaterialCard key={material.id} material={material} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="historia">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {materiais
              .filter((material) => material.categoria === "historia")
              .map((material) => (
                <MaterialCard key={material.id} material={material} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function MaterialCard({ material }: { material: any }) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl">{material.titulo}</CardTitle>
          <Badge
            variant="outline"
            className={
              material.categoria === "fundamentos"
                ? "bg-terreiro-green text-white"
                : material.categoria === "entidades"
                  ? "bg-terreiro-red text-white"
                  : material.categoria === "praticas"
                    ? "bg-blue-600 text-white"
                    : "bg-amber-600 text-white"
            }
          >
            {material.categoria === "fundamentos"
              ? "Fundamentos"
              : material.categoria === "entidades"
                ? "Entidades"
                : material.categoria === "praticas"
                  ? "Práticas"
                  : "História"}
          </Badge>
        </div>
        <CardDescription>{material.descricao}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 flex-grow">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
            <Book className="h-5 w-5 text-terreiro-green" />
          </div>
          <div>
            <p className="text-sm font-medium">Autor</p>
            <p className="text-sm text-muted-foreground">{material.autor}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
            <FileText className="h-5 w-5 text-terreiro-green" />
          </div>
          <div>
            <p className="text-sm font-medium">Publicado em</p>
            <p className="text-sm text-muted-foreground">{material.dataPublicacao}</p>
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{material.tempoLeitura}</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{material.visualizacoes} visualizações</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Baixar Material
        </Button>
      </CardFooter>
    </Card>
  )
}
