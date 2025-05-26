"use client";

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';

// Importação dinâmica para evitar problemas de hidratação
const FormLeitura = dynamic(
  () => import('@/app/(protected)/admin/leitura/FormLeitura'),
  { ssr: false }
);

// Interface para os dados do material
interface Material {
  id: number;
  titulo: string;
  subtitulo?: string;
  autor: string;
  paginas?: number;
  arquivo?: string | File | null;
  categoria?: string;
}

// Dados simulados - substituir por chamada à API
const materiaisMock: Material[] = [
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
];

export default function EditarLeituraPage() {
  const router = useRouter();
  const params = useParams();
  const [material, setMaterial] = useState<Material | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulando carregamento de dados da API
    const carregarMaterial = async () => {
      try {
        // TODO: Substituir por chamada à API real
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const materialId = Number(params.id);
        const materialEncontrado = materiaisMock.find(m => m.id === materialId);
        
        if (!materialEncontrado) {
          // Material não encontrado, redireciona para a lista
          router.push('/admin/leitura');
          return;
        }
        
        setMaterial(materialEncontrado);
      } catch (error) {
        console.error('Erro ao carregar material:', error);
        alert('Ocorreu um erro ao carregar o material. Tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    carregarMaterial();
  }, [params.id, router]);

  const handleSave = async (dadosAtualizados: {
    titulo: string;
    subtitulo?: string;
    autor: string;
    paginas?: number;
    arquivo?: string | File | null;
    categoria?: string;
  }) => {
    try {
      if (!material) return;
      
      // TODO: Implementar chamada à API para atualizar o material
      console.log('Atualizando material:', material.id, 'com dados:', dadosAtualizados);
      
      // Simulando uma requisição assíncrona
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redireciona de volta para a lista de materiais após salvar
      router.push('/admin/leitura');
    } catch (error) {
      console.error('Erro ao atualizar material:', error);
      alert('Ocorreu um erro ao atualizar o material. Tente novamente.');
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#006B3F] pt-16">
        <div className="absolute top-28 bottom-0 left-0 right-0 bg-white p-6 overflow-auto rounded-t-[35px] flex items-center justify-center">
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!material) {
    return (
      <div className="fixed inset-0 bg-[#006B3F] pt-16">
        <div className="absolute top-28 bottom-0 left-0 right-0 bg-white p-6 overflow-auto rounded-t-[35px] flex items-center justify-center">
          <p className="text-gray-600">Material não encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#006B3F] pt-16">
      <main className="absolute top-28 bottom-0 left-0 right-0 bg-white p-6 overflow-auto rounded-t-[35px] shadow-[0_0_15px_rgba(0,0,0,0.10)]">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            className="p-2 rounded-full hover:bg-gray-100 mr-2"
            onClick={() => router.push('/admin/leitura')}
            aria-label="Voltar para a lista de materiais"
          >
            <ArrowLeft className="h-5 w-5 text-[#006B3F]" />
          </Button>
          <h1 className="text-xl font-semibold text-[#006B3F] flex-1">Editar Material</h1>
        </div>

        <div className="bg-white p-4 rounded-lg">
          <FormLeitura 
            initial={material}
            onSave={handleSave}
            onCancel={() => router.back()}
          />
        </div>
      </main>
    </div>
  );
}
