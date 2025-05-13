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
  { id: 2, nome: "Jo3o", sobrenome: "da Paz", dataNascimento: "1985-05-10", telefone: "(21) 98888-2222", email: "joao@email.com", orixa: "Ogum", dataBatismo: "2001-05-10", dataObrigacao: "2011-05-10", cargo: "membro", ativo: false },
]

export default function AdminUsersDesktop() {
  function handleDelete(usuario: Usuario) {
    setUsuarios(us => us.filter(u => u.id !== usuario.id))
  }
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

  function handleAdd() {
    setEditUsuario(null)
    setOpenDialog(true)
  }

  return (
    // ...restante do JSX da página de usuários
    <div>Desktop Users Page</div>
  )
}
