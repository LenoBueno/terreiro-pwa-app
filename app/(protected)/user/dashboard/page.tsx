import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Leaf, MessageSquare, User, BrushIcon as Broom, ShoppingCart, Droplets, Book } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-2 md:p-4">
      <div className="mb-2">
        <h2 className="text-xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-sm text-muted-foreground">Bem-vindo ao seu painel de controle, membro do terreiro.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-9">
        <Link href="/user/eventos">
          <Card className="w-[200px] h-[200px] transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center gap-2 p-4">
              <Calendar className="h-6 w-6 text-terreiro-green" />
              <div>
                <CardTitle className="text-base">Eventos</CardTitle>
                <CardDescription className="text-xs">Próximos eventos</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-2">
              <p>3 eventos agendados para esta semana</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/user/frentes">
          <Card className="w-[200px] h-[200px] transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center gap-2 p-4">
              <User className="h-6 w-6 text-terreiro-green" />
              <div>
                <CardTitle className="text-base">Frentes</CardTitle>
                <CardDescription className="text-xs">Frentes espirituais</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-2">
              <p>Veja as frentes espirituais e suas atividades</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/user/mensagens">
          <Card className="w-[200px] h-[200px] transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center gap-2 p-4">
              <MessageSquare className="h-6 w-6 text-terreiro-green" />
              <div>
                <CardTitle className="text-base">Mensagens</CardTitle>
                <CardDescription className="text-xs">Comunicados recentes</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-2">
              <p>5 novos comunicados não lidos</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/user/limpeza">
          <Card className="w-[200px] h-[200px] transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center gap-2 p-4">
              <Broom className="h-6 w-6 text-terreiro-green" />
              <div>
                <CardTitle className="text-base">Limpeza</CardTitle>
                <CardDescription className="text-xs">Escalas de limpeza</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-2">
              <p>Próxima escala: 15/05/2025</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/user/compras">
          <Card className="w-[200px] h-[200px] transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center gap-2 p-4">
              <ShoppingCart className="h-6 w-6 text-terreiro-green" />
              <div>
                <CardTitle className="text-base">Compras</CardTitle>
                <CardDescription className="text-xs">Lista de mantimentos</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-2">
              <p>2 itens precisam ser comprados esta semana</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/user/ervas">
          <Card className="w-[200px] h-[200px] transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center gap-2 p-4">
              <Leaf className="h-6 w-6 text-terreiro-green" />
              <div>
                <CardTitle className="text-base">Ervas</CardTitle>
                <CardDescription className="text-xs">Catálogo de ervas</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-2">
              <p>Explore nosso catálogo com mais de 50 ervas sagradas</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/user/banhos">
          <Card className="w-[200px] h-[200px] transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center gap-2 p-4">
              <Droplets className="h-6 w-6 text-terreiro-green" />
              <div>
                <CardTitle className="text-base">Banhos</CardTitle>
                <CardDescription className="text-xs">Banhos ritualísticos</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-2">
              <p>Aprenda sobre os banhos sagrados e suas propriedades</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/user/leitura">
          <Card className="w-[200px] h-[200px] transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center gap-2 p-4">
              <Book className="h-6 w-6 text-terreiro-green" />
              <div>
                <CardTitle className="text-base">Leitura</CardTitle>
                <CardDescription className="text-xs">Materiais de estudo</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-2">
              <p>10 novos materiais disponíveis para leitura</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
