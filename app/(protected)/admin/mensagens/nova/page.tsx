"use client";

import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import dynamic from 'next/dynamic';

const FormMensagem = dynamic(() => import('../FormMensagem'), { ssr: false });

export default function NovaMensagemPage() {
  const router = useRouter();

  const handleSave = (data: any) => {
    // Em uma aplicação real, aqui seria feita a chamada para a API
    console.log('Salvando mensagem:', data);
    // Redireciona de volta para a lista após salvar
    router.push('/admin/mensagens');
  };

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
          <h1 className="text-xl font-semibold text-[#006B3F] flex-1">Nova Mensagem</h1>
        </div>

        <div className="max-w-2xl mx-auto">
          <FormMensagem 
            initial={{
              titulo: '',
              subtitulo: '',
              descricao: '',
              data: new Date().toISOString().split('T')[0],
              urgente: false
            }} 
            onSave={handleSave}
            onCancel={() => router.push('/admin/mensagens')}
          />
        </div>
      </main>
    </div>
  );
}
