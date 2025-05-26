"use client";

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';

// Importação dinâmica para evitar problemas de hidratação
const FormLeitura = dynamic(
  () => import('../FormLeitura'),
  { ssr: false }
);

export default function NovaLeituraPage() {
  const router = useRouter();

  const handleSave = async (material: {
    titulo: string;
    subtitulo?: string;
    autor: string;
    paginas?: number;
    arquivo?: string | File | null;
    categoria?: string;
  }) => {
    try {
      // TODO: Implementar chamada à API para salvar o material
      console.log('Salvando material:', material);
      
      // Simulando uma requisição assíncrona
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redireciona de volta para a lista de materiais após salvar
      router.push('/admin/leitura');
    } catch (error) {
      console.error('Erro ao salvar material:', error);
      alert('Ocorreu um erro ao salvar o material. Tente novamente.');
    }
  };

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
          <h1 className="text-xl font-semibold text-[#006B3F] flex-1">Novo Material</h1>
        </div>

        <div className="bg-white p-4 rounded-lg">
          <FormLeitura 
            onSave={handleSave}
            onCancel={() => router.back()}
          />
        </div>
      </main>
    </div>
  );
}
