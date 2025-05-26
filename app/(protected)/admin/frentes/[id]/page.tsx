"use client";

import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import FormFrente from '../FormFrente';
import { useEffect, useState } from 'react';

interface Frente {
  id: number;
  nome: string;
  tipo: string;
  subtitulo?: string;
  descricao?: string;
  cores?: string;
  imagem?: string;
}

export default function EditarFrentePage() {
  const router = useRouter();
  const params = useParams();
  const [frente, setFrente] = useState<Frente | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulando busca dos dados da frente
  useEffect(() => {
    // Em uma aplicação real, você buscaria os dados da API
    const fetchFrente = async () => {
      try {
        // Simulando uma chamada de API
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Dados de exemplo - em uma aplicação real, isso viria da sua API
        const frentes: Frente[] = [
          { id: 1, nome: "Bará", tipo: "nacao", subtitulo: "Orixá da comunicação", descricao: "Descrição detalhada sobre Bará", cores: "Vermelho e preto" },
          { id: 2, nome: "Ogum", tipo: "umbanda", subtitulo: "Orixá da guerra", descricao: "Descrição detalhada sobre Ogum", cores: "Azul e branco" },
          { id: 3, nome: "Oxóssi", tipo: "umbanda", subtitulo: "Orixá da caça", descricao: "Descrição detalhada sobre Oxóssi", cores: "Verde e vermelho" },
          { id: 4, nome: "Xangô", tipo: "nacao", subtitulo: "Orixá da justiça", descricao: "Descrição detalhada sobre Xangô", cores: "Vermelho e branco" },
          { id: 5, nome: "Oxum", tipo: "nacao", subtitulo: "Orixá do amor", descricao: "Descrição detalhada sobre Oxum", cores: "Amarelo e azul" },
        ];
        
        const frenteEncontrada = frentes.find(f => f.id === Number(params.id));
        if (frenteEncontrada) {
          setFrente(frenteEncontrada);
        } else {
          // Se não encontrar a frente, redireciona para a lista
          router.push('/admin/frentes');
        }
      } catch (error) {
        console.error('Erro ao carregar a frente:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFrente();
  }, [params.id, router]);

  const handleSubmit = (data: any) => {
    // Aqui você pode adicionar a lógica para atualizar a frente
    console.log('Dados atualizados:', data);
    // Após salvar, redireciona de volta para a lista de frentes
    router.push('/admin/frentes');
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

  if (!frente) {
    return null; // Já redireciona no useEffect, mas mantém o retorno para evitar erros
  }

  return (
    <div className="fixed inset-0 bg-[#006B3F] pt-16">
      {/* Conteúdo Principal */}
      <main className="absolute top-28 bottom-0 left-0 right-0 bg-white p-6 overflow-auto rounded-t-[35px] shadow-[0_0_15px_rgba(0,0,0,0.10)]">
        {/* Cabeçalho */}
        <div className="flex items-center mb-6">
          <Link href="/admin/frentes">
            <Button variant="ghost" size="icon" className="p-2 rounded-full hover:bg-gray-100 mr-2">
              <ArrowLeft className="h-5 w-5 text-[#006B3F]" />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold text-[#006B3F] flex-1">Editar Frente</h1>
        </div>

        {/* Formulário */}
        <div className="max-w-md mx-auto">
          <FormFrente 
            onSubmit={handleSubmit} 
            onCancel={() => router.push('/admin/frentes')}
            initialData={{
              titulo: frente.nome,
              subtitulo: frente.subtitulo || '',
              descricao: frente.descricao || '',
              cores: frente.cores || '',
              categoria: frente.tipo,
              // Adicione a imagem se necessário
            }}
          />
        </div>
      </main>
    </div>
  );
}
