"use client";

import { useRouter, useParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import dynamic from 'next/dynamic';

const FormMensagem = dynamic(() => import('../FormMensagem'), { ssr: false });

// Dados simulados - em uma aplicação real, isso viria de uma API ou contexto
const mensagens = [
  {
    id: 1,
    titulo: "Reunião de Planejamento",
    subtitulo: "Planejamento mensal",
    descricao: "Reunião para planejar as atividades do próximo mês",
    data: "2024-06-10",
    urgente: true
  },
  {
    id: 2,
    titulo: "Festa Junina",
    descricao: "Venha participar da nossa festa junina",
    data: "2024-06-23",
    urgente: false
  }
];

export default function EditarMensagemPage() {
  const router = useRouter();
  const params = useParams();
  const mensagemId = Number(params.id);
  
  // Encontra a mensagem pelo ID
  const mensagem = mensagens.find(m => m.id === mensagemId);

  const handleSave = (data: any) => {
    // Em uma aplicação real, aqui seria feita a chamada para a API
    console.log('Atualizando mensagem:', data);
    // Redireciona de volta para a lista após salvar
    router.push('/admin/mensagens');
  };

  if (!mensagem) {
    return (
      <div className="fixed inset-0 bg-[#006B3F] pt-16">
        <main className="absolute top-28 bottom-0 left-0 right-0 bg-white p-6 overflow-auto rounded-t-[35px] shadow-[0_0_15px_rgba(0,0,0,0.10)]">
          <div className="text-center py-8">
            <p className="text-gray-500">Mensagem não encontrada</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => router.push('/admin/mensagens')}
            >
              Voltar para a lista
            </Button>
          </div>
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
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-5 w-5 text-[#006B3F]" />
          </Button>
          <h1 className="text-xl font-semibold text-[#006B3F] flex-1">Editar Mensagem</h1>
        </div>

        <div className="max-w-2xl mx-auto">
          <FormMensagem 
            initial={mensagem} 
            onSave={handleSave}
            onCancel={() => router.push('/admin/mensagens')}
          />
        </div>
      </main>
    </div>
  );
}
