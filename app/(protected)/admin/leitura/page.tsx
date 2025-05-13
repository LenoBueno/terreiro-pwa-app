"use client"

import { useState } from "react"
import { Edit, Trash2, ArrowLeft, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

// Dados simulados iniciais
const materiaisMock = [
  { id: 1, titulo: "Guia Completo dos Orixás", subtitulo: "Tudo sobre Orixás", autor: "Carlos Silva", paginas: 120, arquivo: "guia-orixas.pdf" },
  { id: 2, titulo: "Ervas Sagradas e seus Usos", subtitulo: "Ervas e Magia", autor: "Maria da Mata", paginas: 80, arquivo: "ervas-usos.pdf" },
];

function normalizeMaterial(m: any): { id: number; titulo: string; subtitulo: string; autor: string; paginas: number; arquivo: string } {
  return {
    id: m.id,
    titulo: m.titulo,
    subtitulo: m.subtitulo ?? "",
    autor: m.autor ?? "",
    paginas: m.paginas ?? 0,
    arquivo: typeof m.arquivo === "string" ? m.arquivo : "",
  };
}

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import FormLeitura from "./FormLeitura";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

export default function AdminLeituraPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("todos")
  const [searchTerm, setSearchTerm] = useState("")
  const [openDialog, setOpenDialog] = useState(false)
  const [materialEdit, setMaterialEdit] = useState<any | null>(null)
  const [materiais, setMateriais] = useState(materiaisMock)

  const filteredMateriais = materiais.filter(
    (material) =>
      material.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.autor.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="w-full bg-white flex flex-col pt-2 pb-[132px]" style={{ minHeight: '500px' }}>
      <h1 className="text-2xl font-bold mb-1">Gerenciar Leitura</h1>

      {/* Barra de pesquisa */}
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
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button className="admin-button bg-terreiro-green hover:bg-terreiro-green/90" onClick={() => { setMaterialEdit(null); setOpenDialog(true); }}>
                <Plus className="mr-2 h-4 w-4" />
                Adicionar
              </Button>
            </DialogTrigger>
            <DialogContent>
              <FormLeitura
                {...(materialEdit ? { initial: materialEdit } : {})}
                onCancel={() => setOpenDialog(false)}
                onSave={(material) => {
                  const normalizado = normalizeMaterial({ ...material, id: materialEdit ? materialEdit.id : Math.max(0, ...materiais.map(m => m.id)) + 1 });
                  if (materialEdit) {
                    setMateriais(materiais.map(m => m.id === materialEdit.id ? normalizado : m));
                  } else {
                    setMateriais([...materiais, normalizado]);
                  }
                  setOpenDialog(false);
                  setMaterialEdit(null);
                }}
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
            onClick={() => setActiveTab("estudos")}
            className={`admin-tab ${
              activeTab === "estudos"
                ? "border-b-2 border-terreiro-green text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Estudos
          </button>
          <button
            onClick={() => setActiveTab("guias")}
            className={`admin-tab ${
              activeTab === "guias"
                ? "border-b-2 border-terreiro-green text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Guias
          </button>
          <button
            onClick={() => setActiveTab("historia")}
            className={`admin-tab ${
              activeTab === "historia"
                ? "border-b-2 border-terreiro-green text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            História
          </button>
        </div>
      </div>

      {/* Lista de Materiais em formato de tabela */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left align-middle font-medium text-muted-foreground px-4">Título</TableHead>
              <TableHead className="text-left align-middle font-medium text-muted-foreground px-4">Subtítulo</TableHead>
              <TableHead className="text-left align-middle font-medium text-muted-foreground px-4">Autor</TableHead>
              <TableHead className="text-left align-middle font-medium text-muted-foreground px-4">Páginas</TableHead>
              <TableHead className="text-left align-middle font-medium text-muted-foreground px-4">Arquivo</TableHead>
              <TableHead className="text-center align-middle font-medium text-muted-foreground px-4">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMateriais.map(material => (
              <TableRow key={material.id}>
                <TableCell className="text-left align-middle px-4">{material.titulo}</TableCell>
                <TableCell className="text-left align-middle px-4">{material.subtitulo}</TableCell>
                <TableCell className="text-left align-middle px-4">{material.autor}</TableCell>
                <TableCell className="text-left align-middle px-4">{material.paginas}</TableCell>
                <TableCell className="text-left align-middle px-4">
                  {material.arquivo ? (
                    typeof material.arquivo === 'string' ? (
                      <a href={material.arquivo} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{material.arquivo}</a>
                    ) : (
                      <span className="text-green-700 font-semibold">Arquivo enviado</span>
                    )
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </TableCell>
                <TableCell className="text-center align-middle px-4">
                  <div className="inline-flex justify-center gap-2 items-center">
                    <Button variant="ghost" size="icon" onClick={() => { setMaterialEdit(material); setOpenDialog(true); }}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Editar</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setMateriais(materiais.filter(m => m.id !== material.id))} className="text-terreiro-red">
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
