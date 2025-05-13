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
      <div className="mb-2">
        <h2 className="text-xl font-bold tracking-tight">Frentes Espirituais</h2>
        <p className="text-sm text-muted-foreground">Conheça as frentes espirituais do terreiro e suas atividades.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-9">
        {frentes.map((frente) => (
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
