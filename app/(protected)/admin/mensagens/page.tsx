"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useMediaQuery } from "@/hooks/use-media-query"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Edit, Trash2, ArrowLeft, Plus, X } from "lucide-react"
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
} from "@/components/ui/dialog"
import FormMensagem from "./FormMensagem"

// Carrega o componente mobile apenas no cliente
const AdminMensagensMobile = dynamic(
  () => import('./AdminMensagensMobile'),
  { ssr: false }
)

// Tipagem para as mensagens
interface Mensagem {
  id: number
  titulo: string
  subtitulo?: string
  descricao: string
  data: string
  urgente: boolean
  autor?: string
}

export default function AdminMensagensPage() {
  const router = useRouter()
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [isClient, setIsClient] = useState(false)
  
  // Estados para o gerenciamento de mensagens
  const [searchTerm, setSearchTerm] = useState("")
  const [openDialog, setOpenDialog] = useState(false)
  const [mensagemEdit, setMensagemEdit] = useState<Mensagem | null>(null)
  const [activeTab, setActiveTab] = useState("todas")
  
  // Dados simulados - em uma aplicação real, isso viria de uma API
  const [mensagens, setMensagens] = useState<Mensagem[]>([
    { 
      id: 1, 
      titulo: "Alteração na data da Gira", 
      subtitulo: "Nova data em junho", 
      descricao: "Avisamos que a gira foi remarcada para o dia 10/06. Por favor, atualizem suas agendas.", 
      data: "2025-06-01", 
      urgente: true,
      autor: "Admin"
    },
    { 
      id: 2, 
      titulo: "Doações para a Festa", 
      subtitulo: "Colabore!", 
      descricao: "Estamos arrecadando doações para a próxima festa. Contamos com a colaboração de todos.", 
      data: "2025-05-15", 
      urgente: false,
      autor: "Tesouraria"
    },
  ])

  // Evita hidratação desnecessária
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Se for mobile e o cliente já estiver carregado, renderiza o componente mobile
  if (isMobile && isClient) {
    return <AdminMensagensMobile />
  }

  // Filtrar mensagens
  const filteredMensagens = mensagens.filter(
    (mensagem) =>
      mensagem.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (mensagem.autor?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      mensagem.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Formatar data
  const formatarData = (dataString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    }
    return new Date(dataString).toLocaleDateString('pt-BR', options)
  }

  // Salvar mensagem (criar ou atualizar)
  const salvarMensagem = (data: any) => {
    if (mensagemEdit) {
      // Atualizar mensagem existente
      setMensagens(
        mensagens.map((m) =>
          m.id === mensagemEdit.id ? { ...data, id: mensagemEdit.id } : m
        )
      )
    } else {
      // Adicionar nova mensagem
      const novaMensagem = {
        ...data,
        id: Date.now(),
      }
      setMensagens([...mensagens, novaMensagem])
    }
    setOpenDialog(false)
    setMensagemEdit(null)
  }

  return (
    <div className="w-full bg-white flex flex-col pt-2 pb-[132px]" style={{ minHeight: '500px' }}>
      <h1 className="text-2xl font-bold mb-1">Gerenciar Mensagens</h1>

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
              <Button className="admin-button bg-terreiro-green hover:bg-terreiro-green/90" onClick={() => { setMensagemEdit(null); setOpenDialog(true); }}>
                <Plus className="mr-2 h-4 w-4" />
                Adicionar
              </Button>
            </DialogTrigger>
            <DialogContent>
              <FormMensagem
                {...(mensagemEdit ? { initial: mensagemEdit } : {})}
                onCancel={() => setOpenDialog(false)}
                onSave={(mensagem) => {
                  if (mensagemEdit) {
                    setMensagens(mensagens.map(m => m.id === mensagemEdit.id ? { ...m, ...mensagem } : m));
                  } else {
                    const novoId = Math.max(0, ...mensagens.map(m => m.id)) + 1;
                    setMensagens([...mensagens, { ...mensagem, id: novoId }]);
                  }
                  setOpenDialog(false);
                  setMensagemEdit(null);
                }}
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
            onClick={() => setActiveTab("enviadas")}
            className={`admin-tab ${
              activeTab === "enviadas"
                ? "border-b-2 border-terreiro-green text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Enviadas
          </button>
          <button
            onClick={() => setActiveTab("rascunhos")}
            className={`admin-tab ${
              activeTab === "rascunhos"
                ? "border-b-2 border-terreiro-green text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Rascunhos
          </button>
        </div>
      </div>

      {/* Lista de Mensagens em formato de tabela */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left align-middle font-medium text-muted-foreground px-4">Título</TableHead>
              <TableHead className="text-left align-middle font-medium text-muted-foreground px-4">Subtítulo</TableHead>
              <TableHead className="text-left align-middle font-medium text-muted-foreground px-4">Descrição</TableHead>
              <TableHead className="text-left align-middle font-medium text-muted-foreground px-4">Data</TableHead>
              <TableHead className="text-left align-middle font-medium text-muted-foreground px-4">Urgente</TableHead>
              <TableHead className="text-center align-middle font-medium text-muted-foreground px-4">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMensagens.map(mensagem => (
              <TableRow key={mensagem.id}>
                <TableCell className="text-left align-middle px-4">{mensagem.titulo}</TableCell>
                <TableCell className="text-left align-middle px-4">{mensagem.subtitulo}</TableCell>
                <TableCell className="text-left align-middle px-4">{mensagem.descricao}</TableCell>
                <TableCell className="text-left align-middle px-4">{mensagem.data}</TableCell>
                <TableCell className="text-left align-middle px-4">
                  {mensagem.urgente ? (
                    <span className="text-red-600 font-semibold">Sim</span>
                  ) : (
                    <span className="text-gray-500">Não</span>
                  )}
                </TableCell>
                <TableCell className="text-center align-middle px-4">
                  <div className="inline-flex justify-center gap-2 items-center">
                    <Button variant="ghost" size="icon" onClick={() => { setMensagemEdit(mensagem); setOpenDialog(true); }}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Editar</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setMensagens(mensagens.filter(m => m.id !== mensagem.id))} className="text-terreiro-red">
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
