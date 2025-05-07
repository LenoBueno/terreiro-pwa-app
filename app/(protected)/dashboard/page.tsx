import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Leaf, MessageSquare, User, BrushIcon as Broom, ShoppingCart, Droplets, Book } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Bem-vindo ao seu painel de controle, membro do terreiro.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/eventos">
          <Card className="h-full transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center gap-4">
              <Calendar className="h-8 w-8 text-terreiro-green" />
              <div>
                <CardTitle>Eventos</CardTitle>
                <CardDescription>Próximos eventos</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>3 eventos agendados para esta semana</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/frentes">
          <Card className="h-full transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center gap-4">
              <User className="h-8 w-8 text-terreiro-green" />
              <div>
                <CardTitle>Frentes</CardTitle>
                <CardDescription>Frentes espirituais</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>Veja as frentes espirituais e suas atividades</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/mensagens">
          <Card className="h-full transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center gap-4">
              <MessageSquare className="h-8 w-8 text-terreiro-green" />
              <div>
                <CardTitle>Mensagens</CardTitle>
                <CardDescription>Comunicados recentes</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>5 novos comunicados não lidos</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/limpeza">
          <Card className="h-full transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center gap-4">
              <Broom className="h-8 w-8 text-terreiro-green" />
              <div>
                <CardTitle>Limpeza</CardTitle>
                <CardDescription>Escalas de limpeza</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>Próxima escala: 15/05/2025</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/compras">
          <Card className="h-full transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center gap-4">
              <ShoppingCart className="h-8 w-8 text-terreiro-green" />
              <div>
                <CardTitle>Compras</CardTitle>
                <CardDescription>Lista de mantimentos</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>2 itens precisam ser comprados esta semana</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/ervas">
          <Card className="h-full transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center gap-4">
              <Leaf className="h-8 w-8 text-terreiro-green" />
              <div>
                <CardTitle>Ervas</CardTitle>
                <CardDescription>Catálogo de ervas</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>Explore nosso catálogo com mais de 50 ervas sagradas</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/banhos">
          <Card className="h-full transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center gap-4">
              <Droplets className="h-8 w-8 text-terreiro-green" />
              <div>
                <CardTitle>Banhos</CardTitle>
                <CardDescription>Banhos ritualísticos</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>Aprenda sobre os banhos sagrados e suas propriedades</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/leitura">
          <Card className="h-full transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center gap-4">
              <Book className="h-8 w-8 text-terreiro-green" />
              <div>
                <CardTitle>Leitura</CardTitle>
                <CardDescription>Materiais de estudo</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>10 novos materiais disponíveis para leitura</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
