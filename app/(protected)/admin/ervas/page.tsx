"use client"

import { useState } from "react"
import { Edit, Trash2, ArrowLeft, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import { FormErvas } from "./FormErvas"

// Dados simulados
export type Erva = {
  id: number
  nome: string
  nomeCientifico: string
  descricao: string
  categoria: string
}

export const ervasMock: Erva[] = [
  {
    id: 1,
    nome: "Arruda",
    nomeCientifico: "Ruta graveolens",
    descricao: "Erva de proteção espiritual e limpeza energética.",
    categoria: "proteção",
  },
  {
    id: 2,
    nome: "Guiné",
    nomeCientifico: "Petiveria alliacea",
    descricao: "Utilizada para afastar energias negativas e proteção.",
    categoria: "proteção",
  },  
]


export default function AdminErvasPage() {
  const handleDelete = (id: number) => {
    setErvas((prev) => prev.filter((erva) => erva.id !== id));
  };
  const router = useRouter()
  const [ervas, setErvas] = useState<Erva[]>(ervasMock)
  const [activeTab, setActiveTab] = useState("todas")
  const [searchTerm, setSearchTerm] = useState("")
  const [openDialog, setOpenDialog] = useState(false)
  const [editErva, setEditErva] = useState<Erva | null>(null)

  const filteredErvas = ervas.filter((erva) => erva.nome.toLowerCase().includes(searchTerm.toLowerCase()))

  function handleAdd() {
    setEditErva(null)
    setOpenDialog(true)
  }

  function handleEdit(erva: Erva) {
    setEditErva(erva)
    setOpenDialog(true)
  }

  function handleClose() {
    setOpenDialog(false)
    setEditErva(null)
  }

  function handleSubmit(data: Omit<Erva, "id">) {
    if (editErva) {
      setErvas(ervas.map(e => e.id === editErva.id ? { ...editErva, ...data } : e))
    } else {
      setErvas([...ervas, { ...data, id: Math.max(...ervas.map(e => e.id), 0) + 1 }])
    }
    setOpenDialog(false)
    setEditErva(null)
  }

  const handleBack = () => {
    console.log("Navigating to admin dashboard");
    router.push("/admin/dashboard");
  };

  return (
    <div className="w-full bg-white flex flex-col pt-5 pb-[132px]" style={{ minHeight: '500px' }}>
      <h1 className="text-2xl font-bold mb-1">Gerenciar Ervas</h1>
      <div className="relative w-full max-w-xs mb-4">
        <Input
          type="search"
          placeholder="Procurar"
          className="w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button onClick={() => setSearchTerm("")} className="absolute right-2 top-1/2 -translate-y-1/2">
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Botões à esquerda e abas à direita */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Link href="/admin/dashboard">
            <Button variant="ghost" className="admin-button">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          </Link>
          <Button className="admin-button bg-terreiro-green hover:bg-terreiro-green/90" onClick={handleAdd}>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar
          </Button>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editErva ? 'Editar Erva' : 'Adicionar Erva'}</DialogTitle>
              </DialogHeader>
              <FormErvas
                initialData={editErva ?? undefined}
                onSubmit={handleSubmit}
                onCancel={handleClose}
              />
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex border-b ml-4">
          <button
            onClick={() => setActiveTab("todas")}
            className={`admin-tab ${
              activeTab === "todas"
                ? "border-b-2 border-terreiro-green text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setActiveTab("protecao")}
            className={`admin-tab ${
              activeTab === "protecao"
                ? "border-b-2 border-terreiro-green text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Proteção
          </button>
          <button
            onClick={() => setActiveTab("prosperidade")}
            className={`admin-tab ${
              activeTab === "prosperidade"
                ? "border-b-2 border-terreiro-green text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Prosperidade
          </button>
          <button
            onClick={() => setActiveTab("harmonia")}
            className={`admin-tab ${
              activeTab === "harmonia"
                ? "border-b-2 border-terreiro-green text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Harmonia
          </button>
        </div>
      </div>

      {/* Lista de Ervas em formato de tabela */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left align-middle font-medium text-muted-foreground px-4">Nome</TableHead>
              <TableHead className="text-left align-middle font-medium text-muted-foreground px-4">Nome Científico</TableHead>
              <TableHead className="text-left align-middle font-medium text-muted-foreground px-4">Descrição</TableHead>
              <TableHead className="text-left align-middle font-medium text-muted-foreground px-4">Categoria</TableHead>
              <TableHead className="text-center align-middle font-medium text-muted-foreground px-4">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredErvas.map((erva) => (
              <TableRow key={erva.id}>
                <TableCell className="text-left align-middle px-4">{erva.nome}</TableCell>
                <TableCell className="text-left align-middle px-4">{erva.nomeCientifico}</TableCell>
                <TableCell className="text-left align-middle px-4">{erva.descricao}</TableCell>
                <TableCell className="text-left align-middle px-4">{erva.categoria}</TableCell>
                <TableCell className="text-center align-middle px-4">
                  <div className="inline-flex justify-center gap-2 items-center">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(erva)}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Editar</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="text-terreiro-red" onClick={() => handleDelete(erva.id)}>
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Excluir</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
