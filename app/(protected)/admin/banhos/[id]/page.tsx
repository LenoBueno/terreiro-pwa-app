'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import FormBanho from '../FormBanho';

interface Banho {
  id: string;
  nome: string;
  tipo: string;
  descricao: string;
  ervas: string[];
  indicacoes: string;
  contraindicacoes: string;
  modoPreparo: string;
  imagemUrl?: string;
}

export default function EditarBanhoPage() {
  const router = useRouter();
  const params = useParams();
  const [banho, setBanho] = useState<Banho | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula busca do banho pelo ID
    // Aqui você implementaria a chamada à API
    const fetchBanho = async () => {
      try {
        // Simulando uma chamada de API
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const mockBanho: Banho = {
          id: params.id as string,
          nome: 'Banho de Prosperidade',
          tipo: 'prosperidade',
          descricao: 'Banho para atrair prosperidade e abundância',
          ervas: ['Alecrim', 'Manjericão', 'Arruda'],
          indicacoes: 'Para momentos de dificuldade financeira',
          contraindicacoes: 'Nenhuma contraindicação específica',
          modoPreparo: 'Ferver as ervas e deixar em infusão por 10 minutos',
          imagemUrl: '/images/banhos/prosperidade.jpg'
        };
        setBanho(mockBanho);
      } catch (error) {
        console.error('Erro ao carregar o banho:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanho();
  }, [params.id]);

  const handleSubmit = async (data: any) => {
    // Aqui você implementaria a lógica para atualizar o banho
    console.log('Banho atualizado:', { id: params.id, ...data });
    
    // Redireciona de volta para a lista de banhos
    router.push('/admin/banhos');
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#006B3F] pt-16">
        <div className="absolute top-28 bottom-0 left-0 right-0 bg-white p-6 overflow-auto rounded-t-[35px] shadow-[0_0_15px_rgba(0,0,0,0.10)] flex items-center justify-center">
          <div className="animate-pulse text-[#006B3F]">Carregando...</div>
        </div>
      </div>
    );
  }

  if (!banho) {
    return null; // Já redireciona no useEffect, mas mantém o retorno para evitar erros
  }

  return (
    <div className="fixed inset-0 bg-[#006B3F] pt-16">
      {/* Conteúdo Principal */}
      <main className="absolute top-28 bottom-0 left-0 right-0 bg-white p-6 overflow-auto rounded-t-[35px] shadow-[0_0_15px_rgba(0,0,0,0.10)]">
        {/* Cabeçalho */}
        <div className="flex items-center mb-6">
          <Link href="/admin/banhos">
            <Button variant="ghost" size="icon" className="p-2 rounded-full hover:bg-gray-100 mr-2">
              <ArrowLeft className="h-5 w-5 text-[#006B3F]" />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold text-[#006B3F] flex-1">Editar Banho</h1>
        </div>

        {/* Formulário */}
        <div className="max-w-md mx-auto">
          <FormBanho
            initialData={banho}
            onSubmit={handleSubmit}
            onCancel={() => router.push('/admin/banhos')}
          />
        </div>
      </main>
    </div>
  );
}