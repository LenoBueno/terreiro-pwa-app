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

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FormUsuarios } from "./FormUsuarios"

export type Usuario = {
  id: number
  nome: string
  sobrenome: string
  dataNascimento: string
  telefone: string
  email: string
  orixa: string
  dataBatismo: string
  dataObrigacao: string
  cargo: string
  ativo: boolean
}

const usuariosMock: Usuario[] = [
  { id: 1, nome: "Maria", sobrenome: "da Mata", dataNascimento: "1990-01-01", telefone: "(11) 99999-1111", email: "maria@email.com", orixa: "Oxum", dataBatismo: "2000-01-01", dataObrigacao: "2010-01-01", cargo: "admin", ativo: true },
  { id: 2, nome: "João", sobrenome: "da Paz", dataNascimento: "1985-05-10", telefone: "(21) 98888-2222", email: "joao@email.com", orixa: "Ogum", dataBatismo: "2001-05-10", dataObrigacao: "2011-05-10", cargo: "membro", ativo: false },
]

import dynamic from "next/dynamic"
import { useMediaQuery } from "react-responsive"
const AdminUsersDesktop = dynamic(() => import("./AdminUsersDesktop"), { ssr: false })
const AdminUsersMobile = dynamic(() => import("./AdminUsersMobile"), { ssr: false })

export default function AdminUsersPage() {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  if (typeof window === 'undefined') return null // Evita erro no SSR

  const router = useRouter()
  const [usuarios, setUsuarios] = useState<Usuario[]>(usuariosMock)
  const [activeTab, setActiveTab] = useState("todos")
  const [searchTerm, setSearchTerm] = useState("")
  const [openDialog, setOpenDialog] = useState(false)
  const [editUsuario, setEditUsuario] = useState<Usuario | null>(null)

  const filteredUsuarios = usuarios.filter(
    (usuario) =>
      (usuario.nome + ' ' + usuario.sobrenome).toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.orixa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  function handleDelete(usuario: Usuario) {
    setUsuarios(us => us.filter(u => u.id !== usuario.id))
  }

  function handleAdd() {
    setEditUsuario(null)
    setOpenDialog(true)
  }

  function handleEdit(usuario: Usuario) {
    setEditUsuario(usuario)
    setOpenDialog(true)
  }

  function handleClose() {
    setOpenDialog(false)
    setEditUsuario(null)
  }

  function handleSubmit(data: Omit<Usuario, "id">) {
    if (editUsuario) {
      setUsuarios(usuarios.map(u => u.id === editUsuario.id ? { ...editUsuario, ...data } : u))
    } else {
      setUsuarios([...usuarios, { ...data, id: Math.max(...usuarios.map(u => u.id), 0) + 1 }])
    }
    setOpenDialog(false)
    setEditUsuario(null)
  }

  return (
    <div className="w-full bg-white flex flex-col pt-2 pb-[132px]" style={{ minHeight: '500px' }}>
      <h1 className="text-2xl font-bold mb-1">Gerenciar Usuários</h1>
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
          <Button variant="ghost" onClick={() => router.back()}>
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
                <DialogTitle>{editUsuario ? 'Editar Usuário' : 'Adicionar Usuário'}</DialogTitle>
              </DialogHeader>
              <FormUsuarios
                initialData={editUsuario ?? undefined}
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
    onClick={() => setActiveTab("admins")}
    className={`admin-tab ${
      activeTab === "admins"
        ? "border-b-2 border-terreiro-green text-terreiro-green"
        : "text-gray-600"
    }`}
  >
    Administradores
  </button>
  <button
    onClick={() => setActiveTab("membros")}
    className={`admin-tab ${
      activeTab === "membros"
        ? "border-b-2 border-terreiro-green text-terreiro-green"
        : "text-gray-600"
    }`}
  >
    Membros
  </button>
</div>
      </div>

      {/* Lista de Usuários em formato de tabela */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left align-middle font-medium text-muted-foreground px-4">Nome</TableHead>
              <TableHead className="text-left align-middle font-medium text-muted-foreground px-4">Sobrenome</TableHead>
              <TableHead className="text-left align-middle font-medium text-muted-foreground px-4">Data de Nascimento</TableHead>
              <TableHead className="text-left align-middle font-medium text-muted-foreground px-4">Cargo</TableHead>
              <TableHead className="text-center align-middle font-medium text-muted-foreground px-4">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsuarios.map(usuario => (
              <TableRow key={usuario.id}>
                <TableCell className="text-left align-middle px-4">{usuario.nome}</TableCell>
                <TableCell className="text-left align-middle px-4">{usuario.sobrenome}</TableCell>
                <TableCell className="text-left align-middle px-4">{usuario.dataNascimento}</TableCell>
                <TableCell className="text-left align-middle px-4">{usuario.cargo.charAt(0).toUpperCase() + usuario.cargo.slice(1)}</TableCell>
                <TableCell className="text-center align-middle px-4">
                  <div className="inline-flex justify-center gap-2 items-center">


                    <button
                      type="button"
                      className={`w-9 h-5 rounded-full transition-colors duration-200 border ${usuario.ativo ? 'bg-terreiro-green border-terreiro-green' : 'bg-gray-300 border-gray-300'}`}
                      onClick={() => setUsuarios(us => us.map(u => u.id === usuario.id ? { ...u, ativo: !u.ativo } : u))}
                      aria-pressed={usuario.ativo}
                      title={usuario.ativo ? 'Ativo' : 'Inativo'}
                    >
                      <span
                        className={`block w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 ${usuario.ativo ? 'translate-x-4' : ''}`}
                      />
                    </button>
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(usuario)}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Editar</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="text-terreiro-red" onClick={() => handleDelete(usuario)}>
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
