"use client"

import { useIsMobile } from "@/hooks/use-mobile"
import dynamic from "next/dynamic"

// Carrega a versão mobile apenas no cliente para evitar problemas de SSR
const MobileView = dynamic(() => import('./page.mobile'), { ssr: false })

// Componente Desktop
import { useState } from "react"
import { Edit, Trash2, ArrowLeft, Plus, X, Calendar, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import FormEventos from "./FormEventos"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import Link from "next/link"

// Dados simulados iniciais
const eventosMock = [
  { id: 1, titulo: "Gira de Caboclos", subtitulo: "Sessão especial", descricao: "Evento espiritual com entidades caboclas.", data: "2025-05-15" },
  { id: 2, titulo: "Estudo sobre Ervas", subtitulo: "Aula aberta", descricao: "Aprenda sobre ervas e seus usos.", data: "2025-05-18" },
];

// Helper para garantir campos obrigatórios
function normalizeEvento(e: any): { id: number; titulo: string; subtitulo: string; descricao: string; data: string } {
  return {
    id: e.id,
    titulo: e.titulo,
    subtitulo: e.subtitulo ?? "",
    descricao: e.descricao ?? "",
    data: e.data,
  };
}

function DesktopView() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("proximos")
  const [searchTerm, setSearchTerm] = useState("")
  const [openDialog, setOpenDialog] = useState(false)
  const [eventoEdit, setEventoEdit] = useState<any | null>(null)
  const [eventos, setEventos] = useState(eventosMock)

  const filteredEventos = eventos.filter(
    (evento) =>
      evento.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (evento.subtitulo && evento.subtitulo.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const handleBack = () => {
    console.log("Navigating to admin dashboard");
    router.push("/admin/dashboard");
  };

  return (
    <div className="w-full bg-white flex flex-col pt-2 pb-[132px]" style={{ minHeight: '500px' }}>
      <h1 className="text-2xl font-bold mb-1">Gerenciar Eventos</h1>

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
          <Link href="/admin/dashboard">
            <Button variant="ghost" className="admin-button">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          </Link>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button className="admin-button bg-terreiro-green hover:bg-terreiro-green/90" onClick={() => { setEventoEdit(null); setOpenDialog(true); }}>
                <Plus className="mr-2 h-4 w-4" />
                Adicionar
              </Button>
            </DialogTrigger>
            <DialogContent>
              <FormEventos
                {...(eventoEdit ? { initial: eventoEdit } : {})}
                onCancel={() => setOpenDialog(false)}
                onSave={(evento) => {
                  const normalizado = normalizeEvento({ ...evento, id: eventoEdit ? eventoEdit.id : Math.max(0, ...eventos.map(ev => ev.id)) + 1 });
                  if (eventoEdit) {
                    setEventos(eventos.map(ev => ev.id === eventoEdit.id ? normalizado : ev));
                  } else {
                    setEventos([...eventos, normalizado]);
                  }
                  setOpenDialog(false);
                  setEventoEdit(null);
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex border-b ml-4">
          <button
            onClick={() => setActiveTab("proximos")}
            className={`admin-tab ${
              activeTab === "proximos"
                ? "border-b-2 border-terreiro-green text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Próximos
          </button>
          <button
            onClick={() => setActiveTab("passados")}
            className={`admin-tab ${
              activeTab === "passados"
                ? "border-b-2 border-terreiro-green text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Passados
          </button>
        </div>
      </div>

      {/* Lista de Eventos em formato de tabela */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left align-middle font-medium text-muted-foreground px-4">Título</TableHead>
              <TableHead className="text-left align-middle font-medium text-muted-foreground px-4">Subtítulo</TableHead>
              <TableHead className="text-left align-middle font-medium text-muted-foreground px-4">Data</TableHead>
              <TableHead className="text-left align-middle font-medium text-muted-foreground px-4">Descrição</TableHead>
              <TableHead className="text-center align-middle font-medium text-muted-foreground px-4">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEventos.map(evento => (
              <TableRow key={evento.id}>
                <TableCell className="text-left align-middle px-4">{evento.titulo}</TableCell>
                <TableCell className="text-left align-middle px-4">{evento.subtitulo}</TableCell>
                <TableCell className="text-left align-middle px-4">{evento.data}</TableCell>
                <TableCell className="text-left align-middle px-4">{evento.descricao}</TableCell>
                <TableCell className="text-center align-middle px-4">
                  <div className="inline-flex justify-center gap-2 items-center">
                    <Button variant="ghost" size="icon" onClick={() => { setEventoEdit(evento); setOpenDialog(true); }}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Editar</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setEventos(eventos.filter(ev => ev.id !== evento.id))} className="text-terreiro-red">
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

export default function AdminEventosPage() {
  const isMobile = useIsMobile()

  if (isMobile) {
    return <MobileView />
  }

  return <DesktopView />
}
