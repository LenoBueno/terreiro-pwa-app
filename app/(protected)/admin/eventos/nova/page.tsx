"use client";

import { useRouter } from 'next/navigation';
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NovoEventoPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      titulo: formData.get('titulo') as string,
      subtitulo: formData.get('subtitulo') as string,
      descricao: formData.get('descricao') as string,
      data: formData.get('data') as string,
    };
    
    console.log('Criando novo evento:', data);
    // Aqui você pode adicionar a lógica para criar o novo evento
    // Após criar, redireciona de volta para a lista de eventos
    router.push('/admin/eventos');
  };

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
          <h1 className="text-xl font-semibold text-[#006B3F] flex-1">Novo Evento</h1>
        </div>

        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="titulo" className="text-sm font-medium">Título *</label>
              <input
                id="titulo"
                name="titulo"
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
                className="w-full p-2 border rounded-md"
                placeholder="Digite o subtítulo"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="data" className="text-sm font-medium">Data *</label>
              <input
                type="date"
                id="data"
                name="data"
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="descricao" className="text-sm font-medium">Descrição *</label>
              <textarea
                id="descricao"
                name="descricao"
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
                Salvar
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
