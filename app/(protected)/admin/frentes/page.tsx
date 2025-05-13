"use client"

import { useState } from "react"
import { Edit, Trash2, ArrowLeft, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import Link from "next/link"

import FormFrente from './FormFrente'
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
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

// Corrige o tipo das frentes para incluir todos os campos usados
interface Frente {
  titulo?: string;
  cores?: string[];
  id: number;
  nome: string;
  tipo: string;
  subtitulo?: string;
  descricao?: string;
  papel?: string;
  imagem?: File | null;
}

// Dados simulados de frentes espirituais
const frentesIniciais: Frente[] = [
  { id: 1, nome: "Bará", tipo: "nacao" },
  { id: 2, nome: "Ogum", tipo: "umbanda" },
]

export default function AdminFrentesPage() {
  const router = useRouter()
  const [frentes, setFrentes] = useState<Frente[]>(frentesIniciais)
  const [filtro, setFiltro] = useState("umbanda")
  const [busca, setBusca] = useState("")
  const [showForm, setShowForm] = useState(false);
  const [editFrente, setEditFrente] = useState<Frente | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);

  // Normaliza as frentes para garantir que todos os campos necessários existam
  const frentesNormalizadas = frentes.map(frente => ({
    ...frente,
    titulo: frente.titulo || frente.nome,
    subtitulo: frente.subtitulo || '',
    descricao: frente.descricao || '',
    cores: frente.cores || ''
  }));
  
  // Ordena as frentes por nome (alfabético)
  const frentesOrdenadas = [...frentesNormalizadas].sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
  // Filtrar frentes
  const frentesFiltradas = frentesOrdenadas
    .filter((frente) => frente.tipo === filtro)
    .filter((frente) => frente.nome.toLowerCase().includes(busca.toLowerCase()));

  // Excluir frente
  const excluirFrente = (id: number) => {
    if (confirm("Tem certeza que deseja excluir esta frente?")) {
      setFrentes(frentes.filter((frente) => frente.id !== id))
    }
  }

  // Limpar busca
  const limparBusca = () => {
    setBusca("")
  }

  function handleAddFrente(data: any) {
    const novaFrente = {
      id: Date.now(),
      nome: data.titulo,
      titulo: data.titulo,
      subtitulo: data.subtitulo || 'Subtítulo padrão',
      descricao: data.descricao || 'Descrição padrão da frente.',
      papel: data.papel || 'Papel padrão',
      cores: data.cores || '',
      tipo: data.categoria,
      imagem: data.imagem,
    };
    setFrentes(prev => [...prev, novaFrente]);
    setFiltro(data.categoria);
    setShowForm(false);
  }

  function handleEditFrenteSave(data: any) {
    setFrentes(frentes => {
      const atualizadas = frentes.map(f => f.id === editFrente?.id ? {
        ...f,
        nome: data.titulo,
        titulo: data.titulo,
        subtitulo: data.subtitulo,
        descricao: data.descricao,
        papel: data.papel,
        cores: data.cores,
        imagem: data.imagem || f.imagem,
        tipo: data.categoria,
      } : f);
      return atualizadas;
    });
    setFiltro(data.categoria);
    setShowEditDialog(false);
    setEditFrente(null);
  }

  const handleBack = () => {
    console.log("Trying to navigate to admin dashboard");
    
    // Try a different route structure
    router.push("/");
    
    // Fallback options to try
    setTimeout(() => {
      console.log("Trying fallback navigation");
      router.push("/admin");
    }, 1000);
  };

  return (
    <div className="w-full bg-white flex flex-col pt-5 pb-[132px]" style={{ minHeight: '500px' }}>
      <h1 className="text-2xl font-bold mb-1">Gerenciar Frentes</h1>

      {/* Barra de pesquisa */}
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

      {/* Botões à esquerda e abas à direita */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Link href="/admin/dashboard">
            <Button variant="ghost" className="admin-button">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          </Link>
          <Dialog open={showForm} onOpenChange={setShowForm}>
            <DialogTrigger asChild>
              <Button className="admin-button bg-terreiro-green hover:bg-terreiro-green/90" onClick={() => setShowForm(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Adicionar
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <FormFrente onSubmit={handleAddFrente} onCancel={() => setShowForm(false)} />
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex border-b ml-4">
          <button
            onClick={() => setFiltro("umbanda")}
            className={`admin-tab ${
              filtro === "umbanda"
                ? "border-b-2 border-terreiro-green text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Umbanda
          </button>
          <button
            onClick={() => setFiltro("nacao")}
            className={`admin-tab ${
              filtro === "nacao"
                ? "border-b-2 border-terreiro-green text-terreiro-green"
                : "text-gray-600"
            }`}
          >
            Nação
          </button>
        </div>  
      </div>


      {/* Lista de Frentes em formato de tabela */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left align-middle font-medium text-muted-foreground px-4">Imagem</TableHead>
              <TableHead className="text-left align-middle font-medium text-muted-foreground px-4">Título</TableHead>
              <TableHead className="text-left align-middle font-medium text-muted-foreground px-4">Subtítulo</TableHead>
              <TableHead className="text-left align-middle font-medium text-muted-foreground px-4">Descrição</TableHead>
              <TableHead className="text-left align-middle font-medium text-muted-foreground px-4">Cores</TableHead>
              <TableHead className="text-center align-middle font-medium text-muted-foreground px-4">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {frentesFiltradas.map(frente => (
              <TableRow key={frente.id}>
                <TableCell className="text-left align-middle px-4">
                  {frente.imagem ? (
                    <img
                      src={typeof frente.imagem === 'string' ? frente.imagem : URL.createObjectURL(frente.imagem)}
                      alt={frente.nome}
                      className="object-cover w-12 h-12 rounded"
                    />
                  ) : (
                    <span className="text-gray-400 text-xl">📷</span>
                  )}
                </TableCell>
                <TableCell className="text-left align-middle px-4">{frente.titulo || frente.nome}</TableCell>
                <TableCell className="text-left align-middle px-4">{frente.subtitulo || '-'}</TableCell>
                <TableCell className="text-left align-middle px-4">{frente.descricao || '-'}</TableCell>
                <TableCell className="text-left align-middle px-4">{frente.cores || '-'}</TableCell>
                <TableCell className="text-center align-middle px-4">
                  <div className="inline-flex justify-center gap-2 items-center">
                    <Button variant="ghost" size="icon" onClick={() => { setEditFrente(frente); setShowEditDialog(true); }}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Editar</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => excluirFrente(frente.id)} className="text-terreiro-red">
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

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-md">
          {editFrente && (
            <FormFrente
              initialData={{
                titulo: editFrente.titulo || editFrente.nome,
                subtitulo: editFrente.subtitulo || '',
                descricao: editFrente.descricao || '',
                cores: editFrente.cores || '',
                imagem: editFrente.imagem || null,
                categoria: editFrente.tipo || 'umbanda',
              }}
              onSubmit={handleEditFrenteSave}
              onCancel={() => setShowEditDialog(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
