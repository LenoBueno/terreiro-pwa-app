"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, Plus, Trash2, CheckCircle2, Calendar, DollarSign, ShoppingBag } from "lucide-react"

// Dados simulados de listas de compras
const listaInicial = [
  {
    id: 1,
    nome: "Lista para Gira de Caboclos",
    data: "12/05/2025",
    responsavel: "Maria da Mata",
    valorEstimado: "R$ 250,00",
    status: "pendente",
    itens: [
      { id: 1, nome: "Velas brancas", quantidade: 20, comprado: false },
      { id: 2, nome: "Ervas para defumação", quantidade: 5, comprado: false },
      { id: 3, nome: "Bebidas", quantidade: 10, comprado: false },
      { id: 4, nome: "Frutas", quantidade: 15, comprado: false },
    ],
  },
  {
    id: 2,
    nome: "Lista para Festa de Pretos Velhos",
    data: "20/05/2025",
    responsavel: "João da Paz",
    valorEstimado: "R$ 350,00",
    status: "pendente",
    itens: [
      { id: 1, nome: "Velas pretas", quantidade: 15, comprado: false },
      { id: 2, nome: "Fumo de corda", quantidade: 5, comprado: false },
      { id: 3, nome: "Café", quantidade: 3, comprado: false },
      { id: 4, nome: "Doces variados", quantidade: 30, comprado: false },
      { id: 5, nome: "Bebidas", quantidade: 10, comprado: false },
    ],
  },
  {
    id: 3,
    nome: "Mantimentos Gerais do Mês",
    data: "01/05/2025",
    responsavel: "Ana Clara",
    valorEstimado: "R$ 500,00",
    status: "concluida",
    itens: [
      { id: 1, nome: "Produtos de limpeza", quantidade: 10, comprado: true },
      { id: 2, nome: "Velas brancas", quantidade: 50, comprado: true },
      { id: 3, nome: "Ervas diversas", quantidade: 15, comprado: true },
      { id: 4, nome: "Bebidas", quantidade: 20, comprado: true },
      { id: 5, nome: "Incensos", quantidade: 30, comprado: true },
    ],
  },
]

