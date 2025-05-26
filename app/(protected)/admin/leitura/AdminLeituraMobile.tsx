"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Plus, ArrowLeft, FileText, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  /** Caminho do arquivo ou objeto File */
  arquivo: string | File | null;
  /** Categoria do material (opcional) */
  categoria?: string;
}

export default function AdminLeituraMobile() {
  const router = useRouter();
  const [busca, setBusca] = useState("");
  
  // Dados simulados - substituir por chamada à API
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
  ]);

  const materiaisFiltrados = materiais.filter(material => {
    const buscaLower = busca.toLowerCase();
    return (
      material.titulo.toLowerCase().includes(buscaLower) ||
      material.subtitulo.toLowerCase().includes(buscaLower) ||
      material.autor.toLowerCase().includes(buscaLower)
    );
  });

  /**
   * Função para excluir um material
   * @param id - ID do material a ser excluído
   */
  /**
   * Função para excluir um material
   * @param id - ID do material a ser excluído
   */
  const handleExcluir = (id: number) => {
    if (confirm('Tem certeza que deseja excluir este material?')) {
      // TODO: Implementar chamada à API para excluir o material
      setMateriais(materiais.filter(m => m.id !== id));
    }
  };

  /**
   * Navega para a página de edição do material
   * @param id - ID do material a ser editado
   */
  const handleEditar = (id: number) => {
    router.push(`/admin/leitura/${id}`);
  };

  return (
    <div className="fixed inset-0 bg-[#006B3F] pt-16">
      <main className="absolute top-28 bottom-0 left-0 right-0 bg-white p-6 overflow-auto rounded-t-[35px] shadow-[0_0_15px_rgba(0,0,0,0.10)]">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            className="p-2 rounded-full hover:bg-gray-100 mr-2"
            onClick={() => router.push('/admin/dashboard')}
            aria-label="Voltar para o painel"
          >
            <ArrowLeft className="h-5 w-5 text-[#006B3F]" />
          </Button>
          <h1 className="text-xl font-semibold text-[#006B3F]">Materiais de Leitura</h1>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar material..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#006B3F]/50 focus:border-transparent"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          {materiaisFiltrados.length > 0 ? (
            materiaisFiltrados.map((material) => (
              <div 
                key={material.id}
                className="group flex items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => router.push(`/admin/leitura/${material.id}`)}
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-[#006B3F]/10 flex items-center justify-center text-[#006B3F] mr-4">
                  <FileText size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">{material.titulo}</h3>
                  <p className="text-sm text-gray-500 truncate">{material.subtitulo}</p>
                  <p className="text-xs text-gray-400 mt-1">{material.autor} • {material.paginas} págs</p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditar(material.id);
                    }}
                    className="p-1.5 text-gray-400 hover:text-[#006B3F] rounded-full hover:bg-gray-100 h-8 w-8"
                    aria-label={`Editar ${material.titulo}`}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleExcluir(material.id);
                    }}
                    className="p-1.5 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 h-8 w-8"
                    aria-label={`Excluir ${material.titulo}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              {busca ? 'Nenhum material encontrado' : 'Nenhum material cadastrado'}
            </div>
          )}
        </div>

        {/* Botão Flutuante */}
        <div className="fixed bottom-8 right-6 z-10">
          <Button 
            onClick={(e) => {
              e.preventDefault();
              router.push('/admin/leitura/nova');
            }}
            className="rounded-full w-14 h-14 p-0 flex items-center justify-center bg-[#006B3F] hover:bg-[#005a33] text-white shadow-lg transition-colors"
            aria-label="Adicionar novo material"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      </main>
    </div>
  );
}
