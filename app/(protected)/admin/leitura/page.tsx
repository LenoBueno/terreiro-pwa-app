"use client"

import { useState, useEffect } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { Edit, Trash2, ArrowLeft, Plus, X } from "lucide-react"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import FormLeitura from "./FormLeitura";

/** Tipos de abas disponíveis */
const TABS = ["todos", "estudos", "guias", "historia"] as const;

/** Tipo que representa uma aba específica */
type TabType = typeof TABS[number];

/**
 * Carrega o componente mobile apenas no cliente
 * @remarks
 * Usamos importação dinâmica para melhorar o desempenho
 * e evitar problemas de hidratação no Next.js
 */
const AdminLeituraMobile = dynamic(
  () => import('./AdminLeituraMobile'),
  { ssr: false }
)

/**
 * Interface que representa um material de leitura
 */
interface Material {
  /** ID único do material */
  id: number;
  /** Título principal do material */
  titulo: string;
  /** Subtítulo ou descrição curta */
  subtitulo: string;
  /** Nome do autor do material */
  autor: string;
  /** Número de páginas do material */
  paginas: number;
  /** Arquivo anexo (pode ser uma URL string ou objeto File) */
  arquivo: string | File | null;
  /** Categoria do material (opcional) */
  categoria?: string;
}

/**
 * Normaliza os dados de um material
 * @param m - Objeto com os dados do material a serem normalizados
 * @returns Objeto Material normalizado
 */
function normalizeMaterial(m: any): Material {
  return {
    id: m.id,
    titulo: m.titulo,
    subtitulo: m.subtitulo ?? "",
    autor: m.autor ?? "",
    paginas: m.paginas ?? 0,
    arquivo: m.arquivo ?? null,
    categoria: m.categoria ?? ""
  };
}

export default function AdminLeituraPage() {
  const router = useRouter()
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [isClient, setIsClient] = useState(false)
  
  // Evita hidratação desnecessária (SSR vs Client)
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Estado para controlar a aba ativa
  const [activeTab, setActiveTab] = useState<TabType>("todos")
  const [searchTerm, setSearchTerm] = useState("")
  const [openDialog, setOpenDialog] = useState(false)
  const [materialEdit, setMaterialEdit] = useState<Material | null>(null)
  const [materiais, setMateriais] = useState<Material[]>([
    { 
      id: 1, 
      titulo: "Guia Completo dos Orixás", 
      subtitulo: "Tudo sobre Orixás", 
      autor: "Carlos Silva", 
      paginas: 120, 
      arquivo: "guia-orixas.pdf",
      categoria: "guias"
    },
    { 
      id: 2, 
      titulo: "Ervas Sagradas e seus Usos", 
      subtitulo: "Ervas e Magia", 
      autor: "Maria da Mata", 
      paginas: 80, 
      arquivo: "ervas-usos.pdf",
      categoria: "estudos"
    },
  ])

  /**
   * Filtra os materiais com base no termo de busca e na aba ativa
   */
  const filteredMateriais = materiais.filter((material) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (activeTab === "todos" || material.categoria === activeTab) &&
      (material.titulo.toLowerCase().includes(searchLower) ||
       material.autor.toLowerCase().includes(searchLower) ||
       material.subtitulo.toLowerCase().includes(searchLower))
    );
  })

  // Se for mobile, renderiza o componente mobile
  if (isClient && isMobile) {
    return <AdminLeituraMobile />
  }

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
          <Button variant="ghost" className="admin-button" onClick={() => router.push('/admin/dashboard')}>
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
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`admin-tab px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "border-b-2 border-terreiro-green text-terreiro-green"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
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
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMaterialEdit(material);
                        setOpenDialog(true);
                      }}
                      className="h-8 w-8 p-1.5 text-black hover:bg-gray-100"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm('Tem certeza que deseja excluir este material?')) {
                          setMateriais(materiais.filter(m => m.id !== material.id));
                        }
                      }}
                      className="h-8 w-8 p-1.5 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
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
