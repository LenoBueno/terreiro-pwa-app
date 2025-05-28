import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Leaf, MessageSquare, User, BrushIcon as Broom, ShoppingCart, Droplets, Book, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-2 md:p-4">
      <div className="mb-2">
        <h2 className="text-xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-sm text-muted-foreground">Bem-vindo ao seu painel de controle, membro do terreiro.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-9">
        <Link href="/user/frentes">
          <Card className="w-[200px] h-[200px] transition-all hover:shadow-md overflow-hidden">

            <CardHeader className="flex flex-row items-center gap-2 p-4 pb-0">
              <User className="h-6 w-6 text-terreiro-green" />
              <div>
                <CardTitle className="text-base">Frentes</CardTitle>
                <CardDescription className="text-xs">Frentes espirituais</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-2 relative">
              <div className="flex flex-col gap-1 mt-1 h-full">
                <p className="text-sm font-medium">Umbanda e Nação</p>
                <p className="text-xs text-muted-foreground line-clamp-2">Conheça nossas frentes espirituais e suas características e cores ritualísticas</p>
                <div className="flex mt-auto gap-1">
                  <div className="w-4 h-4 rounded-full bg-red-500"></div>
                  <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                  <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                  <div className="w-4 h-4 rounded-full bg-white border"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/user/eventos">
          <Card className="w-[200px] h-[200px] transition-all hover:shadow-md overflow-hidden">

            <CardHeader className="flex flex-row items-center gap-2 p-4 pb-0">
              <Calendar className="h-6 w-6 text-terreiro-green" />
              <div>
                <CardTitle className="text-base">Eventos</CardTitle>
                <CardDescription className="text-xs">Próximos eventos</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-2 relative">
              <div className="flex flex-col gap-1 mt-1 h-full">
                <p className="text-sm font-medium">3 eventos esta semana</p>
                <p className="text-xs text-muted-foreground line-clamp-2">Participe dos próximos encontros espirituais e rituais do terreiro</p>
                <div className="flex mt-auto gap-1 text-xs">
                  <div className="text-muted-foreground flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>15/05/2025</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/user/leitura">
          <Card className="w-[200px] h-[200px] transition-all hover:shadow-md overflow-hidden">

            <CardHeader className="flex flex-row items-center gap-2 p-4 pb-0">
              <Book className="h-6 w-6 text-terreiro-green" />
              <div>
                <CardTitle className="text-base">Leitura</CardTitle>
                <CardDescription className="text-xs">Materiais de estudo</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-2 relative">
              <div className="flex flex-col gap-1 mt-1 h-full">
                <p className="text-sm font-medium">10 novos materiais</p>
                <p className="text-xs text-muted-foreground line-clamp-2">Acesse textos, artigos e documentos sobre nossa espiritualidade</p>
                <div className="flex mt-auto gap-1 text-xs">
                  <div className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">Novo</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/user/mensagens">
          <Card className="w-[200px] h-[200px] transition-all hover:shadow-md overflow-hidden">

            <CardHeader className="flex flex-row items-center gap-2 p-4 pb-0">
              <MessageSquare className="h-6 w-6 text-terreiro-green" />
              <div>
                <CardTitle className="text-base">Mensagens</CardTitle>
                <CardDescription className="text-xs">Comunicados recentes</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-2 relative">
              <div className="flex flex-col gap-1 mt-1 h-full">
                <p className="text-sm font-medium">5 mensagens não lidas</p>
                <p className="text-xs text-muted-foreground line-clamp-2">Receba comunicados importantes dos guias e da administração</p>
                <div className="flex mt-auto gap-1">
                  <div className="px-2 py-0.5 rounded-full bg-green-100 text-green-800 text-xs">5 novos</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/user/limpeza">
          <Card className="w-[200px] h-[200px] transition-all hover:shadow-md overflow-hidden">

            <CardHeader className="flex flex-row items-center gap-2 p-4 pb-0">
              <Broom className="h-6 w-6 text-terreiro-green" />
              <div>
                <CardTitle className="text-base">Limpeza</CardTitle>
                <CardDescription className="text-xs">Escalas de limpeza</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-2 relative">
              <div className="flex flex-col gap-1 mt-1 h-full">
                <p className="text-sm font-medium">Próxima escala: 15/05</p>
                <p className="text-xs text-muted-foreground line-clamp-2">Participe das escalas de limpeza e cuidado com o terreiro</p>
                <div className="flex mt-auto gap-1 text-xs">
                  <div className="text-muted-foreground flex items-center">
                    <Broom className="h-3 w-3 mr-1" />
                    <span>Voluntários: 4</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/user/compras">
          <Card className="w-[200px] h-[200px] transition-all hover:shadow-md overflow-hidden">

            <CardHeader className="flex flex-row items-center gap-2 p-4 pb-0">
              <ShoppingCart className="h-6 w-6 text-terreiro-green" />
              <div>
                <CardTitle className="text-base">Compras</CardTitle>
                <CardDescription className="text-xs">Lista de mantimentos</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-2 relative">
              <div className="flex flex-col gap-1 mt-1 h-full">
                <p className="text-sm font-medium">2 itens pendentes</p>
                <p className="text-xs text-muted-foreground line-clamp-2">Acompanhe as necessidades de compra do terreiro e contribua</p>
                <div className="flex mt-auto gap-1">
                  <div className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 text-xs">Urgente</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/user/ervas">
          <Card className="w-[200px] h-[200px] transition-all hover:shadow-md overflow-hidden">

            <CardHeader className="flex flex-row items-center gap-2 p-4 pb-0">
              <Leaf className="h-6 w-6 text-terreiro-green" />
              <div>
                <CardTitle className="text-base">Ervas</CardTitle>
                <CardDescription className="text-xs">Catálogo de ervas</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-2 relative">
              <div className="flex flex-col gap-1 mt-1 h-full">
                <p className="text-sm font-medium">50+ ervas catalogadas</p>
                <p className="text-xs text-muted-foreground line-clamp-2">Explore o catálogo completo de ervas sagradas e suas propriedades</p>
                <div className="flex mt-auto gap-1">
                  <div className="w-4 h-4 rounded-full bg-green-700"></div>
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                  <div className="w-4 h-4 rounded-full bg-lime-400"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/user/banhos">
          <Card className="w-[200px] h-[200px] transition-all hover:shadow-md overflow-hidden">

            <CardHeader className="flex flex-row items-center gap-2 p-4 pb-0">
              <Droplets className="h-6 w-6 text-terreiro-green" />
              <div>
                <CardTitle className="text-base">Banhos</CardTitle>
                <CardDescription className="text-xs">Banhos ritualísticos</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-2 relative">
              <div className="flex flex-col gap-1 mt-1 h-full">
                <p className="text-sm font-medium">Banhos sagrados</p>
                <p className="text-xs text-muted-foreground line-clamp-2">Aprenda sobre os diferentes banhos e suas propriedades energéticas</p>
                <div className="flex mt-auto gap-1">
                  <div className="w-4 h-4 rounded-full bg-blue-300"></div>
                  <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                  <div className="w-4 h-4 rounded-full bg-cyan-500"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/user/chat">
          <Card className="w-[200px] h-[200px] transition-all hover:shadow-md overflow-hidden">

            <CardHeader className="flex flex-row items-center gap-2 p-4 pb-0">
              <MessageCircle className="h-6 w-6 text-terreiro-green" />
              <div>
                <CardTitle className="text-base">Chat</CardTitle>
                <CardDescription className="text-xs">Conversas</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-2 relative">
              <div className="flex flex-col gap-1 mt-1 h-full">
                <p className="text-sm font-medium">8 membros online</p>
                <p className="text-xs text-muted-foreground line-clamp-2">Converse com outros membros do terreiro sobre temas espirituais</p>
                <div className="flex mt-auto gap-1">
                  <div className="px-2 py-0.5 rounded-full bg-green-100 text-green-800 text-xs">Online</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/user/profile">
          <Card className="w-[200px] h-[200px] transition-all hover:shadow-md overflow-hidden">

            <CardHeader className="flex flex-row items-center gap-2 p-4 pb-0">
              <User className="h-6 w-6 text-terreiro-green" />
              <div>
                <CardTitle className="text-base">Perfil</CardTitle>
                <CardDescription className="text-xs">Seus dados</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-2 relative">
              <div className="flex flex-col gap-1 mt-1 h-full">
                <p className="text-sm font-medium">Configurações</p>
                <p className="text-xs text-muted-foreground line-clamp-2">Acesse seus dados pessoais e altere suas preferências no sistema</p>
                <div className="flex mt-auto gap-1">
                  <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold">U</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
