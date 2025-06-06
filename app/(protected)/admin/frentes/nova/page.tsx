"use client";

import { useRouter } from 'next/navigation';
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import FormFrente from '../FormFrente';

export default function NovaFrentePage() {
  const router = useRouter();

  const handleSubmit = (data: any) => {
    // Aqui você pode adicionar a lógica para salvar a nova frente
    console.log('Dados do formulário:', data);
    // Após salvar, redireciona de volta para a lista de frentes
    router.push('/admin/frentes');
  };

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
          <h1 className="text-xl font-semibold text-[#006B3F] flex-1">Nova Frente</h1>
        </div>

        {/* Formulário */}
        <div className="max-w-md mx-auto">
          <FormFrente 
            onSubmit={handleSubmit} 
            onCancel={() => router.push('/admin/frentes')} 
          />
        </div>
      </main>
    </div>
  );
}
