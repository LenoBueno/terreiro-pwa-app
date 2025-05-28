"use client";

import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import FormErva from '../FormErva';
import { useEffect, useState } from 'react';

interface Erva {
  id: number;
  nome: string;
  nomeCientifico: string;
  propriedades: string;
  indicacoes: string;
  contraindicacoes: string;
  imagem?: string;
}

export default function EditarErvaPage() {
  const router = useRouter();
  const params = useParams();
  const [erva, setErva] = useState<Erva | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulando busca dos dados da erva
  useEffect(() => {
    // Em uma aplicação real, você buscaria os dados da API
    const fetchErva = async () => {
      try {
        // Simulando uma chamada de API
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Dados de exemplo - em uma aplicação real, isso viria da sua API
        const ervas: Erva[] = [
          {
            id: 1,
            nome: "Arruda",
            nomeCientifico: "Ruta graveolens",
            propriedades: "Proteção espiritual",
            indicacoes: "Banhos de proteção",
            contraindicacoes: "Gestantes"
          },
          {
            id: 2,
            nome: "Alecrim",
            nomeCientifico: "Rosmarinus officinalis",
            propriedades: "Limpeza e proteção",
            indicacoes: "Banhos de limpeza",
            contraindicacoes: "Nenhuma conhecida"
          }
        ];
        
        const ervaEncontrada = ervas.find(e => e.id === Number(params.id));
        if (ervaEncontrada) {
          setErva(ervaEncontrada);
        } else {
          // Se não encontrar a erva, redireciona para a lista
          router.push('/admin/ervas');
        }
      } catch (error) {
        console.error('Erro ao buscar erva:', error);
        router.push('/admin/ervas');
      } finally {
        setLoading(false);
      }
    };

    fetchErva();
  }, [params.id, router]);

  const handleSubmit = async (data: any) => {
    try {
      // Aqui você implementaria a lógica para atualizar a erva
      console.log('Atualizando erva:', data);
      
      // Simulando uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Redireciona de volta para a lista após salvar
      router.push('/admin/ervas');
    } catch (error) {
      console.error('Erro ao atualizar erva:', error);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#006B3F] pt-16">
        <main className="absolute top-28 bottom-0 left-0 right-0 bg-white p-6 overflow-auto rounded-t-[35px] shadow-[0_0_15px_rgba(0,0,0,0.10)]">
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#006B3F]"></div>
          </div>
        </main>
      </div>
    );
  }

  if (!erva) return null;

  return (
    <div className="fixed inset-0 bg-[#006B3F] pt-16">
      {/* Conteúdo Principal */}
      <main className="absolute top-28 bottom-0 left-0 right-0 bg-white p-6 overflow-auto rounded-t-[35px] shadow-[0_0_15px_rgba(0,0,0,0.10)]">
        {/* Cabeçalho */}
        <div className="flex items-center mb-6">
          <Link href="/admin/ervas">
            <Button variant="ghost" size="icon" className="p-2 rounded-full hover:bg-gray-100 mr-2">
              <ArrowLeft className="h-5 w-5 text-[#006B3F]" />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold text-[#006B3F] flex-1">Editar Erva</h1>
        </div>

        {/* Formulário */}
        <div className="max-w-md mx-auto">
          <FormErva
            initialData={erva}
            onSubmit={handleSubmit}
            onCancel={() => router.push('/admin/ervas')}
          />
        </div>
      </main>
    </div>
  );
}