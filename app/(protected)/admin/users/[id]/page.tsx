"use client";

import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FormUsuarios } from '../FormUsuarios';
import { useEffect, useState } from 'react';

interface Usuario {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  telefone: string;
  orixa: string;
  dataNascimento: string;
  dataBatismo: string;
  dataObrigacao: string;
  cargo: string;
  ativo: boolean;
}

export default function EditarUsuarioPage() {
  const router = useRouter();
  const params = useParams();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  // Buscando dados do usuário
  useEffect(() => {
    console.log('Iniciando busca do usuário, params:', params);
    
    const fetchUsuario = async () => {
      try {
        // Simulando uma chamada de API
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Dados de exemplo
        const usuarios: Usuario[] = [
          {
            id: 1,
            nome: "Maria",
            sobrenome: "da Mata",
            email: "maria@example.com",
            telefone: "(11) 99999-1111",
            orixa: "Oxum",
            dataNascimento: "1990-01-01",
            dataBatismo: "2010-05-15",
            dataObrigacao: "2015-10-20",
            cargo: "admin",
            ativo: true
          },
          {
            id: 2,
            nome: "João",
            sobrenome: "da Paz",
            email: "joao@example.com",
            telefone: "(21) 98888-2222",
            orixa: "Ogum",
            dataNascimento: "1985-07-22",
            dataBatismo: "2012-03-10",
            dataObrigacao: "2017-08-15",
            cargo: "membro",
            ativo: true
          },
        ];
        
        // Convertendo o ID para número para comparação
        const usuarioEncontrado = usuarios.find(u => u.id.toString() === params.id);
        if (usuarioEncontrado) {
          setUsuario(usuarioEncontrado);
        } else {
          router.push('/admin/usuarios');
        }
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();
  }, [params.id, router]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      // Simulando uma chamada de API para atualizar o usuário
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Dados atualizados:', data);
      
      // Redireciona de volta para a lista de usuários com mensagem de sucesso
      router.push('/admin/usuarios?status=success&message=Usuário+atualizado+com+sucesso');
    } catch (err) {
      console.error('Erro ao atualizar usuário:', err);
      setError('Ocorreu um erro ao atualizar o usuário. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
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

  if (!usuario) {
    return null;
  }

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
          <h1 className="text-xl font-semibold text-[#006B3F] flex-1">Editar Usuário</h1>
        </div>

        <div className="max-w-md mx-auto">
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          <FormUsuarios 
            onSubmit={handleSubmit} 
            onCancel={() => router.push('/admin/users')}
            isSubmitting={isSubmitting}
            initialData={{
              nome: usuario.nome,
              sobrenome: usuario.sobrenome || '',
              email: usuario.email,
              telefone: usuario.telefone,
              orixa: usuario.orixa,
              dataNascimento: usuario.dataNascimento,
              dataBatismo: usuario.dataBatismo,
              dataObrigacao: usuario.dataObrigacao,
              cargo: usuario.cargo || 'membro',
              ativo: usuario.ativo
            }}
          />
        </div>
      </main>
    </div>
  );
}
