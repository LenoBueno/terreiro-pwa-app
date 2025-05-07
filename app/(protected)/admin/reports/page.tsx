import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart, PieChart } from "lucide-react"

export default function AdminReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Relatórios</h2>
        <p className="text-muted-foreground">Visualize estatísticas e relatórios do terreiro.</p>
      </div>

      <Tabs defaultValue="presenca">
        <TabsList className="grid w-full grid-cols-3 md:w-auto">
          <TabsTrigger value="presenca">
            <BarChart className="mr-2 h-4 w-4" />
            Presenças
          </TabsTrigger>
          <TabsTrigger value="financeiro">
            <LineChart className="mr-2 h-4 w-4" />
            Financeiro
          </TabsTrigger>
          <TabsTrigger value="distribuicao">
            <PieChart className="mr-2 h-4 w-4" />
            Distribuição
          </TabsTrigger>
        </TabsList>

        <TabsContent value="presenca" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Presenças em Eventos</CardTitle>
              <CardDescription>Acompanhe a presença de médiuns e visitantes nos eventos.</CardDescription>
            </CardHeader>
            <CardContent className="h-80 w-full">
              <div className="h-full w-full rounded-md bg-muted flex items-center justify-center">
                <p className="text-muted-foreground">Gráfico de Presenças</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Eventos Mais Frequentados</CardTitle>
                <CardDescription>Top 5 eventos com maior presença.</CardDescription>
              </CardHeader>
              <CardContent className="h-60">
                <div className="h-full w-full rounded-md bg-muted flex items-center justify-center">
                  <p className="text-muted-foreground">Gráfico de Eventos</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Presença por Frente</CardTitle>
                <CardDescription>Distribuição de presenças por frente espiritual.</CardDescription>
              </CardHeader>
              <CardContent className="h-60">
                <div className="h-full w-full rounded-md bg-muted flex items-center justify-center">
                  <p className="text-muted-foreground">Gráfico de Frentes</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="financeiro" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Balanço Financeiro</CardTitle>
              <CardDescription>Acompanhe receitas e despesas do terreiro.</CardDescription>
            </CardHeader>
            <CardContent className="h-80 w-full">
              <div className="h-full w-full rounded-md bg-muted flex items-center justify-center">
                <p className="text-muted-foreground">Gráfico Financeiro</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Principais Despesas</CardTitle>
                <CardDescription>Categorias com maiores gastos.</CardDescription>
              </CardHeader>
              <CardContent className="h-60">
                <div className="h-full w-full rounded-md bg-muted flex items-center justify-center">
                  <p className="text-muted-foreground">Gráfico de Despesas</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fontes de Receita</CardTitle>
                <CardDescription>Distribuição das fontes de receita.</CardDescription>
              </CardHeader>
              <CardContent className="h-60">
                <div className="h-full w-full rounded-md bg-muted flex items-center justify-center">
                  <p className="text-muted-foreground">Gráfico de Receitas</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="distribuicao" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Distribuição de Membros</CardTitle>
              <CardDescription>Visualize a distribuição de membros por categoria.</CardDescription>
            </CardHeader>
            <CardContent className="h-80 w-full">
              <div className="h-full w-full rounded-md bg-muted flex items-center justify-center">
                <p className="text-muted-foreground">Gráfico de Distribuição</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Distribuição por Cargo</CardTitle>
                <CardDescription>Membros por cargo no terreiro.</CardDescription>
              </CardHeader>
              <CardContent className="h-60">
                <div className="h-full w-full rounded-md bg-muted flex items-center justify-center">
                  <p className="text-muted-foreground">Gráfico de Cargos</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribuição por Idade</CardTitle>
                <CardDescription>Faixa etária dos membros.</CardDescription>
              </CardHeader>
              <CardContent className="h-60">
                <div className="h-full w-full rounded-md bg-muted flex items-center justify-center">
                  <p className="text-muted-foreground">Gráfico de Idades</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
