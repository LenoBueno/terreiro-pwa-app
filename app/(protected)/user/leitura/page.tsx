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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-9">
            {materiais.map((material) => (
              <MaterialCard key={material.id} material={material} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="fundamentos">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-9">
            {materiais
              .filter((material) => material.categoria === "fundamentos")
              .map((material) => (
                <MaterialCard key={material.id} material={material} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="entidades">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-9">
            {materiais
              .filter((material) => material.categoria === "entidades")
              .map((material) => (
                <MaterialCard key={material.id} material={material} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="praticas">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-9">
            {materiais
              .filter((material) => material.categoria === "praticas")
              .map((material) => (
                <MaterialCard key={material.id} material={material} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="historia">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-9">
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
