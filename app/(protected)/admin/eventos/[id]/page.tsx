"use client";

import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from 'react';

interface Evento {
  id: number;
  titulo: string;
  subtitulo: string;
  descricao: string;
  data: string;
}

export default function EditarEventoPage() {
  const router = useRouter();
  const params = useParams();
  const [evento, setEvento] = useState<Evento | null>(null);
  const [loading, setLoading] = useState(true);

  // Buscando dados do evento
  useEffect(() => {
    console.log('Iniciando busca do evento, params:', params);
    
    const fetchEvento = async () => {
      try {
        // Simulando uma chamada de API
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Dados de exemplo
        const eventos: Evento[] = [
          {
            id: 1,
            titulo: "Gira de Caboclos",
            subtitulo: "Sessão especial",
            descricao: "Evento espiritual com entidades caboclas.",
            data: "2025-05-15"
          },
          {
            id: 2,
            titulo: "Estudo sobre Ervas",
            subtitulo: "Aula aberta",
            descricao: "Aprenda sobre ervas e seus usos na espiritualidade.",
            data: "2025-05-18"
          },
          {
            id: 3,
            titulo: "Festa de Iemanjá",
            subtitulo: "Comemoração anual",
            descricao: "Homenagem à Rainha do Mar.",
            data: "2025-05-25"
          }
        ];

        const eventoEncontrado = eventos.find(e => e.id === Number(params.id));
        
        if (eventoEncontrado) {
          setEvento(eventoEncontrado);
        } else {
          console.error('Evento não encontrado');
          router.push('/admin/eventos');
        }
      } catch (error) {
        console.error('Erro ao buscar evento:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvento();
  }, [params.id, router]);

  const handleSubmit = (data: Evento) => {
    console.log('Atualizando evento:', data);
    // Aqui você pode adicionar a lógica para atualizar o evento
    // Após atualizar, redireciona de volta para a lista de eventos
    router.push('/admin/eventos');
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#006B3F] pt-16">
        <main className="absolute top-28 bottom-0 left-0 right-0 bg-white p-6 overflow-auto rounded-t-[35px] shadow-[0_0_15px_rgba(0,0,0,0.10)]">
          <p>Carregando...</p>
        </main>
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
            onClick={() => router.push('/admin/eventos')}
          >
            <ArrowLeft className="h-5 w-5 text-[#006B3F]" />
          </Button>
          <h1 className="text-xl font-semibold text-[#006B3F] flex-1">Editar Evento</h1>
        </div>

        <div className="max-w-md mx-auto">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const data = {
                id: Number(params.id), // Garantindo que o ID seja um número
                titulo: formData.get('titulo') as string,
                subtitulo: formData.get('subtitulo') as string,
                descricao: formData.get('descricao') as string,
                data: formData.get('data') as string,
              };
              handleSubmit(data);
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <label htmlFor="titulo" className="text-sm font-medium">Título</label>
              <input
                id="titulo"
                name="titulo"
                defaultValue={evento?.titulo || ''}
                className="w-full p-2 border rounded-md"
                placeholder="Digite o título do evento"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="subtitulo" className="text-sm font-medium">Subtítulo</label>
              <input
                id="subtitulo"
                name="subtitulo"
                defaultValue={evento?.subtitulo || ''}
                className="w-full p-2 border rounded-md"
                placeholder="Digite o subtítulo"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="data" className="text-sm font-medium">Data</label>
              <input
                type="date"
                id="data"
                name="data"
                defaultValue={evento?.data || ''}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="descricao" className="text-sm font-medium">Descrição</label>
              <textarea
                id="descricao"
                name="descricao"
                defaultValue={evento?.descricao || ''}
                rows={4}
                className="w-full p-2 border rounded-md"
                placeholder="Digite a descrição do evento"
                required
              />
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <Button 
                type="button"
                variant="outline" 
                onClick={() => router.push('/admin/eventos')}
              >
                Cancelar
              </Button>
              <Button 
                type="submit"
                className="bg-[#006B3F] hover:bg-[#005a33]"
              >
                Atualizar
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
