"use client";

import { useRouter } from 'next/navigation';
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FormUsuarios } from '../FormUsuarios';

export default function NovoUsuarioPage() {
  const router = useRouter();

  const handleSubmit = (data: any) => {
    // Aqui você pode adicionar a lógica para salvar o novo usuário
    console.log('Dados do formulário:', data);
    // Após salvar, redireciona de volta para a lista de usuários
    router.push('/admin/usuarios');
  };

  return (
    <div className="fixed inset-0 bg-[#006B3F] pt-16">
      <main className="absolute top-28 bottom-0 left-0 right-0 bg-white p-6 overflow-auto rounded-t-[35px] shadow-[0_0_15px_rgba(0,0,0,0.10)]">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            className="p-2 rounded-full hover:bg-gray-100 mr-2"
            onClick={() => router.push('/admin/users')}
          >
            <ArrowLeft className="h-5 w-5 text-[#006B3F]" />
          </Button>
          <h1 className="text-xl font-semibold text-[#006B3F] flex-1">Novo Usuário</h1>
        </div>

        <div className="max-w-md mx-auto">
          <FormUsuarios 
            onSubmit={handleSubmit} 
            onCancel={() => router.push('/admin/users')} 
          />
        </div>
      </main>
    </div>
  );
}
