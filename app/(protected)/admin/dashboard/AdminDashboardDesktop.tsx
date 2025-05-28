import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Leaf, MessageSquare, User, BrushIcon as Broom, ShoppingCart, Droplets, Book, MessageCircle, Users as UsersIcon } from "lucide-react"
import Link from "next/link"

export default function AdminDashboardDesktop() {
  return (
    <div className="container mx-auto p-2 md:p-4">
      <div className="mb-2">
        <h2 className="text-xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-sm text-muted-foreground">Bem-vindo ao painel administrativo do terreiro.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Link href="/admin/frentes">
          <Card className="w-[200px] h-[200px] transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center gap-2 p-4">
              <User className="h-6 w-6 text-terreiro-green" />
              <div>
                <CardTitle className="text-base">Frentes</CardTitle>
                <CardDescription className="text-xs">Gerenciar frentes</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-2">
              <p>Administre as frentes espirituais ativas</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/eventos">
          <Card className="w-[200px] h-[200px] transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center gap-2 p-4">
              <Calendar className="h-6 w-6 text-terreiro-green" />
              <div>
                <CardTitle className="text-base">Eventos</CardTitle>
                <CardDescription className="text-xs">Gerenciar eventos</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-2">
              <p>Crie e edite eventos do calendário</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/leitura">
          <Card className="w-[200px] h-[200px] transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center gap-2 p-4">
              <Book className="h-6 w-6 text-terreiro-green" />
              <div>
                <CardTitle className="text-base">Leitura</CardTitle>
                <CardDescription className="text-xs">Materiais de estudo</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-2">
              <p>Gerencie os materiais de estudo disponíveis</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/mensagens">
          <Card className="w-[200px] h-[200px] transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center gap-2 p-4">
              <MessageSquare className="h-6 w-6 text-terreiro-green" />
              <div>
                <CardTitle className="text-base">Mensagens</CardTitle>
                <CardDescription className="text-xs">Gerenciar comunicados</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-2">
              <p>Envie comunicados para os membros</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/limpeza">
          <Card className="w-[200px] h-[200px] transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center gap-2 p-4">
              <Broom className="h-6 w-6 text-terreiro-green" />
              <div>
                <CardTitle className="text-base">Limpeza</CardTitle>
                <CardDescription className="text-xs">Gerenciar escalas</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-2">
              <p>Organize as escalas de limpeza do terreiro</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/compras">
          <Card className="w-[200px] h-[200px] transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center gap-2 p-4">
              <ShoppingCart className="h-6 w-6 text-terreiro-green" />
              <div>
                <CardTitle className="text-base">Compras</CardTitle>
                <CardDescription className="text-xs">Lista de compras</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-2">
              <p>Gerencie as listas de compras do terreiro</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/ervas">
          <Card className="w-[200px] h-[200px] transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center gap-2 p-4">
              <Leaf className="h-6 w-6 text-terreiro-green" />
              <div>
                <CardTitle className="text-base">Ervas</CardTitle>
                <CardDescription className="text-xs">Gerenciar catálogo</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-2">
              <p>Atualize o catálogo de ervas sagradas</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/banhos">
          <Card className="w-[200px] h-[200px] transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center gap-2 p-4">
              <Droplets className="h-6 w-6 text-terreiro-green" />
              <div>
                <CardTitle className="text-base">Banhos</CardTitle>
                <CardDescription className="text-xs">Gerenciar banhos</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-2">
              <p>Atualize o catálogo de banhos ritualísticos</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/chat">
          <Card className="w-[200px] h-[200px] transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center gap-2 p-4">
              <MessageCircle className="h-6 w-6 text-terreiro-green" />
              <div>
                <CardTitle className="text-base">Chat</CardTitle>
                <CardDescription className="text-xs">Conversas</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-2">
              <p>Acesse o chat com os membros do terreiro</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/users">
          <Card className="w-[200px] h-[200px] transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center gap-2 p-4">
              <UsersIcon className="h-6 w-6 text-terreiro-green" />
              <div>
                <CardTitle className="text-base">Usuários</CardTitle>
                <CardDescription className="text-xs">Gerenciar membros</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-2">
              <p>Administre os usuários e suas permissões</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/profile">
          <Card className="w-[200px] h-[200px] transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center gap-2 p-4">
              <User className="h-6 w-6 text-terreiro-green" />
              <div>
                <CardTitle className="text-base">Perfil</CardTitle>
                <CardDescription className="text-xs">Seus dados</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-2">
              <p>Gerencie seu perfil e configurações pessoais</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
