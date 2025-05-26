"use client"

import { useState, useEffect } from "react"
import { useMediaQuery } from "../../../../hooks/use-media-query"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Edit, Trash2, ArrowLeft, Plus, X, Users } from "lucide-react"
import FormFrente from './FormFrente'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

// Carrega o componente mobile apenas no cliente
const AdminFrentesMobile = dynamic(
  () => import('./AdminFrentesMobile'),
  { ssr: false }
)

// Interface para as frentes
interface Frente {
  titulo?: string;
  id: number;
  nome: string;
  tipo: string;
  subtitulo?: string;
  descricao?: string;
  papel?: string;
  imagem?: File | null;
}

export default function AdminFrentesPage() {
  const router = useRouter()
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [isClient, setIsClient] = useState(false)
  
  // Evita hidratação desnecessária
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Código original do desktop abaixo
  const [frentes, setFrentes] = useState<Frente[]>([])
  const [filtro, setFiltro] = useState("umbanda")
  const [busca, setBusca] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editFrente, setEditFrente] = useState<Frente | null>(null)
  const [showEditDialog, setShowEditDialog] = useState(false)
  
  // Se for mobile e o cliente já estiver carregado, renderiza o componente mobile
  if (isMobile && isClient) {
    return <AdminFrentesMobile />
  }

  // Normaliza as frentes para garantir que todos os campos necessários existam
  const frentesNormalizadas = frentes.map(frente => ({
    ...frente,
    titulo: frente.titulo || frente.nome,
    subtitulo: frente.subtitulo || '',
    descricao: frente.descricao || '',
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
      <h1 className="text-2xl font-bold mb-1 px-4">Gerenciar Frentes</h1>

      {/* Barra de pesquisa - Keep existing */}
      <div className="relative w-full max-w-xs mb-4 px-4"> {/* Added px-4 for padding */}
        <Input
          type="search"
          placeholder="Procurar"
          className="w-full"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        {busca && (
          <button onClick={() => setBusca("")} className="absolute right-2 top-1/2 -translate-y-1/2 p-1"> {/* Added p-1 for click area */}
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Botões à esquerda e abas à direita - Keep existing structure, adjust padding */}
      <div className="flex items-center gap-4 mb-4 px-4"> {/* Added px-4 for padding */}
        <div className="flex items-center gap-2">
          {/* Using Link and Button as in the current code */}
           <Link href="/admin/dashboard">
            <Button variant="ghost" className="admin-button">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          </Link>
          <Dialog open={showForm} onOpenChange={setShowForm}>
            <DialogTrigger asChild>
              <Button className="admin-button bg-[#006B3F] hover:bg-[#005A3F]" onClick={() => setShowForm(true)}> {/* Adjusted color */}
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
                ? "border-b-2 border-[#006B3F] text-[#006B3F]" // Adjusted color
                : "text-gray-600"
            }`}
          >
            Umbanda
          </button>
          <button
            onClick={() => setFiltro("nacao")}
            className={`admin-tab ${
              filtro === "nacao"
                ? "border-b-2 border-[#006B3F] text-[#006B3F]" // Adjusted color
                : "text-gray-600"
            }`}
          >
            Nação
          </button>
        </div>
      </div>

      {/* Grid display for Frentes */}
      <div className="flex-1 px-4"> {/* Added px-4 for padding */}
        <div className="grid grid-cols-4 gap-4"> {/* Adjusted grid columns and gap */}
          {frentesFiltradas.map(frente => (
            <div key={frente.id} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-2 overflow-hidden shadow-custom-frente"> {/* Placeholder styling */}
                 {/* Replace with your custom icon/image component for the frente */}
                 {frente.imagem ? (
                    <img
                      src={typeof frente.imagem === 'string' ? frente.imagem : URL.createObjectURL(frente.imagem)}
                      alt={frente.nome}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <Users size={30} className="text-gray-500" /> // Generic placeholder icon
                  )}
              </div>
              <span className="text-xs text-gray-700 text-center font-medium truncate w-full">
                {frente.nome} {/* Displaying name as label */}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Dialog - Keep existing */}
       <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-md">
          {editFrente && (
            <FormFrente
              initialData={{
                titulo: editFrente.titulo || editFrente.nome,
                subtitulo: editFrente.subtitulo || '',
                descricao: editFrente.descricao || '',
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
  );
}
