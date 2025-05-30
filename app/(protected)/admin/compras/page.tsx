"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2, Edit, Plus, Search, Trash, Trash2, X, ArrowLeft } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import FormCompras from "./FormCompras"
import { useMediaQuery } from "../../../../hooks/use-media-query"
import dynamic from "next/dynamic"

// Carrega o componente mobile apenas no cliente
const AdminComprasMobile = dynamic(
  () => import('./AdminComprasMobile'),
  { ssr: false }
)

// Dados simulados de compras
const comprasIniciais = [
  {
    id: 1,
    item: "Velas brancas",
    quantidade: 50,
    unidade: "unidade",
    preco: 2.5,
    total: 125,
    categoria: "ritual",
    responsavel: "Maria da Mata",
    dataCompra: "10/05/2025",
    status: "pendente",
  },
  {
    id: 2,
    item: "Ervas para banho",
    quantidade: 10,
    unidade: "kg",
    preco: 15,
    total: 150,
    categoria: "ervas",
    responsavel: "João da Paz",
    dataCompra: "12/05/2025",
    status: "pendente",
  },
]

export default function AdminComprasPage() {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [isClient, setIsClient] = useState(false)
  const [compras, setCompras] = useState(comprasIniciais)
  const [filtro, setFiltro] = useState("todos")
  const [busca, setBusca] = useState("")
  const [novaCompra, setNovaCompra] = useState({
    item: "",
    quantidade: 0,
    unidade: "unidade",
    preco: 0,
    categoria: "ritual",
    responsavel: "",
  })
  const [compraEditando, setCompraEditando] = useState<any>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogEditOpen, setDialogEditOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("todos")
  const router = useRouter()

  // Evita hidratação desnecessária
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Se for mobile e o cliente já estiver carregado, renderiza o componente mobile
  if (isMobile && isClient) {
    return <AdminComprasMobile />
  }

  // Filtrar compras
  const comprasFiltradas = compras
    .filter((compra) => {
      if (filtro === "pendentes") return compra.status === "pendente"
      if (filtro === "concluidas") return compra.status === "concluida"
      if (filtro === "ritual") return compra.categoria === "ritual"
      if (filtro === "ervas") return compra.categoria === "ervas"
      if (filtro === "limpeza") return compra.categoria === "limpeza"
      if (filtro === "alimentacao") return compra.categoria === "alimentacao"
      return true
    })
    .filter(
      (compra) =>
        compra.item.toLowerCase().includes(busca.toLowerCase()) ||
        compra.responsavel.toLowerCase().includes(busca.toLowerCase()),
    )

  // Adicionar nova compra
  const adicionarCompra = () => {
    if (
      !novaCompra.item ||
      novaCompra.quantidade <= 0 ||
      novaCompra.preco <= 0 ||
      !novaCompra.unidade ||
      !novaCompra.categoria ||
      !novaCompra.responsavel
    )
      return

    const novaCompraObj = {
      id: compras.length + 1,
      item: novaCompra.item,
      quantidade: novaCompra.quantidade,
      unidade: novaCompra.unidade,
      preco: novaCompra.preco,
      total: novaCompra.quantidade * novaCompra.preco,
      categoria: novaCompra.categoria,
      responsavel: novaCompra.responsavel,
      dataCompra: new Date().toLocaleDateString("pt-BR"),
      status: "pendente",
    }

    setCompras([...compras, novaCompraObj])
    setNovaCompra({
      item: "",
      quantidade: 0,
      unidade: "unidade",
      preco: 0,
      categoria: "ritual",
      responsavel: "",
    })
    setDialogOpen(false)
  }

  // Editar compra
  const editarCompra = () => {
    if (!compraEditando) return

    setCompras(
      compras.map((compra) => {
        if (compra.id === compraEditando.id) {
          return {
            ...compra,
            item: compraEditando.item,
            quantidade: compraEditando.quantidade,
            unidade: compraEditando.unidade,
            preco: compraEditando.preco,
            total: compraEditando.quantidade * compraEditando.preco,
            categoria: compraEditando.categoria,
            responsavel: compraEditando.responsavel,
          }
        }
        return compra
      }),
    )

    setCompraEditando(null)
    setDialogEditOpen(false)
  }

  // Marcar compra como concluída
  const marcarComoConcluida = (id: number) => {
    setCompras(
      compras.map((compra) => {
        if (compra.id === id) {
          return { ...compra, status: "concluida" }
        }
        return compra
      }),
    )
  }

  // Excluir compra
  const excluirCompra = (id: number) => {
    if (confirm("Tem certeza que deseja excluir esta compra?")) {
      setCompras(compras.filter((compra) => compra.id !== id))
    }
  }

  // Função para obter a cor do badge baseado na categoria
  function getCategoriaBadge(categoria: string) {
    switch (categoria) {
      case "ritual":
        return "bg-terreiro-green text-white"
      case "ervas":
        return "bg-green-600 text-white"
      case "limpeza":
        return "bg-blue-600 text-white"
      case "alimentacao":
        return "bg-amber-600 text-white"
      default:
        return "bg-gray-600 text-white"
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Gerenciar Compras</h1>
      <div className="relative w-full max-w-xs mb-4">
        <Input
          type="search"
          placeholder="Procurar"
          className="w-full"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        {busca && (
          <button onClick={() => setBusca("")} className="absolute right-2 top-1/2 -translate-y-1/2">
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Botões à esquerda e abas à direita, padrão admin */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="admin-button" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="admin-button bg-terreiro-green hover:bg-terreiro-green/90 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Adicionar
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <FormCompras
                values={novaCompra}
                onChange={values => setNovaCompra({ ...novaCompra, ...values })}
                onSubmit={adicionarCompra}
                onCancel={() => setDialogOpen(false)}
                submitLabel="Adicionar"
              />
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex border-b ml-4">
          <button
            onClick={() => setFiltro("todos")}
            className={`admin-tab ${
              filtro === "todos"
                ? "border-b-2 border-terreiro-green text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFiltro("pendentes")}
            className={`admin-tab ${
              filtro === "pendentes"
                ? "border-b-2 border-terreiro-green text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Pendentes
          </button>
          <button
            onClick={() => setFiltro("concluidas")}
            className={`admin-tab ${
              filtro === "concluidas"
                ? "border-b-2 border-terreiro-green text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Concluídos
          </button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left align-middle font-medium text-muted-foreground px-4">Item</TableHead>
              <TableHead className="text-left align-middle font-medium text-muted-foreground px-4">Quantidade</TableHead>
              <TableHead className="text-left align-middle font-medium text-muted-foreground px-4">Preço Unit.</TableHead>
              <TableHead className="text-left align-middle font-medium text-muted-foreground px-4">Responsável</TableHead>
              <TableHead className="text-left align-middle font-medium text-muted-foreground px-4">Categoria</TableHead>
              <TableHead className="text-left align-middle font-medium text-muted-foreground px-4">Status</TableHead>
              <TableHead className="text-center align-middle font-medium text-muted-foreground px-4">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comprasFiltradas.map((compra) => (
              <TableRow key={compra.id} className={compra.status === "concluida" ? "opacity-70" : ""}>
                <TableCell className="text-left align-middle px-4">{compra.item}</TableCell>
                <TableCell className="text-left align-middle px-4">
                  {compra.quantidade} {compra.unidade}
                </TableCell>
                <TableCell className="text-left align-middle px-4">R$ {compra.preco.toFixed(2)}</TableCell>
                <TableCell className="text-left align-middle px-4">{compra.responsavel}</TableCell>
                <TableCell className="text-left align-middle px-4">
  {compra.categoria === "ritual"
    ? "Ritual"
    : compra.categoria === "ervas"
      ? "Ervas"
      : compra.categoria === "limpeza"
        ? "Limpeza"
        : "Alimentação"}
</TableCell>
                <TableCell className="text-left align-middle px-4">
  {compra.status === "pendente" ? "Pendente" : "Concluída"}
</TableCell>
                <TableCell className="text-center align-middle px-4">
                  <div className="inline-flex justify-center gap-2 items-center">
                    <Button variant="ghost" size="icon" onClick={() => { setCompraEditando(compra); setDialogEditOpen(true); }}>
  <Edit className="h-4 w-4" />
  <span className="sr-only">Editar</span>
</Button>
<Button
  variant="ghost"
  size="icon"
  onClick={() => excluirCompra(compra.id)}
  className="text-terreiro-red"
>
  <Trash2 className="h-4 w-4" />
  <span className="sr-only">Excluir</span>
</Button>
{compra.status === "pendente" && (
  <Button
    variant="ghost"
    size="icon"
    onClick={() => marcarComoConcluida(compra.id)}
    className="text-terreiro-green"
  >
    <CheckCircle2 className="h-4 w-4" />
    <span className="sr-only">Concluir</span>
  </Button>
) }
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogEditOpen} onOpenChange={setDialogEditOpen}>
        <DialogContent className="max-w-md">
          {compraEditando && (
            <>
              <DialogHeader>
                <DialogTitle>Editar Compra</DialogTitle>
                <DialogDescription>Edite os dados da compra.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-item">Item</Label>
                  <Input
                    id="edit-item"
                    value={compraEditando.item}
                    onChange={(e) => setCompraEditando({ ...compraEditando, item: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-quantidade">Quantidade</Label>
                    <Input
                      id="edit-quantidade"
                      type="number"
                      min="1"
                      value={compraEditando.quantidade}
                      onChange={(e) =>
                        setCompraEditando({ ...compraEditando, quantidade: Number.parseFloat(e.target.value) || 0 })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-unidade">Unidade</Label>
                    <Select
                      value={compraEditando.unidade}
                      onValueChange={(value) => setCompraEditando({ ...compraEditando, unidade: value })}
                    >
                      <SelectTrigger id="edit-unidade">
                        <SelectValue placeholder="Selecione a unidade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unidade">Unidade</SelectItem>
                        <SelectItem value="kg">Kg</SelectItem>
                        <SelectItem value="litro">Litro</SelectItem>
                        <SelectItem value="pacote">Pacote</SelectItem>
                        <SelectItem value="kit">Kit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-preco">Preço Unitário (R$)</Label>
                  <Input
                    id="edit-preco"
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={compraEditando.preco}
                    onChange={(e) =>
                      setCompraEditando({ ...compraEditando, preco: Number.parseFloat(e.target.value) || 0 })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-categoria">Categoria</Label>
                  <Select
                    value={compraEditando.categoria}
                    onValueChange={(value) => setCompraEditando({ ...compraEditando, categoria: value })}
                  >
                    <SelectTrigger id="edit-categoria">
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ritual">Ritual</SelectItem>
                      <SelectItem value="ervas">Ervas</SelectItem>
                      <SelectItem value="limpeza">Limpeza</SelectItem>
                      <SelectItem value="alimentacao">Alimentação</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-responsavel">Responsável</Label>
                  <Input
                    id="edit-responsavel"
                    value={compraEditando.responsavel}
                    onChange={(e) => setCompraEditando({ ...compraEditando, responsavel: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogEditOpen(false)}>
                  Cancelar
                </Button>
                <Button className="bg-terreiro-green hover:bg-terreiro-green/90" onClick={editarCompra}>
                  Salvar Alterações
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
