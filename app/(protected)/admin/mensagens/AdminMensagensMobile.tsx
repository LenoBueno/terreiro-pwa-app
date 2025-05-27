"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, Plus, Calendar, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Tipagem para as mensagens
interface Mensagem {
  id: number;
  titulo: string;
  subtitulo?: string;
  descricao: string;
  data: string;
  urgente: boolean;
}

export default function AdminMensagensMobile() {
  const [busca, setBusca] = useState("");
  const router = useRouter();
  
  // Dados simulados - em uma aplicação real, isso viria de uma API
  const [mensagens, setMensagens] = useState<Mensagem[]>([
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
  ]);

  // Função para formatar data
  const formatarData = (dataString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      day: '2-digit', 
      month: '2-digit',
      year: 'numeric',
      timeZone: 'UTC' // Adiciona timezone para evitar problemas de fuso horário
    };
    return new Date(dataString).toLocaleDateString('pt-BR', options);
  };

  // Navegar para edição
  const editarMensagem = (id: number) => {
    router.push(`/admin/mensagens/${id}`);
  };

  // Filtrar mensagens
  const filteredMensagens = mensagens.filter(mensagem => 
    mensagem.titulo.toLowerCase().includes(busca.toLowerCase()) ||
    (mensagem.subtitulo && mensagem.subtitulo.toLowerCase().includes(busca.toLowerCase())) ||
    mensagem.descricao.toLowerCase().includes(busca.toLowerCase())
  );

  // Excluir mensagem
  const excluirMensagem = (id: number) => {
    if (confirm('Tem certeza que deseja excluir esta mensagem?')) {
      setMensagens(mensagens.filter(msg => msg.id !== id));
    }
  }

  return (
    <div className="fixed inset-0 bg-[#006B3F] pt-16">
      {/* Conteúdo Principal */}
      <main className="absolute top-28 bottom-0 left-0 right-0 bg-white p-6 overflow-auto rounded-t-[35px] shadow-[0_0_15px_rgba(0,0,0,0.10)]">
        <div className="max-w-7xl mx-auto">
        {/* Cabeçalho com botão voltar */}
        <div className="flex items-center mb-6">
          <Link href="/admin/dashboard">
            <Button variant="ghost" size="icon" className="p-2 rounded-full hover:bg-gray-100 mr-2">
              <ArrowLeft className="h-5 w-5 text-[#006B3F]" />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold text-[#006B3F] flex-1">Mensagens</h1>
        </div>

        {/* Barra de Pesquisa */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Pesquisar mensagens..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#006B3F]/50 focus:border-transparent"
          />
        </div>

        {/* Lista de mensagens em cards */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
          {filteredMensagens.length === 0 ? (
            <div className="col-span-full text-center py-8 text-gray-500">
              Nenhuma mensagem encontrada
            </div>
          ) : (
            filteredMensagens.map((mensagem) => (
              <Card 
                key={mensagem.id}
                className="w-full h-[140px] cursor-pointer"
                onClick={() => editarMensagem(mensagem.id)}
              >
                <CardHeader className="gap-1 p-2">
                  <div className="flex items-center justify-between w-full pb-1">
                    <CardTitle className="text-[10px] sm:text-xs font-medium text-gray-900 truncate max-w-[70px] sm:max-w-[90px]">
                      {mensagem.titulo}
                    </CardTitle>
                    {mensagem.urgente && (
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-100 text-[8px] px-1.5 py-0 rounded-full">
                        Urgente
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-2 flex-1 flex flex-col">
                  {mensagem.subtitulo && (
                    <p className="text-[9px] text-gray-500 mb-0.5 line-clamp-1">
                      {mensagem.subtitulo}
                    </p>
                  )}
                  <p className="text-[9px] sm:text-[10px] text-gray-600 line-clamp-2 mb-1">
                    {mensagem.descricao}
                  </p>
                  <div className="flex items-center text-[8px] sm:text-[10px] text-gray-500 mt-auto pt-1 border-t border-gray-100">
                    <Calendar className="h-2 w-2 sm:h-2.5 sm:w-2.5 mr-0.5 text-gray-400" />
                    <span className="text-gray-600 truncate">{formatarData(mensagem.data)}</span>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Botão flutuante de adicionar */}
        <div className="fixed bottom-8 right-8 z-10">
          <Button 
            className="rounded-full w-14 h-14 bg-terreiro-green hover:bg-terreiro-green/90 shadow-lg"
            onClick={() => router.push('/admin/mensagens/nova')}
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>
        </div>
      </main>
    </div>
  );
}
