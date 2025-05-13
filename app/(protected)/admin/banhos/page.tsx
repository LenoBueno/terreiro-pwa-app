"use client"

import { useState } from "react"
import { Edit, Trash2, ArrowLeft, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FormBanhos } from "./FormBanhos"
import { ervasMock, Erva } from "../ervas/page"

// Dados simulados
export type Banho = {
  id: number
  titulo: string
  subtitulo: string
  categoria: string
  ervas: number[]
}

const banhosMock: Banho[] = [
  { id: 1, titulo: "Banho de Descarrego", subtitulo: "Limpeza profunda", categoria: "limpeza", ervas: [1,2] },
  { id: 2, titulo: "Banho de Abertura de Caminhos", subtitulo: "Prosperidade e oportunidades", categoria: "prosperidade", ervas: [5,8] },
]

export default function AdminBanhosPage() {
  const router = useRouter()
  const [banhos, setBanhos] = useState<Banho[]>(banhosMock)
  const [activeTab, setActiveTab] = useState("todos")
  const [searchTerm, setSearchTerm] = useState("")
  const [openDialog, setOpenDialog] = useState(false)
  const [editBanho, setEditBanho] = useState<Banho | null>(null)

  const filteredBanhos = banhos.filter((banho) => banho.titulo.toLowerCase().includes(searchTerm.toLowerCase()))

  function handleAdd() {
    setEditBanho(null)
    setOpenDialog(true)
  }

  function handleEdit(banho: Banho) {
    setEditBanho(banho)
    setOpenDialog(true)
  }

  function handleClose() {
    setOpenDialog(false)
    setEditBanho(null)
  }

  function handleSubmit(data: Omit<Banho, "id">) {
    if (editBanho) {
      setBanhos(banhos.map(b => b.id === editBanho.id ? { ...editBanho, ...data } : b))
    } else {
      setBanhos([...banhos, { ...data, id: Math.max(...banhos.map(b => b.id), 0) + 1 }])
    }
    setOpenDialog(false)
    setEditBanho(null)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Gerenciar Banhos</h1>
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
          <Button variant="ghost" className="admin-button" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          <Button className="admin-button bg-terreiro-green hover:bg-terreiro-green/90" onClick={handleAdd}>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar
          </Button>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editBanho ? 'Editar Banho' : 'Adicionar Banho'}</DialogTitle>
              </DialogHeader>
              <FormBanhos
                initialData={editBanho ?? undefined}
                ervasDisponiveis={ervasMock}
                onSubmit={handleSubmit}
                onCancel={handleClose}
              />
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex border-b ml-4">
          <button
            onClick={() => setActiveTab("todos")}
            className={`admin-tab ${
              activeTab === "todos"
                ? "border-b-2 border-terreiro-green text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setActiveTab("limpeza")}
            className={`admin-tab ${
              activeTab === "limpeza"
                ? "border-b-2 border-terreiro-green text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Limpeza
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
            onClick={() => setActiveTab("protecao")}
            className={`admin-tab ${
              activeTab === "protecao"
                ? "border-b-2 border-terreiro-green text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Proteção
          </button>
        </div>
      </div>

      {/* Lista de Banhos em formato de tabela */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left align-middle font-medium text-muted-foreground px-4">Título</TableHead>
              <TableHead className="text-left align-middle font-medium text-muted-foreground px-4">Subtítulo</TableHead>
              <TableHead className="text-left align-middle font-medium text-muted-foreground px-4">Categoria</TableHead>
              <TableHead className="text-left align-middle font-medium text-muted-foreground px-4">Ervas</TableHead>
              <TableHead className="text-center align-middle font-medium text-muted-foreground px-4">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBanhos.map(banho => (
              <TableRow key={banho.id}>
                <TableCell className="text-left align-middle px-4">{banho.titulo}</TableCell>
                <TableCell className="text-left align-middle px-4">{banho.subtitulo}</TableCell>
                <TableCell className="text-left align-middle px-4">{banho.categoria}</TableCell>
                <TableCell className="text-left align-middle px-4">{banho.ervas.map(id => ervasMock.find(e => e.id === id)?.nome).filter(Boolean).join(", ")}</TableCell>
                <TableCell className="text-center align-middle px-4">
                  <div className="inline-flex justify-center gap-2 items-center">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(banho)}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Editar</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="text-terreiro-red">
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
