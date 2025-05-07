import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Info } from "lucide-react"

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
  },
]

export default function FrentesPage() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Frentes Espirituais</h1>
        <p className="text-muted-foreground">Conheça as frentes espirituais do terreiro e suas atividades.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {frentes.map((frente) => (
          <Card key={frente.id} className="h-full">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-xl">{frente.nome}</CardTitle>
                <Badge variant="outline" className="bg-terreiro-green text-white">
                  {frente.membros} membros
                </Badge>
              </div>
              <CardDescription>{frente.descricao}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <Avatar>
                  <AvatarImage src={frente.avatar || "/placeholder.svg"} alt={frente.responsavel} />
                  <AvatarFallback>{frente.iniciais}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Responsável</p>
                  <p className="text-sm text-muted-foreground">{frente.responsavel}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                  <Calendar className="h-5 w-5 text-terreiro-green" />
                </div>
                <div>
                  <p className="text-sm font-medium">Próximo Evento</p>
                  <p className="text-sm text-muted-foreground">{frente.proximoEvento}</p>
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
    </div>
  )
}