export default function ComprasPage() {
  const [listas, setListas] = useState(listaInicial)
  const [novoItem, setNovoItem] = useState({ nome: "", quantidade: 1 })
  const [listaAtiva, setListaAtiva] = useState<number | null>(null)

  // Marcar item como comprado
  const marcarComoComprado = (listaId: number, itemId: number) => {
    setListas(
      listas.map((lista) => {
        if (lista.id === listaId) {
          return {
            ...lista,
            itens: lista.itens.map((item) => (item.id === itemId ? { ...item, comprado: !item.comprado } : item)),
          }
        }
        return lista
      }),
    )
  }

  // Adicionar novo item à lista
  const adicionarItem = (listaId: number) => {
    if (novoItem.nome.trim() === "") return

    setListas(
      listas.map((lista) => {
        if (lista.id === listaId) {
          return {
            ...lista,
            itens: [
              ...lista.itens,
              {
                id: lista.itens.length + 1,
                nome: novoItem.nome,
                quantidade: novoItem.quantidade,
                comprado: false,
              },
            ],
          }
        }
        return lista
      }),
    )

    setNovoItem({ nome: "", quantidade: 1 })
  }

  // Remover item da lista
  const removerItem = (listaId: number, itemId: number) => {
    setListas(
      listas.map((lista) => {
        if (lista.id === listaId) {
          return {
            ...lista,
            itens: lista.itens.filter((item) => item.id !== itemId),
          }
        }
        return lista
      }),
    )
  }

  // Marcar lista como concluída
  const concluirLista = (listaId: number) => {
    setListas(
      listas.map((lista) =>
        lista.id === listaId
          ? {
              ...lista,
              status: "concluida",
              itens: lista.itens.map((item) => ({ ...item, comprado: true })),
            }
          : lista,
      ),
    )
  }

  // Filtrar listas por status
  const listasPendentes = listas.filter((lista) => lista.status === "pendente")
  const listasConcluidas = listas.filter((lista) => lista.status === "concluida")

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Listas de Compras</h1>
        <p className="text-muted-foreground">Gerencie as listas de compras e mantimentos do terreiro.</p>
      </div>

      <Tabs defaultValue="pendentes" className="mb-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pendentes">Pendentes</TabsTrigger>
          <TabsTrigger value="concluidas">Concluídas</TabsTrigger>
        </TabsList>
        <TabsContent value="pendentes">
          <div className="space-y-6 mt-6">
            {listasPendentes.length > 0 ? (
              listasPendentes.map((lista) => (
                <Card key={lista.id} className="h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-xl">{lista.nome}</CardTitle>
                      <Badge variant="outline" className="bg-amber-600 text-white">
                        Pendente
                      </Badge>
                    </div>
                    <CardDescription>Lista de compras e mantimentos</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                          <Calendar className="h-5 w-5 text-terreiro-green" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Data</p>
                          <p className="text-sm text-muted-foreground">{lista.data}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                          <ShoppingBag className="h-5 w-5 text-terreiro-green" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Responsável</p>
                          <p className="text-sm text-muted-foreground">{lista.responsavel}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                          <DollarSign className="h-5 w-5 text-terreiro-green" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Valor Estimado</p>
                          <p className="text-sm text-muted-foreground">{lista.valorEstimado}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-medium">Itens</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setListaAtiva(listaAtiva === lista.id ? null : lista.id)}
                        >
                          {listaAtiva === lista.id ? "Fechar" : "Adicionar Item"}
                        </Button>
                      </div>

                      {listaAtiva === lista.id && (
                        <div className="flex flex-col md:flex-row gap-2 mb-4">
                          <div className="flex-grow">
                            <Label htmlFor={`item-nome-${lista.id}`} className="sr-only">
                              Nome do Item
                            </Label>
                            <Input
                              id={`item-nome-${lista.id}`}
                              placeholder="Nome do item"
                              value={novoItem.nome}
                              onChange={(e) => setNovoItem({ ...novoItem, nome: e.target.value })}
                            />
                          </div>
                          <div className="w-full md:w-24">
                            <Label htmlFor={`item-qtd-${lista.id}`} className="sr-only">
                              Quantidade
                            </Label>
                            <Input
                              id={`item-qtd-${lista.id}`}
                              type="number"
                              min="1"
                              placeholder="Qtd"
                              value={novoItem.quantidade}
                              onChange={(e) =>
                                setNovoItem({ ...novoItem, quantidade: Number.parseInt(e.target.value) || 1 })
                              }
                            />
                          </div>
                          <Button onClick={() => adicionarItem(lista.id)}>
                            <Plus className="h-4 w-4" />
                            <span className="sr-only md:not-sr-only md:ml-2">Adicionar</span>
                          </Button>
                        </div>
                      )}

                      <div className="border rounded-md">
                        <div className="grid grid-cols-12 gap-2 p-3 border-b bg-muted/50 font-medium text-sm">
                          <div className="col-span-7">Item</div>
                          <div className="col-span-2 text-center">Qtd</div>
                          <div className="col-span-3 text-right">Ações</div>
                        </div>
                        {lista.itens.length > 0 ? (
                          lista.itens.map((item) => (
                            <div
                              key={item.id}
                              className={`grid grid-cols-12 gap-2 p-3 border-b last:border-0 text-sm ${
                                item.comprado ? "bg-muted/30" : ""
                              }`}
                            >
                              <div className="col-span-7 flex items-center">
                                <span className={item.comprado ? "line-through text-muted-foreground" : ""}>
                                  {item.nome}
                                </span>
                              </div>
                              <div className="col-span-2 text-center">{item.quantidade}</div>
                              <div className="col-span-3 flex justify-end gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => marcarComoComprado(lista.id, item.id)}
                                >
                                  <CheckCircle2
                                    className={`h-4 w-4 ${
                                      item.comprado ? "text-terreiro-green" : "text-muted-foreground"
                                    }`}
                                  />
                                  <span className="sr-only">
                                    {item.comprado ? "Desmarcar" : "Marcar como comprado"}
                                  </span>
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => removerItem(lista.id, item.id)}>
                                  <Trash2 className="h-4 w-4 text-terreiro-red" />
                                  <span className="sr-only">Remover</span>
                                </Button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-4 text-center text-muted-foreground">
                            Nenhum item na lista. Adicione itens para começar.
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-terreiro-green hover:bg-terreiro-green/90"
                      onClick={() => concluirLista(lista.id)}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Marcar Lista como Concluída
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Nenhuma lista pendente</h3>
                <p className="text-muted-foreground">Todas as listas foram concluídas.</p>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="concluidas">
          <div className="space-y-6 mt-6">
            {listasConcluidas.length > 0 ? (
              listasConcluidas.map((lista) => (
                <Card key={lista.id} className="h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-xl">{lista.nome}</CardTitle>
                      <Badge variant="outline" className="bg-terreiro-green text-white">
                        Concluída
                      </Badge>
                    </div>
                    <CardDescription>Lista de compras e mantimentos</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                          <Calendar className="h-5 w-5 text-terreiro-green" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Data</p>
                          <p className="text-sm text-muted-foreground">{lista.data}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                          <ShoppingBag className="h-5 w-5 text-terreiro-green" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Responsável</p>
                          <p className="text-sm text-muted-foreground">{lista.responsavel}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                          <DollarSign className="h-5 w-5 text-terreiro-green" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Valor Estimado</p>
                          <p className="text-sm text-muted-foreground">{lista.valorEstimado}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-2">Itens</h3>
                      <div className="border rounded-md">
                        <div className="grid grid-cols-12 gap-2 p-3 border-b bg-muted/50 font-medium text-sm">
                          <div className="col-span-8">Item</div>
                          <div className="col-span-2 text-center">Qtd</div>
                          <div className="col-span-2 text-center">Status</div>
                        </div>
                        {lista.itens.map((item) => (
                          <div
                            key={item.id}
                            className="grid grid-cols-12 gap-2 p-3 border-b last:border-0 text-sm bg-muted/30"
                          >
                            <div className="col-span-8 flex items-center">
                              <span className="line-through text-muted-foreground">{item.nome}</span>
                            </div>
                            <div className="col-span-2 text-center">{item.quantidade}</div>
                            <div className="col-span-2 text-center">
                              <Badge variant="outline" className="bg-terreiro-green text-white">
                                Comprado
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <CheckCircle2 className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Nenhuma lista concluída</h3>
                <p className="text-muted-foreground">As listas ainda estão pendentes.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
