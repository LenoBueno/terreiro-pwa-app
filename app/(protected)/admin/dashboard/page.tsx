import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Leaf, MessageSquare, User, BrushIcon as Broom, BarChart } from "lucide-react"
import Link from "next/link"

export default function AdminDashboardPage() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Painel Administrativo</h1>
        <p className="text-muted-foreground">Bem-vindo ao painel administrativo do terreiro.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Membros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">+5 novos membros este mês</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Eventos Agendados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Próximos 30 dias</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Mensagens Enviadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground">Nos últimos 7 dias</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/admin/frentes">
          <Card className="h-full transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center gap-4">
              <User className="h-8 w-8 text-terreiro-green" />
              <div>
                <CardTitle>Frentes</CardTitle>
                <CardDescription>Gerenciar frentes espirituais</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>Administre as 8 frentes espirituais ativas</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/eventos">
          <Card className="h-full transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center gap-4">
              <Calendar className="h-8 w-8 text-terreiro-green" />
              <div>
                <CardTitle>Eventos</CardTitle>
                <CardDescription>Gerenciar eventos</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>Crie e edite eventos do calendário</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/mensagens">
          <Card className="h-full transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center gap-4">
              <MessageSquare className="h-8 w-8 text-terreiro-green" />
              <div>
                <CardTitle>Mensagens</CardTitle>
                <CardDescription>Gerenciar comunicados</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>Envie comunicados para os membros</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/limpeza">
          <Card className="h-full transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center gap-4">
              <Broom className="h-8 w-8 text-terreiro-green" />
              <div>
                <CardTitle>Limpeza</CardTitle>
                <CardDescription>Gerenciar escalas</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>Organize as escalas de limpeza do terreiro</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/ervas">
          <Card className="h-full transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center gap-4">
              <Leaf className="h-8 w-8 text-terreiro-green" />
              <div>
                <CardTitle>Ervas</CardTitle>
                <CardDescription>Gerenciar catálogo</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>Atualize o catálogo de ervas sagradas</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/users">
          <Card className="h-full transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center gap-4">
              <User className="h-8 w-8 text-terreiro-green" />
              <div>
                <CardTitle>Usuários</CardTitle>
                <CardDescription>Gerenciar membros</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>Administre os usuários e suas permissões</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/reports">
          <Card className="h-full transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center gap-4">
              <BarChart className="h-8 w-8 text-terreiro-green" />
              <div>
                <CardTitle>Relatórios</CardTitle>
                <CardDescription>Estatísticas e análises</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>Visualize relatórios e estatísticas do terreiro</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
